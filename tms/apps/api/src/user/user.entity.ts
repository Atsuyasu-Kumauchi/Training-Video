import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  privatekey: string;

  @Column({ type: 'varchar', length: 20, default: 'disabled' })
  status: 'enabled' | 'disabled';

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
}
