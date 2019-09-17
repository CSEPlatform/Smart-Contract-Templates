import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Customer_arrives',
    'get_Customer_makes_request',
    'get_Teller_inquires_affer_ID',
    'get_Valid',
    'get_Check_the_balance',
    'get_The_balance_is_alright',
    'get_The_balance_is_not_alright',
    'get_Check_policy',
    'get_Out_of_the_purview_of_the_policy',
    'get_Check_Reject',
    'get_Reject',
    'get_Within_of_the_purview_of_the_policy',
    'get_Log_transaction',
  ]
  static authenticationFuncs = [
    'Customer_arrives',
    'Customer_makes_request',
    'Teller_inquires_affer_ID',
    'Valid',
    'Invalid',
    'Check_the_balance',
    'The_balance_is_alright',
    'The_balance_is_not_alright',
    'Check_policy',
    'Out_of_the_purview_of_the_policy',
    'Check_Reject',
    'Reject',
    'Within_of_the_purview_of_the_policy',
    'Log_transaction',
    'Give_cash_client',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Customer_arrives',
    'get_Customer_arrives',
    'Customer_makes_request',
    'get_Customer_makes_request',
    'Teller_inquires_affer_ID',
    'get_Teller_inquires_affer_ID',
    'Valid',
    'get_Valid',
    'Invalid',
    'Check_the_balance',
    'get_Check_the_balance',
    'The_balance_is_alright',
    'get_The_balance_is_alright',
    'The_balance_is_not_alright',
    'get_The_balance_is_not_alright',
    'Check_policy',
    'get_Check_policy',
    'Out_of_the_purview_of_the_policy',
    'get_Out_of_the_purview_of_the_policy',
    'Check_Reject',
    'get_Check_Reject',
    'Reject',
    'get_Reject',
    'Within_of_the_purview_of_the_policy',
    'get_Within_of_the_purview_of_the_policy',
    'Log_transaction',
    'get_Log_transaction',
    'Give_cash_client',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'BANKING-TELLER'
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
  // --------------------Login---------------------------
  async Customer_arrives() {
    await this._user.checkUser(this.sender, 'USER')
    let Customer_arrives = await this._process.createProcess('CUSTOMER_ARRIVES')
    return Customer_arrives
  }
  get_Customer_arrives() {
    return this._process.getProcessByType('CUSTOMER_ARRIVES')
  }
  // --------------------Customer_makes_request---------------- ----------- 
  async Customer_makes_request(address_Customer_arrives) {
    this._user.checkUser(this.sender, 'USER')
    let check_Customer_arrives = this._process.getProcessByAddress(address_Customer_arrives)
    if (!check_Customer_arrives || check_Customer_arrives.type !== 'CUSTOMER_ARRIVES')
      throw 'CUSTOMER_ARRIVES IS NOT EXIST'
    let Customer_makes_request = await this._process.createProcess('CUSTOMER_MAKES_REQUEST')
    return Customer_makes_request
  }
  get_Customer_makes_request() {
    return this._process.getProcessByType('CUSTOMER_MAKES_REQUEST')
  }
  // --------------------Teller_inquires_affer_ID---------------- ----------- 
  async Teller_inquires_affer_ID(address_Customer_makes_request) {
    this._user.checkUser(this.sender, 'USER')
    let check_Customer_makes_request = this._process.getProcessByAddress(address_Customer_makes_request)
    if (!check_Customer_makes_request || check_Customer_makes_request.type !== 'CUSTOMER_MAKES_REQUEST')
      throw 'CUSTOMER_MAKES_REQUEST IS NOT EXIST'
    let Teller_inquires_affer_ID = await this._process.createProcess('TELLER_INQUIRES_AFFER_ID')
    return Teller_inquires_affer_ID
  }
  get_Teller_inquires_affer_ID() {
    return this._process.getProcessByType('TELLER_INQUIRES_AFFER_ID')
  }
  // --------------------Valid---------------- ----------- 
  async Valid(address_Teller_inquires_affer_ID) {
    this._user.checkUser(this.sender, 'USER')
    let check_Teller_inquires_affer_ID = this._process.getProcessByAddress(address_Teller_inquires_affer_ID)
    if (!check_Teller_inquires_affer_ID || check_Teller_inquires_affer_ID.type !== 'TELLER_INQUIRES_AFFER_ID')
      throw 'TELLER_INQUIRES_AFFER_ID IS NOT EXIST'
    let Valid = await this._process.createProcess('VALID')
    return Valid
  }
  get_Valid() {
    return this._process.getProcessByType('VALID')
  }
  // --------------------Invalid---------------- ----------- 
  async Invalid(address_Teller_inquires_affer_ID) {
    this._user.checkUser(this.sender, 'USER')
    let check_Teller_inquires_affer_ID = this._process.getProcessByAddress(address_Teller_inquires_affer_ID)
    if (!check_Teller_inquires_affer_ID || check_Teller_inquires_affer_ID.type !== 'TELLER_INQUIRES_AFFER_ID')
      throw 'TELLER_INQUIRES_AFFER_ID IS NOT EXIST'
    this.setToAddress(address_Teller_inquires_affer_ID)
    return 'END'
  }
  // --------------------Check_the_balance---------------- ----------- 
  check_Check_the_balance(address) {
    let check_Check_the_balance = this.get_Check_the_balanceByAddress(address)
    if (!check_Check_the_balance || check_Check_the_balance.type !== 'CHECK_THE_BALANCE') throw `CHECK_THE_BALANCE IS NOT EXIST`
    return true
  }
  get_Check_the_balanceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Check_the_balance(address_Valid) {
    this._user.checkUser(this.sender, 'USER')
    let check_Valid = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid || check_Valid.type !== 'VALID')
      throw 'VALID IS NOT EXIST'
    let Check_the_balance = await this._process.createProcess('CHECK_THE_BALANCE')
    return Check_the_balance
  }
  get_Check_the_balance() {
    return this._process.getProcessByType('CHECK_THE_BALANCE')
  }
  // --------------------The_balance_is_alright---------------- ----------- 
  async The_balance_is_alright(address_Check_the_balance) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_the_balance = this._process.getProcessByAddress(address_Check_the_balance)
    if (!check_Check_the_balance || check_Check_the_balance.type !== 'CHECK_THE_BALANCE')
      throw 'CHECK_THE_BALANCE IS NOT EXIST'
    let The_balance_is_alright = await this._process.createProcess('THE_BALANCE_IS_ALRIGHT')
    return The_balance_is_alright
  }
  get_The_balance_is_alright() {
    return this._process.getProcessByType('THE_BALANCE_IS_ALRIGHT')
  }
  // --------------------The_balance_is_not_alright---------------- ----------- 
  check_The_balance_is_not_alright(address) {
    let check_The_balance_is_not_alright = this.get_The_balance_is_not_alrightByAddress(address)
    if (!check_The_balance_is_not_alright || check_The_balance_is_not_alright.type !== 'THE_BALANCE_IS_NOT_ALRIGHT') throw `THE_BALANCE_IS_NOT_ALRIGHT IS NOT EXIST`
    return true
  }
  get_The_balance_is_not_alrightByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async The_balance_is_not_alright(address_Check_the_balance) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_the_balance = this._process.getProcessByAddress(address_Check_the_balance)
    if (!check_Check_the_balance || check_Check_the_balance.type !== 'CHECK_THE_BALANCE')
      throw 'CHECK_THE_BALANCE IS NOT EXIST'
    let The_balance_is_not_alright = await this._process.createProcess('THE_BALANCE_IS_NOT_ALRIGHT')
    return The_balance_is_not_alright
  }
  get_The_balance_is_not_alright() {
    return this._process.getProcessByType('THE_BALANCE_IS_NOT_ALRIGHT')
  }
  // --------------------Check_policy---------------- ----------- 
  async Check_policy(address_The_balance_is_alright) {
    this._user.checkUser(this.sender, 'USER')
    let check_The_balance_is_alright = this._process.getProcessByAddress(address_The_balance_is_alright)
    if (!check_The_balance_is_alright || check_The_balance_is_alright.type !== 'THE_BALANCE_IS_ALRIGHT')
      throw 'THE_BALANCE_IS_ALRIGHT IS NOT EXIST'
    let Check_policy = await this._process.createProcess('CHECK_POLICY')
    return Check_policy
  }
  get_Check_policy() {
    return this._process.getProcessByType('CHECK_POLICY')
  }
  // --------------------Within_of_the_purview_of_the_policy---------------- ----------- 
  async Within_of_the_purview_of_the_policy(address_Check_policy) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_policy = this._process.getProcessByAddress(address_Check_policy)
    if (!check_Check_policy || check_Check_policy.type !== 'CHECK_POLICY')
      throw 'CHECK_POLICY IS NOT EXIST'
    let Within_of_the_purview_of_the_policy = await this._process.createProcess('WITHIN_OF_THE_PURVIEW_OF_THE_POLICY')
    return Within_of_the_purview_of_the_policy
  }
  get_Within_of_the_purview_of_the_policy() {
    return this._process.getProcessByType('WITHIN_OF_THE_PURVIEW_OF_THE_POLICY')
  }
  // --------------------Out_of_the_purview_of_the_policy---------------- ----------- 
  check_Out_of_the_purview_of_the_policy(address) {
    let check_Out_of_the_purview_of_the_policy = this.get_Out_of_the_purview_of_the_policyByAddress(address)
    if (!check_Out_of_the_purview_of_the_policy || check_Out_of_the_purview_of_the_policy.type !== 'OUT_OF_THE_PURVIEW_OF_THE_POLICY') throw `OUT_OF_THE_PURVIEW_OF_THE_POLICY IS NOT EXIST`
    return true
  }
  get_Out_of_the_purview_of_the_policyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Out_of_the_purview_of_the_policy(address_Check_policy) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_policy = this._process.getProcessByAddress(address_Check_policy)
    if (!check_Check_policy || check_Check_policy.type !== 'CHECK_POLICY')
      throw 'CHECK_POLICY IS NOT EXIST'
    let Out_of_the_purview_of_the_policy = await this._process.createProcess('OUT_OF_THE_PURVIEW_OF_THE_POLICY')
    return Out_of_the_purview_of_the_policy
  }
  get_Out_of_the_purview_of_the_policy() {
    return this._process.getProcessByType('OUT_OF_THE_PURVIEW_OF_THE_POLICY')
  }
  // --------------------Within_ofLog_transaction_the_purview_of_the_policy---------------- ----------- 
  async Log_transaction(address_Within_ofLog_transaction_the_purview_of_the_policy) {
    this._user.checkUser(this.sender, 'USER')
    let check_Within = this._process.getProcessByAddress(address_Within_ofLog_transaction_the_purview_of_the_policy)
    if (!check_Within || check_Within.type !== 'WITHIN_OF_THE_PURVIEW_OF_THE_POLICY')
      throw 'WITHIN_OF_THE_PURVIEW_OF_THE_POLICY IS NOT EXIST'
    let Log_transaction = await this._process.createProcess('LOG_TRANSACTION')
    return Log_transaction
  }
  get_Log_transaction() {
    return this._process.getProcessByType('LOG_TRANSACTION')
  }
  // --------------------Give_cash_client---------------- ----------- 
  async Give_cash_client(address_Log_transaction) {
    this._user.checkUser(this.sender, 'USER')
    let check_Log_transaction = this._process.getProcessByAddress(address_Log_transaction)
    if (!check_Log_transaction || check_Log_transaction.type !== 'LOG_TRANSACTION')
      throw 'LOG_TRANSACTION IS NOT EXIST'
    this.setToAddress(address_Log_transaction)
    return 'SUCCESS'
  }
  // --------------------Reject---------------- ----------- 
  check_Process(address) {
    this.check_Check_the_balance = this.get_Check_the_balanceByAddress(address);
    this.check_The_balance_is_not_alright = this.get_The_balance_is_not_alrightByAddress(address);
    this.check_Out_of_the_purview_of_the_policy = this.get_Out_of_the_purview_of_the_policyByAddress(address);
    if (this.check_Check_the_balance.type == 'CHECK_THE_BALANCE') {
      return true;
    }
    else if (this.check_The_balance_is_not_alright.type == 'THE_BALANCE_IS_NOT_ALRIGHT') {
      return true;
    }
    else if (this.check_Out_of_the_purview_of_the_policy.type == 'OUT_OF_THE_PURVIEW_OF_THE_POLICY') {
      return true;
    }
    else {
      throw 'CHECK_THE_BALANCE_OR_THE_BALANCE_IS_NOT_ALRIGHT_OR_OUT_OF_THE_PURVIEW_OF_THE_POLICYFOR_CHECK IS NOT EXIST`;
    }
  }
  async Check_Reject() {
    this.check_Process(this.sender, 'CHECK_THE_BALANCE_OR_THE_BALANCE_IS_NOT_ALRIGHT_OR_OUT_OF_THE_PURVIEW_OF_THE_POLICYFOR_CHECK')
    let process = await this._process.createProcess('CHECK_REJECT')
    return process
  }
  async Reject(address_Check_Reject) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Reject = this._process.getProcessByAddress(address_Check_Reject)
    if (!check_Check_Reject || check_Check_Reject.type !== 'CHECK_REJECT')
      throw 'CHECK_REJECT IS NOT EXIST'
    let Reject = await this._process.createProcess('REJECT')
    return Reject
  }
  get_Rejectr() {
    return this._process.getProcessByType('REJECT')
  }

}
export default TokenMain;
