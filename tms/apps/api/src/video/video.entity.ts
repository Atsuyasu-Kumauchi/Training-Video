import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn({ name: 'video_id' })
    videoId: number;

    @Column({ name: 'title', type: 'varchar' })
    name: string;

    @Column({ name: 'description', type: 'text',  nullable: true })
    description?: string;

    @Column({ name: 'test_id',  type: 'integer' })
    testId: number;

    @Column({ name: 'assignment_id', type: 'integer' })
    assignmentId: number;

    @Column({ name: 'upload_type', type: 'varchar' })
    uploadType: 'youtube' | 'file';

    @Column({ name: 'video_url', type: 'varchar' })
    videoUrl: string;

    @Column({ name: 'file_name', type: 'varchar' })
    fileName: string;

    @Column({ name: 'file_directory', type: 'varchar' })
    fileDirectory: string;

    @Column({ name: 'audience_tags', type: 'jsonb', default: () => "'[]'", nullable: false })
    audienceTags: string[];

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;
}
