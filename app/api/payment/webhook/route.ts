import { NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { webhookCheckout } from "@/backend/controllers/paymentControllers";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(webhookCheckout);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
