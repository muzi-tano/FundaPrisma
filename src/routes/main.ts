import { Router } from 'express';
import { prisma } from '../libs/prisma'
import { createUser, createUsers } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'John Doe',
        email: 'john.doe@exemple.com'
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(400).json({ error: 'Email already exists' });
    }
})

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        { name: 'Alice', email: 'alice.smith@example.com' },
        { name: 'Bob', email: 'bob.johson@example.com' },
        { name: 'Charlie', email: 'charlie.brown@example.com' },
        { name: 'David', email: 'david.wilson@example.com'}
    ])
    if (result) {
        res.status(201).json({ ok: true });
    } else {
        res.status(400).json({ error: 'Error creating users' });
    }g
})