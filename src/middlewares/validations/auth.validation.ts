import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { sendStatus } from "../../routers/send-status";
import { usersCollection } from "../../db/db";
import { UsersMongoDbType } from '../../types';
import { UserViewModel } from '../../models/users/userViewModel';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.sendStatus(sendStatus.UNAUTHORIZED_401)
        return
    }

const token = req.headers.authorization.split(' ')[1]

const userId = await jwtService.getUserIdByToken(token)

if (!userId) {
    res.sendStatus(401)
    return  
}

const user = await usersCollection.findOne({id: userId})

        if (!user) {
        return res.sendStatus(sendStatus.UNAUTHORIZED_401)
        }
const mappedUser: UserViewModel = {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,  
}
    req.user = mappedUser
    
    next()
    return;
    
}



/*
const array1 = [1, 4, 9, 16];

const map1 = array1.map((x) => x * 2);
*/
/*
const user = _userMapper(user: UsersMongoDbType): UserViewModel {
    return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
    passwordHash: user.passwordHash,
    passwordSalt: user.passwordSalt
    }
},

*/



