import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";

import { NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { deleteBooking } from "@/backend/controllers/bookingControllers";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteBooking);

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
