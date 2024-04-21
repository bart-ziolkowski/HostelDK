import { NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { updateProfile } from "@/backend/controllers/authControllers";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(updateProfile);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
