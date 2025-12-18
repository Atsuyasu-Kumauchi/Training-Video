import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
