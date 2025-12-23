import { User } from 'src/common/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn({ name: 'department_id' })
  departmentId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
  
  @OneToMany(_ => User, user => user.department)
  users: User[]
}
