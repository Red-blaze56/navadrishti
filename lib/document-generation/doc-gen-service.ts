import { htmlToPdf } from "./html-to-pdf"
import { storePdf } from "./store-pdf"

import { ngoComplianceProfileTemplate } from "./templates/ngo/ngo-compliance-profile.template"
import { ngoCapabilityStatementTemplate } from "./templates/ngo/ngo-capability-statement.template"
import { csrComplianceProfileTemplate } from "./templates/company/csr-compliance-profile.template"
import { csrPolicyDocumentTemplate } from "./templates/company/csr-policy-document.template"
import { csrCommitteeRecordTemplate } from "./templates/company/csr-committee-record.template"
import { csrProjectProposalTemplate } from "./templates/project-level/csr-project-proposal.template"
import { csrMouTemplate } from "./templates/project-level/csr-mou.template"
import { utilizationCertificateTemplate } from "./templates/compliance/utilization-certificate.template"
import { progressReportTemplate } from "./templates/compliance/progress-report.template"
import { impactAssessmentTemplate } from "./templates/compliance/impact-assessment.template"
import { auditCertificateTemplate } from "./templates/compliance/audit-certificate.template"
import { individualParticipationAgreementTemplate } from "./templates/individual/individual-participation-agreement.template"
import { workEngagementContractTemplate } from "./templates/individual/work-engagement-contract.template"
import { completionCertificateTemplate } from "./templates/individual/completion-certificate.template"

// ─── helpers ────────────────────────────────────────────────────────────────

async function generate(html: string, fileName: string): Promise<string> {
  const buffer = await htmlToPdf(html)
  const url = await storePdf(buffer, fileName)
  return url
}

const ts = () => Date.now()

// ─── NGO ────────────────────────────────────────────────────────────────────

export async function generateNgoComplianceProfile(data: Parameters<typeof ngoComplianceProfileTemplate>[0]) {
  return generate(ngoComplianceProfileTemplate(data), `ngo/${data.registrationNumber}/compliance-profile-${ts()}.pdf`)
}

export async function generateNgoCapabilityStatement(data: Parameters<typeof ngoCapabilityStatementTemplate>[0]) {
  return generate(ngoCapabilityStatementTemplate(data), `ngo/${data.registrationNumber}/capability-statement-${ts()}.pdf`)
}

// ─── Company ─────────────────────────────────────────────────────────────────

export async function generateCsrComplianceProfile(data: Parameters<typeof csrComplianceProfileTemplate>[0]) {
  return generate(csrComplianceProfileTemplate(data), `company/${data.cin}/csr-compliance-profile-${ts()}.pdf`)
}

export async function generateCsrPolicyDocument(data: Parameters<typeof csrPolicyDocumentTemplate>[0]) {
  return generate(csrPolicyDocumentTemplate(data), `company/${data.cin}/csr-policy-${data.financialYear}-${ts()}.pdf`)
}

export async function generateCsrCommitteeRecord(data: Parameters<typeof csrCommitteeRecordTemplate>[0]) {
  return generate(csrCommitteeRecordTemplate(data), `company/${data.cin}/csr-committee-${data.financialYear}-${ts()}.pdf`)
}

// ─── Project ─────────────────────────────────────────────────────────────────

export async function generateCsrProjectProposal(data: Parameters<typeof csrProjectProposalTemplate>[0]) {
  return generate(csrProjectProposalTemplate(data), `project/${data.projectTitle}/proposal-${ts()}.pdf`)
}

export async function generateCsrMou(data: Parameters<typeof csrMouTemplate>[0]) {
  return generate(csrMouTemplate(data), `project/${data.projectTitle}/mou-${ts()}.pdf`)
}

// ─── Compliance ───────────────────────────────────────────────────────────────

export async function generateUtilizationCertificate(data: Parameters<typeof utilizationCertificateTemplate>[0]) {
  return generate(utilizationCertificateTemplate(data), `project/${data.projectTitle}/utilization-cert-${ts()}.pdf`)
}

export async function generateProgressReport(data: Parameters<typeof progressReportTemplate>[0]) {
  return generate(progressReportTemplate(data), `project/${data.projectTitle}/progress-report-${data.reportNumber}-${ts()}.pdf`)
}

export async function generateImpactAssessment(data: Parameters<typeof impactAssessmentTemplate>[0]) {
  return generate(impactAssessmentTemplate(data), `project/${data.projectTitle}/impact-assessment-${ts()}.pdf`)
}

export async function generateAuditCertificate(data: Parameters<typeof auditCertificateTemplate>[0]) {
  return generate(auditCertificateTemplate(data), `project/${data.projectTitle}/audit-certificate-${ts()}.pdf`)
}

// ─── Individual ───────────────────────────────────────────────────────────────

export async function generateIndividualParticipationAgreement(data: Parameters<typeof individualParticipationAgreementTemplate>[0]) {
  return generate(individualParticipationAgreementTemplate(data), `individual/${data.individualName}/participation-agreement-${ts()}.pdf`)
}

export async function generateWorkEngagementContract(data: Parameters<typeof workEngagementContractTemplate>[0]) {
  return generate(workEngagementContractTemplate(data), `individual/${data.individualName}/work-engagement-contract-${ts()}.pdf`)
}

export async function generateCompletionCertificate(data: Parameters<typeof completionCertificateTemplate>[0]) {
  return generate(completionCertificateTemplate(data), `individual/${data.individualName}/completion-certificate-${ts()}.pdf`)
}