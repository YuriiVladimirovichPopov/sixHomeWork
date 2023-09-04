import dotenv from 'dotenv'
dotenv.config()
import { BlogsMongoDbType, PostsMongoDbType, UsersMongoDbType, CommentsMongoDbType } from '../types';
import { MongoClient } from 'mongodb'


const url = process.env.mongoUrl 

console.log(url)
if (!url) {
  throw new Error('Url is not exsist')
}

export const client = new MongoClient(url)

export const blogsCollection = client.db().collection<BlogsMongoDbType>('blogs')

export const postsCollection = client.db().collection<PostsMongoDbType>('posts')

export const usersCollection = client.db().collection<UsersMongoDbType>('users')

export const commentsCollection = client.db().collection<CommentsMongoDbType>('comments')

export const  runDb = async () => {
  try {
    await client.connect();
    console.log('connected successfully to database')
  } catch (err) {
    console.log('error connecting')
    await client.close();
  }
}




