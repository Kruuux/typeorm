import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { AppDataSource } from './AppDataSource';
import { PhotoEntity } from './PhotoEntity';
import { UserEntity } from './UserEntity';

const log = console.log;

(async function () {
  await AppDataSource.initialize();

  const entityManager = AppDataSource.manager;

  const userIdentifier = randomUUID();

  const userEntity = entityManager.create(UserEntity, {
    identifier: userIdentifier,
    firstName: 'firstName',
    lastName: 'lastName',
  });

  await entityManager.save(userEntity);

  log(await entityManager.find(UserEntity));

  const user = await entityManager.findOne(UserEntity, {
    where: { identifier: userIdentifier },
  });

  if (!user) return;

  const photoEntityA = entityManager.create(PhotoEntity, {
    identifier: randomUUID(),
    url: '/a',
    user: user,
  });

  const photoEntityB = entityManager.create(PhotoEntity, {
    identifier: randomUUID(),
    url: '/b',
    user: user,
  });

  await entityManager.save([photoEntityA, photoEntityB]);

  log(await entityManager.find(PhotoEntity));
  log(
    await entityManager.findOne(UserEntity, {
      where: { identifier: userIdentifier },
      relations: ['photos'],
    })
  );

  await entityManager.remove(user);

  log(await entityManager.find(UserEntity));
  log(await entityManager.find(PhotoEntity));
})();
