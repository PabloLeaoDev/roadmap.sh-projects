import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: string | IUser | JwtPayload;
    }

    interface Response {
      renderLayout: (options: {
        page: string,
        styles?: string[],
        scripts?: string[],
        data?: object
      } | undefined, callback?: ((err: Error, html: string) => void) | undefined) => void;
    }
  }
}