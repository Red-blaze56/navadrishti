import fs from "fs"
import path from "path"
import { htmlToPdf } from "../html-to-pdf"

import { csrComplianceProfileTemplate } from "../templates/company/csr-compliance-profile.template"
import { csrPolicyDocumentTemplate } from "../templates/company/csr-policy-document.template"
import { csrCommitteeRecordTemplate } from "../templates/company/csr-committee-record.template"
import { csrProjectProposalTemplate } from "../templates/project-level/csr-project-proposal.template"
import { csrMouTemplate } from "../templates/project-level/csr-mou.template"
import { utilizationCertificateTemplate } from "../templates/compliance/utilization-certificate.template"
import { progressReportTemplate } from "../templates/compliance/progress-report.template"
import { impactAssessmentTemplate } from "../templates/compliance/impact-assessment.template"
import { auditCertificateTemplate } from "../templates/compliance/audit-certificate.template"
import { ngoComplianceProfileTemplate } from "../templates/ngo/ngo-compliance-profile.template"
import { ngoCapabilityStatementTemplate } from "../templates/ngo/ngo-capability-statement.template"
import { individualParticipationAgreementTemplate } from "../templates/individual/individual-participation-agreement.template"
import { workEngagementContractTemplate } from "../templates/individual/work-engagement-contract.template"
import { completionCertificateTemplate } from "../templates/individual/completion-certificate.template"

async function writePdf(name: string, html: string) {
  const buffer = await htmlToPdf(html)
  const outDir = path.resolve(process.cwd(), "tmp")
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `${name}-${Date.now()}.pdf`)
  fs.writeFileSync(outPath, buffer)
  console.log("Wrote", outPath)
}

async function main() {
  // Company templates
  await writePdf("csr-compliance-profile", csrComplianceProfileTemplate({
    companyName: "Acme Pvt Ltd",
    cin: "U12345MH2020PTC123456",
    pan: "ABCDE1234F",
    netWorth: 600,
    turnover: 1500,
    netProfit: 10,
    csrApplicable: true,
  }))

  await writePdf("csr-policy-document", csrPolicyDocumentTemplate({
    companyName: "Acme Pvt Ltd",
    cin: "U12345MH2020PTC123456",
    csrVision: "Improve community health through targeted interventions.",
    focusAreas: [
      { category: "Health", rationale: "Primary focus on maternal and child health." },
      { category: "Education", rationale: "Improve learning outcomes in rural schools." },
    ],
    implementationModel: "Partnership with local NGOs and community volunteers.",
    governanceMechanism: "Quarterly committee reviews and annual audits.",
    financialYear: "2025-26",
  }))

  await writePdf("csr-committee-record", csrCommitteeRecordTemplate({
    companyName: "Acme Pvt Ltd",
    cin: "U12345MH2020PTC123456",
    financialYear: "2025-26",
    constitutionDate: "01-Apr-2025",
    members: [
      { name: "Ramesh Kumar", din: "01234567", designation: "Chairperson" },
      { name: "Sita Devi", din: "07654321", designation: "Member" },
    ],
  }))

  // Project-level
  await writePdf("csr-project-proposal", csrProjectProposalTemplate({
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    companyName: "Acme Pvt Ltd",
    scheduleViiCategory: "Promoting healthcare",
    scheduleViiSubCategory: "Preventive healthcare",
    scheduleViiJustification: "Regular health camps reduce morbidity in target areas.",
    problemStatement: "High maternal mortality in district X.",
    targetBeneficiaries: "Women of reproductive age in 10 villages.",
    activities: ["Health camps", "Awareness sessions"],
    deliverables: ["1000 screenings", "200 referrals"],
    totalBudget: 500000,
    budgetBreakdown: [
      { description: "Medical supplies", amount: 200000 },
      { description: "Logistics", amount: 150000 },
      { description: "Honorarium", amount: 150000 },
    ],
    startDate: "01-Jun-2025",
    endDate: "30-Nov-2025",
    milestones: [ { title: "Baseline survey", targetDate: "15-Jun-2025" }, { title: "Midline", targetDate: "30-Sep-2025" } ],
  }))

  await writePdf("csr-mou", csrMouTemplate({
    companyName: "Acme Pvt Ltd",
    companyCin: "U12345MH2020PTC123456",
    companyRepresentative: "Ramesh Kumar",
    ngoName: "Health For All",
    ngoRegistrationNumber: "REG-998877",
    ngoRepresentative: "Anita Shah",
    projectTitle: "Rural Health Camp",
    scope: "Deliver preventive health services in target villages.",
    totalBudget: 500000,
    paymentStructure: [ { label: "Advance", percentage: 50, condition: "On signing" }, { label: "Final", percentage: 50, condition: "On completion" } ],
    milestones: ["Baseline survey", "Final report"],
    evidenceRequirements: ["Attendance registers", "Invoices"],
    reportingObligations: "Quarterly reports to CSR committee.",
    disputeClause: "Arbitration in Mumbai.",
    agreementDate: "01-May-2025",
  }))

  // Compliance templates
  await writePdf("utilization-certificate", utilizationCertificateTemplate({
    ngoName: "Health For All",
    projectTitle: "Rural Health Camp",
    companyName: "Acme Pvt Ltd",
    reportingPeriod: "Apr-Jun 2025",
    fundsReceived: 500000,
    fundsUtilized: 450000,
    balance: 50000,
    expenseBreakdown: [ { description: "Medicines", amount: 200000, invoiceRef: "INV-001" }, { description: "Logistics", amount: 150000, invoiceRef: "INV-002" }, { description: "Honorarium", amount: 100000 } ],
  }))

  await writePdf("progress-report", progressReportTemplate({
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    companyName: "Acme Pvt Ltd",
    reportingPeriod: "Jun 2025",
    reportNumber: 1,
    milestoneStatuses: [
      { title: "Baseline survey", status: "completed", completionPercentage: 100 },
      { title: "Health camps", status: "in-progress", completionPercentage: 60 },
    ],
    workCompleted: "Baseline survey completed; 3 health camps conducted.",
    evidence: [
      { type: "document", description: "Survey report", timestamp: "2025-06-15" },
      { type: "media", description: "Camp photos" },
    ],
  }))

  await writePdf("impact-assessment", impactAssessmentTemplate({
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    companyName: "Acme Pvt Ltd",
    projectPeriod: "Jun-Nov 2025",
    beneficiariesReached: 350,
    targetBeneficiaries: 500,
    outcomesAchieved: [
      { indicator: "Awareness sessions", target: "10 sessions", achieved: "12 sessions" },
      { indicator: "Screenings", target: "1000", achieved: "1100" },
    ],
    beforeDescription: "Low access to preventive care",
    afterDescription: "Improved outreach and screening",
    narrativeSummary: "The project improved access and early referrals across target villages.",
  }))

  await writePdf("audit-certificate", auditCertificateTemplate({
    ngoName: "Health For All",
    projectTitle: "Rural Health Camp",
    companyName: "Acme Pvt Ltd",
    auditPeriod: "Apr-Nov 2025",
    totalCertifiedExpenses: 450000,
    expenseItems: [ { description: "Medicines", certifiedAmount: 200000 }, { description: "Logistics", certifiedAmount: 150000 }, { description: "Honorarium", certifiedAmount: 100000 } ],
    udin: "UDIN123456",
    caName: "Audit LLP",
    caMembershipNumber: "M12345",
    caFirmName: "Audit LLP",
    caFirmRegistrationNumber: "FIRM-9988",
    auditDate: "15-Dec-2025",
  }))

  // NGO templates
  await writePdf("ngo-compliance-profile", ngoComplianceProfileTemplate({
    legalName: "Health For All",
    registrationType: "Trust",
    registrationNumber: "REG-998877",
    registrationDate: "01-Jan-2010",
    pan: "NGOPAN1234",
    twelveANumber: "12A-111",
    eightyGNumber: "80G-222",
    csrOneRegistrationNumber: "CSR-1-333",
    fcraNumber: undefined,
    bankName: "State Bank",
    accountNumber: "1234567890",
    ifscCode: "SBIN0000000",
  }))

  await writePdf("ngo-capability-statement", ngoCapabilityStatementTemplate({
    legalName: "Health For All",
    registrationNumber: "REG-998877",
    sectorsWorked: [ { category: "Health", subCategory: "Primary care" } ],
    pastProjects: [ { title: "Child Nutrition", year: "2022", company: "Acme Pvt Ltd", budget: 200000 } ],
    geographicCoverage: ["District X", "District Y"],
    executionCapacity: "Can run 10 camps per month",
    teamStrength: 12,
  }))

  // Individual templates
  await writePdf("individual-participation-agreement", individualParticipationAgreementTemplate({
    individualName: "Rahul Sharma",
    idProof: undefined,
    role: "Volunteer",
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    startDate: "01-Jun-2025",
    endDate: "31-Aug-2025",
    compensationAmount: undefined,
    compensationNotes: undefined,
    attendanceRequirements: "Attend at least 75% of scheduled camps.",
    codeOfConduct: ["Respect beneficiaries", "Maintain confidentiality", "Follow safety protocols"],
    agreementDate: "01-Jun-2025",
  }))

  await writePdf("work-engagement-contract", workEngagementContractTemplate({
    individualName: "Rahul Sharma",
    role: "Field Coordinator",
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    workDescription: "Coordinate field activities, supervise volunteers, and manage logistics.",
    paymentTerms: "Monthly payment upon submission of attendance and deliverables.",
    totalAmount: 90000,
    attendanceTrackingMethod: "Daily attendance register",
    deliverables: [ { description: "Organise 10 camps", dueDate: "30-Nov-2025" } ],
    startDate: "01-Jun-2025",
    endDate: "30-Nov-2025",
    agreementDate: "01-Jun-2025",
  }))

  await writePdf("completion-certificate", completionCertificateTemplate({
    individualName: "Rahul Sharma",
    role: "Field Coordinator",
    projectTitle: "Rural Health Camp",
    ngoName: "Health For All",
    companyName: "Acme Pvt Ltd",
    workCompleted: "Successfully coordinated 10 health camps reaching 1100 beneficiaries.",
    startDate: "01-Jun-2025",
    endDate: "30-Nov-2025",
    verifiedBy: "Anita Shah",
    verifierDesignation: "Programme Manager",
    certificateDate: "30-Nov-2025",
  }))

}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
