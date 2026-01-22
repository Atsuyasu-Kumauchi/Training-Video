import { Training } from "src/training/training.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user_trainings')
export class UserTraining {
    @PrimaryGeneratedColumn({ name: 'user_training_id' })
    userTrainingId: number;

    @Column({ name: 'user_id', type: 'integer' })
    userId: number;

    @Column({ name: 'training_id', type: 'integer' })
    trainingId: number;

    @Column({ name: 'progress', type: "jsonb", default: () => "'[]'::jsonb" })
    progress: { [key: number]: any }[] = [];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    modified: Date;

    @ManyToOne(() => User, user => user.userTrainings)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Training, training => training.userTrainings)
    @JoinColumn({ name: "training_id" })
    training: Training;

}
