import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('tvms_configs')
export class TvmsConfig {
  @PrimaryGeneratedColumn()
  tvmsConfigId: number;

  @Column({ name: 'config_key', type: 'varchar', length: 100, nullable: false, unique: true })
  configKey: string;

  @Column({ name: 'reviewer_roles', type: "jsonb", nullable: true })
  configValue: any = null;
}
