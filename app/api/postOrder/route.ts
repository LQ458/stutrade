import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Order from "@/models/order";
import DBconnect from "@/libs/mongodb";
import path from "path";

export async function POST(req: NextRequest) {
  await DBconnect();
  const formData = await req.formData();

  const fields = ["image", "name", "price", "description"];
  const data = Object.fromEntries(
    fields.map((field) => [field, formData.get(field)]),
  );

  if (data.image === null) {
    return NextResponse.json("Image is required", { status: 400 });
  }

  const imageFile = data.image as File;
  const imageBuffer = await imageFile.arrayBuffer();
  const imageBufferData = Buffer.from(imageBuffer);
  const uploadDir = path.join(process.cwd(), "/public/images");
  const imagePath = path.join("/images", imageFile.name);

  await writeFile(
    path.join(uploadDir, imageFile.name),
    Buffer.from(imageBufferData),
  );

  try {
    const order = await Order.create({
      name: data.name,
      price: data.price,
      description: data.description,
      image: imagePath,
    });
    return NextResponse.json(
      { message: "Order Created", order },
      { status: 201 },
    );
  } catch (error: any) {
    const status = error.code === "11000" ? 409 : 500;
    const message =
      error.code === "11000" ? "Order already exists" : error.message;
    return NextResponse.json({ error: message }, { status });
  }
}
