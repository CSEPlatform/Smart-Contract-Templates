import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Insert_bank_card_to_machine',
    'get_Enter_bank_account_to_machine',
    'get_Receiver_bank_account',
    'get_Cheque_inserted_to_machine',
    'get_Value',
    'get_Sender_Account',
    'get_7_days',
    'get_Sender_review',
    'get_Sender_authorise',
    'get_Money_trasferred_to_receiver',
    'get_Invalid_Transaction ',
  ]
  static authenticationFuncs = [
    'Insert_bank_card_to_machine',
    'Enter_bank_account_to_machine',
    'Receiver_bank_account',
    'Cheque_inserted_to_machine',
    'Value',
    'Sender_Account',
    '7_days',
    'Sender_review',
    'Sender_authorise',
    'Money_trasferred_to_receiver',
    'Invalid_Transaction ',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Insert_bank_card_to_machine',
    'get_Insert_bank_card_to_machine',
    'Enter_bank_account_to_machine',
    'get_Enter_bank_account_to_machine',
    'Receiver_bank_account',
    'get_Receiver_bank_account',
    'Cheque_inserted_to_machine',
    'get_Cheque_inserted_to_machine',
    'Value',
    'get_Value',
    'Sender_Account',
    'get_Sender_Account',
    '7_days',
    'get_7_days',
    'Sender_review',
    'get_Sender_review',
    'Sender_authorise',
    'get_Sender_authorise',
    'Money_trasferred_to_receiver',
    'get_Money_trasferred_to_receiver',
    'Invalid_Transaction ',
    'get_Invalid_Transaction',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CHEQUE_DEPOSIT'
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
    let user = await this._user.createUser('USER')
    return user
  }
  get_User() {
    let user = this._user.getUserByType('USER')
    return user
  }
  // --------------------Insert_bank_card_to_machine---------------------------
  check_Insert(address) {
    let check_Insert = this.get_InsertByAddress(address)
    if (!check_Insert || check_Insert.type !== 'INSERT_BANK_CARD_TO_MACHINE') throw `INSERT_BANK_CARD_TO_MACHINE IS NOT EXIST`
    return true
  }
  get_InsertByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Insert_bank_card_to_machine() {
    await this._user.checkUser(this.sender, 'USER')
    let insert = await this._process.createProcess('INSERT_BANK_CARD_TO_MACHINE')
    return insert
  }
  get_Insert_bank_card_to_machine() {
    return this._process.getProcessByType('INSERT_BANK_CARD_TO_MACHINE')
  }
  // --------------------Enter_bank_account_to_machine---------------------------
  check_Enter(address) {
    let check_Enter = this.get_EnterByAddress(address)
    if (!check_Enter || check_Enter.type !== 'ENTER_BANK_ACCOUNT_TO_MACHINE') throw `ENTER_BANK_ACCOUNT_TO_MACHINE IS NOT EXIST`
    return true
  }
  get_EnterByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Enter_bank_account_to_machine() {
    await this._user.checkUser(this.sender, 'USER')
    let enter = await this._process.createProcess('ENTER_BANK_ACCOUNT_TO_MACHINE')
    return enter
  }
  get_Enter_bank_account_to_machine() {
    return this._process.getProcessByType('ENTER_BANK_ACCOUNT_TO_MACHINE')
  }
  // --------------------Receiver_bank_account--------------------------- 
  checkProcess1(address) {
    this.check_Insert = this.get_InsertByAddress(address);
    this.check_Enter = this._act.get_EnterByAddress(address);
    if (this.checkAccount.type == 'INSERT_BANK_CARD_TO_MACHINE') {
      return true;
    }
    else if (this._act.checkAct.type == 'ENTER_BANK_ACCOUNT_TO_MACHINE') {
      return true;
    }
    else {
      throw `INSERT_BANK_CARD_TO_MACHINE_OR_ENTER_BANK_ACCOUNT_TO_MACHINE IS NOT EXIST`;
    }
  }
  async Check_Receiver_bank_account() {
    await this.checkProcess1(this.sender, 'INSERT_BANK_CARD_TO_MACHINE_OR_ENTER_BANK_ACCOUNT_TO_MACHINE')
    let check = await this._process.createProcess('CHECK_RECEIVER_BANKS_ACCOUNT')
    return check
  }
  get_Check_Receiver_bank_account() {
    return this._process.getProcessByType('DEPOSIT_PROCESS')
  }
  async Receiver_bank_account(address_Check_Receiver_bank_account) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Receiver_bank_account = this._process.getProcessByAddress(address_Check_Receiver_bank_account)
    if (!check_Check_Receiver_bank_account || check_Check_Receiver_bank_account.type !== 'CHECK_RECEIVER_BANKS_ACCOUNT')
      throw 'CREATECHECK_RECEIVER_BANKS_ACCOUNT_PRODUCT IS NOT EXIST'
    let Receiver_bank_account = await this._process.createProcess('RECEIVER_BANKS_ACCOUNT')
    return Receiver_bank_account
  }
  get_Receiver_bank_account() {
    return this._process.getProcessByType('RECEIVER_BANKS_ACCOUNT')
  }
  // --------------------Cheque_inserted_to_machine--------------------------- 
  async Cheque_inserted_to_machine(address_Receiver_bank_account) {
    this._user.checkUser(this.sender, 'USER')
    let check_Receiver_bank_account = this._process.getProcessByAddress(address_Receiver_bank_account)
    if (!check_Receiver_bank_account || check_Receiver_bank_account.type !== 'RECEIVER_BANKS_ACCOUNT')
      throw 'RECEIVER_BANKS_ACCOUNT IS NOT EXIST'
    let cheque = await this._process.createProcess('CHEQUE_INSERTED_TO_MACHINE')
    return cheque
  }
  get_Cheque_inserted_to_machine() {
    return this._process.getProcessByType('CHEQUE_INSERTED_TO_MACHINE')
  }
  // --------------------Value--------------------------- 
  async Value(address_Receiver_bank_account) {
    this._user.checkUser(this.sender, 'USER')
    let check_cheque = this._process.getProcessByAddress(address_Receiver_bank_account)
    if (!check_cheque || check_cheque.type !== 'CHEQUE_INSERTED_TO_MACHINE')
      throw 'CHEQUE_INSERTED_TO_MACHINE IS NOT EXIST'
    let Value = await this._process.createProcess('VALUE')
    return Value
  }
  get_Value() {
    return this._process.getProcessByType('VALUE')
  }
  // --------------------Sender_Account--------------------------- 
  async Sender_Account(address_Value) {
    this._user.checkUser(this.sender, 'USER')
    let check_Value = this._process.getProcessByAddress(address_Value)
    if (!check_Value || check_Value.type !== 'VALUE')
      throw 'VALUE IS NOT EXIST'
    let Sender_Account = await this._process.createProcess('SENDER_ACCOUNT')
    return Sender_Account
  }
  get_Sender_Account() {
    return this._process.getProcessByType('SENDER_ACCOUNT')
  }
  // --------------------Days_7--------------------------- 
  async Days_7(address_Value) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sender_Account = this._process.getProcessByAddress(address_Value)
    if (!check_Sender_Account || check_Sender_Account.type !== 'SENDER_ACCOUNT')
      throw 'SENDER_ACCOUNT IS NOT EXIST'
    let Days_7 = await this._process.createProcess('DAYS_7')
    return Days_7
  }
  get_Days_7() {
    return this._process.getProcessByType('DAYS_7')
  }
  // --------------------Sender_review--------------------------- 
  async Sender_review(address_Days_7) {
    this._user.checkUser(this.sender, 'USER')
    let check_Days = this._process.getProcessByAddress(address_Days_7)
    if (!check_Days || check_Days.type !== 'DAYS_7')
      throw 'DAYS_7 IS NOT EXIST'
    let Sender_review = await this._process.createProcess('SENDER_REVIEW')
    return Sender_review
  }
  get_Sender_review() {
    return this._process.getProcessByType('SENDER_REVIEW')
  }
  // --------------------Sender_authorise--------------------------- 
  async Sender_authorise(address_Sender_review) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sender_review = this._process.getProcessByAddress(address_Sender_review)
    if (!check_DSender_review || check_Sender_review.type !== 'SENDER_REVIEW')
      throw 'SENDER_REVIEW IS NOT EXIST'
    let Sender_authorise = await this._process.createProcess('SENDER_AUTHORISE')
    return Sender_authorise
  }
  get_Sender_authorise() {
    return this._process.getProcessByType('SENDER_AUTHORISE')
  }
  // --------------------Money_trasferred_to_receiver--------------------------- 
  async Money_trasferred_to_receiver(address_Sender_authorise) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sender_authorise = this._process.getProcessByAddress(address_Sender_authorise)
    if (!check_Sender_authorise || check_Sender_authorise.type !== 'SENDER_AUTHORISE')
      throw 'SENDER_AUTHORISE IS NOT EXIST'
    let Money_trasferred_to_receiver = await this._process.createProcess('MONEY_TRASFERRED_TO_RECEIVER')
    return Money_trasferred_to_receiver
  }
  get_Money_trasferred_to_receiver() {
    return this._process.getProcessByType('MONEY_TRASFERRED_TO_RECEIVER')
  }
  // --------------------Invalid_Transaction--------------------------- 
  async Invalid_Transaction(address_Sender_authorise) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sender_authorise = this._process.getProcessByAddress(address_Sender_authorise)
    if (!check_Sender_authorise || check_Sender_authorise.type !== 'SENDER_AUTHORISE')
      throw 'SENDER_AUTHORISE IS NOT EXIST'
    let Invalid_Transaction = await this._process.createProcess('INVALID_TRANSACTION')
    return Invalid_Transaction
  }
  get_Invalid_Transaction() {
    return this._process.getProcessByType('INVALID_TRANSACTION')
  }
}
export default TokenMain;
