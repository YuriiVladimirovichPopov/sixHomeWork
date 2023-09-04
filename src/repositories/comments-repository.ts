import { WithId } from "mongodb"
import { commentsCollection } from "../db/db"
import { PaginatedType } from "../routers/helpers/pagination"
import { PaginatedComment } from "../models/comments/paginatedQueryComment"
import { CommentsMongoDbType } from "../types"



export const commentsRepository = {
    
    async deleteAllComment(): Promise<boolean> {
        const result = await commentsCollection.deleteMany({})
        return result.acknowledged  === true
    },

    async updateComment(commentId: string, content: string ) : Promise<CommentsMongoDbType | undefined | boolean> {
        let foundComment = await commentsCollection.findOne({id: commentId})
        if(foundComment){
        const result = await commentsCollection.updateOne({id: commentId},{ $set:{content: content}}) 
        return result.matchedCount === 1
        }
    },

    async deleteComment(commentId: string){
        const result = await commentsCollection.deleteOne({id: commentId})
        return  result.deletedCount === 1
    }
}