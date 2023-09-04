import { WithId } from "mongodb"
import { commentsCollection } from "../db/db"
import { PaginatedType } from "../routers/helpers/pagination"
import { PaginatedComment } from "../models/comments/paginatedQueryComment"
import { CommentsMongoDbType } from "../types"



export const commentsQueryRepository = {
    async getAllCommentsForPost(postId:string, pagination:PaginatedType): 
    Promise<PaginatedComment<CommentsMongoDbType>> {
        
    const result : WithId<WithId<CommentsMongoDbType>>[] = await commentsCollection.find({postId: postId}, {projection: {_id: 0, postId: 0}}) 
    
    .sort({[pagination.sortBy]: pagination.sortDirection})
    .skip(pagination.skip)
    .limit(pagination.pageSize)
    .toArray()
        const totalCount: number = await commentsCollection.countDocuments({postId})
        const pageCount: number = Math.ceil(totalCount / pagination.pageSize)

        const response: PaginatedComment<CommentsMongoDbType> = {
        pagesCount: pageCount,
        page: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalCount: totalCount,
        items: result
        }
        return response
    },
   
    async findCommentById(id: string): Promise<CommentsMongoDbType | null> {
        return commentsCollection.findOne({id: id}, {projection: {_id: 0, postId: 0}})
    }
}