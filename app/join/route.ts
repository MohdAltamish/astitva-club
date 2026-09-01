import { redirect } from "next/navigation";
import { JOIN_FORM_URL } from "@/data/links";

export async function GET() {
  redirect(JOIN_FORM_URL);
}
