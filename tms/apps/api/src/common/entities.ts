import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('tvms_configs')
export class TvmsConfig {
  @PrimaryGeneratedColumn({ name: 'tvms_config_id' })
  tvmsConfigId: number;

  @Column({ name: 'config_key', type: 'varchar', length: 100, nullable: false, unique: true })
  configKey: string;

  @Column({ name: 'config_value', type: "jsonb", nullable: true })
  configValue: any = null;
}
