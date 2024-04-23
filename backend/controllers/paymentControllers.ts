import { NextRequest, NextResponse } from "next/server";
import User from "../models/user";
import Booking from "../models/booking";
import Room from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { headers } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { searchParams } = new URL(req.url);

    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const daysOfStay = searchParams.get("daysOfStay");
    const roomAmount = searchParams.get("amount");

    const room = await Room.findById(params.id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/bookings/me`,
      cancel_url: `${process.env.API_URL}/room/${room?._id}`,
      customer_email: req.user.email,
      client_reference_id: params?.id,
      metadata: { checkInDate, checkOutDate, daysOfStay },
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(roomAmount) * 100,
            product_data: {
              name: room?.name,
              description: room?.description,
              images: [`${room?.images[0]?.url}`],
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json(session);
  }
);

export const webhookCheckout = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = headers().get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session?.customer_email })).id;

      const amountPaid = session?.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    console.log("Eror in stripe checkout webhook => ", error);
    return NextResponse.json({ errMessage: error?.message });
  }
};
