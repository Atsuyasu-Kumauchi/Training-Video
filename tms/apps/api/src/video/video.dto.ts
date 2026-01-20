import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateVideoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  testId?: number;

  @IsNumber()
  @IsNotEmpty()
  assignmentId: number;

  @IsIn(['youtube', 'file'])
  uploadType: 'youtube' | 'file';

  @IsNotEmpty()
  videoUrl: string;

  @IsNotEmpty()
  fileName: string;

  @IsOptional()
  fileDirectory: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  audienceTags: string[];

  @IsBoolean({ message: Messages.MSG1_EX('Video', 'status', 'boolean') })
  @IsNotEmpty({ message: Messages.MSG2_EX('Video', 'status') })
  status: boolean;
}

export class VideoQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @IsOptional()
  @Transform(({ value }) => (value || "").split(","))
  tagsFilter?: string[];

  @Transform(arg => arg.value === 'true')
  @IsBoolean()
  @IsOptional()
  statusFilter?: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @IsString()
  sortBy: string = "Video.videoId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

export interface VideoMetadata {
  uploadId: string;
  fileName: string;
  path: string;
  fileExt: string;
}


const qs1 = [
  {
    "segment": "0-3 min",
    "question": "ダイバーシティという言葉の基本的な意味として最も適切なものはどれですか？",
    "choices": [
      "1. 組織内の人材構成を均一に保つ考え方",
      "2. 多様な背景や価値観を持つ人々を受け入れ活かす考え方",
      "3. 特定の属性を優遇する制度",
      "4. 意思決定を単純化するための管理手法"
    ],
    "correct_answer": "2",
    "explanation": "ダイバーシティは、多様な人材や価値観を受け入れ、組織の力として活かす考え方です。"
  },
  {
    "segment": "3-6 min",
    "question": "講座で説明されているダイバーシティの分類として正しいものはどれですか？",
    "choices": [
      "1. 国内人材と海外人材",
      "2. 管理職と一般職",
      "3. 目に見える多様性と目に見えない多様性",
      "4. 正社員と非正規社員"
    ],
    "correct_answer": "3",
    "explanation": "性別や年齢などの外見的要素と、価値観や経験などの内面的要素に分けられます。"
  },
  {
    "segment": "6-9 min",
    "question": "ダイバーシティが企業にもたらす効果として最も適切なものはどれですか？",
    "choices": [
      "1. 意思決定の選択肢が広がる",
      "2. 業務手順が必ず簡素化される",
      "3. 管理コストが削減される",
      "4. 社内の対立がなくなる"
    ],
    "correct_answer": "1",
    "explanation": "多様な視点が集まることで、課題に対する選択肢が増えます。"
  },
  {
    "segment": "9-12 min",
    "question": "日本企業でダイバーシティが注目されるようになった背景として正しいものはどれですか？",
    "choices": [
      "1. 終身雇用制度の完全な崩壊",
      "2. 少子高齢化やグローバル化への対応",
      "3. 国内市場の急激な拡大",
      "4. 労働時間規制の廃止"
    ],
    "correct_answer": "2",
    "explanation": "労働人口の減少や国際競争の激化が背景にあります。"
  },
  {
    "segment": "12-15 min",
    "question": "ダイバーシティ推進において障壁となりやすいものはどれですか？",
    "choices": [
      "1. 明確な評価制度",
      "2. 固定観念や先入観",
      "3. 対話の機会",
      "4. 多様な働き方の制度"
    ],
    "correct_answer": "2",
    "explanation": "無意識の思い込みが、多様性の受容を妨げる要因になります。"
  },
  {
    "segment": "15-18 min",
    "question": "固定観念を乗り越えるために有効とされている行動はどれですか？",
    "choices": [
      "1. 自分の価値観を明確に主張する",
      "2. 相手の立場や背景を理解しようとする",
      "3. ルールにすべて委ねる",
      "4. 意見の違いを避ける"
    ],
    "correct_answer": "2",
    "explanation": "対話を通じて相手を理解する姿勢が重要です。"
  },
  {
    "segment": "18-21 min",
    "question": "ケーススタディで紹介されたAさんの悩みの本質はどれですか？",
    "choices": [
      "1. 業務量が多すぎたこと",
      "2. 結婚後の働き方に対する固定観念",
      "3. 上司との個人的な対立",
      "4. スキル不足への不安"
    ],
    "correct_answer": "2",
    "explanation": "性別役割に関する先入観が、Aさんの選択を制限していました。"
  },
  {
    "segment": "21-24 min",
    "question": "ダイバーシティ推進のポイントとして講座で強調されていたものはどれですか？",
    "choices": [
      "1. 全員を同じ基準で扱うこと",
      "2. 相互理解と共通の価値観の共有",
      "3. 管理職による一方的な判断",
      "4. 少数意見の排除"
    ],
    "correct_answer": "2",
    "explanation": "違いを認めつつ、共通の価値観を持つことが重要とされています。"
  },
  {
    "segment": "24-27 min",
    "question": "ワークライフバランスとダイバーシティの関係として正しいものはどれですか？",
    "choices": [
      "1. 両者は直接関係しない",
      "2. ワークライフバランスは一部社員向けの施策である",
      "3. 多様な働き方を認める基盤となる",
      "4. 生産性を下げる要因となる"
    ],
    "correct_answer": "3",
    "explanation": "柔軟な働き方は、多様な人材の活躍を支えます。"
  },
  {
    "segment": "27-30 min",
    "question": "本講座を通じて受講者に期待されている姿勢として最も適切なものはどれですか？",
    "choices": [
      "1. 現状の慣習を維持すること",
      "2. 他者の価値観を否定しない姿勢を持つこと",
      "3. 組織の判断に従うことを最優先すること",
      "4. 多様性を制度だけの問題として捉えること"
    ],
    "correct_answer": "2",
    "explanation": "ダイバーシティは制度だけでなく、個人の意識と姿勢が重要です。"
  }
];

const qs2 = [
  {
    "segment": "0-3 min",
    "question": "職場でダイバーシティを実践している状態として最も適切なものはどれですか？",
    "choices": [
      "1. 全員に同一の評価基準と働き方を適用している",
      "2. 個人の違いを考慮しつつ、成果に基づいて評価している",
      "3. 少数派の意見を必ず優先している",
      "4. 慣習を重視し例外を設けていない"
    ],
    "correct_answer": "2",
    "explanation": "公平性を保ちつつ、個人の違いを考慮することが実践的なダイバーシティです。"
  },
  {
    "segment": "3-6 min",
    "question": "目に見えない多様性が業務に影響する場面として最も現実的なものはどれですか？",
    "choices": [
      "1. 年齢による体力差",
      "2. 国籍による言語の違い",
      "3. 意思決定に対する価値観の違い",
      "4. 性別による役割分担"
    ],
    "correct_answer": "3",
    "explanation": "判断基準や価値観の違いは外見では分からず、業務に大きく影響します。"
  },
  {
    "segment": "6-9 min",
    "question": "ダイバーシティ推進が業務上の課題になる可能性が最も高い状況はどれですか？",
    "choices": [
      "1. 意見の違いを議論せずに避けてしまう場合",
      "2. 評価基準を明文化している場合",
      "3. 管理職が対話の時間を確保している場合",
      "4. 働き方の選択肢が複数ある場合"
    ],
    "correct_answer": "1",
    "explanation": "違いを避ける姿勢は、かえって対立や分断を生みます。"
  },
  {
    "segment": "9-12 min",
    "question": "日本企業がダイバーシティに本格的に取り組む必要がある理由として最も現実的なものはどれですか？",
    "choices": [
      "1. 海外企業と同じ制度を導入するため",
      "2. 労働人口減少と人材確保の課題に対応するため",
      "3. 社内満足度調査の数値を上げるため",
      "4. 管理職の負担を減らすため"
    ],
    "correct_answer": "2",
    "explanation": "構造的な人材不足と競争環境の変化が背景にあります。"
  },
  {
    "segment": "12-15 min",
    "question": "固定観念が業務判断に影響している可能性が高い例はどれですか？",
    "choices": [
      "1. 過去の実績データに基づく判断",
      "2. 個人の事情を聞かずに役割を決める判断",
      "3. 明文化されたルールの適用",
      "4. 業務量に応じた人員配置"
    ],
    "correct_answer": "2",
    "explanation": "背景を確認しない判断は、無意識の思い込みが入りやすくなります。"
  },
  {
    "segment": "15-18 min",
    "question": "部下の働き方に違和感を覚えた際、管理職として最も適切な初動はどれですか？",
    "choices": [
      "1. 組織ルールを即時適用する",
      "2. 本人の意図や事情を確認する",
      "3. 同僚に意見を聞く",
      "4. 評価で調整する"
    ],
    "correct_answer": "2",
    "explanation": "事実確認と対話が、誤解や固定観念を防ぎます。"
  },
  {
    "segment": "18-21 min",
    "question": "ケーススタディAさんの状況で、組織側に最も不足していた要素はどれですか？",
    "choices": [
      "1. 業務マニュアル",
      "2. 個人の選択を尊重する姿勢",
      "3. 評価制度",
      "4. 業務量調整"
    ],
    "correct_answer": "2",
    "explanation": "制度以前に、個人の意思を尊重する文化が不足していました。"
  },
  {
    "segment": "21-24 min",
    "question": "ダイバーシティ推進において管理職が最も注意すべき点はどれですか？",
    "choices": [
      "1. 全員に同じ説明を行うこと",
      "2. 無意識の偏りが判断に影響していないかを振り返ること",
      "3. 決定を迅速に行うこと",
      "4. 少数意見を必ず採用すること"
    ],
    "correct_answer": "2",
    "explanation": "管理職自身のバイアスへの自覚が重要です。"
  },
  {
    "segment": "24-27 min",
    "question": "ワークライフバランスを尊重する制度が機能しない主な理由はどれですか？",
    "choices": [
      "1. 制度が存在しないため",
      "2. 利用すると評価が下がると感じられているため",
      "3. 利用条件が明確なため",
      "4. 管理職の権限が弱いため"
    ],
    "correct_answer": "2",
    "explanation": "制度よりも職場の空気や評価への不安が障壁になります。"
  },
  {
    "segment": "27-30 min",
    "question": "本講座を踏まえ、受講者が最初に取るべき行動として最も適切なものはどれですか？",
    "choices": [
      "1. 新しい制度を提案する",
      "2. 自身の判断や発言を振り返る",
      "3. 上司に改善を求める",
      "4. 成功事例を調べる"
    ],
    "correct_answer": "2",
    "explanation": "ダイバーシティ推進は個人の意識変容から始まります。"
  }
];

const qs3 = [
  {
    "segment": "0-3 min",
    "question": "次のうち、ダイバーシティを最も適切に活かしている職場の状態はどれですか？",
    "choices": [
      "1. 全員が同じ判断基準と価値観を共有している",
      "2. 意見の違いを避け、合意形成を優先している",
      "3. 異なる背景を前提に議論し、最適解を探っている",
      "4. 上司の判断を迅速に実行できる体制が整っている"
    ],
    "correct_answer": "3",
    "explanation": "違いを前提に建設的な議論を行うことが、ダイバーシティを活かす状態です。"
  },
  {
    "segment": "3-6 min",
    "question": "目に見えない多様性を考慮せずに評価を行った場合、最も起こりやすい問題はどれですか？",
    "choices": [
      "1. 評価プロセスが複雑になる",
      "2. 成果と無関係な要素で判断してしまう",
      "3. 評価基準が明確になる",
      "4. 評価にかかる時間が短縮される"
    ],
    "correct_answer": "2",
    "explanation": "価値観や背景を無視すると、本来の成果や能力を正しく評価できません。"
  },
  {
    "segment": "6-9 min",
    "question": "多様な意見が対立している会議で、ダイバーシティの観点から最も不適切な対応はどれですか？",
    "choices": [
      "1. 意見の背景を整理して共有する",
      "2. 少数意見の理由を確認する",
      "3. 早期決着のため議論を打ち切る",
      "4. 複数案を比較検討する"
    ],
    "correct_answer": "3",
    "explanation": "議論を打ち切ることは、多様な視点を活かす機会を失わせます。"
  },
  {
    "segment": "9-12 min",
    "question": "ダイバーシティを活かせない組織に共通する特徴として最も当てはまるものはどれですか？",
    "choices": [
      "1. 制度が整備されていない",
      "2. 評価基準が頻繁に変わる",
      "3. 対話より前例を優先する",
      "4. 管理職の人数が少ない"
    ],
    "correct_answer": "3",
    "explanation": "前例重視の姿勢は、多様な考え方の活用を妨げます。"
  },
  {
    "segment": "12-15 min",
    "question": "人材配置を検討する際、無意識の固定観念が最も影響しやすい判断はどれですか？",
    "choices": [
      "1. 業務量に基づく配置",
      "2. 過去の成果データの分析",
      "3. 本人の希望や事情を確認した判断",
      "4. 属性だけで適性を決める判断"
    ],
    "correct_answer": "4",
    "explanation": "属性のみで判断することは、典型的な固定観念の影響です。"
  },
  {
    "segment": "15-18 min",
    "question": "部下から「今の働き方を続けたい」と相談を受けた際、最もダイバーシティに配慮した対応はどれですか？",
    "choices": [
      "1. 全員同じ条件で働くべきだと説明する",
      "2. 前例がないため難しいと伝える",
      "3. 業務への影響を確認し、選択肢を検討する",
      "4. 判断を人事部に丸投げする"
    ],
    "correct_answer": "3",
    "explanation": "業務と本人の事情を両立させる視点が重要です。"
  },
  {
    "segment": "18-21 min",
    "question": "ケーススタディAさんの状況を放置した場合、組織にとって最も現実的なリスクはどれですか？",
    "choices": [
      "1. 業務効率の一時的低下",
      "2. 管理コストの増加",
      "3. 優秀な人材の離職",
      "4. 評価制度の形骸化"
    ],
    "correct_answer": "3",
    "explanation": "個人の意思が尊重されない環境では、人材流出が起こりやすくなります。"
  },
  {
    "segment": "21-24 min",
    "question": "ダイバーシティ推進における「相互理解」が不足している状態とはどれですか？",
    "choices": [
      "1. 意見の違いを前提に議論している",
      "2. 全員が同じ結論に至っている",
      "3. 立場の違いを理解しようとしている",
      "4. 違いを問題として避けている"
    ],
    "correct_answer": "4",
    "explanation": "違いを避ける姿勢は、相互理解とは言えません。"
  },
  {
    "segment": "24-27 min",
    "question": "ワークライフバランス施策が形だけになってしまう主な原因はどれですか？",
    "choices": [
      "1. 制度が複雑すぎる",
      "2. 利用者が少ない",
      "3. 評価や昇進への不利益が暗黙に存在する",
      "4. 管理職の権限が強すぎる"
    ],
    "correct_answer": "3",
    "explanation": "制度があっても、不利益を恐れて使えない環境では機能しません。"
  },
  {
    "segment": "27-30 min",
    "question": "ダイバーシティを継続的に活かすために、個人に最も求められる姿勢はどれですか？",
    "choices": [
      "1. 自分の価値観を一貫して守ること",
      "2. 他者の視点を学び、判断を更新し続けること",
      "3. 組織の決定に従うことを最優先すること",
      "4. 対立を避けることを重視すること"
    ],
    "correct_answer": "2",
    "explanation": "ダイバーシティは継続的な学習と自己調整によって支えられます。"
  }
];

export function testQuestionSetRand() {
  const qsi = Math.floor(Math.random() * 2);
  return [qs1, qs2, qs3][qsi];
}
