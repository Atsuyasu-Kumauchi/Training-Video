import { UserTraining } from "src/usertraining/usertraining.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('trainings')
export class Training {
    @PrimaryGeneratedColumn({ name: 'training_id' })
    trainingId: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'videos', type: "jsonb", default: () => "'[]'::jsonb" })
    videos: any[] = [];

    @Column({ type: 'date', nullable: true })
    deadline: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @OneToMany(() => UserTraining, userTraining => userTraining.training)
    userTrainings: UserTraining[];
}
