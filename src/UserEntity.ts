import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from './PhotoEntity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  identifier: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];
}
