import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';


@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  assignmentId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  question: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @OneToMany(_ => UserAssignment, ua => ua.assignment, { cascade: true })
  userAssignments: UserAssignment[];
}

@Entity('user_assignments')
export class UserAssignment {
  @PrimaryGeneratedColumn()
  userAssignmentId: number;

  @Column({ name: "user_id", type: "integer" })
  userId: number;

  @Column({ name: "user_id", type: "integer" })
  assignmentId: number;

  @Column({ name: "answer", type: "varchar" })
  answer: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @ManyToOne(_ => Assignment, a => a.userAssignments)
  assignment: Assignment;

  @ManyToOne(() => User, user => user.userTrainings)
  @JoinColumn({ name: "user_id" })
  user: User;
}
