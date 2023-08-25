import  express from 'express'
import cors from 'cors'
import { blogsRouter } from './routers/blogs-router';
import { postsRouter } from './routers/posts-router';
import {testingRouter } from './routers/testing-router';
import { usersRouter } from './routers/users-router';
import { authRouter } from './routers/auth-router';


export const app = express()
const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)



app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.use('/users', usersRouter)

app.use('/auth', authRouter)

app.use('/testing', testingRouter)