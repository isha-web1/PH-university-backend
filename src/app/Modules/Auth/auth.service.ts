import httpStatus from 'http-status';
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";



const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const ifUserExist = await User.findOne({id: payload.id})

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND,"User does not exist");
  }

   // checking if the user is already deleted

  const isDeleted = ifUserExist?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }


   // checking if the user is blocked

  const userStatus = ifUserExist?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  
 
};



export const AuthService = {
  loginUser,
};