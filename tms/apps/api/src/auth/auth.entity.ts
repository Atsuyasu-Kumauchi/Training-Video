import { User } from "src/common/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


@Entity({ name: 'uri_permissions' })
export class UriPermission {
  @PrimaryGeneratedColumn({ name: 'uri_permission_id' })
  uriPermissionId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'is_permissive', type: 'boolean', default: true })
  isPermissive: boolean;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified: Date;

  @OneToMany(() => UserUriPermission, (userUriPermission) => userUriPermission.uriPermission)
  userUriPermissions: UserUriPermission[];
}

@Entity({ name: 'user_uri_permissions' })
@Unique(['user', 'uriPermission'])
export class UserUriPermission {
  @PrimaryGeneratedColumn({ name: 'user_uri_permission_id' })
  userUriPermissionId: number;

  @ManyToOne(() => User, (user) => user.userUriPermissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UriPermission, (uriPermission) => uriPermission.userUriPermissions)
  @JoinColumn({ name: 'uri_permission_id' })
  uriPermission: UriPermission;

  @Column({ name: 'has_permission', type: 'boolean', default: true })
  hasPermission: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;
}
