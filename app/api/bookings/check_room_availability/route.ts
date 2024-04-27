import { NextRequest, NextResponse } from "next/server";
import { checkRoomBookingAvailability } from "@/backend/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(checkRoomBookingAvailability);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}