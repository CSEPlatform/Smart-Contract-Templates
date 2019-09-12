import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Bank_Officer_Customer',
    'get_System',
    'get_Bank_Manager',
    'get_Add_Applicant',
    'get_Decide_Application',
    'get_Configure_Product',
    'get_Submit_and_Accept_Arrangement',
    'get_Check_Notify_Customer',
    'get_Notify_Customer',
    'get_Submit_and_Accept_No_Exception',
    'get_Activate_Arrangement_for_Check',
    'get_Activate_Arrangement',
    'get_Submit_and_Accept_Exception',
    'get_Verify_Account'
  ]
  static authenticationFuncs = [
    'Add_Applicant',
    'Decide_Application',
    'Configure_Product',
    'Submit_and_Accept_Arrangement',
    'Check_Notify_Customer',
    'Notify_Customer',
    'Submit_and_Accept_No_Exception',
    'Activate_Arrangement_for_Check',
    'Activate_Arrangement',
    'Submit_and_Accept_Exception',
    'Verify_Account'
  ]
  static publicFuncs = [
    'Bank_Officer_Customer',
    'get_Bank_Officer_Customer',
    'System',
    'get_System',
    'Bank_Manager',
    'get_Bank_Manager',
    'Add_Applicant',
    'get_Add_Applicant',
    'Decide_Application',
    'get_Decide_Application',
    'Configure_Product',
    'get_Configure_Product',
    'Submit_and_Accept_Arrangement',
    'get_Submit_and_Accept_Arrangement',
    'Check_Notify_Customer',
    'get_Check_Notify_Customer',
    'Notify_Customer',
    'get_Notify_Customer',
    'Submit_and_Accept_No_Exception',
    'get_Submit_and_Accept_No_Exception',
    'Activate_Arrangement_for_Check',
    'get_Activate_Arrangement_for_Check',
    'Activate_Arrangement',
    'get_Activate_Arrangement',
    'Submit_and_Accept_Exception',
    'get_Submit_and_Accept_Exception',
    'Verify_Account',
    'get_Verify_Account'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'REFSOLD-BLOCK'
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
    this._process = new Process(data)
  }
  //---------------------user------------------------------
  async Bank_Officer_Customer() {
    let Bank_Officer_Customer = await this._user.createUser('BANK_OFFICER_CUSTOMER')
    return Bank_Officer_Customer
  }
  get_Bank_Officer_Customer() {
    let Bank_Officer_Customer = this._user.getUserByType('BANK_OFFICER_CUSTOMER')
    return Bank_Officer_Customer
  }
  async System() {
    let System = await this._user.createUser('SYSTEM')
    return System
  }
  get_System() {
    let System = this._user.getUserByType('SYSTEM')
    return System
  }
  async Bank_Manager() {
    let Bank_Manager = await this._user.createUser('BANK_MANAGER')
    return Bank_Manager
  }
  get_Bank_Manager() {
    let Bank_Manager = this._user.getUserByType('BANK_MANAGER')
    return Bank_Manager
  }
  // --------------------Add_Applicant---------------------------
  async Add_Applicant() {
    this._user.checkUser(this.sender, 'BANK_OFFICER_CUSTOMER')
    let Add_Applicant = await this._process.createProcess('ADD_APPLICANT')
    return Add_Applicant
  }
  get_Add_Applicant() {
    return this._process.getProcessByType('ADD_APPLICANT')
  }
  // --------------------Decide_Application---------------------------
  async Decide_Application(address_Add_Applicant) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Add_Applicant = this._process.getProcessByAddress(address_Add_Applicant)
    if (!check_Add_Applicant || check_Add_Applicant.type !== 'ADD_APPLICANT')
      throw 'ADD_APPLICANT IS NOT EXIST'
    let Decide_Application = await this._process.createProcess('DECIDE_APPLICTION')
    return Decide_Application
  }
  get_Decide_Application() {
    return this._process.getProcessByType('DECIDE_APPLICTION')
  }
  // --------------------Configure_Product---------------------------
  async Configure_Product(address_Decide_Application) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Decide_Application = this._process.getProcessByAddress(address_Decide_Application)
    if (!check_Decide_Application || check_Decide_Application.type !== 'DECIDE_APPLICTION')
      throw 'DECIDE_APPLICTION IS NOT EXIST'
    let Configure_Product = await this._process.createProcess('CONFIGURE_PRODUCT')
    return Configure_Product
  }
  get_Configure_Product() {
    return this._process.getProcessByType('CONFIGURE_PRODUCT')
  }
  // --------------------Submit_and_Accept_Arrangement---------------------------
  check_Submit_and_Accept_Arrangement(address) {
    let check_Submit_and_Accept_Arrangement = this.getSubmit_and_Accept_ArrangementByAddress(address)
    if (!check_Submit_and_Accept_Arrangement || check_Submit_and_Accept_Arrangement.type !== 'SUBMIT_AND_ACCEPT_ARRANGEMENT') throw `SUBMIT_AND_ACCEPT_ARRANGEMENT IS NOT EXIST`
    return true
  }
  getSubmit_and_Accept_ArrangementByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Submit_and_Accept_Arrangement(address_Configure_Product) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Configure_Product = this._process.getProcessByAddress(address_Configure_Product)
    if (!check_Configure_Product || check_Configure_Product.type !== 'CONFIGURE_PRODUCT')
      throw 'CONFIGURE_PRODUCT IS NOT EXIST'
    let Submit_and_Accept_Arrangement = await this._process.createProcess('SUBMIT_AND_ACCEPT_ARRANGEMENT')
    return Submit_and_Accept_Arrangement
  }
  get_Submit_and_Accept_Arrangement() {
    return this._process.getProcessByType('SUBMIT_AND_ACCEPT_ARRANGEMENT')
  }
  // --------------------Notify_Customer---------------------------
  checkProcess(address) {
    this.check_Activate_Arrangement = this._user.getActivate_ArrangementByAddress(address);
    this.check_Submit_and_Accept_Arrangement = this.getSubmit_and_Accept_ArrangementByAddress(address);
    if (this.check_Activate_Arrangement.type == 'ACTIVATE') {
      return true;
    }
    else if (this.check_Submit_and_Accept_Arrangement.type == 'SUBMIT_AND_ACCEPT_ARRANGEMENT') {
      return true;
    }
    else {
      throw `ACTIVATE_OR_SUBMIT_AND_ACCEPT_ARRANGEMENT IS NOT EXIST`;
    }
  }
  async Check_Notify_Customer() {
    await this.checkProcess(this.sender, 'ACTIVATE_OR_SUBMIT_AND_ACCEPT_ARRANGEMENT')
    let check = await this._process.createProcess('CHECK_NOTIFY_CUSTOMER')
    return check
  }
  get_Check_View_Products() {
    return this._process.getProcessByType('CHECK_NOTIFY_CUSTOMER')
  }
  async Notify_Customer(address_Check_Notify_Customer) {
    this._user.checkUser(this.sender, 'BANK_OFFICER_CUSTOMER')
    let Check_Notify_Customer = this._process.getProcessByAddress(address_Check_Notify_Customer)
    if (!Check_Notify_Customer || Check_Notify_Customer.type !== 'CHECK_NOTIFY_CUSTOMER')
      throw 'CHECK_NOTIFY_CUSTOMER IS NOT EXIST'
    let Notify_Customer = await this._process.createProcess('NOTIFY_CUSTOMER')
    return Notify_Customer
  }
  get_Notify_Customer() {
    return this._process.getProcessByType('NOTIFY_CUSTOMER')
  }
  // --------------------Submit_and_Accept_No_Exception---------------------------
  check_Submit_and_Accept_No_Exception(address) {
    let check_Submit_and_Accept_No_Exception = this.get_Submit_and_Accept_No_ExceptionByAddress(address)
    if (!check_Submit_and_Accept_No_Exception || check_Submit_and_Accept_No_Exception.type !== 'NO_EXCEPTION') throw `NO_EXCEPTION IS NOT EXIST`
    return true
  }
  getSubmit_and_Accept_No_ExceptionByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Submit_and_Accept_No_Exception(address_Configure_Product) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Configure_Product = this._process.getProcessByAddress(address_Configure_Product)
    if (!check_Configure_Product || check_Configure_Product.type !== 'CONFIGURE_PRODUCT')
      throw 'CONFIGURE_PRODUCT IS NOT EXIST'
    let No_Exception = await this._process.createProcess('NO_EXCEPTION')
    return No_Exception
  }
  get_Submit_and_Accept_No_Exception() {
    return this._process.getProcessByType('NO_EXCEPTION')
  }
  // --------------------Activate_Arrangement---------------------------
  checkProcess1(address) {
    this.check_Verify_Account = this._user.getVerify_AccountByAddress(address);
    this.check_Submit_and_Accept_No_Exception = this.getSubmit_and_Accept_No_ExceptionByAddress(address);
    if (this.check_Verify_Account.type == 'VERIFY_ACCOUNT') {
      return true;
    }
    else if (this.check_Submit_and_Accept_No_Exception.type == 'NO_EXCEPTION') {
      return true;
    }
    else {
      throw `VERIFY_ACCOUNT_OR_NO_EXCEPTION IS NOT EXIST`;
    }
  }
  async Activate_Arrangement_for_Check() {
    await this.checkProcess1(this.sender, 'VERIFY_ACCOUNT_OR_NO_EXCEPTION')
    let check1 = await this._process.createProcess('ACTIVATE_ARRANGEMENT_FOR_CHECK')
    return check1
  }
  get_Activate_Arrangement_for_Check() {
    return this._process.getProcessByType('ACTIVATE_ARRANGEMENT_FOR_CHECK')
  }
  check_Activate_Arrangement(address) {
    let check_Activate_Arrangement = this.get_Activate_ArrangementByAddress(address)
    if (!check_Activate_Arrangement || check_Activate_Arrangement.type !== 'ACTIVATE_ARRANGEMENT') throw `ACTIVATE_ARRANGEMENT IS NOT EXIST`
    return true
  }
  getActivate_ArrangementByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Activate_Arrangement(address_Activate_Arrangement_for_Check) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let Check_Activate_Arrangement_for_Check = this._process.getProcessByAddress(address_Activate_Arrangement_for_Check)
    if (!Check_Activate_Arrangement_for_Check || Check_Activate_Arrangement_for_Check.type !== 'ACTIVATE_ARRANGEMENT_FOR_CHECK')
      throw 'ACTIVATE_ARRANGEMENT_FOR_CHECK IS NOT EXIST'
    let Activate_Arrangement = await this._process.createProcess('ACTIVATE_ARRANGEMENT')
    return Activate_Arrangement
  }
  get_Activate_Arrangement() {
    return this._process.getProcessByType('ACTIVATE_ARRANGEMENT')
  }
  // --------------------Submit_and_Accept_Exception---------------------------
  async Submit_and_Accept_Exception(address_Configure_Product) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Configure_Product = this._process.getProcessByAddress(address_Configure_Product)
    if (!check_Configure_Product || check_Configure_Product.type !== 'CONFIGURE_PRODUCT')
      throw 'CONFIGURE_PRODUCT IS NOT EXIST'
    let Exception = await this._process.createProcess('EXCEPTION')
    return Exception
  }
  get_Submit_and_Accept_Exception() {
    return this._process.getProcessByType('EXCEPTION')
  }
  // --------------------Verify_Account---------------------------
  check_Verify_Account(address) {
    let check_Verify_Account = this.get_Verify_AccountByAddress(address)
    if (!check_Verify_Account || check_Verify_Account.type !== 'VERIFY_ACCOUNT') throw `VERIFY_ACCOUNT IS NOT EXIST`
    return true
  }
  getVerify_AccountByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Verify_Account(address_Submit_and_Accept_Exception) {
    this._user.checkUser(this.sender, 'BANK_MANAGER')
    let check_Exception = this._process.getProcessByAddress(address_Submit_and_Accept_Exception)
    if (!check_Exception || check_Exception.type !== 'CONFIGURE_PRODUCT')
      throw 'CONFIGURE_PRODUCT IS NOT EXIST'
    let Verify_Account = await this._process.createProcess('VERIFY_ACCOUNT')
    return Verify_Account
  }
  get_Verify_Account() {
    return this._process.getProcessByType('VERIFY_ACCOUNT')
  }
}
export default TokenMain;
