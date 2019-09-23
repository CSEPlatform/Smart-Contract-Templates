import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Customer',
    'get_Sales',
    'get_Management',
    'get_Credit_Department',
    'get_Credit_Criteria',
    'get_Check_Credit',
    'get_Bad_Credit',
    'get_Saler_Call',
    'get_Buy_Product',
    'get_Credit_Form',
    'get_Order_Entry',
    'get_Order_Form',
    'get_Good_Credit',
    'get_Review_Accounts_Receivable_Balance',
    'get_Hight_Balance',
    'get_Ok',
    'get_Calculate_Credit_terms',
    'get_Credit_issued_Report',
    'get_Terms_Approved',
  ]
  static authenticationFuncs = [
    'Credit_Criteria',
    'Check_Credit',
    'Bad_Credit',
    'Saler_Call',
    'Buy_Product',
    'Credit_Form',
    'Order_Entry',
    'Order_Form',
    'Good_Credit',
    'Review_Accounts_Receivable_Balance',
    'Hight_Balance',
    'Ok',
    'Calculate_Credit_terms',
    'Credit_issued_Report',
    'Terms_Approved',
  ]
  static publicFuncs = [
    'Customer',
    'get_Customer',
    'Sales',
    'get_Sales',
    'Management',
    'get_Management',
    'Credit_Department',
    'get_Credit_Department',
    'Credit_Criteria',
    'get_Credit_Criteria',
    'Check_Credit_for_Check',
    'get_Check_Credit_for_Check',
    'Check_Credit',
    'get_Check_Credit',
    'Bad_Credit',
    'get_Bad_Credit',
    'Saler_Call',
    'get_Saler_Call',
    'Buy_Product',
    'get_Buy_Product',
    'Credit_Form',
    'get_Credit_Form',
    'Check_Order_Entry',
    'get_Check_Order_Entry',
    'Order_Entry',
    'get_Order_Entry',
    'Order_Form',
    'get_Order_Form',
    'Good_Credit',
    'get_Good_Credit',
    'Review_Accounts_Receivable_Balance',
    'get_Review_Accounts_Receivable_Balance',
    'Hight_Balance',
    'get_Hight_Balance',
    'Ok',
    'get_Ok',
    'Calculate_Credit_terms',
    'get_Calculate_Credit_terms',
    'Credit_issued_Report',
    'get_Credit_issued_Report',
    'Terms_Approved',
    'get_Terms_Approved',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CREDIT_APPROVAL'
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
  //---------------------Customer------------------------------
  async Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  //---------------------Sales------------------------------
  async Sales() {
    let Sales = await this._user.createUser('SALES')
    return Sales
  }
  //---------------------Management------------------------------
  async Management() {
    let Management = await this._user.createUser('MANAGEMENT')
    return Management
  }
  //---------------------Credit_Department------------------------------
  async Credit_Department() {
    let Credit_Department = await this._user.createUser('CREDIT_DEPARTMENT')
    return Credit_Department
  }
  // --------------------Credit_Criteria---------------------------
  async Credit_Criteria() {
    await this._user.checkUser(this.sender, 'MANAGEMENT')
    let Credit_Criteria = await this._process.createProcess('CREDIT_CRITREIA')
    return Credit_Criteria
  }
  get_Credit_Criteria() {
    return this._process.getProcessByType('CREDIT_CRITREIA')
  }
  // --------------------Check_Credit---------------------------
  checkProcess(address) {
    this.check_Credit_Criteria = this.get_Credit_CriteriaByAddress(address);
    this.check_Order_Form = this.get_Order_FormByAddress(address);
    this.Hight_Balance = this.get_Hight_BalanceByAddress(address);
    if (this.check_Credit_Criteria.type == 'CREDIT_CRITREIA') {
      return true;
    }
    else if (this.check_Order_Form.type == 'ORDER_FORM') {
      return true;
    }
    else if (this.check_Hight_Balance.type == 'HIGHT_BALANCE') {
      return true;
    }
    else {
      throw `CREDIT_CRITREIA_OR_ORDER_FORM_HIGHT_BALANCE IS NOT EXIST`;
    }
  }
  async Check_Credit_for_Check() {
    await this.checkProcess(this.sender, 'CREDIT_CRITREIA_OR_ORDER_FORM_HIGHT_BALANCE')
    let check1 = await this._process.createProcess('CHECK_CREDIT_FOR_CHECK')
    return check1
  }
  get_Check_Credit_for_Check() {
    return this._process.getProcessByType('CHECK_CREDIT_FOR_CHECK')
  }
  async Check_Credit(address_Check_Credit_for_Check) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Check_Credit_for_Check = this._process.getProcessByAddress(address_Check_Credit_for_Check)
    if (!check_Check_Credit_for_Check || check_Check_Credit_for_Check.type !== 'CHECK_CREDIT_FOR_CHECK')
      throw 'CHECK_CREDIT_FOR_CHECK IS NOT EXIST'
    let Check_Credit = await this._process.createProcess('CHECK_CREDIT')
    return Check_Credit
  }
  get_Check_Credit() {
    return this._process.getProcessByType('CHECK_CREDIT')
  }
  // --------------------Bad_Credit---------------------------
  async Bad_Credit(address_Check_Credit) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Check_Credit = this._process.getProcessByAddress(address_Check_Credit)
    if (!check_Check_Credit || check_Check_Credit.type !== 'CHECK_CREDIT')
      throw 'CHECK_CREDIT IS NOT EXIST'
    let Bad_Credit = await this._process.createProcess('BAD_CREDIT')
    return Bad_Credit
  }
  get_Bad_Credit() {
    return this._process.getProcessByType('BAD_CREDIT')
  }
  // --------------------Good_Credit---------------------------
  async Good_Credit(address_Check_Credit) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Check_Credit = this._process.getProcessByAddress(address_Check_Credit)
    if (!check_Check_Credit || check_Check_Credit.type !== 'CHECK_CREDIT')
      throw 'CHECK_CREDIT IS NOT EXIST'
    let Good_Credit = await this._process.createProcess('GOOD_CREDIT')
    return Good_Credit
  }
  get_Good_Credit() {
    return this._process.getProcessByType('GOOD_CREDIT')
  }
  // --------------------Sales_Call---------------------------
  async Sales_Call(address_Bad_Credit) {
    this._user.checkUser(this.sender, 'SALES')
    let check_Bad_Credit = this._process.getProcessByAddress(address_Bad_Credit)
    if (!check_Bad_Credit || check_Bad_Credit.type !== 'BAD_CREDIT')
      throw 'BAD_CREDIT IS NOT EXIST'
    let Sales_Call = await this._process.createProcess('SALES_CALL')
    return Sales_Call
  }
  get_Sales_Call() {
    return this._process.getProcessByType('SALES_CALL')
  }
  // --------------------Buy_Product---------------------------
  async Buy_Product(address_Saler_Call) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Saler_Call = this._process.getProcessByAddress(address_Saler_Call)
    if (!check_Saler_Call || check_Saler_Call.type !== 'SALES_CALL')
      throw 'SALES_CALL IS NOT EXIST'
    let Buy_Product = await this._process.createProcess('BUY_PRODUCT')
    return Buy_Product
  }
  get_Buy_Product() {
    return this._process.getProcessByType('BUY_PRODUCT')
  }
  // --------------------Credit_Form---------------------------
  async Credit_Form(address_Buy_Product) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Buy_Product = this._process.getProcessByAddress(address_Buy_Product)
    if (!check_Buy_Product || check_Buy_Product.type !== 'BUY_PRODUCT')
      throw 'BUY_PRODUCT IS NOT EXIST'
    let Credit_Form = await this._process.createProcess('CREDIT_FORM')
    return Credit_Form
  }
  get_Credit_Form() {
    return this._process.getProcessByType('CREDIT_FORM')
  }
  // --------------------Order_Entry---------------------------
  checkProcess1(address) {
    this.check_Sales_Call = this.get_Saler_CallByAddress(address);
    this.check_Credit_Form = this._act.get_Credit_FormByAddress(address);
    if (this.check_Sales_Call.type == 'SALES_CALL') {
      return true;
    }
    else if (this.check_Credit_Form.type == 'CREDIT_FORM') {
      return true;
    }
    else {
      throw `SALES_CALL_AND_CREDIT_FORM IS NOT EXIST`;
    }
  }
  async Check_Order_Entry() {
    await this.checkProcess1(this.sender, 'SALES_CALL_AND_CREDIT_FORM')
    let check = await this._process.createProcess('CHECK_ORDER_ENTRY')
    return check
  }
  get_Check_Order_Entry() {
    return this._process.getProcessByType('CHECK_ORDER_ENTRY')
  }
  async Order_Entry(address_Check_Order_Entry) {
    this._user.checkUser(this.sender, 'SALES')
    let check_Check_Order_Entry = this._process.getProcessByAddress(address_Check_Order_Entry)
    if (!check_Check_Order_Entry || check_Check_Order_Entry.type !== 'CHECK_ORDER_ENTRY')
      throw 'CHECK_ORDER_ENTRY IS NOT EXIST'
    let Order_Entry = await this._process.createProcess('ORDER_ENTRY')
    return Order_Entry
  }
  get_Order_Entry() {
    return this._process.getProcessByType('ORDER_ENTRY')
  }
  // --------------------Order_Form---------------------------
  async Order_Form(address_Order_Entry) {
    this._user.checkUser(this.sender, 'SALES')
    let check_Order_Entry = this._process.getProcessByAddress(address_Order_Entry)
    if (!check_Order_Entry || check_Order_Entry.type !== 'ORDER_ENTRY')
      throw 'ORDER_ENTRY IS NOT EXIST'
    let Order_Form = await this._process.createProcess('ORDER_FORM')
    return Order_Form
  }
  get_Order_Form() {
    return this._process.getProcessByType('ORDER_FORM')
  }
  // --------------------Review_Accounts_Receivable_Balance---------------------------
  async Review_Accounts_Receivable_Balance(address_Good_Credit) {
    this._user.checkUser(this.sender, 'SALES')
    let check_Good_Credit = this._process.getProcessByAddress(address_Good_Credit)
    if (!check_Good_Credit || check_Good_Credit.type !== 'GOOD_CREDIT')
      throw 'GOOD_CREDIT IS NOT EXIST'
    let Review_Accounts = await this._process.createProcess('REVIEW_ACCOUNT_RECEIVABLE_BALANCE')
    return Review_Accounts
  }
  get_Review_Accounts_Receivable_Balancem() {
    return this._process.getProcessByType('REVIEW_ACCOUNT_RECEIVABLE_BALANCE')
  }
  // --------------------Hight_Balance---------------------------
  async Hight_Balance(address_Review_Accounts_Receivable_Balance) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Review_Accounts = this._process.getProcessByAddress(address_Review_Accounts_Receivable_Balance)
    if (!check_Review_Accounts || check_Review_Accounts.type !== 'REVIEW_ACCOUNT_RECEIVABLE_BALANCE')
      throw 'REVIEW_ACCOUNT_RECEIVABLE_BALANCE IS NOT EXIST'
    let Hight_Balance = await this._process.createProcess('HIGHT_BALANCE')
    return Hight_Balance
  }
  get_Hight_Balance() {
    return this._process.getProcessByType('HIGHT_BALANCE')
  }
  // --------------------Ok---------------------------
  async Ok(address_Review_Accounts_Receivable_Balance) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Review_Accounts = this._process.getProcessByAddress(address_Review_Accounts_Receivable_Balance)
    if (!check_Review_Accounts || check_Review_Accounts.type !== 'REVIEW_ACCOUNT_RECEIVABLE_BALANCE')
      throw 'REVIEW_ACCOUNT_RECEIVABLE_BALANCE IS NOT EXIST'
    let Ok = await this._process.createProcess('OK')
    return Ok
  }
  get_Ok() {
    return this._process.getProcessByType('OK')
  }
  // --------------------Calculate_Credit_terms---------------------------
  async Calculate_Credit_terms(address_Ok) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Ok = this._process.getProcessByAddress(address_Ok)
    if (!check_Ok || check_Ok.type !== 'OK')
      throw 'REVIEW_ACCOUNT_RECEIVABLE_BAOKLANCE IS NOT EXIST'
    let Calculate_Credit_terms = await this._process.createProcess('CALCULATE_CREDIT_TERMS')
    return Calculate_Credit_terms
  }
  get_Calculate_Credit_terms() {
    return this._process.getProcessByType('CALCULATE_CREDIT_TERMS')
  }
  // --------------------Credit_issued_Report---------------------------
  async Credit_issued_Report(address_Calculate_Credit_terms) {
    this._user.checkUser(this.sender, 'MANAGEMENT')
    let check_Calculate_Credit_terms = this._process.getProcessByAddress(address_Calculate_Credit_terms)
    if (!check_Calculate_Credit_terms || check_Calculate_Credit_terms.type !== 'CALCULATE_CREDIT_TERMS')
      throw 'CALCULATE_CREDIT_TERMS IS NOT EXIST'
    let Credit_issued_Report = await this._process.createProcess('CREDIT_ISSUED_REPORT')
    return Credit_issued_Report
  }
  get_Credit_issued_Report() {
    return this._process.getProcessByType('CREDIT_ISSUED_REPORT')
  }
  // --------------------Terms_Approved---------------------------
  async Terms_Approved(address_Calculate_Credit_terms) {
    this._user.checkUser(this.sender, 'CREDIT_DEPARTMENT')
    let check_Calculate_Credit_terms = this._process.getProcessByAddress(address_Calculate_Credit_terms)
    if (!check_Calculate_Credit_terms || check_Calculate_Credit_terms.type !== 'CALCULATE_CREDIT_TERMS')
      throw 'CALCULATE_CREDIT_TERMS IS NOT EXIST'
    let Terms_Approved = await this._process.createProcess('TERMS_APPROVED')
    return Terms_Approved
  }
  get_Terms_Approved() {
    return this._process.getProcessByType('TERMS_APPROVED')
  }

}
export default TokenMain;
