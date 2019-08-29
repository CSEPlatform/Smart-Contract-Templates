import Contract from 'Contract'
import Process from './process'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_P2P_Lending',
    'get_Guarantee',
    'get_Establish_Repayment_Secuity_deposit',
    'get_Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification',
    'get_Check_Compliance',
    'get_Compliance',
    'get_Approval',
    'get_Adopt',
    'get_Assign',
    'get_Do_not_Adopt',
    'get_Re_apply',
    'get_Do_not_Re_apply',
    'get_Submit_Material',
    'get_Reconsideration',
    'get_Apply_for_Reconsideration',
    'get_Investigate_and_Verification',
  ]
  static authenticationFuncs = [
    'Guarantee',
    'Establish_Repayment_Secuity_deposit',
    'Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification',
    'Check_Compliance',
    'Compliance',
    'Approval',
    'Adopt',
    'Assign',
    'Do_not_Adopt',
    'Re_apply',
    'Do_not_Re_apply',
    'Submit_Material',
    'Reconsideration',
    'Apply_for_Reconsideration',
    'Investigate_and_Verification',
  ]
  static publicFuncs = [
    'P2P_Lending',
    'get_P2P_Lending',
    'Guarantee',
    'get_Guarantee',
    'Establish_Repayment_Secuity_deposit',
    'get_Establish_Repayment_Secuity_deposit',
    'Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification',
    'get_Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification',
    'Check_Compliance',
    'get_Check_Compliance',
    'Compliance',
    'get_Compliance',
    'Approval',
    'get_Approval',
    'Adopt',
    'get_Adopt',
    'Assign',
    'Do_not_Adopt',
    'get_Do_not_Adopt',
    'Re_apply',
    'get_Re_apply',
    'Do_not_Re_apply',
    'get_Do_not_Re_apply',
    'Submit_Material',
    'get_Submit_Material',
    'Reconsideration',
    'get_Reconsideration',
    'Apply_for_Reconsideration',
    'get_Apply_for_Reconsideration',
    'Investigate_and_Verification',
    'get_Investigate_and_Verification'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'P2P-LENDING'
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
    this._process = new Process(data)
    this._act = new Act(data)
  }
  //---------------------P2P_Lending------------------------------
  async P2P_Lending() {
    let P2P_Lending = await this._process.createProcess('P2P_LENDING')
    return P2P_Lending
  }
  get_P2P_Lending() {
    let P2P_Lending = this._process.getProcessByType('P2P_LENDING')
    return P2P_Lending
  }
  // --------------------Guarantee---------------------------
  async  Guarantee() {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let Guarantee = await this._act.createAct('GUARANTEE')
    return Guarantee
  }
  get_Guarantee() {
    return this._act.getActByType('GUARANTEE')
  }
  // --------------------Establish_Repayment_Secuity_deposit---------------------------
  check_Establish_Repayment_Secuity_deposit(address) {
    let check_Establish_Repayment_Secuity_deposit = this.get_Establish_Repayment_Secuity_depositByAddress(address)
    if (!check_Establish_Repayment_Secuity_deposit || check_Establish_Repayment_Secuity_deposit.type !== 'ESTABLISH_REPAYMENT_SECURITY_DEPOSIT') throw `ESTABLISH_REPAYMENT_SECURITY_DEPOSIT IS NOT EXIST`
    return true
  }
  get_Establish_Repayment_Secuity_depositByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Establish_Repayment_Secuity_deposit(address_Guarantee) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Guarantee = this._act.getActByAddress(address_Guarantee)
    if (!check_Guarantee || check_Guarantee.type !== 'GUARANTEE')
      throw 'GUARANTEE IS NOT EXIST'
    let Establish_Repayment_Secuity_deposit = await this._act.createAct('ESTABLISH_REPAYMENT_SECURITY_DEPOSIT')
    return Establish_Repayment_Secuity_deposit
  }
  get_Establish_Repayment_Secuity_deposit() {
    return this._act.getActByType('ESTABLISH_REPAYMENT_SECURITY_DEPOSIT')
  }
  // --------------------Check_Compliance---------------------------  
  Check_Compliance1(address) {
    this.check_Establish_Repayment_Secuity_deposit = this.get_Establish_Repayment_Secuity_depositByAddress(address);
    this.check_Sumit_Material = this.get_Sumit_MaterialByAddress(address);
    this.check_Investigate_and_Verification = this.get_Investigate_and_VerificationByAddress(address);
    if (this.check_Establish_Repayment_Secuity_deposit.type == 'ESTABLISH_REPAYMENT_SECURITY_DEPOSIT') {
      return true;
    }
    else if (this.check_Sumit_Material.type == 'SUMIT_MATERIAL') {
      return true;
    }
    else if (this.check_Investigate_and_Verification.type == 'INVESTIGATE_AND_VERIFICATION') {
      return true;
    }
    else {
      throw `ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION_FOR_CHECK IS NOT EXIST`;
    }
  }
  async  Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification() {
    this.Check_Compliance1(this.sender, 'ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION_FOR_CHECK')
    let Check_Compliance = await this._act.createAct('ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION')
    return Check_Compliance
  }
  get_Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification() {
    return this._act.getActByType('ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION')
  }
  async Check_Compliance(address_Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let Check_Compliance = this._act.getActByAddress(address_Establish_Repayment_Secuity_deposit_or_Sumit_Material_or_Investigate_and_VerificationInvestigate_and_Verification)
    if (!Check_Compliance || Check_Compliance.type !== 'ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION')
      throw 'ESTABLISH_REPAYMENT_SECURITY_DEPOSIT_OR_SUMIT_MATERIAL_OR_INVESTIGATE_AND_VERIFICATION IS NOT EXIST'
    let Check_Compliance2 = await this._act.createAct('CHECK_COMPLIANCE')
    return Check_Compliance2
  }
  get_Check_Compliance() {
    return this._act.getActByType('CHECK_COMPLIANCE')
  }
  // --------------------Compliance--------------------------- 
  async Compliance(address_Check_Compliance) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Check_Compliance3 = this._act.getActByAddress(address_Check_Compliance)
    if (!check_Check_Compliance3 || check_Check_Compliance3.type !== 'CHECK_COMPLIANCE')
      throw 'CHECK_COMPLIANCE IS NOT EXIST'
    let Compliance = await this._act.createAct('COMPLIANCE')
    return Compliance
  }
  get_Compliance() {
    return this._act.getActByType('COMPLIANCE')
  }
  // --------------------Approval--------------------------- 
  async Approval(address_Compliance) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Compliance3 = this._act.getActByAddress(address_Compliance)
    if (!check_Compliance3 || check_Compliance3.type !== 'COMPLIANCE')
      throw 'COMPLIANCE IS NOT EXIST'
    let Approval = await this._act.createAct('APPROVAL')
    return Approval
  }
  get_Approval() {
    return this._act.getActByType('APPROVAL')
  }
  // --------------------Adopt--------------------------- 
  async Adopt(address_Approval) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Approval = this._act.getActByAddress(address_Approval)
    if (!check_Approval || check_Approval.type !== 'APPROVAL')
      throw 'APPROVAL IS NOT EXIST'
    let Adopt = await this._act.createAct('ADOPT')
    return Adopt
  }
  get_Adopt() {
    return this._act.getActByType('ADOPT')
  }
  // --------------------Assign---------------------------  
  async Assign(address_Adopt) {
    this._process.checkProcess(this.sender, 'BC')
    let check_Adopt = this._act.getActByAddress(address_Adopt)
    if (!check_Adopt || check_Adopt.type !== 'ADOPT')
      throw 'ADOPT IS NOT EXIST'
    let Assign = await this._act.createAct('ASSIGN')
    return Assign
  }
  get_Assign() {
    return this._act.getActByType('ASSIGN')
  }
  // --------------------Do_not_Adopt---------------------------  
  async Do_not_Adopt(address_Approval) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Approval = this._act.getActByAddress(address_Approval)
    if (!check_Approval || check_Approval.type !== 'APPROVAL')
      throw 'APPROVAL IS NOT EXIST'
    let Do_not_Adopt = await this._act.createAct('DO_NOT_ADOPT')
    return Do_not_Adopt
  }
  get_Do_not_Adopt() {
    return this._act.getActByType('DO_NOT_ADOPT')
  }
  // --------------------Do_not_Re_apply---------------------------  
  async Do_not_Re_apply(address_Do_not_Adopt) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Do_not_Adopt = this._act.getActByAddress(address_Do_not_Adopt)
    if (!check_Do_not_Adopt || check_Do_not_Adopt.type !== 'DO_NOT_ADOPT')
      throw 'DO_NOT_ADOPT IS NOT EXIST'
    let Do_not_Re_apply = await this._act.createAct('DO_NOT_RE_APPLY')
    return Do_not_Re_apply
  }
  get_Do_not_Re_apply() {
    return this._act.getActByType('DO_NOT_RE_APPLY')
  }
  // --------------------Re_apply---------------------------  
  async Re_apply(address_Do_not_Adopt) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Do_not_Adopt = this._act.getActByAddress(address_Do_not_Adopt)
    if (!check_Do_not_Adopt || check_Do_not_Adopt.type !== 'DO_NOT_ADOPT')
      throw 'DO_NOT_ADOPT IS NOT EXIST'
    let Re_apply = await this._tax.createTax('RE_APPLY')
    return Re_apply
  }
  get_Re_apply() {
    return this._act.getActByType('RE_APPLY')
  }
  //--------------------Submit_Material---------------------------
  check_Submit_Material(address) {
    let check_Submit_Material = this.get_Submit_MaterialByAddress(address)
    if (!check_Submit_Material || check_Submit_Material.type !== 'SUBMIT_MATERIAL') throw `SUBMIT_MATERIAL IS NOT EXIST`
    return true
  }
  get_Submit_MaterialByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Submit_Material(address_Re_apply) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Re_apply = this._act.getActByAddress(address_Re_apply)
    if (!check_Re_apply || check_Re_apply.type !== 'RE_APPLY')
      throw 'RE_APPLY IS NOT EXIST'
    let Submit_Material = await this._act.createAct('SUBMIT_MATERIAL')
    return Submit_Material
  }
  get_Submit_Material() {
    return this._act.getActByType('SUBMIT_MATERIAL')
  }
  // --------------------Reconsideration---------------------------  
  async Reconsideration(address_Do_not_Adopt) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Do_not_Adopt = this._act.getActByAddress(address_Do_not_Adopt)
    if (!check_Do_not_Adopt || check_Do_not_Adopt.type !== 'DO_NOT_ADOPT')
      throw 'DO_NOT_ADOPT IS NOT EXIST'
    let Reconsideration = await this._act.createAct('RECONSIDERATION')
    return Reconsideration
  }
  get_Reconsideration() {
    return this._act.getActByType('RECONSIDERATION')
  }
  // --------------------Apply_for_Reconsideration---------------------------  
  async Apply_for_Reconsideration(address_Reconsideration) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Reconsideration = this._act.getActByAddress(address_Reconsideration)
    if (!check_Reconsideration || check_Reconsideration.type !== 'RECONSIDERATION')
      throw 'RECONSIDERATION IS NOT EXIST'
    let Apply_for_Reconsideration = await this._act.createAct('APPLY_FOR_RECONSIDERATION')
    return Apply_for_Reconsideration
  }
  get_Apply_for_Reconsideration() {
    return this._act.getActByType('APPLY_FOR_RECONSIDERATION')
  }
  // --------------------Investigate_and_Verification---------------------------  
  check_Investigate_and_Verification(address) {
    let check_Investigate_and_Verification = this.get_Investigate_and_VerificationByAddress(address)
    if (!check_Investigate_and_Verification || check_Investigate_and_Verification.type !== 'INVESTIGATE_AND_VERIFICATION') throw `INVESTIGATE_AND_VERIFICATION IS NOT EXIST`
    return true
  }
  get_Investigate_and_VerificationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Investigate_and_Verification(address_Reconsideration) {
    this._process.checkProcess(this.sender, 'P2P_LENDING')
    let check_Apply_for_Reconsideration = this._act.getActByAddress(address_Reconsideration)
    if (!check_Apply_for_Reconsideration || check_Apply_for_Reconsideration.type !== 'APPLY_FOR_RECONSIDERATION')
      throw 'APPLY_FOR_RECONSIDERATION IS NOT EXIST'
    let Investigate_and_Verification = await this._act.createAct('INVESTIGATE_AND_VERIFICATION')
    return Investigate_and_Verification
  }
  get_Investigate_and_Verification() {
    return this._act.getActByType('INVESTIGATE_AND_VERIFICATION')
  }
}
export default TokenMain;
