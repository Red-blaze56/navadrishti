import { supabase } from "@/lib/db"

const BUCKET = "documents"

export async function storePdf(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: "application/pdf",
      upsert: false,
    })

  if (error) throw new Error(`Failed to upload PDF: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)

  return data.publicUrl
}