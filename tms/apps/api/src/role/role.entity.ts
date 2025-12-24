import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @OneToMany(_ => User, user => user.role)
    users: User[]
}
