type PaymentTranche = {
  label: string
  percentage: number
  condition: string
}

type CsrMouData = {
  companyName: string
  companyCin: string
  companyRepresentative: string
  ngoName: string
  ngoRegistrationNumber: string
  ngoRepresentative: string
  projectTitle: string
  scope: string
  totalBudget: number
  paymentStructure: PaymentTranche[]
  milestones: string[]
  evidenceRequirements: string[]
  reportingObligations: string
  disputeClause: string
  agreementDate: string
}

export function csrMouTemplate(data: CsrMouData): string {
  const formatAmount = (val: number) => `₹${val.toLocaleString("en-IN")}`

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Georgia, serif; background: #fff; color: #1a1a2e; padding: 60px 72px; font-size: 13px; line-height: 1.6; }
          .header { border-bottom: 3px solid #1a1a2e; padding-bottom: 20px; margin-bottom: 36px; text-align: center; }
          .header h1 { font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
          .header p { font-size: 11px; color: #555; margin-top: 4px; }
          .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
          .party-card { background: #f7f8fc; border: 1px solid #e0e0e0; border-radius: 4px; padding: 16px 20px; }
          .party-type { font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 8px; }
          .party-name { font-size: 15px; font-weight: bold; color: #1a1a2e; margin-bottom: 4px; }
          .party-detail { font-size: 11px; color: #555; }
          .section { margin-bottom: 28px; }
          .section-title { font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #e0e0e0; }
          .prose { font-size: 13px; color: #333; line-height: 1.8; }
          ul { padding-left: 18px; margin-top: 6px; }
          li { font-size: 13px; color: #333; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { text-align: left; font-size: 10px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #888; padding: 8px 12px; border-bottom: 1px solid #e0e0e0; }
          td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; color: #1a1a2e; }
          .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 60px; }
          .sig-block { border-top: 1px solid #1a1a2e; padding-top: 8px; }
          .sig-name { font-size: 12px; font-weight: bold; }
          .sig-detail { font-size: 11px; color: #555; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e0e0e0; display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Memorandum of Understanding</h1>
          <p>CSR Project Agreement — Companies Act 2013, Section 135 | Date: ${data.agreementDate}</p>
        </div>

        <div class="parties">
          <div class="party-card">
            <div class="party-type">Party A — Company</div>
            <div class="party-name">${data.companyName}</div>
            <div class="party-detail">CIN: ${data.companyCin}</div>
            <div class="party-detail">Representative: ${data.companyRepresentative}</div>
          </div>
          <div class="party-card">
            <div class="party-type">Party B — Implementing NGO</div>
            <div class="party-name">${data.ngoName}</div>
            <div class="party-detail">Reg. No: ${data.ngoRegistrationNumber}</div>
            <div class="party-detail">Representative: ${data.ngoRepresentative}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Project</div>
          <p class="prose"><strong>${data.projectTitle}</strong></p>
        </div>

        <div class="section">
          <div class="section-title">Scope of Work</div>
          <p class="prose">${data.scope}</p>
        </div>

        <div class="section">
          <div class="section-title">Budget Commitment</div>
          <p class="prose">Total Committed Amount: <strong>${formatAmount(data.totalBudget)}</strong></p>
        </div>

        <div class="section">
          <div class="section-title">Payment Structure</div>
          <table>
            <thead>
              <tr><th>Tranche</th><th>%</th><th>Release Condition</th></tr>
            </thead>
            <tbody>
              ${data.paymentStructure.map(p => `
                <tr>
                  <td>${p.label}</td>
                  <td>${p.percentage}%</td>
                  <td>${p.condition}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Milestones</div>
          <ul>${data.milestones.map(m => `<li>${m}</li>`).join("")}</ul>
        </div>

        <div class="section">
          <div class="section-title">Evidence Requirements</div>
          <ul>${data.evidenceRequirements.map(e => `<li>${e}</li>`).join("")}</ul>
        </div>

        <div class="section">
          <div class="section-title">Reporting Obligations</div>
          <p class="prose">${data.reportingObligations}</p>
        </div>

        <div class="section">
          <div class="section-title">Dispute Resolution</div>
          <p class="prose">${data.disputeClause}</p>
        </div>

        <div class="signatures">
          <div class="sig-block">
            <div class="sig-name">${data.companyRepresentative}</div>
            <div class="sig-detail">${data.companyName}</div>
            <div class="sig-detail">Date: _______________</div>
          </div>
          <div class="sig-block">
            <div class="sig-name">${data.ngoRepresentative}</div>
            <div class="sig-detail">${data.ngoName}</div>
            <div class="sig-detail">Date: _______________</div>
          </div>
        </div>

        <div class="footer">
          <span>Navadrishti Document Generation System</span>
          <span>CSR_MOU — ${data.projectTitle}</span>
        </div>
      </body>
    </html>
  `
}