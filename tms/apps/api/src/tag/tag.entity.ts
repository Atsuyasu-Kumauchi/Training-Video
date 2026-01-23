import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn({ name: 'tag_id' })
    tagId: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @ManyToMany(() => User, (user) => user.tags)
    users: User[];
}
