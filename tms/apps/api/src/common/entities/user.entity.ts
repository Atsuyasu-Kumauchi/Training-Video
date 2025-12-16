import { Role } from 'src/role/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';


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

  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;

  @Column( { name: 'reset_pwd', type: 'boolean', default: false })
  resetPwd: boolean;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'integer', nullable: true })
  roleId: number;

  @ManyToOne(_ => Role, role => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
}
