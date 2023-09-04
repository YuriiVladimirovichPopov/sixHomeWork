import {Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/validations/auth.validation";
import { commentsQueryRepository } from "../query repozitory/queryCommentsRepository";
import { commentsRepository } from "../repositories/comments-repository";
import { sendStatus } from './send-status';
import { UserViewModel } from '../models/users/userViewModel';


export const commentsRouter = Router({})


commentsRouter.get('/:commentId', authMiddleware, async (req: Request, res: Response) => {
    const foundComment = await commentsQueryRepository.findCommentById(req.params.id)    
      if (foundComment) {
        return res.status(sendStatus.OK_200).send(foundComment) 
      } else { 
        return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
})


commentsRouter.put('/:commentId', async (req: Request, res: Response) => {
    const user = req.user!                    //res.json(req.user!)
    const commentId = req.params.commentId
    const existingComment = await commentsQueryRepository.findCommentById(commentId);
    if (!existingComment) {
        return res.sendStatus(sendStatus.NOT_FOUND_404); 
    }

    if (existingComment.commentatorInfo.userId !== user.id) {
      return res.sendStatus(sendStatus.FORBIDDEN_403)
  }
    
  const updateComment = await commentsRepository.updateComment(commentId, req.body.content);

if (updateComment) {
    return res.sendStatus(sendStatus.NO_CONTENT_204); 
    } 
})

commentsRouter.delete('/:commentId', authMiddleware, async (req: Request<{commentId: string},{},{},{},{user: string}>, res: Response) =>{
    const user = req.user!
    const commentId = req.params.commentId
    const comment = await commentsQueryRepository.findCommentById(commentId)
        if (!comment) {
            return res.sendStatus(sendStatus.NOT_FOUND_404)
        } else {
      const commentUserId = comment.commentatorInfo.userId
        if (commentUserId !== user.id) {
          return res.sendStatus(sendStatus.FORBIDDEN_403)
        }
    const commentDelete = await commentsRepository.deleteComment(req.params.commentId);
        if(commentDelete){
            return res.sendStatus(sendStatus.NO_CONTENT_204)
        }
    }
})










