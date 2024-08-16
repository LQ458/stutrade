import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import DBconnect from "@/libs/mongodb";

export async function GET(req: NextRequest) {
  await DBconnect();
  try {
    const results = await Order.find();
    if (!results) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }
    const orders = results.reverse();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
