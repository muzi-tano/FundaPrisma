import { Router } from 'express';
import { createUser,
     createUsers,
      getAllUsers,
       getUserByEmail } from '../services/user';


export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Wild Bill',
        email: 'wild.bill@exemple.com',
        posts: {
            create: {
                 title: 'Post1 - Wild Bill', 
                content: 'Content of Post1' 
            }
        }
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
    }
})

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers();
    if (users) {
        res.json({ users });
    } else {
        res.status(500).json({ error: 'Error fetching users' });
    }
})

mainRouter.get('/users', async (req, res) => {
    const user = await getUserByEmail('charlie.brown@exemple.com');
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
})