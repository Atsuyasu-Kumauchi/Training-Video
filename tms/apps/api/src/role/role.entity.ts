import { User } from "src/common/entities/user.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(_ => User, user => user.role)
    users: User[]
}
