import { Video } from 'src/video/video.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';


@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn({ name: 'test_id' })
  testId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @OneToMany(_ => TestQuestion, tq => tq.test, { cascade: true })
  @JoinColumn()
  testQuestions: TestQuestion[];

  @OneToOne(() => Video, video => video.test)
  video: Video;
}

@Entity('test_questions')
export class TestQuestion {
  @PrimaryGeneratedColumn({ name: "test_question_id" })
  testQuestionId: number;

  @Column({ name: "test_id", type: "integer" })
  testId: number;

  @Column({ name: "question", type: "varchar" })
  question: string;

  @Column({ name: "correct_option", type: "integer" })
  correctOption: number;

  @Column({ name: "options", type: "jsonb", default: () => "'[]'::jsonb" })
  options: string[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @ManyToOne(_ => Test, t => t.testQuestions)
  @JoinColumn({ name: "test_id" })
  test: Test;
}
