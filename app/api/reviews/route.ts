import { NextRequest } from "next/server";
import { createRoomReview } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(createRoomReview);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
