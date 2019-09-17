import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Your_governing_document_have_the_power_to_make_changes',
    'get_Your_governing_document_have_no_the_power_to_make_changes',
    'get_Need_our_consent',
    'get_Apply_to_us_for_consent_to_make_changes',
    'get_Consent_not_given',
    'get_Consent_given',
    'get_Make_changes_in_line_with_governing_documents_and_OSCR_consent',
    'get_Make_changes_in_line_with_governing_document',
    'get_Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document',
  ]
  static authenticationFuncs = [
    'Your_governing_document_have_the_power_to_make_changes',
    'Your_governing_document_have_no_the_power_to_make_changes',
    'Need_our_consent',
    'Need_to_reorganise',
    'Apply_to_us_for_consent_to_make_changes',
    'Consent_not_given',
    'Do_not_make_any_changes',
    'Consent_given',
    'Make_changes_in_line_with_governing_documents_and_OSCR_consent',
    'Do_not_need_our_consent',
    'Make_changes_in_line_with_governing_document',
    'Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document',
    'Notify_within_3_months'
  ]
  static publicFuncs = [
    'User',
    'Your_governing_document_have_no_the_power_to_make_changes',
    'get_Your_governing_document_have_no_the_power_to_make_changes',
    'Need_to_reorganise',
    'Your_governing_document_have_the_power_to_make_changes',
    'get_Your_governing_document_have_the_power_to_make_changes',
    'Need_our_consent',
    'get_Need_our_consent',
    'Apply_to_us_for_consent_to_make_changes',
    'get_Apply_to_us_for_consent_to_make_changes',
    'Consent_not_given',
    'get_Consent_not_given',
    'Do_not_make_any_changes',
    'Consent_given',
    'Make_changes_in_line_with_governing_documents_and_OSCR_consent',
    'get_Make_changes_in_line_with_governing_documents_and_OSCR_consent',
    'Do_not_need_our_consent',
    'get_Do_not_need_our_consent',
    'Make_changes_in_line_with_governing_document',
    'get_Make_changes_in_line_with_governing_document',
    'Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document',
    'get_Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document',
    'Notify_within_3_months'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CHARITY-TRUSTEE-DUTIES'
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
  get_User() {
    let user = this._user.getUserByType('USER')
    return user
  }
  // --------------------Your_governing_document_have_the_power_to_make_changes---------------------------
  async  Your_governing_document_have_the_power_to_make_changes() {
    this._user.checkUser(this.sender, 'USER')
    let have = await this._act.createAct('YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES')
    return have
  }
  get_Your_governing_document_have_the_power_to_make_changes() {
    return this._act.getActByType('YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES')
  }
  // --------------------Your_governing_document_have_no_the_power_to_make_changes---------------------------
  async  Your_governing_document_have_no_the_power_to_make_changes() {
    this._user.checkUser(this.sender, 'USER')
    let have = await this._act.createAct('YOUR_GOVERNING_DOCUMENT_HAVE_NO_THE_POWER_TO_MAKE_CHANGES')
    return have
  }
  get_Your_governing_document_have_no_the_power_to_make_changes() {
    return this._act.getActByType('YOUR_GOVERNING_DOCUMENT_HAVE_NO_THE_POWER_TO_MAKE_CHANGES')
  }
  // --------------------Need_to_reorganise---------------------------
  async Need_to_reorganise(address_Your_governing_document_have_no_the_power_to_make_changes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Your_governing_document_have_no_the_power_to_make_changes = this._act.getActByAddress(address_Your_governing_document_have_no_the_power_to_make_changes)
    if (!check_Your_governing_document_have_no_the_power_to_make_changes || check_Your_governing_document_have_no_the_power_to_make_changes.type !== 'YOUR_GOVERNING_DOCUMENT_HAVE_NO_THE_POWER_TO_MAKE_CHANGES')
      throw 'YOUR_GOVERNING_DOCUMENT_HAVE_NO_THE_POWER_TO_MAKE_CHANGES IS NOT EXIST'
    let Need_to_reorganise = await this._act.createAct('NEED_TO_REORGANISE')
    return Need_to_reorganise
  }
  get_Need_to_reorganise() {
    return this._act.getActByType('NEED_TO_REORGANISE')
  }
  // --------------------Need_our_consent---------------------------
  check_Need_our_consent(address) {
    let check_Need_our_consent = this.get_Need_our_consentByAddress(address)
    if (!check_Need_our_consent || check_Need_our_consent.type !== 'NEED_OUR_CONSENT') throw `NEED_OUR_CONSENT IS NOT EXIST`
    return true
  }
  get_Need_our_consentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Need_our_consent(address_Your_governing_document_have_the_power_to_make_changes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Your_governing_document_have_the_power_to_make_changes = this._act.getActByAddress(address_Your_governing_document_have_the_power_to_make_changes)
    if (!check_Your_governing_document_have_the_power_to_make_changes || check_Your_governing_document_have_the_power_to_make_changes.type !== 'YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES')
      throw 'YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES IS NOT EXIST'
    let Need_our_consent = await this._act.createAct('NEED_OUR_CONSENT')
    return Need_our_consent
  }
  get_Need_our_consent() {
    return this._act.getActByType('NEED_OUR_CONSENT')
  }
  // --------------------Apply_to_us_for_consent_to_make_changes---------------------------  
  async Apply_to_us_for_consent_to_make_changes(address_Need_our_consent) {
    this._user.checkUser(this.sender, 'USER')
    let Check_Need_our_consent = this._act.getActByAddress(address_Need_our_consent)
    if (!Check_Need_our_consent || Check_Need_our_consent.type !== 'NEED_OUR_CONSENT')
      throw 'NEED_OUR_CONSENT IS NOT EXIST'
    let Apply_to_us_for_consent_to_make_changes = await this._act.createAct('APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES')
    return Apply_to_us_for_consent_to_make_changes
  }
  get_Apply_to_us_for_consent_to_make_changes() {
    return this._act.getActByType('APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES')
  }
  // --------------------Consent_not_given--------------------------- 
  async Consent_not_given(address_Apply_to_us_for_consent_to_make_changes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Apply_to_us_for_consent_to_make_changes = this._act.getActByAddress(address_Apply_to_us_for_consent_to_make_changes)
    if (!check_Apply_to_us_for_consent_to_make_changes || check_Apply_to_us_for_consent_to_make_changes.type !== 'APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES')
      throw 'APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES IS NOT EXIST'
    let Consent_not_given = await this._act.createAct('CONSENT_NOT_GIVEN')
    return Consent_not_given
  }
  get_Consent_not_given() {
    return this._act.getActByType('CONSENT_NOT_GIVEN')
  }
  // --------------------Do_not_make_any_changes--------------------------- 
  async Do_not_make_any_changes(address_Consent_not_given) {
    this._user.checkUser(this.sender, 'USER')
    let check_Consent_not_given = this._act.getActByAddress(address_Consent_not_given)
    if (!check_Consent_not_given || check_Consent_not_given.type !== 'CONSENT_NOT_GIVEN')
      throw 'CONSENT_NOT_GIVEN IS NOT EXIST'
    let Do_not_make_any_changes = await this._act.createAct('DO_NOT_MAKE_ANY_CHANGES')
    return Do_not_make_any_changes
  }
  // --------------------Consent_given--------------------------- 
  async Consent_given(address_Apply_to_us_for_consent_to_make_changes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Apply_to_us_for_consent_to_make_changes = this._act.getActByAddress(address_Apply_to_us_for_consent_to_make_changes)
    if (!check_Apply_to_us_for_consent_to_make_changes || check_Apply_to_us_for_consent_to_make_changes.type !== 'APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES')
      throw 'APPLY_TO_US_FOR_CONSENT_TO_MAKE_CHANGES IS NOT EXIST'
    let Consent_given = await this._act.createAct('CONSENT_GIVEN')
    return Consent_given
  }
  get_Consent_given() {
    return this._act.getActByType('CONSENT_GIVEN')
  }
  // --------------------Make_changes_in_line_with_governing_document_and_OSCR_consent---------------------------  
  check_Make_changes(address) {
    let check_Make_changes = this.get_Make_changes_in_line_with_governing_document_and_OSCR_consentByAddress(address)
    if (!check_Make_changes || check_Make_changes.type !== 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT') throw `MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT IS NOT EXIST`
    return true
  }
  get_Make_changes_in_line_with_governing_document_and_OSCR_consentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Make_changes_in_line_with_governing_documents_and_OSCR_consent(address_Consent_given) {
    this._user.checkUser(this.sender, 'USER')
    let check_Consent_given = this._act.getActByAddress(address_Consent_given)
    if (!check_Consent_given || check_Consent_given.type !== 'CONSENT_GIVEN')
      throw 'CONSENT_GIVEN IS NOT EXIST'
    let document_and_OSCR = await this._act.createAct('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT')
    return document_and_OSCR
  }
  get_Make_changes_in_line_with_governing_documents_and_OSCR_consent() {
    return this._act.getActByType('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT')
  }
  // --------------------Do_not_need_our_consent---------------------------
  async Do_not_need_our_consent(address_Your_governing_document_have_the_power_to_make_changes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Your_governing_document_have_the_power_to_make_changes = this._act.getActByAddress(address_Your_governing_document_have_the_power_to_make_changes)
    if (!check_Your_governing_document_have_the_power_to_make_changes || check_Your_governing_document_have_the_power_to_make_changes.type !== 'YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES')
      throw 'YOUR_GOVERNING_DOCUMENT_HAVE_THE_POWER_TO_MAKE_CHANGES IS NOT EXIST'
    let Do_not_need_our_consent = await this._act.createAct('DO_NOT_NEED_OUR_CONSENT')
    return Do_not_need_our_consent
  }
  get_Do_not_need_our_consent() {
    return this._act.getActByType('DO_NOT_NEED_OUR_CONSENT')
  }
  // --------------------Make_changes_in_line_with_governing_documents--------------------------- 
  check_Make_changes2(address) {
    let check_Make_changes2 = this.get_Make_changes_in_line_with_governing_documentByAddress(address)
    if (!check_Make_changes2 || check_Make_changes2.type !== 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENT') throw `MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENT IS NOT EXIST`
    return true
  }
  get_Make_changes_in_line_with_governing_documentByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Make_changes_in_line_with_governing_document(address_Do_not_need_our_consent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Do_not_need_our_consent = this._act.getActByAddress(address_Do_not_need_our_consent)
    if (!check_Do_not_need_our_consent || check_Do_not_need_our_consent.type !== 'DO_NOT_NEED_OUR_CONSENT')
      throw 'DO_NOT_NEED_OUR_CONSENT IS NOT EXIST'
    let Make_changes_in_line_with_governing_documents = await this._act.createAct('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENT')
    return Make_changes_in_line_with_governing_documents
  }
  get_Make_changes_in_line_with_governing_document() {
    return this._act.getActByType('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENT')
  }
  // --------------------Notify_within_3_months---------------------------  
  checkAct(address) {
    this.check_Make_changes = this.get_Make_changes_in_line_with_governing_document_and_OSCR_consentByAddress(address);
    this.check_Make_changes2 = this.get_Make_changes_in_line_with_governing_documentByAddress(address);

    if (this.check_Make_changes.type == 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT') {
      return true;
    }
    else if (this.check_Make_changes2.type == 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENT') {
      return true;
    }
    else {
      throw `MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS_FOR_CHECK NOT EXIST`;
    }
  }
  async Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document() {
    await this.checkAct(this.sender, 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS_FOR_CHECK')
    let act = await this._act.createAct('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS')
    return act
  }
  get_Make_changes_in_line_with_governing_documents_and_OSCR_consent_or_with_governing_document() {
    return this._act.getActByType('MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS')
  }
  async Notify_within_3_months(address_Make_changes_in_line_with_governing_document_and_OSCR_consent_or_with_governing_document) {
    this._user.checkUser(this.sender, 'USER')
    let check_Act1 = this._act.getActByAddress(address_Make_changes_in_line_with_governing_document_and_OSCR_consent_or_with_governing_document)
    if (!check_Act1 || check_Act1.type !== 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS')
      throw 'MAKE_CHANGES_IN_LINE_WITH_GOVERNING_DOCUMENTS_AND_OSCR_CONSENT_OR_WITH_GOVERNING_DOCUMENTIS IS NOT EXIST'
    let Notify_within_3_months = await this._act.createAct('NOTIFY_WITHIN_3_MONTHS')
    this.setToAddress(Notify_within_3_months.address)
    return { Notify_within_3_months }
  }
}
export default TokenMain;
