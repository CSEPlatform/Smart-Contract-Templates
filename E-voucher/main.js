import Contract from 'Contract'
import Process from './process'
import User from './user'

class TokenMain extends Contract {
  static viewFuncs = [
    'get_Staff',
    'get_Create_Control_Groups',
    'get_Enter_Vouchers',
    'get_Enter_Vouchers_or_Update_Vouchers',
    'get_Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers',
    'get_Update_Vouchers',
    'get_Check_Document_Tokerance',
    'get_Budget_Check_Vouchers',
    'get_Budget_Check_Vouchers_or_Enter_Vouchers',
    'get_Match_Approve_Vouchers',
    'get_Pay_Vouchers',
    'get_Post_Vouchers',
    'get_UnpostVouchers',
    'get_Post_Payments',
    'get_Post_Vouchers_or_Post_Payment',
    'get_Entry_Events',
    'get_Entry_Events_or_Post_Vouchers',
  ]
  static authenticationFuncs = [
    'Create_Control_Groups',
    'Enter_Vouchers',
    'Enter_Vouchers_or_Update_Vouchers',
    'Delete_Voichers',
    'Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers',
    'Update_Vouchers',
    'Check_Document_Tokerance',
    'Budget_Check_Vouchers',
    'Budget_Check_Vouchers_or_Enter_Vouchers',
    'Match_Approve_Vouchers',
    'Pay_Vouchers',
    'Post_Vouchers',
    'UnpostVouchers',
    'Close_Vouchers',
    'Post_Payments',
    'Post_Vouchers_or_Post_Payment',
    'Entry_Events',
    'Entry_Events_or_Post_Vouchers',
    'Generate_Joumals'
  ]
  static publicFuncs = [
    'Staff',
    'get_Staff',
    'Create_Control_Groups',
    'get_Create_Control_Groups',
    'Enter_Vouchers',
    'get_Enter_Vouchers',
    'Enter_Vouchers_or_Update_Vouchers',
    'get_Enter_Vouchers_or_Update_Vouchers',
    'Delete_Voichers',
    'Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers',
    'get_Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers',
    'Update_Vouchers',
    'get_Update_Vouchers',
    'Check_Document_Tokerance',
    'get_Check_Document_Tokerance',
    'Budget_Check_Vouchers',
    'get_Budget_Check_Vouchers',
    'Budget_Check_Vouchers_or_Enter_Vouchers',
    'get_Budget_Check_Vouchers_or_Enter_Vouchers',
    'Match_Approve_Vouchers',
    'get_Match_Approve_Vouchers',
    'Pay_Vouchers',
    'get_Pay_Vouchers',
    'Post_Vouchers',
    'get_Post_Vouchers',
    'UnpostVouchers',
    'get_UnpostVouchers',
    'Close_Vouchers',
    'Post_Payments',
    'get_Post_Payments',
    'Post_Vouchers_or_Post_Payment',
    'get_Post_Vouchers_or_Post_Payment',
    'Entry_Events',
    'get_Entry_Events',
    'Entry_Events_or_Post_Vouchers',
    'get_Entry_Events_or_Post_Vouchers',
    'Generate_Joumals'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'E_VOUCHERS'
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
  //---------------------Staff------------------------------
  async Staff() {
    let staff = await this._user.createUser('STAFF')
    return staff
  }
  get_Staff() {
    let staff = this._user.getUserByType('STAFF')
    return staff
  }
  // --------------------Create_Control_Groups---------------------------
  async Create_Control_Groups() {
    this._user.checkUser(this.sender, 'STAFF')
    let control = await this._process.createProcess('CREATE_CONTROL_GROUPS')
    return control
  }
  get_Create_Control_Groups() {
    return this._process.getProcessByType('CREATE_CONTROL_GROUPS')
  }
  // --------------------Enter_Voichers--------------------------
  check_Enter_Vouchers(address) {
    let check_Enter_Vouchers = this.get_Enter_VouchersByAddress(address)
    if (!check_Enter_Vouchers || check_Enter_Vouchers.type !== 'ENTER_VOUCHERS') throw `ENTER_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Enter_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Enter_Vouchers(address_Create_Control_Groups) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Create_Control_Groups = this._process.getProcessByAddress(address_Create_Control_Groups)
    if (!check_Create_Control_Groups || check_Create_Control_Groups.type !== 'CREATE_CONTROL_GROUPS')
      throw 'CREATE_CONTROL_GROUPS IS NOT EXIST'
    let enter = await this._process.createProcess('ENTER_VOUCHERS')
    return enter
  }
  get_Enter_Vouchers() {
    return this._process.getProcessByType('ENTER_VOUCHERS')
  }
  // --------------------Delete_Voichers--------------------------
  check_Process2(address) {
    this.check_Enter_Vouchers = this.get_Enter_VouchersByAddress(address);
    this.check_Update_Vouchers = this.get_Update_VouchersByAddress(address);
    if (this.check_Enter_Vouchers.type == 'ENTER_VOUCHERS') {
      return true;
    }
    else if (this.check_Update_Vouchers.type == 'UPDATE_VOUCHERS') {
      return true;
    }
    else {
      throw `ENTER_VOUCHERS_OR_UPDATE_VOUCHERS_FOR_CHECK NOT EXIST`;
    }
  }
  async Enter_Vouchers_or_Update_Vouchers() {
    await this.check_Process2(this.sender, 'ENTER_VOUCHERS_OR_UPDATE_VOUCHERS_FOR_CHECK')
    let process2 = await this._process.createProcess('ENTER_VOUCHERS_OR_UPDATE_VOUCHERS')
    return process2
  }
  get_Enter_Vouchers_or_Update_Vouchers() {
    return this._process.getProcessByType('ENTER_VOUCHERS_OR_UPDATE_VOUCHERS')
  }
  async Delete_Voichers(address_Enter_Vouchers_or_Update_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Process2 = this._process.getProcessByAddress(address_Enter_Vouchers_or_Update_Vouchers)
    if (!check_Process2 || check_Process2.type !== 'ENTER_VOUCHERS_OR_UPDATE_VOUCHERS')
      throw 'ENTER_VOUCHERS_OR_UPDATE_VOUCHERS IS NOT EXIST'
    let Delete_Vouchers = await this._process.createProcess('DELETE_EVENTS')
    this.setToAddress(Delete_Vouchers.address)
    return { Delete_Vouchers }
  }
  // --------------------Update_Vouchers--------------------------
  checkProcess(address) {
    this.check_Unpost_Vouchers = this.get_Unpost_VouchersByAddress(address);
    this.check_Enter_Vouchers = this.get_Enter_VouchersByAddress(address);
    this.check_Match_Approve_Vouchers = this.get_Match_Approve_VouchersByAddress(address);

    if (this.check_Unpost_Vouchers.type == 'UNPOST_VOUCHERS') {
      return true;
    }
    else if (this.check_Enter_Vouchers.type == 'ENTER_VOUCHERS') {
      return true;
    }
    else if (this.check_Match_Approve_Vouchers.type == 'MATCH_APPROVE_VOUCHERS') {
      return true;
    }
    else {
      throw `UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers() {
    await this.checkProcess(this.sender, 'UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS_FOR_CHECK')
    let process = await this._process.createProcess('UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS')
    return process
  }
  get_Unpost_Vouchers_or_Enter_Vouchers_or_Match_Approve_Vouchers() {
    return this._process.getProcessByType('UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS')
  }
  check_Update_Vouchers(address) {
    let check_Update_Vouchers = this.get_Update_VouchersByAddress(address)
    if (!check_Update_Vouchers || check_Update_Vouchers.type !== 'UPDATE_VOUCHERS') throw `UPDATE_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Update_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Update_Vouchers(address_Create_Control_Groups) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Process = this._process.getProcessByAddress(address_Create_Control_Groups)
    if (!check_Process || check_Process.type !== 'UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS')
      throw 'UNPOST_VOUCHERS_OR_ENTER_VOUCHERS_OR_MATCH_APPROVE_VOUCHERS IS NOT EXIST'
    let enter = await this._process.createProcess('UPDATE_VOUCHERS')
    return enter
  }
  get_Update_Vouchers() {
    return this._process.getProcessByType('UPDATE_VOUCHERS')
  }
  // --------------------Check_Document_Tokerance--------------------------
  async Check_Document_Tokerance(address_Update_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Update_Voichers = this._process.getProcessByAddress(address_Update_Vouchers)
    if (!check_Update_Voichers || check_Update_Voichers.type !== 'UPDATE_VOUCHERS')
      throw 'UPDATE_VOUCHERS IS NOT EXIST'
    let check = await this._process.createProcess('CHECK_DOCUMENT_TOKERANCE')
    return check
  }
  get_Check_Document_Tokerance() {
    return this._process.getProcessByType('CHECK_DOCUMENT_TOKERANCE')
  }
  // --------------------Budget_Check_Vouchers--------------------------
  check_Budget_Check_Vouchers(address) {
    let check_Budget_Check_Vouchers = this.get_Budget_Check_VouchersByAddress(address)
    if (!check_Budget_Check_Vouchers || check_Budget_Check_Vouchers.type !== 'BUDGET_CHECK_VOUCHERS') throw `BUDGET_CHECK_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Budget_Check_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Budget_Check_Vouchers(address_Check_Document_Tokerance) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Document_Tokerance = this._process.getProcessByAddress(address_Check_Document_Tokerance)
    if (!check_Document_Tokerance || check_Document_Tokerance.type !== 'CHECK_DOCUMENT_TOKERANCE')
      throw 'CHECK_DOCUMENT_TOKERANCE IS NOT EXIST'
    let check = await this._process.createProcess('BUDGET_CHECK_VOUCHERS')
    return check
  }
  get_Budget_Check_Vouchers() {
    return this._process.getProcessByType('BUDGET_CHECK_VOUCHERS')
  }
  // --------------------Match_Approve_Vouchers--------------------------
  check_Process1(address) {
    this.check_Budget_Check_Vouchers = this.get_Budget_Check_VouchersByAddress(address);
    this.check_Enter_Vouchers = this.get_Enter_VouchersByAddress(address);
    if (this.check_Budget_Check_Vouchers.type == 'BUDGET_CHECK_VOUCHERS') {
      return true;
    }
    else if (this.check_Enter_Vouchers.type == 'ENTER_VOUCHERS') {
      return true;
    }
    else {
      throw `BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS_FOR_CHECK NOT EXIST`;
    }
  }
  async Budget_Check_Vouchers_or_Enter_Vouchers() {
    await this.check_Process1(this.sender, 'BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS_FOR_CHECK')
    let process1 = await this._process.createProcess('BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS')
    return process1
  }
  get_Budget_Check_Vouchers_or_Enter_Vouchers() {
    return this._process.getProcessByType('BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS')
  }
  check_Match_Approve_Vouchers(address) {
    let check_Match_Approve_Vouchers = this.get_Match_Approve_VouchersByAddress(address)
    if (!check_Match_Approve_Vouchers || check_Match_Approve_Vouchers.type !== 'MATCH_APPROVE_VOUCHERS') throw `MATCH_APPROVE_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Match_Approve_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Match_Approve_Vouchers(address_Create_Control_Groups) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Process1 = this._process.getProcessByAddress(address_Create_Control_Groups)
    if (!check_Process1 || check_Process1.type !== 'BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS')
      throw 'BUDGET_CHECK_VOUCHERS_OR_ENTER_VOUCHERS IS NOT EXIST'
    let enter = await this._process.createProcess('MATCH_APPROVE_VOUCHERS')
    return enter
  }
  get_Match_Approve_Vouchers() {
    return this._process.getProcessByType('MATCH_APPROVE_VOUCHERS')
  }
  // --------------------Pay_Vouchers--------------------------
  async Pay_Vouchers(address_Match_Approve_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Match_Approve_Vouchers = this._process.getProcessByAddress(address_Match_Approve_Vouchers)
    if (!check_Match_Approve_Vouchers || check_Match_Approve_Vouchers.type !== 'MATCH_APPROVE_VOUCHERS')
      throw 'MATCH_APPROVE_VOUCHERS IS NOT EXIST'
    let pay = await this._process.createProcess('PAY_VOUCHERS')
    return pay
  }
  get_Pay_Vouchers() {
    return this._process.getProcessByType('PAY_VOUCHERS')
  }
  // --------------------Post_Vouchers--------------------------
  check_Post_Vouchers(address) {
    let check_Post_Vouchers = this.get_Post_VouchersByAddress(address)
    if (!check_Post_Vouchers || check_Post_Vouchers.type !== 'POST_VOUCHERS') throw `POST_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Post_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Post_Vouchers(address_Match_Approve_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Match_Approve_Vouchers = this._process.getProcessByAddress(address_Match_Approve_Vouchers)
    if (!check_Match_Approve_Vouchers || check_Match_Approve_Vouchers.type !== 'MATCH_APPROVE_VOUCHERS')
      throw 'MATCH_APPROVE_VOUCHERS IS NOT EXIST'
    let pay = await this._process.createProcess('POST_VOUCHERS')
    return pay
  }
  get_Post_Vouchers() {
    return this._process.getProcessByType('POST_VOUCHERS')
  }
  // --------------------UnpostVouchers--------------------------
  check_Unpost_Vouchers(address) {
    let check_Unpost_Vouchers = this.get_Unpost_VouchersByAddress(address)
    if (!check_Unpost_Vouchers || check_Unpost_Vouchers.type !== 'UNPOST_VOUCHERS') throw `UNPOST_VOUCHERS IS NOT EXIST`
    return true
  }
  get_Unpost_VouchersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async UnpostVouchers(address_Post_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Post_Vouchers = this._process.getProcessByAddress(address_Post_Vouchers)
    if (!check_Post_Vouchers || check_Post_Vouchers.type !== 'POST_VOUCHERS')
      throw 'POST_VOUCHERS IS NOT EXIST'
    let Unpost_Vouchers = await this._process.createProcess('UNPOST_VOUCHERS')
    return Unpost_Vouchers
  }
  get_UnpostVouchers() {
    return this._process.getProcessByType('UNPOST_VOUCHERS')
  }
  // --------------------Close_Vouchers--------------------------
  async Close_Vouchers(address_Post_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Post_Vouchers = this._process.getProcessByAddress(address_Post_Vouchers)
    if (!check_Post_Vouchers || check_Post_Vouchers.type !== 'POST_VOUCHERS')
      throw 'POST_VOUCHERS IS NOT EXIST'
    let close = await this._process.createProcess('CLOSE_VOUCHERS')
    this.setToAddress(close.address)
    return { close }
  }
  // --------------------Post_Payments--------------------------
  check_Post_Payments(address) {
    let check_Post_Payments = this.get_Post_PaymentsByAddress(address)
    if (!check_Post_Payments || check_Post_Payments.type !== 'POST_PAYMENT') throw `POST_PAYMENT IS NOT EXIST`
    return true
  }
  get_Post_PaymentsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Post_Payments(address_Pay_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Pay_Vouchers = this._process.getProcessByAddress(address_Pay_Vouchers)
    if (!check_Pay_Vouchers || check_Pay_Vouchers.type !== 'PAY_VOUCHERS')
      throw 'PAY_VOUCHERS IS NOT EXIST'
    let payment = await this._process.createProcess('POST_PAYMENT')
    return payment
  }
  get_Post_Payments() {
    return this._process.getProcessByType('POST_PAYMENT')
  }
  // --------------------Entry_Events--------------------------
  check_Process3(address) {
    this.check_Post_Vouchers = this.get_Post_VouchersByAddress(address);
    this.check_Post_Payments = this.get_Post_PaymentsByAddress(address);
    if (this.check_Post_Vouchers.type == 'POST_VOUCHERS') {
      return true;
    }
    else if (this.check_Post_Payments.type == 'POST_PAYMENT') {
      return true;
    }
    else {
      throw `POST_VOUCHERS_OR_POST_PAYMENT_FOR_CHECK NOT EXIST`;
    }
  }
  async Post_Vouchers_or_Post_Payment() {
    await this.check_Process3(this.sender, 'POST_VOUCHERS_OR_POST_PAYMENT_FOR_CHECK')
    let process3 = await this._process.createProcess('POST_VOUCHERS_OR_POST_PAYMENT')
    return process3
  }
  get_Post_Vouchers_or_Post_Payment() {
    return this._process.getProcessByType('POST_VOUCHERS_OR_POST_PAYMENT')
  }

  check_Entry_Events(address) {
    let check_Entry_Events = this.get_Entry_EventsByAddress(address)
    if (!check_Entry_Events || check_Entry_Events.type !== 'ENTRY_EVENTS') throw `ENTRY_EVENTS IS NOT EXIST`
    return true
  }
  get_Entry_EventsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Entry_Events(address_Create_Control_Groups) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Process3 = this._process.getProcessByAddress(address_Create_Control_Groups)
    if (!check_Process3 || check_Process3.type !== 'POST_VOUCHERS_OR_POST_PAYMENT')
      throw 'POST_VOUCHERS_OR_POST_PAYMENT IS NOT EXIST'
    let entry = await this._process.createProcess('ENTRY_EVENTS')
    return entry
  }
  get_Entry_Events() {
    return this._process.getProcessByType('ENTRY_EVENTS')
  }
  // --------------------Generate_Joumals--------------------------
  check_Process4(address) {
    this.check_Entry_Events = this.get_Entry_EventsByAddress(address);
    this.check_Post_Vouchers = this.get_Post_PaymentsByAddress(address);
    if (this.check_Post_Vouchers.type == 'POST_VOUCHERS') {
      return true;
    }
    else if (this.check_Entry_Events.type == 'ENTRY_EVENTS') {
      return true;
    }
    else {
      throw `POST_VOUCHERS_OR_ENTRY_EVENTS_FOR_CHECK NOT EXIST`;
    }
  }
  async Entry_Events_or_Post_Vouchers() {
    await this.check_Process4(this.sender, 'POST_VOUCHERS_OR_ENTRY_EVENTS_FOR_CHECK')
    let process4 = await this._process.createProcess('POST_VOUCHERS_OR_ENTRY_EVENTS')
    return process4
  }
  get_Entry_Events_or_Post_Vouchers() {
    return this._process.getProcessByType('POST_VOUCHERS_OR_ENTRY_EVENTS')
  }
  async Generate_Joumals(address_Entry_Events_or_Post_Vouchers) {
    this._user.checkUser(this.sender, 'STAFF')
    let check_Process3 = this._process.getProcessByAddress(address_Entry_Events_or_Post_Vouchers)
    if (!check_Process3 || check_Process3.type !== 'POST_VOUCHERS_OR_ENTRY_EVENTS')
      throw 'POST_VOUCHERS_OR_ENTRY_EVENTS IS NOT EXIST'
    let Generate = await this._process.createProcess('GENERATE_JOUMALS')
    this.setToAddress(Generate.address)
    return { Generate }
  }
}
export default TokenMain;
