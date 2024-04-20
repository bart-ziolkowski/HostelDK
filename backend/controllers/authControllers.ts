import { NextRequest, NextResponse } from "next/server";

import User from "../models/user";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password } = body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});
