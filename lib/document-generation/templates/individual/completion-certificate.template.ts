type CompletionCertificateData = {
  individualName: string
  role: string
  projectTitle: string
  ngoName: string
  companyName: string
  workCompleted: string
  startDate: string
  endDate: string
  verifiedBy: string
  verifierDesignation: string
  certificateDate: string
}

export function completionCertificateTemplate(data: CompletionCertificateData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Georgia, serif; background: #fff; color: #1a1a2e; padding: 72px 80px; font-size: 13px; line-height: 1.6; }
          .outer-border { border: 3px solid #1a1a2e; padding: 48px; }
          .header { text-align: center; margin-bottom: 40px; }
          .header h1 { font-size: 26px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
          .header p { font-size: 12px; color: #555; margin-top: 6px; }
          .divider { border: none; border-top: 1px solid #e0e0e0; margin: 28px 0; }
          .body-text { font-size: 14px; color: #333; line-height: 2; text-align: center; margin-bottom: 32px; }
          .body-text strong { font-size: 18px; color: #1a1a2e; display: block; margin: 8px 0; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 32px; margin-bottom: 32px; }
          .field { display: flex; flex-direction: column; gap: 3px; }
          .field-label { font-size: 10px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #888; }
          .field-value { font-size: 13px; color: #1a1a2e; font-weight: 500; }
          .work-box { background: #f7f8fc; border: 1px solid #e0e0e0; border-radius: 4px; padding: 16px 20px; margin-bottom: 32px; font-size: 13px; color: #333; line-height: 1.7; }
          .sig-block { margin-top: 48px; border-top: 1px solid #1a1a2e; padding-top: 8px; max-width: 240px; }
          .sig-name { font-size: 13px; font-weight: bold; }
          .sig-detail { font-size: 11px; color: #555; }
          .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e0e0e0; display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
        </style>
      </head>
      <body>
        <div class="outer-border">
          <div class="header">
            <h1>Certificate of Completion</h1>
            <p>Issued by Navadrishti on behalf of ${data.ngoName} | Date: ${data.certificateDate}</p>
          </div>

          <hr class="divider" />

          <div class="body-text">
            This is to certify that
            <strong>${data.individualName}</strong>
            has successfully completed their engagement as <strong>${data.role}</strong>
            in the CSR project
            <strong>${data.projectTitle}</strong>
            implemented by ${data.ngoName} in partnership with ${data.companyName}.
          </div>

          <div class="details-grid">
            <div class="field">
              <span class="field-label">Engagement Period</span>
              <span class="field-value">${data.startDate} — ${data.endDate}</span>
            </div>
            <div class="field">
              <span class="field-label">Organisation</span>
              <span class="field-value">${data.ngoName}</span>
            </div>
            <div class="field">
              <span class="field-label">Company Partner</span>
              <span class="field-value">${data.companyName}</span>
            </div>
          </div>

          <div class="work-box">
            <strong style="font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #888; display: block; margin-bottom: 8px;">Work Completed</strong>
            ${data.workCompleted}
          </div>

          <div class="sig-block">
            <div class="sig-name">${data.verifiedBy}</div>
            <div class="sig-detail">${data.verifierDesignation}</div>
            <div class="sig-detail">${data.ngoName}</div>
            <div class="sig-detail">Date: ${data.certificateDate}</div>
          </div>

          <div class="footer">
            <span>Navadrishti Document Generation System</span>
            <span>COMPLETION_CERTIFICATE — ${data.individualName}</span>
          </div>
        </div>
      </body>
    </html>
  `
}