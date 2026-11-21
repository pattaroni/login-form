import { NextResponse } from "next/server";
import db from "@/data/db.json";

// дані адміністратора зберігаються на сервері в БД (data/db.json)
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const admin = db.admin;

  if (email === admin.email && password === admin.password) {
    return NextResponse.json({ success: true, name: admin.name });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
