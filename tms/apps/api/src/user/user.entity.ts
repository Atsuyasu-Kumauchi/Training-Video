import { Role } from 'src/role/role.entity';
import { UserUriPermission } from 'src/auth/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Department } from 'src/department/department.entity';
import { Tag } from 'src/tag/tag.entity';
import { UserTraining } from 'src/usertraining/usertraining.entity';


@Entity('users')
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

  @Column({ name: 'is_reviewer', type: 'boolean', default: false })
  isReviewer: boolean;

  @Column({ name: 'employee_id', type: 'varchar', length: 100, unique: true })
  employeeId: string;

  @Column({ name: 'join_date', type: 'date' })
  joinDate: Date;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'reset_pwd', type: 'boolean', default: false })
  resetPwd: boolean;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ name: 'role_id', type: 'integer' })
  roleId: number;

  @ManyToOne(_ => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'department_id', type: 'integer' })
  departmentId: number;

  @ManyToOne(_ => Department, department => department.users)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => UserUriPermission, (userUriPermission) => userUriPermission.user)
  userUriPermissions: UserUriPermission[];

  @ManyToMany(() => Tag, (tag) => tag.users)
  @JoinTable({
    name: "user_tags",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "userId",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "tagId",
    },
  })
  tags: Tag[];

  @OneToMany(() => UserTraining, userTraining => userTraining.user)
  userTrainings: UserTraining[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
}
