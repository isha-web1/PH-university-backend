import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';



export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string | number = '350d',
) => {
  const options: SignOptions = {
    expiresIn,
  };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};