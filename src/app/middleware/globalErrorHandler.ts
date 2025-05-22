import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalErrorHandler = (err : any, req : Request, res : Response, next : NextFunction)=>{
  res.status(500).json({
    success : false,
    message : err.message || 'Internal server error',
    stack : err.stack
  })
  next()
}