import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser } from 'services/user.ts';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
  res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
  try {
    const user = await createUser({
      name: 'John Doe',
      email: 'john.doe@exemple.com',
    });


    res.status(201).json(user);
  } catch (error) {
  
    res.status(500).json({ error: 'Internal Server Error' });
  }
});