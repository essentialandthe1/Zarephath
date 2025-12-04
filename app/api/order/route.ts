import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      selectedProduct,
      quantity,
      method,
      address,
      notes,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // inserting into Supabase
    const { error } = await supabase.from("orders").insert([
      {
        full_name: fullName,
        email,
        phone,
        product: selectedProduct,
        quantity,
        method,
        address,
        notes,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // sending email
    await resend.emails.send({
      from: "Zarephath Foods <onboarding@resend.dev>",
      to: "zarephathnigerialimited@gmail.com",
      subject: `New Order Received - ${fullName}`,
              html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; text-align: center;">🎉 New Order Received!</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #22c55e;">
            <h3 style="color: #333; margin-bottom: 15px;">Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">👤 Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">📧 Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">📞 Phone:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">🛒 Product:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${selectedProduct}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">📦 Quantity:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${quantity}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">🚚 Method:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${method}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">📍 Address:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${address}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">📝 Notes:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          <p style="text-align: center; margin-top: 20px; color: #666;">
            Order received at: ${new Date().toLocaleString()}
          </p>
        </div>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
  console.error("❌ Route crashed:", err);

  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
}
}
