import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Merchant',
    'get_Payment_Gateway',
    'get_Aquiring_Bank',
    'get_Customer',
    'get_Forwards_details',
    'get_Authorize_Payments',
    'get_Protect_CC_details',
    'get_Verifies_CC_deytails',
    'get_Verifies_transaction_type_and_amount',
    'get_Authorize_the_available_funds_in_the_CC_holder',
    'get_Approved',
    'get_Sends_reponse',
    'get_Forwards_reponse_code',
    'get_Recieves_and_forwards_reponse',
    'get_interprets_the_relevant_reponse'
  ]
  static authenticationFuncs = [
    'Forwards_details',
    'Authorize_Payments',
    'Protect_CC_details',
    'Verifies_CC_deytails',
    'Verifies_transaction_type_and_amount',
    'Authorize_the_available_funds_in_the_CC_holder',
    'Approved',
    'Sends_reponse',
    'Forwards_reponse_code',
    'Recieves_and_forwards_reponse',
    'interprets_the_relevant_reponse'
  ]
  static publicFuncs = [
    'Merchant',
    'get_Merchant',
    'Payment_Gateway',
    'get_Payment_Gateway',
    'Aquiring_Bank',
    'get_Aquiring_Bank',
    'Customer',
    'get_Customer',
    'Forwards_details',
    'get_Forwards_details',
    'Authorize_Payments',
    'get_Authorize_Payments',
    'Protect_CC_details',
    'get_Protect_CC_details',
    'Verifies_CC_deytails',
    'get_Verifies_CC_deytails',
    'Verifies_transaction_type_and_amount',
    'get_Verifies_transaction_type_and_amount',
    'Authorize_the_available_funds_in_the_CC_holder',
    'get_Authorize_the_available_funds_in_the_CC_holder',
    'Approved',
    'get_Approved',
    'Sends_reponse',
    'get_Sends_reponse',
    'Forwards_reponse_code',
    'get_Forwards_reponse_code',
    'Recieves_and_forwards_reponse',
    'get_Recieves_and_forwards_reponse',
    'interprets_the_relevant_reponse',
    'get_interprets_the_relevant_reponse',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CREDIT_CARD'
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
  async Merchant() {
    let Merchant = await this._user.createUser('MERCHANT')
    return Merchant
  }
  get_Merchant() {
    let Merchant = this._user.getUserByType('MERCHANT')
    return Merchant
  }
  async Payment_Gateway() {
    let Payment_Gateway = await this._user.createUser('PAYMENT_GATEWAY')
    return Payment_Gateway
  }
  get_Payment_Gateway() {
    let Payment_Gateway = this._user.getUserByType('PAYMENT_GATEWAY')
    return Payment_Gateway
  }
  async Aquiring_Bank() {
    let Aquiring_Bank = await this._user.createUser('AQUIRING_BANK')
    return Aquiring_Bank
  }
  get_Aquiring_Bank() {
    let Aquiring_Bank = this._user.getUserByType('AQUIRING_BANK')
    return Aquiring_Bank
  }
  async Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  get_Aquiring_Bank() {
    let Aquiring_Bank = this._user.getUserByType('CUSTOMER')
    return Aquiring_Bank
  }
  // --------------------Forwards_details---------------------------
  async Forwards_details() {
    await this._user.checkUser(this.sender, 'MERCHANT')
    let Forwards_details = await this._process.createProcess('FORWARDS_DETAILS')
    return Forwards_details
  }
  get_Forwards_details() {
    return this._process.getProcessByType('FORWARDS_DETAILS')
  }
  // --------------------Authorize_Payments---------------- ----------- 
  async Authorize_Payments(address_Forwards_details) {
    this._user.checkUser(this.sender, 'PAYMENT_GATEWAY')
    let check_Forwards_details = this._process.getProcessByAddress(address_Forwards_details)
    if (!check_Forwards_details || check_Forwards_details.type !== 'FORWARDS_DETAILS')
      throw 'FORWARDS_DETAILS IS NOT EXIST'
    let Authorize_Payments = await this._process.createProcess('AUTHORIZE_PAYMENTS')
    return Authorize_Payments
  }
  get_Authorize_Payments() {
    return this._process.getProcessByType('AUTHORIZE_PAYMENTS')
  }
  // --------------------Protect_CC_details---------------- ----------- 
  async Protect_CC_details(address_Authorize_Payments) {
    this._user.checkUser(this.sender, 'PAYMENT_GATEWAY')
    let check_Authorize_Payments = this._process.getProcessByAddress(address_Authorize_Payments)
    if (!check_Authorize_Payments || check_Authorize_Payments.type !== 'AUTHORIZE_PAYMENTS')
      throw 'AUTHORIZE_PAYMENTS IS NOT EXIST'
    let Protect_CC_details = await this._process.createProcess('PROTECT_CC_DETAILS')
    return Protect_CC_details
  }
  get_Protect_CC_details() {
    return this._process.getProcessByType('PROTECT_CC_DETAILS')
  }
  // --------------------Verifies_CC_deytails---------------- ----------- 
  async Verifies_CC_deytails(address_Protect_CC_details) {
    this._user.checkUser(this.sender, 'AQUIRING_BANK')
    let check_Protect_CC_details = this._process.getProcessByAddress(address_Protect_CC_details)
    if (!check_Protect_CC_details || check_Protect_CC_details.type !== 'PROTECT_CC_DETAILS')
      throw 'PROTECT_CC_DETAILS IS NOT EXIST'
    let Verifies_CC_deytails = await this._process.createProcess('VERIFIES_CC_DETAILS')
    return Verifies_CC_deytails
  }
  get_Verifies_CC_deytails() {
    return this._process.getProcessByType('VERIFIES_CC_DETAILS')
  }
  // --------------------Verifies_transaction_type_and_amount---------------- ----------- 
  async Verifies_transaction_type_and_amount(address_Verifies_CC_deytails) {
    this._user.checkUser(this.sender, 'AQUIRING_BANK')
    let check_Verifies_CC_deytails = this._process.getProcessByAddress(address_Verifies_CC_deytails)
    if (!check_Verifies_CC_deytails || check_Verifies_CC_deytails.type !== 'VERIFIES_CC_DETAILS')
      throw 'VERIFIES_CC_DETAILS IS NOT EXIST'
    let Verifies_transaction_type_and_amount = await this._process.createProcess('VERIFIES_TRANSACTION_TYPE_AND_AMOUNT')
    return Verifies_transaction_type_and_amount
  }
  get_Verifies_transaction_type_and_amount() {
    return this._process.getProcessByType('VERIFIES_TRANSACTION_TYPE_AND_AMOUNT')
  }
  // --------------------Authorize_the_available_funds_in_the_CC_holder---------------- ----------- 
  async Authorize_the_available_funds_in_the_CC_holder(address_Verifies_transaction_type_and_amount) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Verifies_transaction = this._process.getProcessByAddress(address_Verifies_transaction_type_and_amount)
    if (!check_Verifies_transaction || check_Verifies_transaction.type !== 'VERIFIES_TRANSACTION_TYPE_AND_AMOUNT')
      throw 'VERIFIES_TRANSACTION_TYPE_AND_AMOUNT IS NOT EXIST'
    let Authorize = await this._process.createProcess('AUTHORIZE_THE_VAILABLE_FUNDS_IN_THE_CCA_HOLDER')
    return Authorize
  }
  get_Authorize_the_available_funds_in_the_CC_holder() {
    return this._process.getProcessByType('AUTHORIZE_THE_VAILABLE_FUNDS_IN_THE_CCA_HOLDER')
  }
  // --------------------Approved---------------- ----------- 
  async Approved(address_Authorize_the_available_funds_in_the_CC_holder) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Authorize = this._process.getProcessByAddress(address_Authorize_the_available_funds_in_the_CC_holder)
    if (!check_Authorize || check_Authorize.type !== 'AUTHORIZE_THE_VAILABLE_FUNDS_IN_THE_CCA_HOLDER')
      throw 'AUTHORIZE_THE_VAILABLE_FUNDS_IN_THE_CCA_HOLDER IS NOT EXIST'
    let Approved = await this._process.createProcess('APPROVED')
    return Approved
  }
  get_Approved() {
    return this._process.getProcessByType('APPROVED')
  }
  // --------------------Sends_reponse---------------- ----------- 
  async Sends_reponse(address_Approved) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let check_Approved = this._process.getProcessByAddress(address_Approved)
    if (!check_Approved || check_Approved.type !== 'APPROVED')
      throw 'APPROVED IS NOT EXIST'
    let Sends_reponse = await this._process.createProcess('SEND_REPONSE')
    return Sends_reponse
  }
  get_Sends_reponse() {
    return this._process.getProcessByType('SEND_REPONSE')
  }
  // --------------------Forwards_reponse_code---------------- ----------- 
  async Forwards_reponse_code(address_Sends_reponse) {
    this._user.checkUser(this.sender, 'AQUIRING_BANK')
    let check_Sends_reponse = this._process.getProcessByAddress(address_Sends_reponse)
    if (!check_Sends_reponse || check_Sends_reponse.type !== 'APPROVED')
      throw 'APPROVED IS NOT EXIST'
    let Forwards_reponse_code = await this._process.createProcess('FORWARDS_REPONSE_CODE')
    return Forwards_reponse_code
  }
  get_Forwards_reponse_code() {
    return this._process.getProcessByType('FORWARDS_REPONSE_CODE')
  }
  // --------------------Recieves_and_forwards_reponse---------------- ----------- 
  async Recieves_and_forwards_reponse(address_Forwards_reponse_code) {
    this._user.checkUser(this.sender, 'PAYMENT_GATEWAY')
    let check_Forwards_reponse_code = this._process.getProcessByAddress(address_Forwards_reponse_code)
    if (!check_Forwards_reponse_code || check_Forwards_reponse_code.type !== 'FORWARDS_REPONSE_CODE')
      throw 'FORWARDS_REPONSE_CODE IS NOT EXIST'
    let Recieves_and_forwards_reponse = await this._process.createProcess('RECIEVES_AND_FORWARDS_REPONSE')
    return Recieves_and_forwards_reponse
  }
  get_Recieves_and_forwards_reponse() {
    return this._process.getProcessByType('RECIEVES_AND_FORWARDS_REPONSE')
  }
  // --------------------interprets_the_relevant_reponse---------------- ----------- 
  async interprets_the_relevant_reponse(address_Recieves_and_forwards_reponse) {
    this._user.checkUser(this.sender, 'MERCHANTS')
    let check_Recieves_and_forwards_reponse = this._process.getProcessByAddress(address_Recieves_and_forwards_reponse)
    if (!check_Recieves_and_forwards_reponse || check_Recieves_and_forwards_reponse.type !== 'RECIEVES_AND_FORWARDS_REPONSE')
      throw 'RECIEVES_AND_FORWARDS_REPONSE IS NOT EXIST'
    let interprets_the_relevant_reponse = await this._process.createProcess('INTERPRETS_THE_RELEVANT_REPONSE')
    return interprets_the_relevant_reponse
  }
  get_interprets_the_relevant_reponse() {
    return this._process.getProcessByType('INTERPRETS_THE_RELEVANT_REPONSE')
  }
}
export default TokenMain;
