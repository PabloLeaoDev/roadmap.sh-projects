import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: string | IUser | JwtPayload; 
    }
  }
}