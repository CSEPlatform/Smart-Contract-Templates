import Contract from 'Contract'
import User from './users'
import Process from './process'
import Message from './message'
import Verify from './verify'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Student',
    'get_Professor',
    'get_Admininistration',
    'get_System',
    'get_Wirte_TExam',
    'get_Publishes_exR',
    'get_Std_Exam_sul',
    'get_Able',
    'get_Notify_admin',
    'get_Store',
    'get_Find_student',
    'get_Find_The_amount',
    'get_Contacts',
    'get_Use',
    'get_Confirmatiom',
    'get_Transaction_PR',
    'get_Transaction_Inse',
    'get_Unprocessed'
  ]
  static authenticationFuncs = [
    'Wirte_TExam',
    'Publishes_exR',
    'Std_Exam_sul',
    'Able',
    'Notify_admin',
    'Store',
    'Find_student',
    'Find_The_amount',
    'get_Contacts',
    'Use',
    'Confirmatiom',
    'Mark',
    'Transaction_PR',
    'Transaction_Inse',
    'Unprocessed',
    'Transaction_confirmation'
  ]
  static publicFuncs = [
    'Student',
    'get_Student',
    'Professor',
    'get_Professor',
    'Admininistration',
    'get_Admininistration',
    'System',
    'get_System',
    'Wirte_TExam',
    'get_Wirte_TExam',
    'Publishes_exR',
    'get_Publishes_exR',
    'Std_Exam_sul',
    'get_Std_Exam_sul',
    'Able',
    'get_Able',
    'Notify_admin',
    'get_Notify_admin',
    'Store',
    'get_Storre',
    'Find_student',
    'get_Find_student',
    'Find_The_amount',
    'get_Find_The_amount',
    'Use',
    'get_Use',
    'Confirmatiom',
    'get_Confirmatiom',
    'Mark',
    'Transaction_PR',
    'get_Transaction_PR',
    'Transaction_Inse',
    'get_Transaction_Inse',
    'Unprocessed',
    'get_Unprocessed',
    'Transaction_confirmation'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CREDIT PLATFORM 2'
    },
    accounts: [
      {
        balance: {
          type: Number,
          default: 0
        },
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
    this._verify = new Verify(data)
    this._message = new Message(data)
  }
  // --------------------USER---------------------------
  async Student() {
    let Student = await this._user.createUser('STUDENT')
    return Student
  }
  get_Student() {
    let Student = this._user.getUserByType('STUDENT')
    return Student
  }
  async Professor() {
    let Professor = await this._user.createUser('PROFESSOR')
    return Professor
  }
  get_Professor() {
    let Professor = this._user.getUserByType('PROFESSOR')
    return Professor
  }
  async Admininistration() {
    let Admininistration = await this._user.createUser('ADMINISTRATION')
    return Admininistration
  }
  get_Admininistration() {
    let Admininistration = this._user.getUserByType('ADMINISTRATION')
    return Admininistration
  }
  async System() {
    let System = await this._user.createUser('SYSTEM')
    return System
  }
  get_System() {
    let System = this._user.getUserByType('SYSTEM')
    return System
  }
  // --------------------Wirte_TExam---------------------------
  async Wirte_TExam() {
    this._user.checkUser(this.sender, 'STUDENT')
    let Wirte_TExam = await this._process.createProcess('WRITE_TEXAM')
    return Wirte_TExam
  }
  get_Wirte_TExam() {
    return this._process.getProcessByType('WRITE_TEXAM')
  }
  // --------------------Publishes_exR---------------------------
  async Publishes_exR(address_Wirte_TExam) {
    this._user.checkUser(this.sender, 'PROFESSOR')
    let check_Wirte_TExam = this._process.getProcessByAddress(address_Wirte_TExam)
    if (!check_Wirte_TExam || check_Wirte_TExam.type !== 'WRITE_TEXAM')
      throw 'WRITE_TEXAM IS NOT EXIST'
    let Publishes_exR = await this._process.createProcess('PUBLISHES_EXR')
    return Publishes_exR
  }
  get_Publishes_exR() {
    return this._process.getProcessByType('PUBLISHES_EXR')
  }
  // --------------------Std_Exam_sul---------------------------
  async Std_Exam_sul(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'VERIFY FAIL'
    await this._message.checkMessage(this.sender)
    let verify = await this._verify.createVerify(type - 1, this.sender)
    this.setToAddress(user.address)
    return verify
  }
  async yes() {
    await this._message.checkMessage(this.sender)
    return this._verify.getVerifyByType('YES', this.sender)
  }

  async no() {
    await this._message.checkMessage(this.sender)
    return this._verify.getVerifyByType('NO', this.sender)
  }
  // --------------------Store---------------------------
  async Store(address_yes) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_yes = this._process.getProcessByAddress(address_yes)
    if (!check_yes || check_yes.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let Store = await this._process.createProcess('STORE')
    return Store
  }
  get_Contacts() {
    return this._process.getProcessByType('STORE')
  }
  // --------------------Notify---------------------------
  async Notify(address_no) {
    this._user.checkUser(this.sender, 'PROFESSOR')
    let check_no = this._process.getProcessByAddress(address_no)
    if (!check_no || check_no.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let Notify = await this._process.createProcess('NOTIFY')
    return Notify
  }
  get_Contacts() {
    return this._process.getProcessByType('NOTIFY')
  }
  // --------------------Store---------------------------
  async Store(address_Notify) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_Notify = this._process.getProcessByAddress(address_Notify)
    if (!check_Notify || check_Notify.type !== 'NOTIFY')
      throw 'NOTIFY IS NOT EXIST'
    let Store = await this._process.createProcess('STORE')
    return Store
  }
  get_Store() {
    return this._process.getProcessByType('STORE')
  }
  // --------------------Find_student---------------------------
  async Find_student(address_Store) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_Store = this._process.getProcessByAddress(address_Store)
    if (!check_Store || check_Store.type !== 'STORE')
      throw 'STORE IS NOT EXIST'
    let Find_student = await this._process.createProcess('FIND_STUDENT')
    return Find_student
  }
  get_Find_student() {
    return this._process.getProcessByType('FIND_STUDENT')
  }
  // --------------------Find_The_amount---------------------------
  async Find_The_amount(address_Find_student) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_Find_student = this._process.getProcessByAddress(address_Find_student)
    if (!check_Find_student || check_Find_student.type !== 'FIND_STUDENT')
      throw 'FIND_STUDENT IS NOT EXIST'
    let Find_The_amount = await this._process.createProcess('FIND_THE_AMOUNT')
    return Find_The_amount
  }
  get_Find_student() {
    return this._process.getProcessByType('FIND_THE_AMOUNT')
  }
  // --------------------Use---------------------------
  async Use(address_Find_The_amount) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_Find_The_amount = this._process.getProcessByAddress(address_Find_The_amount)
    if (!check_Find_The_amount || check_Find_The_amount.type !== 'FIND_THE_AMOUNT')
      throw 'FIND_THE_AMOUNT IS NOT EXIST'
    let Use = await this._process.createProcess('USE')
    return Use
  }
  get_Use() {
    return this._process.getProcessByType('USE')
  }
  // --------------------Confirmatiom---------------------------
  async Confirmatiom(address_Use) {
    this._user.checkUser(this.sender, 'ADMINISTRATION')
    let check_Use = this._process.getProcessByAddress(address_Use)
    if (!check_Use || check_Use.type !== 'USE')
      throw 'USE IS NOT EXIST'
    let Confirmatiom = await this._process.createProcess('CONFIRMATION')
    return Confirmatiom
  }
  get_Confirmatiom() {
    return this._process.getProcessByType('CONFIRMATION')
  }
  // --------------------Mark---------------------------
  async Mark(address_Confirmatiom) {
    this._user.checkUser(this.sender, 'ADMINISTRATION ')
    let check_Confirmatiom = this._process.getProcessByAddress(address_Confirmatiom)
    if (!check_Confirmatiom || check_Confirmatiom.type !== 'CONFIRMATION')
      throw 'CONFIRMATION IS NOT EXIST'
    let Mark = await this._process.createProcess('MARK')
    return Mark
  }
  // --------------------Transaction_PR---------------------------
  async Transaction_PR(address_Use) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Use = this._process.getProcessByAddress(address_Use)
    if (!check_Use || check_Use.type !== 'USE')
      throw 'USE IS NOT EXIST'
    let Transaction_PR = await this._process.createProcess('TRANSACTION_PR')
    return Transaction_PR
  }
  get_Transaction_PR() {
    return this._process.getProcessByType('TRANSACTION_PR')
  }
  // --------------------Transaction_Inse---------------------------
  async Transaction_Inse(address_Transaction_Pro) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Transaction_Pro = this._process.getProcessByAddress(address_Transaction_Pro)
    if (!check_Transaction_Pro || check_Transaction_Pro.type !== 'TRANSACTION_PR')
      throw 'TRANSACTION_PR IS NOT EXIST'
    let Transaction_Inse = await this._process.createProcess('TRANSACTION_INSE')
    return Transaction_Inse
  }
  get_Transaction_Inse() {
    return this._process.getProcessByType('TRANSACTION_INSE')
  }
  // --------------------Unprocessed---------------------------
  async Unprocessed(address_Transaction_Inse) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Transaction_Inse = this._process.getProcessByAddress(address_Transaction_Inse)
    if (!check_Transaction_Inse || check_Transaction_Inse.type !== 'TRANSACTION_INSE')
      throw 'TRANSACTION_INSE IS NOT EXIST'
    let Unprocessed = await this._process.createProcess('UNPROCESSED')
    return Unprocessed
  }
  get_Transaction_Inse() {
    return this._process.getProcessByType('UNPROCESSED')
  }
  // --------------------Unprocessed---------------------------
  async Unprocessed(address_Transaction_Inse) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Transaction_Inse = this._process.getProcessByAddress(address_Transaction_Inse)
    if (!check_Transaction_Inse || check_Transaction_Inse.type !== 'TRANSACTION_INSE')
      throw 'TRANSACTION_INSE IS NOT EXIST'
    let TransCon = await this._process.createProcess('TRANSACTION_CONFIRMATION')
    this.setToAddress(TransCon.address)
    return 'SUCCESS'
  }
}
export default TokenMain