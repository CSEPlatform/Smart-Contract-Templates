import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Customer_Makes_Withdrawal_Request',
    'vCheck_Customer_is_Account_balance',
    'get_Valid',
    'get_Invalid',
    'get_Check_Customer_is_Account_balance',
    'get_Balance',
    'get_No_Balance',
    'get_Give_cash_to_Customer',
    'get_Record_Transaction',
    'get_Bank_DB',
    'get_Check_Reject_Request',
  ]
  static authenticationFuncs = [
    'Customer_Makes_Withdrawal_Request',
    'Check_Customer_is_Account_balance',
    'Valid',
    'Invalid',
    'Check_Customer_is_Account_balance',
    'Balance',
    'No_Balance',
    'Give_cash_to_Customer',
    'Record_Transaction',
    'Bank_DB',
    'Check_Reject_Request',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Customer_Makes_Withdrawal_Request',
    'get_Customer_Makes_Withdrawal_Request',
    'Check_Customer_is_Account_balance',
    'get_Check_Customer_is_Account_balance',
    'Valid',
    'get_Valid',
    'Invalid',
    'get_Invalid',
    'Check_Customer_is_Account_balance',
    'get_Check_Customer_is_Account_balance',
    'Balance',
    'get_Balance',
    'No_Balance',
    'get_No_Balance',
    'Give_cash_to_Customer',
    'get_Give_cash_to_Customer',
    'Record_Transaction',
    'get_Record_Transaction',
    'Bank_DB',
    'get_Bank_DB',
    'Check_Reject_Request',
    'get_Check_Reject_Request',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'WITHDRAW_CASH'
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
    this._user = new User(data)
  }
  //---------------------User------------------------------
  async User() {
    let User = await this._user.createUser('USER')
    return User
  }
  get_User() {
    let User = this._user.getUserByType('USER')
    return User
  }
  // --------------------Customer_Makes_Withdrawal_Request---------------------------
  async Forwards_details() {
    await this._user.checkUser(this.sender, 'USER')
    let Customer_Makes_Withdrawal_Request = await this._process.createProcess('CUSTOMER_MAKES_WITHDRAWAL_REQUEST')
    return Customer_Makes_Withdrawal_Request
  }
  get_Customer_Makes_Withdrawal_Request() {
    return this._process.getProcessByType('CUSTOMER_MAKES_WITHDRAWAL_REQUEST')
  }
  // --------------------Check_Customer_is_Account_balance---------------- ----------- 
  async Check_Customer_is_Account_balance(address_Customer_Makes_Withdrawal_Request) {
    this._user.checkUser(this.sender, 'USER')
    let check_Customer_Makes_Withdrawal_Request = this._process.getProcessByAddress(address_Customer_Makes_Withdrawal_Request)
    if (!check_Customer_Makes_Withdrawal_Request || check_Customer_Makes_Withdrawal_Request.type !== 'CUSTOMER_MAKES_WITHDRAWAL_REQUEST')
      throw 'CUSTOMER_MAKES_WITHDRAWAL_REQUEST IS NOT EXIST'
    let Check_Customer_is_Account_balance = await this._process.createProcess('CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
    return Check_Customer_is_Account_balance
  }
  get_Check_Customer_is_Account_balance() {
    return this._process.getProcessByType('CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
  }
  // --------------------Valid---------------- ----------- 
  async Valid(address_check_Check_Customer_is_Account_balance) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Customer_is_Account_balance = this._process.getProcessByAddress(address_check_Check_Customer_is_Account_balance)
    if (!check_Check_Customer_is_Account_balance || check_Check_Customer_is_Account_balance.type !== 'CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
      throw 'CHECK_CUSTOMER_IS_ACCOUNT_BALANCE IS NOT EXIST'
    let Valid = await this._process.createProcess('VALID')
    return Valid
  }
  get_Valid() {
    return this._process.getProcessByType('VALID')
  }
  // --------------------Invalid---------------- ----------- 
  check_Invalid(address) {
    let check_Invalid = this.get_InvalidByAddress(address)
    if (!check_Invalid || check_Invalid.type !== 'INVALID') throw `INVALID IS NOT EXIST`
    return true
  }
  get_InvalidByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Invalid(address_check_Check_Customer_is_Account_balance) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Customer_is_Account_balance = this._process.getProcessByAddress(address_check_Check_Customer_is_Account_balance)
    if (!check_Check_Customer_is_Account_balance || check_Check_Customer_is_Account_balance.type !== 'CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
      throw 'CHECK_CUSTOMER_IS_ACCOUNT_BALANCE IS NOT EXIST'
    let invalid = await this._process.createProcess('INVALID')
    return invalid
  }
  get_Invalid() {
    return this._process.getProcessByType('INVALID')
  }
  // --------------------Valid_Check_Customer_is_Account_balance---------------- ----------- 
  async Valid_Check_Customer_is_Account_balance(address_Valid) {
    this._user.checkUser(this.sender, 'USER')
    let check_Valid = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid || check_Valid.type !== 'VALID')
      throw 'VALID IS NOT EXIST'
    let Valid_Check_Customer_is_Account_balance = await this._process.createProcess('VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
    return Valid_Check_Customer_is_Account_balance
  }
  get_Valid_Check_Customer_is_Account_balance() {
    return this._process.getProcessByType('VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
  }
  // --------------------Balance---------------- ----------- 
  async Balance(address_Valid) {
    this._user.checkUser(this.sender, 'USER')
    let check_Valid_Check_Customer_is_Account_balance = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid_Check_Customer_is_Account_balance || check_Valid_Check_Customer_is_Account_balance.type !== 'VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
      throw 'VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE IS NOT EXIST'
    let Balance = await this._process.createProcess('BALANCE')
    return Balance
  }
  get_Balance() {
    return this._process.getProcessByType('BALANCE')
  }
  // --------------------No_Balance---------------- ----------- 
  check_No_Balance(address) {
    let check_No_Balance = this.get_No_BalanceByAddress(address)
    if (!check_No_Balance || check_No_Balance.type !== 'NO_BALANCE') throw `NO_BALANCE IS NOT EXIST`
    return true
  }
  get_No_BalanceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async No_Balance(address_Valid) {
    this._user.checkUser(this.sender, 'USER')
    let check_Valid_Check_Customer_is_Account_balance = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid_Check_Customer_is_Account_balance || check_Valid_Check_Customer_is_Account_balance.type !== 'VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE')
      throw 'VALID_CHECK_CUSTOMER_IS_ACCOUNT_BALANCE IS NOT EXIST'
    let No_Balance = await this._process.createProcess('NO_BALANCE')
    return No_Balance
  }
  get_No_Balance() {
    return this._process.getProcessByType('NO_BALANCE')
  }
  // --------------------Give_cash_to_Customer---------------- ----------- 
  async Give_cash_to_Customer(address_Balance) {
    this._user.checkUser(this.sender, 'USER')
    let check_Balance = this._process.getProcessByAddress(address_Balance)
    if (!check_Balance || check_Balance.type !== 'BALANCE')
      throw 'BALANCE IS NOT EXIST'
    let Give_cash_to_Customer = await this._process.createProcess('GIVE_CASH_TO_CUSTOMER')
    return Give_cash_to_Customer
  }
  get_Give_cash_to_Customer() {
    return this._process.getProcessByType('GIVE_CASH_TO_CUSTOMER')
  }
  // --------------------Record_Transaction---------------- ----------- 
  async Record_Transaction(address_Give_cash_to_Customer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Give_cash_to_Customer = this._process.getProcessByAddress(address_Give_cash_to_Customer)
    if (!check_Give_cash_to_Customer || check_Give_cash_to_Customer.type !== 'GIVE_CASH_TO_CUSTOMER')
      throw 'GIVE_CASH_TO_CUSTOMER IS NOT EXIST'
    let Record_Transaction = await this._process.createProcess('RECORD_TRANSACTION')
    return Record_Transaction
  }
  get_Record_Transaction() {
    return this._process.getProcessByType('RECORD_TRANSACTION')
  }
  // --------------------Bank_DB---------------- ----------- 
  async Bank_DB(address_Record_Transaction) {
    this._user.checkUser(this.sender, 'USER')
    let check_Record_Transaction = this._process.getProcessByAddress(address_Record_Transaction)
    if (!check_Record_Transaction || check_Record_Transaction.type !== 'RECORD_TRANSACTION')
      throw 'RECORD_TRANSACTION IS NOT EXIST'
    let Bank_DB = await this._process.createProcess('BANK_DB')
    return Bank_DB
  }
  get_Bank_DB() {
    return this._process.getProcessByType('BANK_DB')
  }
  // --------------------Reject_Request---------------- ----------- 
  checkprocess(address) {
    this.check_No_Balance = this.get_No_BalanceByAddress(address);
    this.check_Invalid = this.getInvalidByAddress(address);
    if (this.check_No_Balance.type == 'NO_BALANCE') {
      return true;
    }
    else if (this.check_Invalid.type == 'INVALID') {
      return true;
    }
    else {
      throw `NO_BALANCE_OR_INVALID IS NOT EXIST`;
    }
  }
  async check_Reject_Request() {
    this.checkprocess(this.sender, 'NO_BALANCE_OR_INVALID')
    let check = await this._process.createProcess('CHECK_REJECT_REQUEST')
    return check
  }
  get_check_Reject_Request() {
    return this._process.getProcessByType('CHECK_REJECT_REQUEST')
  }
  async Reject_Request(address_check_Reject_Request) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Reject_Request = this._process.getProcessByAddress(address_check_Reject_Request)
    if (!check_check_Reject_Request || check_check_Reject_Request.type !== 'CHECK_REJECT_REQUEST')
      throw 'CHECK_REJECT_REQUEST IS NOT EXIST'
    let Reject_Request = await this._process.createProcess('REJECT_REQUEST')
    return Reject_Request
  }
  get_Reject_Request() {
    return this._process.getProcessByType('REJECT_REQUEST')
  }
}
export default TokenMain;
