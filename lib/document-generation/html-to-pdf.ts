import { chromium } from "playwright"

export async function htmlToPdf(html: string): Promise<Buffer> {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: "networkidle" }) // can change to "load" if the HTML doesn't have any async resources

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="height:14mm"></div>`,
    footerTemplate: `<div style="width:100%; font-size:10px; color:#666; padding:4mm 16mm 6mm 16mm; box-sizing:border-box; text-align:right">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
    margin: { top: "18mm", right: "16mm", bottom: "20mm", left: "16mm" },
  })

  await browser.close()

  return Buffer.from(pdfBuffer)
}