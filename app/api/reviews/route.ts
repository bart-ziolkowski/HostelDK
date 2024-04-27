import { NextRequest, NextResponse } from "next/server";
import { createRoomReview } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(createRoomReview);

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
