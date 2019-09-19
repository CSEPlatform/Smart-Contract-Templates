import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Application_received_and_scanned',
    'get_Custodian_no_01',
    'get_Custodian_yes_01',
    'get_Document_Tagging_01',
    'get_Application_cature',
    'get_Preliminary_Information',
    'get_Policy_fail_01',
    'get_Policy_pass_01',
    'get_Application_fail_01',
    'get_Application_complete_01',
    'get_Automatic_incomplete_application_letter_01',
    'get_Credit_check',
    'get_Policy_fail_02',
    'get_Policy_pass_02',
    'get_Automatic_request_for_additional_materials',
    'get_Check_Materials_request_and_scanned',
    'get_Materials_request_and_scanned',
    'get_Custodian_no_02',
    'get_Custodian_yes_02',
    'get_Document_Tagging_02',
    'get_Additional_Application_capture',
    'get_Application_complete_02',
    'get_Application_fail_02',
    'get_Automatic_incomplete_application_letter_02',
    'get_Policy_fail_03',
    'get_Policy_pass_03',
    'get_Income_Tax',
    'get_Policy_fail_04',
    'get_Policy_pass_04',
    'get_Real_Estate',
    'get_Credit_Approval_Marginal',
    'get_Credit_Approval_yes',
    'get_Credit_Approval_no',
  ]
  static authenticationFuncs = [
    'Application_received_and_scanned',
    'Custodian_no_01',
    'Custodian_yes_01',
    'Document_Tagging_01',
    'Application_cature',
    'Preliminary_Information',
    'Policy_fail_01',
    'Policy_pass_01',
    'Automatic_rejection_letter_sent_01',
    'Application_fail_01',
    'Application_complete_01',
    'Automatic_incomplete_application_letter_01',
    'Credit_check',
    'Policy_fail_02',
    'Automatic_rejection_letter_sent_02',
    'Policy_pass_02',
    'Automatic_request_for_additional_materials',
    'Check_Materials_request_and_scanned',
    'Materials_request_and_scanned',
    'Custodian_no_02',
    'Custodian_yes_02',
    'Document_Tagging_02',
    'Additional_Application_capture',
    'Application_complete_02',
    'Application_fail_02',
    'Automatic_incomplete_application_letter_02',
    'Policy_fail_03',
    'Automatic_rejection_letter_sent_03',
    'Policy_pass_03',
    'Income_Tax',
    'Policy_fail_04',
    'Policy_pass_04',
    'Automatic_rejection_letter_sent_04',
    'Real_Estate',
    'Credit_Approval_Marginal',
    'Router_to_credit_expert_for_negotiation',
    'Credit_Approval_yes',
    'Automatic_Approval_letter_sent',
    'Credit_Approval_no',
    'Automatic_rejection_letter_sent_05'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Application_received_and_scanned',
    'get_Application_received_and_scand',
    'Custodian_no_01',
    'get_Custodian_no_01',
    'Custodian_yes_01',
    'get_Custodian_yes_01',
    'Document_Tagging_01',
    'get_Document_Tagging_01',
    'Application_cature',
    'get_Application_cature',
    'Preliminary_Information',
    'get_Preliminary_Information',
    'Policy_fail_01',
    'get_Policy_fail_01',
    'Policy_pass_01',
    'get_Policy_pass_01',
    'Automatic_rejection_letter_sent_01',
    'Application_fail_01',
    'get_Application_fail_01',
    'Application_complete_01',
    'get_Application_complete_01',
    'Automatic_incomplete_application_letter_01',
    'get_Automatic_incomplete_application_letter_01',
    'Credit_check',
    'get_Credit_check',
    'Policy_fail_02',
    'get_Policy_fail_02',
    'Automatic_rejection_letter_sent_02',
    'Policy_pass_02',
    'get_Policy_pass_02',
    'Automatic_request_for_additional_materials',
    'get_Automatic_request_for_additional_materials',
    'Check_Materials_request_and_scanned',
    'get_Check_Materials_request_and_scanned',
    'Materials_request_and_scanned',
    'get_Materials_request_and_scanned',
    'Custodian_no_02',
    'get_Custodian_no_02',
    'Custodian_yes_02',
    'get_Custodian_yes_02',
    'Document_Tagging_02',
    'get_Document_Tagging_02',
    'Additional_Application_capture',
    'get_Additional_Application_capture',
    'Application_complete_02',
    'get_Application_complete_02',
    'Application_fail_02',
    'get_Application_fail_02',
    'Automatic_incomplete_application_letter_02',
    'get_Automatic_incomplete_application_letter_02',
    'Policy_fail_03',
    'get_Policy_fail_03',
    'Automatic_rejection_letter_sent_03',
    'Policy_pass_03',
    'get_Policy_pass_03',
    'Income_Tax',
    'get_Income_Tax',
    'Policy_fail_04',
    'get_Policy_fail_04',
    'Automatic_rejection_letter_sent_04',
    'Policy_pass_04',
    'get_Policy_pass_04',
    'Real_Estate',
    'get_Real_Estate',
    'Credit_Approval_Marginal',
    'get_Credit_Approval_Marginal',
    'Router_to_credit_expert_for_negotiation',
    'Credit_Approval_yes',
    'get_Credit_Approval_yes',
    'Automatic_Approval_letter_sent',
    'Credit_Approval_no',
    'get_Credit_Approval_no',
    'Automatic_rejection_letter_sent_05'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'HOME-LOAN_MORTGAGE'
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
    this._user = new User(data)
    this._act = new Act(data)
  }

  //---------------------User------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  get_USer() {
    let Iot_Device = this._user.getUserByType('IOT_DEVICE')
    return Iot_Device
  }
  // --------------------Application_received_and_scanned---------------------------
  checkAct(address) {
    this.check_Automatic_incomplete_application_letter_01 = this.get_Automatic_incomplete_application_letter_01ByAddress(address);
    this._user.checkUser = this._user.getUserByAddress(address);
    this.check_Custodian_no_01 = this.get_Custodian_no_01ByAddress(address);
    if (this.check_Automatic_incomplete_application_letter_01.type == 'AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01') {
      return true;
    }
    else if (this._user.checkUser.type == 'USER') {
      return true;
    }
    else if (this.check_Custodian_no_01.type == 'CUSTODIAN_NO_01') {
      return true;
    }
    else {
      throw `USER_AND_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01_OR_CUSTODIAN_NO_01 NOT EXIST`;
    }
  }
  async  Application_received_and_scanned() {
    this.checkAct(this.sender, 'USER_AND_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01_OR_CUSTODIAN_NO_01')
    let Application_received_and_scanned = await this._act.createAct('APPLICATION_RECEIVED_AND_SCANNED')
    return Application_received_and_scanned
  }
  get_Application_received_and_scanned() {
    return this._act.getActByType('APPLICATION_RECEIVED_AND_SCANNED')
  }
  // --------------------Custodian_yes_01---------------------------
  async Custodian_yes_01(address_Application_received_and_scanned) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_received_and_scanned = this._act.getActByAddress(address_Application_received_and_scanned)
    if (!check_Application_received_and_scanned || check_Application_received_and_scanned.type !== 'APPLICATION_RECEIVED_AND_SCANNED')
      throw 'APPLICATION_RECEIVED_AND_SCANNED IS NOT EXIST'
    let Custodian_yes_01 = await this._act.createAct('CUSTODIAN_YES_01')
    return Custodian_yes_01
  }
   get_Custodian_yes_01() {
    return this._act.getActByType('CUSTODIAN_YES_01')
  }
  // --------------------Custodian_no_01---------------------------
  check_Custodian_no_01(address) {
    let check_Custodian_no_01 = this.get_ACustodian_no_01ByAddress(address)
    if (!check_Custodian_no_01 || check_Custodian_no_01.type !== 'CUSTODIAN_NO_01') throw `CUSTODIAN_NO_01 IS NOT EXIST`
    return true
  }
  get_ACustodian_no_01ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Custodian_no_01(address_Application_received_and_scanned) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_received_and_scanned = this._act.getActByAddress(address_Application_received_and_scanned)
    if (!check_Application_received_and_scanned || check_Application_received_and_scanned.type !== 'APPLICATION_RECEIVED_AND_SCANNED')
      throw 'APPLICATION_RECEIVED_AND_SCANNED IS NOT EXIST'
    let Custodian_no_01 = await this._act.createAct('CUSTODIAN_NO_01')
    return Custodian_no_01
  }
  get_Custodian_no_01() {
    return this._act.getActByType('CUSTODIAN_NO_01')
  }
  // --------------------Document_Tagging_01---------------------------
  async Document_Tagging_01(address_check_Custodian_yes_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Custodian_yes_01 = this._act.getActByAddress(address_check_Custodian_yes_01)
    if (!check_Custodian_yes_01 || check_Custodian_yes_01.type !== 'CUSTODIAN_YES_01')
      throw 'CUSTODIAN_YES_01 IS NOT EXIST'
    let Document_Tagging_01 = await this._act.createAct('DOCUMENT_TAGGING_01')
    return Document_Tagging_01
  }
  get_Document_Tagging_01() {
    return this._act.getActByType('DOCUMENT_TAGGING_01')
  }
  // --------------------Application_capture---------------------------
  async Application_cature(address_Document_Tagging_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Document_Tagging_01 = this._act.getActByAddress(address_Document_Tagging_01)
    if (!check_Document_Tagging_01 || check_Document_Tagging_01.type !== 'DOCUMENT_TAGGING_01')
      throw 'DOCUMENT_TAGGING_01 IS NOT EXIST'
    let Application_cature = await this._act.createAct('APPLICATION_CAPTURE')
    return Application_cature
  }
  get_Application_cature() {
    return this._act.getActByType('APPLICATION_CAPTURE')
  }
  // --------------------Preliminary_Information---------------------------
  async Preliminary_Information(address_Application_cature) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_cature = this._act.getActByAddress(address_Application_cature)
    if (!check_Application_cature || check_Application_cature.type !== 'APPLICATION_CAPTURE')
      throw 'APPLICATION_CAPTURE IS NOT EXIST'
    let Preliminary_Information = await this._act.createAct('PRELIMINARY_INFORMATION')
    return Preliminary_Information
 }
  get_Preliminary_Information() {
    return this._act.getActByType('PRELIMINARY_INFORMATION')
  }
  // --------------------Policy_fail_01---------------------------
  async Policy_fail_01(address_Preliminary_Information) {
    this._user.checkUser(this.sender, 'USER')
    let check_Preliminary_Information = this._act.getActByAddress(address_Preliminary_Information)
    if (!check_Preliminary_Information || check_Preliminary_Information.type !== 'PRELIMINARY_INFORMATION')
      throw 'PRELIMINARY_INFORMATION IS NOT EXIST'
    let Policy_fail_01 = await this._act.createAct('POLICY_FAIL_01')
    return Policy_fail_01
  }
  get_Policy_fail_01() {
    return this._act.getActByType('POLICY_FAIL_01')
  }
  // --------------------Automatic_rejection_letter_sent_01---------------------------
  async Automatic_rejection_letter_sent_01(address_Policy_fail_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_fail_01 = this._act.getActByAddress(address_Policy_fail_01)
    if (!check_Policy_fail_01 || check_Policy_fail_01.type !== 'POLICY_FAIL_01')
      throw 'POLICY_FAIL_01 IS NOT EXIST'
      this.setToAddress(address_Policy_fail_01)
      return 'AUTOMATIC_REJECTION_LETTER_SENT_01'
  }
  // --------------------Policy_pass_01---------------------------
  async Policy_pass_01(address_Preliminary_Information) {
    this._user.checkUser(this.sender, 'USER')
    let check_Preliminary_Information = this._act.getActByAddress(address_Preliminary_Information)
    if (!check_Preliminary_Information || check_Preliminary_Information.type !== 'PRELIMINARY_INFORMATION')
      throw 'PRELIMINARY_INFORMATION IS NOT EXIST'
    let Policy_pass_01 = await this._act.createAct('POLICY_PASS_01')
    return Policy_pass_01
  }
 get_Policy_pass_01() {
    return this._act.getActByType('POLICY_PASS_01')
  }
  // --------------------Application_fail_01---------------------------
  async Application_fail_01(address_Policy_pass_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_pass_01 = this._act.getActByAddress(address_Policy_pass_01)
    if (!check_Policy_pass_01 || check_Policy_pass_01.type !== 'POLICY_PASS_01')
      throw 'POLICY_PASS_01 IS NOT EXIST'
    let Application_fail_01 = await this._act.createAct('APPLICATION_FAIL_01')
    return Application_fail_01
  }
  get_Application_fail_01() {
    return this._act.getActByType('APPLICATION_FAIL_01')
  }
  // --------------------Automatic_incomplete_application_letter_01---------------------------
  check_Automatic_incomplete_application_letter_01(address) {
    let check_Automatic_incomplete_application_letter_01 = this.get_Automatic_incomplete_application_letter_01ByAddress(address)
    if (!check_Automatic_incomplete_application_letter_01 || check_Automatic_incomplete_application_letter_01.type !== 'AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01') throw `AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01 IS NOT EXIST`
    return true
  }
  get_Automatic_incomplete_application_letter_01ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Automatic_incomplete_application_letter_01(address_Application_fail_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_fail_01 = this._act.getActByAddress(address_Application_fail_01)
    if (!check_Application_fail_01 || check_Application_fail_01.type !== 'APPLICATION_FAIL_01')
      throw 'APPLICATION_FAIL_01 IS NOT EXIST'
    let Automatic_incomplete_application_letter_01 = await this._act.createAct('AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01')
    return Automatic_incomplete_application_letter_01
  }
 get_Automatic_incomplete_application_letter_01() {
    return this._act.getActByType('AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_01')
  }
  // --------------------Application_complete_01---------------------------
  async Application_complete_01(address_Policy_pass_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_pass_01 = this._act.getActByAddress(address_Policy_pass_01)
    if (!check_Policy_pass_01 || check_Policy_pass_01.type !== 'POLICY_PASS_01')
      throw 'POLICY_PASS_01 IS NOT EXIST'
    let Application_complete_01 = await this._act.createAct('APPLICATION_COMPLETE_01')
    return Application_complete_01
  }
  get_Application_complete_01() {
    return this._act.getActByType('APPLICATION_COMPLETE_01')
  }
  // --------------------Credit_check---------------------------
  async Credit_check(address_Application_complete_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_complete_01 = this._act.getActByAddress(address_Application_complete_01)
    if (!check_Application_complete_01 || check_Application_complete_01.type !== 'APPLICATION_COMPLETE_01')
      throw 'APPLICATION_COMPLETE_01 IS NOT EXIST'
    let Credit_check = await this._act.createAct('CREDIT_CHECK')
    return Credit_check
  }
  get_Credit_check() {
    return this._act.getActByType('CREDIT_CHECK')
  }
  // --------------------Policy_fail_02---------------------------
  async Policy_fail_02(address_Credit_check) {
    this._user.checkUser(this.sender, 'USER')
    let check_Credit_check = this._act.getActByAddress(address_Credit_check)
    if (!check_Credit_check || check_Credit_check.type !== 'CREDIT_CHECK')
      throw 'CREDIT_CHECK IS NOT EXIST'
    let Policy_fail_02 = await this._act.createAct('POLICY_FAIL_02')
    return Policy_fail_02
  }
  get_Policy_fail_02() {
    return this._act.getActByType('POLICY_FAIL_02')
  } // --------------------Automatic_rejection_letter_sent_02---------------------------
  async Automatic_rejection_letter_sent_02(address_Policy_fail_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_fail_02 = this._act.getActByAddress(address_Policy_fail_02)
    if (!check_Policy_fail_02 || check_Policy_fail_02.type !== 'POLICY_FAIL_02')
      throw 'POLICY_FAIL_02 IS NOT EXIST'
      this.setToAddress(address_Policy_fail_02)
    return 'END'
  }
  get_Automatic_rejection_letter_sent_02() {
    return this._act.getActByType('AUTOMATIC_REJECTION_LETTER_SENT_02')
  }
  // --------------------Policy_pass_02---------------------------
  async Policy_pass_02(address_Credit_check) {
    this._user.checkUser(this.sender, 'USER')
    let check_Credit_check = this._act.getActByAddress(address_Credit_check)
    if (!check_Credit_check || check_Credit_check.type !== 'CREDIT_CHECK')
      throw 'CREDIT_CHECK IS NOT EXIST'
    let Policy_pass_02 = await this._act.createAct('POLICY_PASS_02')
    return Policy_pass_02
  }
  get_Policy_pass_02() {
    return this._act.getActByType('POLICY_PASS_02')
  }
  // --------------------Automatic_request_for_additional_materials---------------------------
  check_Automatic_request_for_additional_materials(address) {
    let check_Automatic_request_for_additional_materials = this.get_Automatic_request_for_additional_materialsByAddress(address)
    if (!check_Automatic_request_for_additional_materials || check_Automatic_request_for_additional_materials.type !== 'AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS') throw `AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS IS NOT EXIST`
    return true
  }
  get_Automatic_request_for_additional_materialsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Automatic_request_for_additional_materials(address_Policy_pass_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_pass_02 = this._act.getActByAddress(address_Policy_pass_02)
    if (!check_Policy_pass_02 || check_Policy_pass_02.type !== 'POLICY_PASS_02')
      throw 'POLICY_PASS_02 IS NOT EXIST'
    let Automatic_request_for_additional_materials = await this._act.createAct('AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS')
    return Automatic_request_for_additional_materials
 }
  get_Automatic_request_for_additional_materials() {
    return this._act.getActByType('AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS')
  }
  // --------------------Materials_request_and_scanned--------------------------- 
  checkAct2(address) {
    this.check_Custodian_no_02 = this.get_Acustodian_02ByAddress(address);
    this.check_Automatic_request_for_additional_materials = this.getAutomatic_request_for_additional_materialsByAddress(address);
    this.check_Automatic_incomplete_application_letter_02 = this.get_CAutomatic_incomplete_application_letter_02ByAddress(address);

    if (this.check_Custodian_no_02.type == 'CUSTODIAN_NO_02') {
      return true;
    }
    else if (this.check_Automatic_request_for_additional_materials.type == 'AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS') {
      return true;
    }
    else if (this.check_Automatic_incomplete_application_letter_02.type == 'AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02') {
      return true;
    }
    else {
      throw `CUSTODIAN_NO_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02_FOR_CHECK NOT EXIST`;
    }
  }
  async  Check_Materials_request_and_scanned() {
    this.checkAct(this.sender, 'CUSTODIAN_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02_FOR_CHECK')
    let Checkact2 = await this._act.createAct('CUSTODIAN_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02')
    return Checkact2
  }
  get_Check_Materials_request_and_scanned() {
    return this._act.getActByType('CUSTODIAN_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02')
  }
  async Materials_request_and_scanned(address_Check_Materials_request_and_scanned) {
    this._user.checkUser(this.sender, 'USER')
    let check_Checkact2 = this._act.getActByAddress(address_Check_Materials_request_and_scanned)
    if (!check_Checkact2 || check_Checkact2.type !== 'CUSTODIAN_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02')
      throw 'CUSTODIAN_02_OR_AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS_OR_AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02 IS NOT EXIST'
    let Materials_request_and_scanned = await this._act.createAct('MATERIALS_REQUEST_AND_SCANNED')
    return Materials_request_and_scanned
  }
  get_Materials_request_and_scand() {
    return this._act.getActByType('MATERIALS_REQUEST_AND_SCANNED')
  }
  // --------------------custodian_no_02---------------------------
  check_Custodian_no_02(address) {
    let check_Custodian_no_02 = this.get_Custodian_no_02ByAddress(address)
    if (!check_Custodian_no_02 || check_Custodian_no_02.type !== 'CUSTODIAN_NO_02') throw `CUSTODIAN_NO_02 IS NOT EXIST`
    return true
  }
  get_Custodian_no_02ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async custodian_no_02(address_Materials_request_and_scanned) {
    this._user.checkUser(this.sender, 'USER')
    let check_Materials_request_and_scanned = this._act.getActByAddress(address_Materials_request_and_scanned)
    if (!check_Materials_request_and_scanned || check_Materials_request_and_scanned.type !== 'MATERIALS_REQUEST_AND_SCANNED')
      throw 'MATERIALS_REQUEST_AND_SCANNED IS NOT EXIST'
    let custodian_no_02 = await this._act.createAct('CUSTODIAN_NO_02')
    return custodian_no_02
 }
   get_custodian_no_02() {
    return this._act.getActByType('CUSTODIAN_NO_02')
  }
  // --------------------custodian_yes_02---------------------------
  async custodian_yes_02(address_Materials_request_and_scanned) {
    this._user.checkUser(this.sender, 'USER')
    let check_Materials_request_and_scanned = this._act.getActByAddress(address_Materials_request_and_scanned)
    if (!check_Materials_request_and_scanned || check_Materials_request_and_scanned.type !== 'MATERIALS_REQUEST_AND_SCANNED')
      throw 'MATERIALS_REQUEST_AND_SCANNED IS NOT EXIST'
    let custodian_yes_02 = await this._act.createAct('CUSTODIAN_YES_02')
    return custodian_yes_02
 }
 get_custodian_yes_02() {
    return this._act.getActByType('CUSTODIAN_YES_02')
  }
  // --------------------Document_Tagging_02---------------------------
  async Document_Tagging_02(address_custodian_yes_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_custodian_yes_02 = this._act.getActByAddress(address_custodian_yes_02)
    if (!check_custodian_yes_02 || check_custodian_yes_02.type !== 'CUSTODIAN_YES_02')
      throw 'CUSTODIAN_YES_02 IS NOT EXIST'
    let Document_Tagging_02 = await this._act.createAct('DOCUMENT_TAGGING_02')
    return Document_Tagging_02
 }
   get_Document_Tagging_02() {
    return this._act.getActByType('DOCUMENT_TAGGING_02')
  }
  // --------------------Additional_Application_capture---------------------------
  async Additional_Application_capture(address_Document_Tagging_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Document_Tagging_02 = this._act.getActByAddress(address_Document_Tagging_02)
    if (!check_Document_Tagging_02 || check_Document_Tagging_02.type !== 'DOCUMENT_TAGGING_02')
      throw 'DOCUMENT_TAGGING_02 IS NOT EXIST'
    let Additional_Application_capture = await this._act.createAct('ADDITIONAL_APPLICATION_CAPTURE')
    return Additional_Application_capture
 }
  get_Additional_Application_capture() {
    return this._act.getActByType('ADDITIONAL_APPLICATION_CAPTURE')
  }
  // --------------------Application_fail_02---------------------------
  async Application_fail_02(address_Additional_Application_capture) {
    this._user.checkUser(this.sender, 'USER')
    let check_Additional_Application_capture = this._act.getActByAddress(address_Additional_Application_capture)
    if (!check_Additional_Application_capture || check_Additional_Application_capture.type !== 'ADDITIONAL_APPLICATION_CAPTURE')
      throw 'ADDITIONAL_APPLICATION_CAPTURE IS NOT EXIST'
    let Application_fail_02 = await this._act.createAct('APPLICATION_FAIL_02')
    return Application_fail_02
 }
   get_Application_fail_02() {
    return this._act.getActByType('APPLICATION_FAIL_02')
  }
  // --------------------Automatic_incomplete_application_letter_02---------------------------
  check_Automatic_incomplete_application_letter_02(address) {
    let check_Automatic_incomplete_application_letter_02 = this.get_Automatic_incomplete_application_letter_02ByAddress(address)
    if (!check_Automatic_incomplete_application_letter_02 || check_Automatic_incomplete_application_letter_02.type !== 'AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02') throw `AUTOMATIC_REQUEST_FOR_ADDITIONAL_MATERIALS IS NOT EXIST`
    return true
  }
  get_Automatic_incomplete_application_letter_02ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Automatic_incomplete_application_letter_02(address_Application_fail_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_fail_02 = this._act.getActByAddress(address_Application_fail_02)
    if (!check_Application_fail_02 || check_Application_fail_02.type !== 'APPLICATION_FAIL_02')
      throw 'APPLICATION_FAIL_02 IS NOT EXIST'
    let Automatic_incomplete_application_letter_02 = await this._act.createAct('AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02')
    return Automatic_incomplete_application_letter_02
 }
  get_Automatic_incomplete_application_letter_02() {
    return this._act.getActByType('AUTOMATIC_INCOMPLETE_APPLICATION_LETTER_02')
  }
  // --------------------Application_complete_02---------------------------
  async Application_complete_02(address_Additional_Application_capture) {
    this._user.checkUser(this.sender, 'USER')
    let check_Additional_Application_capture = this._act.getActByAddress(address_Additional_Application_capture)
    if (!check_Additional_Application_capture || check_Additional_Application_capture.type !== 'ADDITIONAL_APPLICATION_CAPTURE')
      throw 'ADDITIONAL_APPLICATION_CAPTURE IS NOT EXIST'
    let Application_complete_02 = await this._act.createAct('APPLICATION_COMPLETE_02')
    return Application_complete_02
 }
  get_Application_complete_02() {
    return this._act.getActByType('APPLICATION_COMPLETE_02')
  }
  // --------------------Policy_fail_03---------------------------
  async Policy_fail_03(address_Application_pass_02) {
    this._user.checkUser(this.sender, 'USER')
    let Application_complete_02 = this._act.getActByAddress(address_Application_pass_02)
    if (!Application_complete_02 || check_Application_pass_02.type !== 'APPLICATION_COMPLETE_02')
      throw 'APPLICATION_COMPLETE_02 IS NOT EXIST'
    let Policy_fail_03 = await this._act.createAct('POLICY_FAIL_03')
    return Policy_fail_03
 }
 get_Policy_fail_03() {
    return this._act.getActByType('POLICY_FAIL_03')
  }
  // --------------------Automatic_rejection_letter_sent_03---------------------------
  async Automatic_rejection_letter_sent_03(address_Policy_fail_03) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_fail_03 = this._act.getActByAddress(address_Policy_fail_03)
    if (!check_Policy_fail_03 || check_Policy_fail_03.type !== 'POLICY_FAIL_03')
      throw 'POLICY_FAIL_03 IS NOT EXIST'
    let Automatic_rejection_letter_sent_03 = await this._act.createAct('AUTOMATIC_REJECTION_LETTER_SENT_03')
    return Automatic_rejection_letter_sent_03
 }
  // --------------------Policy_pass_03---------------------------
  async Policy_pass_03(address_Application_pass_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Application_pass_02 = this._act.getActByAddress(address_Application_pass_02)
    if (!check_Application_pass_02 || check_Application_pass_02.type !== 'APPLICATION_PASS_02')
      throw 'APPLICATION_PASS_02 IS NOT EXIST'
    let Policy_pass_03 = await this._act.createAct('POLICY_PASS_03')
    return Policy_pass_03
 }
 get_Policy_pass_03() {
    return this._act.getActByType('POLICY_PASS_03')
  }
  // --------------------Income_Tax---------------------------
  async Income_Tax(address_Policy_pass_03) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_pass_03 = this._act.getActByAddress(address_Policy_pass_03)
    if (!check_Policy_pass_03 || check_Policy_pass_03.type !== 'POLICY_PASS_03')
      throw 'POLICY_PASS_03 IS NOT EXIST'
    let Income_Tax = await this._act.createAct('INCOME_TAX')
    return Income_Tax
 }
  get_Income_Tax() {
    return this._act.getActByType('INCOME_TAX')
  }
  // --------------------Policy_fail_04---------------------------
  async Policy_fail_04(address_Income_Tax) {
    this._user.checkUser(this.sender, 'USER')
    let check_Income_Tax = this._act.getActByAddress(address_Income_Tax)
    if (!check_Income_Tax || check_Income_Tax.type !== 'INCOME_TAX')
      throw 'INCOME_TAX IS NOT EXIST'
    let Policy_fail_04 = await this._act.createAct('POLICY_FAIL_04')
    return Policy_fail_04
 }
 get_Policy_fail_04() {
    return this._act.getActByType('POLICY_FAIL_04')
  }
  // --------------------Automatic_rejection_letter_sent_04---------------------------
  async Automatic_rejection_letter_sent_04(address_Policy_fail_04) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_fail_04 = this._act.getActByAddress(address_Policy_fail_04)
    if (!check_Policy_fail_04 || check_Policy_fail_04.type !== 'POLICY_FAIL_04')
      throw 'POLICY_FAIL_04 IS NOT EXIST'
      let Automatic_rejection_letter_sent_04 = await this._act.createAct('AUTOMATIC_REJECTION_LETTER_SENT_04')
      this.setToAddress(Automatic_rejection_letter_sent_04.address)
      return {Automatic_rejection_letter_sent_04}
 }
  // --------------------Policy_pass_04---------------------------
  async Policy_pass_04(address_Income_Tax) {
    this._user.checkUser(this.sender, 'USER')
    let check_Income_Tax = this._act.getActByAddress(address_Income_Tax)
    if (!check_Income_Tax || check_Income_Tax.type !== 'INCOME_TAX')
      throw 'INCOME_TAX IS NOT EXIST'
    let Policy_pass_04 = await this._act.createAct('POLICY_PASS_04')
    return Policy_pass_04
 }
  get_Policy_pass_04() {
    return this._act.getActByType('POLICY_PASS_04')
  }
  // --------------------Real_Estate---------------------------
  async Real_Estate(address_Policy_pass_04) {
    this._user.checkUser(this.sender, 'USER')
    let check_Policy_pass_04 = this._act.getActByAddress(address_Policy_pass_04)
    if (!check_Policy_pass_04 || check_Policy_pass_04.type !== 'POLICY_PASS_04')
      throw 'POLICY_PASS_04 IS NOT EXIST'
    let Real_Estate = await this._act.createAct('REAL_ESTATE')
    return Real_Estate
 }
  get_Real_Estate() {
    return this._act.getActByType('REAL_ESTATE')
  }
  // --------------------Credit_Approval_Marginal---------------------------
  async Credit_Approval_Marginal(address_Real_Estate) {
    this._user.checkUser(this.sender, 'USER')
    let check_Real_Estate = this._act.getActByAddress(address_Real_Estate)
    if (!check_Real_Estate || check_Real_Estate.type !== 'REAL_ESTATE')
      throw 'REAL_ESTATE IS NOT EXIST'
    let Credit_Approval_Marginal = await this._act.createAct('CREDIT_APPROVAL_MARGINAL')
    return Credit_Approval_Marginal
 }
 get_Credit_Approval_Marginal() {
    return this._act.getActByType('CREDIT_APPROVAL_MARGINAL')
  }
  // --------------------Router_to_credit_expert_for_negotiation---------------------------
  async Router_to_credit_expert_for_negotiation(address_Credit_Approval_Marginal) {
    this._user.checkUser(this.sender, 'USER')
    let check_Credit_Approval_Marginal = this._act.getActByAddress(address_Credit_Approval_Marginal)
    if (!check_Credit_Approval_Marginal || check_Credit_Approval_Marginal.type !== 'CREDIT_APPROVAL_MARGINAL')
      throw 'CREDIT_APPROVAL_MARGINAL IS NOT EXIST'
    let Router_to_credit_expert_for_negotiation = await this._act.createAct('ROUTER_TO_CREDIT_EXPERT_FOR_NEGOTIATION')
    this.setToAddress(Router_to_credit_expert_for_negotiation.address)
    return { Router_to_credit_expert_for_negotiation }
  }
 // --------------------Credit_Approval_yes---------------------------
 async Credit_Approval_yes(address_Real_Estate) {
  this._user.checkUser(this.sender, 'USER')
  let check_Real_Estate = this._act.getActByAddress(address_Real_Estate)
  if (!check_Real_Estate || check_Real_Estate.type !== 'REAL_ESTATE')
    throw 'REAL_ESTATE IS NOT EXIST'
  let Credit_Approval_yes = await this._act.createAct('CREDIT_APPROVAL_YES')
  return Credit_Approval_yes
}
  get_Credit_Approval_yes() {
    return this._act.getActByType('CREDIT_APPROVAL_YES')
  }
  // --------------------Automatic_Approval_letter_sent---------------------------
  async Automatic_Approval_letter_sent(address_Credit_Approval_yes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Credit_Approval_yes = this._act.getActByAddress(address_Credit_Approval_yes)
    if (!check_Credit_Approval_yes || check_Credit_Approval_yes.type !== 'CREDIT_APPROVAL_YES')
      throw 'CREDIT_APPROVAL_YES IS NOT EXIST'
    let Automatic_Approval_letter_sent = await this._act.createAct('AUTOMATIC_APPROVAL_LETTER_SENT')
    this.setToAddress(Automatic_Approval_letter_sent.address)
    return { Automatic_Approval_letter_sent }
  }
  // --------------------Credit_Approval_No-----------------------------
  async Credit_Approval_no(address_Real_Estate) {
    this._user.checkUser(this.sender, 'USER')
    let check_Real_Estate = this._act.getActByAddress(address_Real_Estate)
    if (!check_Real_Estate || check_Real_Estate.type !== 'REAL_ESTATE')
      throw 'REAL_ESTATE IS NOT EXIST'
    let Credit_Approval_no = await this._act.createAct('CREDIT_APPROVAL_NO')
    return Credit_Approval_no
  }
 get_Credit_Approval_no() {
    return this._act.getActByType('CREDIT_APPROVAL_NO')
  }
  // --------------------Automatic_rejection_letter_sent_05---------------------------
  async Automatic_rejection_letter_sent_05(address_Credit_Approval_no) {
    this._user.checkUser(this.sender, 'USER')
    let check_Credit_Approval_no = this._act.getActByAddress(address_Credit_Approval_no)
    if (!check_Credit_Approval_no || check_Credit_Approval_no.type !== 'CREDIT_APPROVAL_NO')
      throw 'CREDIT_APPROVAL_NO IS NOT EXIST'
    let Automatic_rejection_letter_sent_05 = await this._act.createAct('AUTOMATIC_REJECTION_LETTER_SENT_05')
    this.setToAddress(Automatic_rejection_letter_sent_05.address)
    return { Automatic_rejection_letter_sent_05 }
  }
 }
export default TokenMain;
