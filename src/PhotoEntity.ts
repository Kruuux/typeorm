import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  identifier: string;

  @Column()
  url: string;

  @ManyToOne(() => UserEntity, (user) => user.photos, { onDelete: 'CASCADE' })
  user: UserEntity;
}
