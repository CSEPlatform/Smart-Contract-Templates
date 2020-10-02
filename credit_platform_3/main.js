import Contract from 'Contract'
import User from './users'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Student',
    'get_University',
    'get_System',
	'get_Enrolls',
    'Student_ID',
	'get_Student_ID',
    'get_Generates',
    'get_Generrates_publicKey',
    'get_Store',
    'get_Tranfer',
    'get_Provides',
    'get_setup_wallet',
    'get_Setup_multisig',
    'get_Safely',
    'get_Using',
    'get_Signs_Tras',
    'get_Transaction1',
    'get_Transaction2'
  ]
  static authenticationFuncs = [
     'Enrolls',
    'Student_ID',
    'Generates',
    'Generrates_publicKey',
    'Store',
    'Tranfer',
    'Provides',
    'setup_wallet',
    'Setup_multisig',
    'Safely',
    'Using',
    'Signs_Tras',
    'Confirm_student',
    'Transaction1',
    'Transaction2',
    'Unprocessed_transaction'
  ]
  static publicFuncs = [
    'Student',
    'get_Student',
    'University',
    'get_University',
    'System',
    'get_System',
    'Enrolls',
	'get_Enrolls',
    'Student_ID',
	'get_Student_ID',
    'Generates',
	'get_Generates',
    'Generrates_publicKey',
	'get_Generrates_publicKey',
    'Store',
	'get_Store',
    'Tranfer',
	'get_Tranfer',
    'Provides',
	'get_Provides',
    'setup_wallet',
	'get_setup_wallet',
    'Setup_multisig',
	'get_Setup_multisig',
    'Safely',
	'get_Safely',
    'Using',
	'get_Using',
    'Signs_Tras',
	'get_Signs_Tras',
    'Confirm_student',
    'Transaction1',
	'get_Transaction1',
    'Transaction2',
	'get_Transaction2',
    'Unprocessed'

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
  async University() {
    let University = await this._user.createUser('UNIVERSITY')
    return University
  }
  get_University() {
    let University = this._user.getUserByType('UNIVERSITY')
    return University
  }
  async System() {
    let System = await this._user.createUser('SYSTEM')
    return System
  }
  get_System() {
    let System = this._user.getUserByType('SYSTEM')
    return System
  }
  // --------------------Enrolls---------------------------
  async Enrolls() {
    this._user.checkUser(this.sender, 'STUDENT')
    let Enrolls = await this._process.createProcess('ENROLLS')
    return Enrolls
  }
  get_Enrolls() {
    return this._process.getProcessByType('ENROLLS')
  }
  // --------------------Student_ID---------------------------
  async Student_ID(address_Enrolls) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Enrolls = this._process.getProcessByAddress(address_Enrolls)
    if (!check_Enrolls || check_Enrolls.type !== 'ENROLLS')
      throw 'ENROLLS IS NOT EXIST'
    let Student_ID = await this._process.createProcess('STUDENT_ID')
    return Student_ID
  }
  get_Student_ID() {
    return this._process.getProcessByType('STUDENT_ID')
  }
  // --------------------Generates---------------------------
  async Generates(address_Student_ID) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Student_ID = this._process.getProcessByAddress(address_Student_ID)
    if (!check_Student_ID || check_Student_ID.type !== 'STUDENT_ID')
      throw 'STUDENT_ID IS NOT EXIST'
    let Generates = await this._process.createProcess('GENERATES')
    return Generates
  }
  get_Generates() {
    return this._process.getProcessByType('GENERATES')
  }
  // --------------------Generates---------------------------
  async Generates(address_Student_ID) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Student_ID = this._process.getProcessByAddress(address_Student_ID)
    if (!check_Student_ID || check_Student_ID.type !== 'STUDENT_ID')
      throw 'STUDENT_ID IS NOT EXIST'
    let Generates = await this._process.createProcess('GENERATES')
    return Generates
  }
  get_Generates() {
    return this._process.getProcessByType('GENERATES')
  }
  // --------------------Generrates_publicKey---------------------------
  async Generrates_publicKey(address_Generates) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Generates = this._process.getProcessByAddress(address_Generates)
    if (!check_Generates || check_Generates.type !== 'GENERATES')
      throw 'STUDENT_ID IS NOT EXIST'
    let Generrates_publicKey = await this._process.createProcess('GENERATESB_PUBLICKEY')
    return Generrates_publicKey
  }
  get_Generrates_publicKey() {
    return this._process.getProcessByType('GENERATESB_PUBLICKEY')
  }
  // --------------------Store---------------------------
  async Store(address_Generrates_publicKey) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Generrates_publicKey = this._process.getProcessByAddress(address_Generrates_publicKey)
    if (!check_Generrates_publicKey || check_Generrates_publicKey.type !== 'GENERATESB_PUBLICKEY')
      throw 'GENERATESB_PUBLICKEY IS NOT EXIST'
    let Store = await this._process.createProcess('STORE')
    return Store
  }
  get_Store() {
    return this._process.getProcessByType('STORE')
  }
  // --------------------Tranfer---------------------------
  async Tranfer(address_Store) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Store = this._process.getProcessByAddress(address_Store)
    if (!check_Store || check_Store.type !== 'STORE')
      throw 'STORE IS NOT EXIST'
    let Tranfer = await this._process.createProcess('TRANFER')
    return Tranfer
  }
  get_Tranfer() {
    return this._process.getProcessByType('TRANFER')
  }
  // --------------------Provides---------------------------
  async Provides(address_Tranfer) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Tranfer = this._process.getProcessByAddress(address_Tranfer)
    if (!check_Tranfer || check_Tranfer.type !== 'TRANFER')
      throw 'TRANFER IS NOT EXIST'
    let Provides = await this._process.createProcess('PROVIDES')
    return Provides
  }
  get_Provides() {
    return this._process.getProcessByType('PROVIDES')
  }
  // --------------------setup_wallet---------------------------
  async setup_wallet(address_Provides) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_Provides = this._process.getProcessByAddress(address_Provides)
    if (!check_Provides || check_Provides.type !== 'PROVIDES')
      throw 'PROVIDES IS NOT EXIST'
    let setup_wallet = await this._process.createProcess('SETUP_WALLET')
    return setup_wallet
  }
  get_setup_wallets() {
    return this._process.getProcessByType('SETUP_WALLET')
  }
  // --------------------Setup_multisig---------------------------
  async Setup_multisig(address_setup_wallet) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_setup_wallet = this._process.getProcessByAddress(address_setup_wallet)
    if (!check_setup_wallet || check_setup_wallet.type !== 'SETUP_WALLET')
      throw 'SETUP_WALLET IS NOT EXIST'
    let Setup_multisig = await this._process.createProcess('SETUP_MULTISIG')
    return Setup_multisig
  }
  get_Setup_multisig() {
    return this._process.getProcessByType('SETUP_MULTISIG')
  }
  // --------------------Safely---------------------------
  async Safely(address_Setup_multisig) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_Setup_multisig = this._process.getProcessByAddress(address_Setup_multisig)
    if (!check_Setup_multisig || check_Setup_multisig.type !== 'SETUP_MULTISIG')
      throw 'SETUP_MULTISIG IS NOT EXIST'
    let Safely = await this._process.createProcess('SAFELY')
    return Safely
  }
  get_Safely() {
    return this._process.getProcessByType('SAFELY')
  }
  // --------------------Using---------------------------
  async Using(address_Safely) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_Safely = this._process.getProcessByAddress(address_Safely)
    if (!check_Safely || check_Safely.type !== 'SAFELY')
      throw 'SAFELY IS NOT EXIST'
    let Using = await this._process.createProcess('USING')
    return Using
  }
  get_Using() {
    return this._process.getProcessByType('USING')
  }
  // --------------------Signs_Tras---------------------------
  async Signs_Tras(address_Using) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Using = this._process.getProcessByAddress(address_Using)
    if (!check_Using || check_Using.type !== 'USING')
      throw 'USING IS NOT EXIST'
    let Signs_Tras = await this._process.createProcess('SIGNS_TRAS')
    return Signs_Tras
  }
  get_Signs_Tras() {
    return this._process.getProcessByType('SIGNS_TRAS')
  }
  // --------------------Confirm_student---------------------------
  async Confirm_student(address_Signs_Tras) {
    this._user.checkUser(this.sender, 'UNIVERSITY')
    let check_Signs_Tras = this._process.getProcessByAddress(address_Signs_Tras)
    if (!check_Signs_Tras || check_Signs_Tras.type !== 'SIGNS_TRAS')
      throw 'SIGNS_TRAS IS NOT EXIST'
    let Confirm_student = await this._process.createProcess('CONFIRM_STUDENT')
    this.setToAddress(Confirm_student.address)
    return 'SUCCESS'
  }
  // --------------------Transaction1---------------------------
  async Transaction1(address_Signs_Tras) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Signs_Tras = this._process.getProcessByAddress(address_Signs_Tras)
    if (!check_Signs_Tras || check_Signs_Tras.type !== 'SIGNS_TRAS')
      throw 'SIGNS_TRAS IS NOT EXIST'
    let Transaction1 = await this._process.createProcess('TRANSACTION_PR')
    return Transaction1
  }
  get_Transaction1() {
    return this._process.getProcessByType('TRANSACTION_PR')
  }
  // --------------------Transaction2---------------------------
  async Transaction_Inse(address_Transaction_Pro) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Transaction_Pro = this._process.getProcessByAddress(address_Transaction_Pro)
    if (!check_Transaction_Pro || check_Transaction_Pro.type !== 'TRANSACTION_PR')
      throw 'TRANSACTION_PR IS NOT EXIST'
    let Transaction2 = await this._process.createProcess('TRANSACTION_INSE')
    return Transaction2
  }
  get_Transaction2() {
    return this._process.getProcessByType('TRANSACTION_INSE')
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