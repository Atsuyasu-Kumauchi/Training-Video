import { Body, Controller, Get, Headers, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, testQuestionSetRand, VideoQueryDto } from "./video.dto";
import { type DeepPartial } from "typeorm";
import { IsAdmin, JwtAuthGuard, VerifyUser } from "src/auth/auth.guard";
import { TestService } from "src/test/test.service";
import { Test, TestQuestion } from "src/test/test.entity";
import * as path from 'path';
import * as fs from 'fs';
import Ffmpeg, * as ffmpeg from 'fluent-ffmpeg';
import { YouTube } from 'youtube-sr';


@UseGuards(JwtAuthGuard, VerifyUser, IsAdmin)
@Controller('videos')
export class VideoController {
    private readonly uploadDir = path.join(process.cwd(), 'public', 'static');

    constructor(private readonly videoService: VideoService, private readonly testService: TestService) {
        if (!fs.existsSync(this.uploadDir)) fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    async generateQuestionSet(segments: any[]) {
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4.1",
                temperature: 0.2,
                input: [
                    {
                        role: "system",
                        content: `
You are an educational assessment generator.

RULES:
• Each transcript element MUST produce exactly ONE question.
• Use the content of the transcript element only.
• Segment label format: "from-to min".
• Do NOT merge or skip segments.
• Output object MUST have a top-level key 'segments' which is an array of question objects.
• No commentary.
`
                    },
                    {
                        role: "user",
                        content: JSON.stringify(segments)
                    }
                ],
                text: {
                    format: {
                        type: "json_schema",
                        name: "question_set",
                        schema: {
                            type: "object",
                            additionalProperties: false,
                            required: ["segments"],
                            properties: {
                                segments: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        additionalProperties: false,
                                        required: [
                                            "segment",
                                            "question",
                                            "choices",
                                            "correct_answer",
                                            "explanation"
                                        ],
                                        properties: {
                                            segment: { type: "string" },
                                            question: { type: "string" },
                                            choices: {
                                                type: "array",
                                                minItems: 4,
                                                maxItems: 4,
                                                items: { type: "string" }
                                            },
                                            correct_answer: { type: "string", enum: ["1", "2", "3", "4"] },
                                            explanation: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        });

        const json = await response.json();
        const textOutput = json.output[0].content[0].text;

        return JSON.parse(textOutput).segments as [];
    }

    async transcribeWhisper(wavPath: string, { retries = 3, timeoutMs = 120_000 } = {}) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeoutMs);

            try {
                const formData = new FormData();
                formData.append('file', new Blob([fs.readFileSync(wavPath)], { type: 'audio/wav' }), wavPath);
                formData.append('model', 'whisper-1');
                formData.append('response_format', 'verbose_json');
                const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${process.env.OPENAI_KEY}` },
                    body: formData
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}: ${response}`);

                return await response.json();
            } catch (err) {
                if (attempt === retries) throw err;
                await new Promise(r => setTimeout(r, 1000 * attempt));
            } finally {
                clearTimeout(timer);
            }
        }
    }

    @Get("generateVideoQuestions")
    async generateVideoQuestions(@Query('v') videoPath: string) {
        const videoPathWav: string = await new Promise((resolve, reject) => {
            const videoPathWav = videoPath + ".wav";
            Ffmpeg(videoPath)
                .outputOptions([
                    "-map 0:a:0",
                    "-vn",
                    "-ac 1",
                    "-ar 16000",
                    "-c:a pcm_s16le"
                ])
                .output(videoPathWav)
                .on("end", () => resolve((videoPathWav)))
                .on("error", reject)
                .run();
        });

        const silenceEvents = await new Promise<{ start: number, end: number, duration: number }[]>((resolve, reject) => {
            const events: { start: number, end: number, duration: number }[] = [];

            Ffmpeg(videoPathWav)
                .audioFilters([
                    "highpass=f=120",
                    "lowpass=f=3800",
                    "afftdn=nf=-25",
                    "asetnsamples=n=2048:p=0",
                    "silencedetect=noise=-30dB:d=0.35"
                ])
                .format("null")
                .output("-")
                .on("stderr", line => {
                    let match: RegExpMatchArray | null;

                    match = line.match(/silence_start: ([0-9.]+)/);
                    if (match) events.push({ start: parseFloat(match[1]), end: 0, duration: 0 });

                    match = line.match(/silence_end: ([0-9.]+) \| silence_duration: ([0-9.]+)/);
                    if (match) (events.at(-1)!.end = +match[1]), events.at(-1)!.duration = parseFloat(match[2]);
                })
                .on("end", () => resolve(events))
                .on("error", reject)
                .run();
        });

        const segEnds: number[] = [];
        for (let i = 0, c = silenceEvents.length, segN = 1; i < c; ++i) {
            if (silenceEvents[i].start < 720 * segN) segEnds[segN - 1] = silenceEvents[i].end - 0.20;
            else segN++;
        }

        const segTs: any[] = [];
        for (let i = 0, c = segEnds.length, start = 0; i < c; ++i) {
            const videoPathSegWav = videoPath + `.p${i + 1}.wav`;
            await new Promise((resolve, reject) => {
                Ffmpeg(videoPathWav)
                    .setStartTime(start)
                    .setDuration(segEnds[i] - start)
                    .audioCodec('copy')
                    .save(videoPathSegWav)
                    .on('end', resolve)
                    .on('error', reject);
            });
            segTs.push(await this.transcribeWhisper(videoPathSegWav));

            start = segEnds[i];
        }
        const fullTranscript = segTs.map((st, i) => st.segments.map(s => ([s.start + i * 720, s.end + i * 720, s.text]))).flat();

        const fullTranscript3mg: string[] = [];
        for (let i = 0, c = fullTranscript.length, segN = 1; i < c; ++i) {
            if (+fullTranscript[i][0] < 180 * segN) fullTranscript3mg[segN - 1] = `${(fullTranscript3mg[segN - 1] || "")}${fullTranscript[i][2]}`;
            else segN++;
        }

        return await this.generateQuestionSet(fullTranscript3mg.map((s, i) => ({ from: i * 3, to: (i + 1) * 3, content: s })));
    }

    @Post("uploads")
    async upload(@Req() req: Request, @Headers('x-file-name') fileName: string, @Headers('x-upload-id') uploadId: string) {
        const metadata = await this.videoService.handleUpload(req, fileName, uploadId);
        return { uploadId: metadata.uploadId, fileName: metadata.fileName, playbackUrl: `/static/${metadata.uploadId}${metadata.fileExt}` };
    }

    @Get('uploads/:uploadId')
    async getMetadata(@Param('uploadId') uploadId: string) {
        const metadata = await this.videoService.findVideo(uploadId);
        return { uploadId: metadata.uploadId, fileName: metadata.fileName, playbackUrl: `/static/${metadata.uploadId}${metadata.fileExt}` };
    }

    @Get()
    async findAll(@Query() query: VideoQueryDto) {
        return await this.videoService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Video> {
        return await this.videoService.findOne(+id);
    }

    async getVideoDuration(path: string): Promise<number> {
        return new Promise((res, rej) => {
            ffmpeg.ffprobe(path, (err, data) => {
                if (err) return rej(err);
                res(data.format.duration as number);
            });
        });
    }

    async takeVideoThumbnail(videoPath: string, outputPath: string) {
        return new Promise<string>((res, rej) => {
            Ffmpeg(videoPath)
                .videoFilters('thumbnail=100')
                .frames(1)
                .on('end', () => {
                    res(outputPath);
                })
                .on('error', e => {
                    rej(e);
                })
                .save(outputPath);
        });
    }

    @Post()
    async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
        const videoPath = path.join(this.uploadDir, createVideoDto.videoUrl.replace('/static', ''));
        const video = await this.videoService.create({
            ...createVideoDto,
            videoDuration: createVideoDto.uploadType === "file"
                ? Math.floor(await this.getVideoDuration(videoPath))
                : (await YouTube.getVideo(`https://www.youtube.com/watch?v=${createVideoDto.videoUrl}`)).duration / 1000,
            thumbnailUrl: createVideoDto.uploadType === "file"
                ? (await this.takeVideoThumbnail(videoPath, videoPath.replace(/\.[^.]*$/, ".thumb.jpg"))).replace(/.*\/public/, '')
                : (await YouTube.getVideo(`https://www.youtube.com/watch?v=${createVideoDto.videoUrl}`)).thumbnail?.url || "",
        });

        // schedule test generation
        await this.testService.save(createVideoDto.testId || video.testId, {
            ...video.test,
            testId: createVideoDto.testId,
            testQuestions: (video.uploadType === "youtube" ? testQuestionSetRand() : await this.generateVideoQuestions(videoPath)).map(tq => ({
                question: tq.question,
                correctOption: +tq.correct_answer,
                options: tq.choices
            } as TestQuestion))
        } as DeepPartial<Test>);

        return video;
    }

    @Put(':id')
    async save(@Param('id') id: number, @Body() video: DeepPartial<Video>) {
        return await this.videoService.save(id, video);
    }

}
