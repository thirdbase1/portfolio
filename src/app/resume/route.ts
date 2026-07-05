import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const buf = await readFile(path.join(process.cwd(), "public", "oneshotsx_resume.pdf"));
  return new Response(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="oneshotsx_resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
