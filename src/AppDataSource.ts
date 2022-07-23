import { DataSource } from 'typeorm';
import { PhotoEntity } from './PhotoEntity';
import { UserEntity } from './UserEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test.sqlite',
  synchronize: true,
  logging: true,
  entities: [UserEntity, PhotoEntity],
});
