import Contract from 'Contract'
import Issue from './issue'
import Grade from './grade'
class TokenMain extends Contract {
  static viewFuncs = [
    'getLedgerFirst',
    'getIssue',
    'getLedger',
    'getAccreditation_Agency',
    'getEducation_Organization',
    'getQualification',
    'getEcts',
    'getStudent',
    'getNational_Qualifications_Frame',
    'getLearning_Passport',
  ]
  static authenticationFuncs = [
    'createLedger',
    'createAccreditation_Agency',
    'createEducation_Organization',
    'createQualification',
    'createEcts',
    'createStudent',
    'createNational_Qualification_Frame',
    'createEuropean_Qualifications_Frame',
    'createCredit_Supplement',
    'createLearning_Passport',
    'createCV'
  ]
  static publicFuncs = [
    'createLedgerFirst',
    'getLedgerFirst',
    'createAccreditation_Agency',
    'getAccreditation_Agency',
    'createEducation_Organization',
    'getEducation_Organization',
    'createQualification',
    'getQualification',
    'createNational_Qualification_Frame',
    'getNational_Qualifications_Frame',
    'createEuropean_Qualifications_Frame',
    'createEcts',
    'getEcts',
    'createCredit_Supplement',
    'createStudent',
    'getStudent',
    'createLedger',
    'getLedger',
    'createLearning_Passport',
    'getLearning_Passport',
    'createCV',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'EUROPE_EDUCATION'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._issue = new Issue(data)
    this._grade = new Grade(data)
  }
  //---------------------createLedgerFirst------------------------------
  async createLedgerFirst() {
    let Ledgerfirst = await this._issue.createIssue('LEDGERFIRST')
    return Ledgerfirst
  }
  getLedgerFirst() {
    let Ledgerfirst = this._issue.getIssueByType('LEDGERFIRST')
    return Ledgerfirst
  }
  // --------------------createAccrediation_Agency-------------------------- 
  checkAccreditation_Agency(address) {
    let checkAccreditation_Agency = this.getAccreditation_AgencyByAddress(address)
    if (!checkAccreditation_Agency || checkAccreditation_Agency.type !== 'ACCREDITATIONAGENCY') throw `ACCREDITATIONAGENCY IS NOT EXIST`
    return true
  }
  getAccreditation_AgencyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createAccreditation_Agency() {
    await this._issue.checkIssue(this.sender, 'LEDGERFIRST')
    let Accreditation_Agency = await this._grade.createGrade('ACCREDITATIONAGENCY')
    return Accreditation_Agency
  }
  getAccreditation_Agency() {
    return this._grade.getGradeByType('ACCREDITATIONAGENCY')
  }
  // --------------------createEducation_Organization---------------------------
  checkEducation_Organization(address) {
    let checkEducation_Organization = this.getEducation_OrganizationByAddress(address)
    if (!checkEducation_Organization || checkEducation_Organization.type !== 'EDUCATIONORGANIZATION') throw `EDUCATIONORGANIZATION IS NOT EXIST`
    return true
  }
  getEducation_OrganizationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createEducation_Organization() {
    (await this.checkAccreditation_Agency(this.sender, 'ACCREDITATIONAGENCY')) || (await this.checkLedger(this.sender, 'LEDGER'))
    let Education_Organization = await this._grade.createGrade('EDUCATIONORGANIZATION')
    return Education_Organization
  }
  getEducation_Organization() {
    return this._grade.getGradeByType('EDUCATIONORGANIZATION')
  }
  // --------------------createQualification---------------------------
  checkQualification(address) {
    let checkQualification = this.getQualificationByAddress(address)
    if (!checkQualification || checkQualification.type !== 'QUALIFICATION') throw `QUALIFICATION IS NOT EXIST`
    return true
  }
  getQualificationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createQualification() {
    await this.checkEducation_Organization(this.sender, 'EDUCATIONORGANIZATION')
    let Qualification = await this._grade.createGrade('QUALIFICATION')
    return Qualification
  }
  getQualification() {
    return this._grade.getGradeByType('QUALIFICATION')
  }
  // --------------------createNational_Qualification_Frame ---------------------------
  checkNational_Qualification_Frame(address) {
    let checkNational_Qualification_Frame = this.getNational_Qualification_FrameByAddress(address)
    if (!checkNational_Qualification_Frame || checkNational_Qualification_Frame.type !== 'NATIONNAL_QUALIFICATION_FRAME') throw `NATIONNAL_QUALIFICATION_FRAME IS NOT EXIST`
    return true
  }
  getNational_Qualification_FrameByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createNational_Qualification_Frame() {
    await this.checkQualification(this.sender, 'QUALIFICATION')
    let National_Qualification_Frame = await this._grade.createGrade('NATIONNAL_QUALIFICATION_FRAME')
    return National_Qualification_Frame
  }
  getNational_Qualifications_Frame() {
    return this._grade.getGradeByType('NATIONNAL_QUALIFICATION_FRAME')
  }
  // --------------------createEuropean_Qualifications_Frame ---------------------------
  async createEuropean_Qualifications_Frame() {
    let checkNational_Qualification_Frame = this._grade.getGradeByAddress(this.sender)
    if (!checkNational_Qualification_Frame || checkNational_Qualification_Frame.type !== 'NATIONNAL_QUALIFICATION_FRAME') throw 'NATIONNAL_QUALIFICATION_FRAME IS NOT EXIST'
    let European_Qualifications_Frame = await this._grade.createGrade('EUROPEAN_QUALIFICATION_FRAME')
    this.setToAddress(European_Qualifications_Frame.address)
    return 'SUCCESS'
  }
  // --------------------createEcts---------------------------
  checkEcts(address) {
    let checkEcts = this.getEctsByAddress(address)
    if (!checkEcts || checkEcts.type !== 'ECTS') throw `ECTS IS NOT EXIST`
    return true
  }
  getEctsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createEcts() {
    await this.checkQualification(this.sender, 'QUALIFICATION')
    let Ects = await this._grade.createGrade('ECTS')
    return Ects
  }
  getEcts() {
    return this._grade.getGradeByType('ECTS')
  }
  // --------------------createCredit_Supplement ---------------------------
  async createCredit_Supplement() {
    let checkEcts = this._grade.getGradeByAddress(this.sender)
    if (!checkEcts || checkEcts.type !== 'ECTS') throw 'ECTS IS NOT EXIST'
    let Ects = await this._grade.createGrade('CREDIT_SUPPLEMENT')
    this.setToAddress(Ects.address)
    return 'SUCCESS'
  }
  // --------------------createStudent ---------------------------
  checkStudent(address) {
    let checkStudent = this.getStudentByAddress(address)
    if (!checkStudent || checkStudent.type !== 'STUDENT') throw `STUDENT IS NOT EXIST`
    return true
  }
  getStudentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createStudent() {
    await this.checkEcts(this.sender, 'ECTS')
    let Student = await this._grade.createGrade('STUDENT')
    return Student
  }
  getStudent() {
    return this._grade.getGradeByType('STUDENT')
  }
  // --------------------createLedger--------------------------- 
  checkLedger(address) {
    let checkLedger = this.getLedgerByAddress(address)
    if (!checkLedger || checkLedger.type !== 'LEDGER') throw `LEDGER IS NOT EXIST`
    return true
  }
  getLedgerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createLedger() {
    await this.checkStudent(this.sender, 'ISSUE')
    let Ledger = await this._grade.createGrade('LEDGER')
    return Ledger
  }
  getLedger() {
    return this._grade.getGradeByType('LEDGER')
  }
  // --------------------createLearning_Passport ---------------------------
  checkLearning_Passport(address) {
    let checkLearning_Passport = this.getLearning_PassportByAddress(address)
    if (!checkLearning_Passport || checkLearning_Passport.type !== 'LEARNING_PASSPORT') throw `LEARNING_PASSPORT IS NOT EXIST`
    return true
  }
  getLearning_PassportByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createLearning_Passport() {
    await this.checkLedger(this.sender, 'LEDGER')
    let Learning_Passport = await this._grade.createGrade('lEARNING_PASSPORT')
    return Learning_Passport
  }
  getLearning_Passport() {
    return this._grade.getGradeByType('lEARNING_PASSPORT')
  }
  // --------------------createCV ---------------------------
  async createCV() {
    let checkLearning_Passport = this._grade.getGradeByAddress(this.sender)
    if (!checkLearning_Passport || checkLearning_Passport.type !== 'lEARNING_PASSPORT') throw 'lEARNING_PASSPORT IS NOT EXIST'
    let CV = await this._grade.createGrade('CV')
    this.setToAddress(CV.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
