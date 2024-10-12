import request from 'supertest';
import { appStart, server } from '../../server.js';
import { Server } from 'node:http';
import { disconnectDB } from '../../db/mongoose';

describe('Movies GET', () => {
  let serverInstance: Server<never, never>;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzM5NzYwOTExYmRiMWEyMzczMTRjOSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyNDE4MTI1NX0.9Glr5QVKKf_7yjIZLhrRNZClq6w0Ysr8iEZYb1xO9pM';
  beforeAll(async () => {
    // @ts-ignore
    serverInstance = await appStart();
  });

  afterAll(async () => {
    await disconnectDB();
    serverInstance.close();
  });

  it(' возвращает список фильмов для авторизованного пользователя', async () => {
    const response = await request(server)
      .get('/movies')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    const movie = response.body[0];
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('year');
  });
  it(' не возвращает список фильмов для обычного пользователя', async () => {
    const response = await request(server)
      .get('/movies')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.text).toBe('Требуется авторизация');
  });
  it('проверка валидации параметров фильтрации', async () => {
    const response = await request(server)
      .get('/movies?year=11115')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  });
  it('проверка фильтрации по названию фильма', async () => {
    const response = await request(server)
      .get('/movies?title=Movie 3')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('title', 'Movie 3');
  });

  it('отсутствует фильм по названию', async () => {
    const response = await request(server)
      .get('/movies?title=Movie 335')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
  });

  it('сортировка фильмов по году', async () => {
    const response = await request(server)
      .get('/movies?sort=year&sortOrder=asc')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);

    expect(response.body.length).toBeGreaterThan(1);

    const firstYear = response.body[0].year;
    const secondYear = response.body[1].year;

    expect(firstYear).toBeLessThanOrEqual(secondYear);
  });
});
