import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

declare module "@reduxjs/toolkit/query/react" {
  interface FetchBaseQueryError {
    data?: any;
  }
}
