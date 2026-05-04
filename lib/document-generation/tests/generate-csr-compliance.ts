import { csrComplianceProfileTemplate } from "../templates/company/csr-compliance-profile.template"
import { htmlToPdf } from "../html-to-pdf"
import fs from "fs"
import path from "path"

async function main() {
  const data = {
    companyName: "Acme Pvt Ltd",
    cin: "U12345MH2020PTC123456",
    pan: "ABCDE1234F",
    netWorth: 600, // ₹600 Cr
    turnover: 1500, // ₹1500 Cr
    netProfit: 10, // ₹10 Cr
    csrApplicable: true,
  }

  const html = csrComplianceProfileTemplate(data)
  const buffer = await htmlToPdf(html)

  const outDir = path.resolve(process.cwd(), "tmp")
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `csr-compliance-profile-${Date.now()}.pdf`)
  fs.writeFileSync(outPath, buffer)

  console.log("Wrote PDF to", outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
