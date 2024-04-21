import { IUser } from "@/backend/models/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

declare module "@reduxjs/toolkit/query/react" {
  interface FetchBaseQueryError {
    data?: any;
  }
}

declare module "next/server" {
  interface NextRequest {
    user: IUser;
  }
}
