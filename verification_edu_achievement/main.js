import Contract from 'Contract'
import User from './users'
import Message from './message'
import Verify from './verify'
import Pocess from './process'
import Process from './process'

class TokenMain extends Contract {
  static viewFuncs = [
    'get_Create_new_customer',
    'get_Customer',
    'get_Place_Order',
    'get_Create_new_Order',
    'get_Admin',
    'get_Create_a_payback',
  ]
  static authenticationFuncs = [
    'createCustomer',
    'Check_Customer',
    'Create_new_Order',
    'Input_send_wallet',
    'Create_a_payback',
    'Input_Info',
    'Transfer',
  ]
  static publicFuncs = [
    'Student',
    'get_Student',
    'contractInstition',
    'get_contractInstition',
    'requiresSystem',
    'get_requiresSystem',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'VERIFICATION EDUCATION ACHIEVEMENT'
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
    this._verify = new Verify(data)
    this._message = new Message(data)
    this._process = new Process(data)
  }
 // --------------------USER---------------------------
  async Student() {
    let student = await this._user.createUser('STUDENT')
    return student
  }
  get_Student() {
    let student = this._user.getUserByType('STUDENT')
    return student
  }
  async Manege() {
    let Sc = await this._user.createUser('SCHOOL_OR_COMPANY')
    return Sc
  }
  get_Manege() {
    let Sc = this._user.getUserByType('SCHOOL_OR_COMPANY')
    return Sc
  }
   // --------------------CONTRACT_INSTITION---------------------------
   async contactsInstition() {
    this._user.checkUser(this.sender, 'STUDENT')
    let CI= await this._process.createProcess('CONTACTS_INSTITION')
    return CI
  }
  get_contactsInstition() {
    return this._process.getProcessByType('CONTACTS_INSTITION')
  }
  // --------------------CONTACTS_INSTITION---------------------------
  async verifyContacts(address_contractInstition) {
    this._user.checkUser(this.sender, 'SCHOOL_OR_COMPANY')
    let check_contractInstition = this._process.getProcessByAddress(address_contractInstition)
    if (!check_contractInstition || check_contractInstition.type !== 'CONTACTS_INSTITION')
      throw 'CONTACTS_INSTITION IS NOT EXIST'
    let verifyContacts = await this._process.createProcess('VERIFY_CONTACTS')
    return verifyContacts
  }
  get_verifyContacts() {
    return this._process.getProcessByType('VERIFY_CONTACTS')
  }
  // --------------------MULTISIGNATURE---------------------------
  async Multisgnature(address_verifyContacts) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_verifyContacts = this._process.getProcessByAddress(address_verifyContacts)
    if (!check_verifyContacts || check_verifyContacts.type !== 'VERIFY_CONTACTS')
      throw 'VERIFY_CONTACTS IS NOT EXIST'
    let Multisgnature = await this._process.createProcess('MULTISIGNATURE')
    return Multisgnature
  }
  get_Multisgnature() {
    return this._process.getProcessByType('MULTISIGNATURE')
  } 
  // --------------------CHECK_MULTISIGNATURE---------------------------
  async checkMultisgnature(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'VERIFY FAIL'
    await this._message.checkMessage(this.sender)
    let verify = await this._verify.createVerify(type - 1, this.sender)
    this.setToAddress(user.address)
    return verify
  }
  async Correct() {
    await this._message.checkMessage(this.sender)
    return this._verify.getVerifyByType('YES', this.sender)
  }
  
  async Incorrect() {
    await this._message.checkMessage(this.sender)
    return this._verify.getVerifyByType('NO', this.sender)
  }
   // --------------------TERMINATES_PROCESS---------------------------
   async terminatesProcess(address_Incorrect) {
    this._user.checkUser(this.sender, 'SCHOOL_OR_COMPANY')
    let check_Incorrect = this._process.getProcessByAddress(address_Incorrect)
    if (!check_Incorrect || check_Incorrect.type !== 'NO')
      throw 'NO IS NOT EXIST'
    let TP = await this._process.createProcess('TERMINATES_PROCESS')
    return TP
  }
  get_terminatesProcess() {
    return this._process.getProcessByType('TERMINATES_PROCESS')
  } 
  // --------------------SIGNED---------------------------
  async Signed (address_Correct) {
    this._user.checkUser(this.sender, 'STUDENT')
    let check_Correct = this._process.getProcessByAddress(address_Correct)
    if (!check_Correct || check_Correct.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let Signed = await this._process.createProcess('SIGN_SUCCESS')
    return Signed
  }
  get_Signed() {
    return this._process.getProcessByType('SIGN_SUCCESS')
  }
  // --------------------VERIFY_SIGNED---------------------------
  async verifySigned(address_Signed) {
    this._user.checkUser(this.sender, 'SCHOOL_OR_COMPANY')
    let check_Signed = this._process.getProcessByAddress(address_Signed)
    if (!check_Signed || check_Signed.type !== 'SIGN_SUCCESS')
      throw 'SIGN_SUCCESS IS NOT EXIST'
    let verifySigned = await this._process.createProcess('VERIFY_SIGNED')
    return verifySigned
  }
  get_verifySigned() {
    return this._process.getProcessByType('VERIFY_SIGNED')
  }
}
export default TokenMain