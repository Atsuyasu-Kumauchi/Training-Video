import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('trainings')
export class Training {
    @PrimaryGeneratedColumn({ name: 'training_id' })
    trainingId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @ManyToMany(() => User, (user) => user.trainings)
    users: User[];
}
