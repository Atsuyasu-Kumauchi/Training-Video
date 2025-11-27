import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tbl_department')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
}
