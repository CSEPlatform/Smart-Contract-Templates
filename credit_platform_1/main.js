import Contract from 'Contract'
import User from './users'
import Process from './process'

class TokenMain extends Contract {
  static viewFuncs = [
    'get_New_Univer',
    'get_Member_Univer',
    'get_System',
    'get_Attempt',
    'get_Generates_BL',
    'get_Safely_Store',
    'get_Contacts',
    'get_Receiving_RJ',
    'get_Verifies',
    'get_Tranfer1',
    'get_Send_inf',
    'get_Receiving_RR',
    'get_Tranfer2',
    'get_Notifies',
    'get_Verifies_theE',
    'get_Tranfer3',
    'get_Propagates',
    'get_Send_IntructionsToU',
    'get_Transaction_Pro',
    'get_Transaction_Inse'
  ]
  static authenticationFuncs = [
    'Attempt',
    'Generates_BL',
    'Safely_Store',
    'Contacts',
    'Receiving_RJ',
    'Verifies',
    'Tranfer1',
    'Send_inf',
    'Receiving_RR',
    'Tranfer2',
    'Notifies',
    'Verifies_theE',
    'Tranfer3',
    'Propagates',
    'Send_IntructionsToU',
    'SetUp_BL',
    'Transaction_Pro',
    'Transaction_Inse',
    'Unprocessed'
  ]
  static publicFuncs = [
    'New_Univer',
    'get_New_Univer',
    'Member_Univer',
    'get_Member_Univer',
    'System',
    'get_System',
    'Attempt',
    'get_Attempt',
    'Generates_BL',
    'get_Generates_BL',
    'Safely_Store',
    'get_Safely_Store',
    'Contacts',
    'get_Contacts',
    'Receiving_RJ',
    'get_Receiving_RJ',
    'Verifies',
    'get_Verifies',
    'Tranfer1',
    'get_Tranfer1',
    'Send_inf',
    'get_Send_inf',
    'Receiving_RR',
    'get_Receiving_RR',
    'Tranfer2',
    'get_Tranfer2',
    'Notifies',
    'get_Notifies',
    'Verifies_theE',
    'Tranfer3',
    'get_Tranfer3',
    'Propagates',
    'get_Propagates',
    'Send_IntructionsToU',
    'get_Send_IntructionsToU',
    'SetUp_BL',
    'Transaction_Pro',
    'get_Transaction_Pro',
    'Transaction_Inse',
    'get_Transaction_Inse',
    'Unprocessed'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CREDIT PLATFORM'
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
  async New_Univer() {
    let New_Univer = await this._user.createUser('NEW_UNIVERSITY')
    return New_Univer
  }
  get_New_Univer() {
    let New_Univer = this._user.getUserByType('NEW_UNIVERSITY')
    return New_Univer
  }
  async Member_Univer() {
    let Member_Univer = await this._user.createUser('MEMBER_UNIVERSITY')
    return Member_Univer
  }
  get_Member_Univer() {
    let Member_Univer = this._user.getUserByType('MEMBER_UNIVERSITY')
    return Member_Univer
  }
  async System() {
    let System = await this._user.createUser('SYSTEM')
    return System
  }
  get_System() {
    let System = this._user.getUserByType('SYSTEM')
    return System
  }
  // --------------------Attempt---------------------------
  async Attempt() {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let Attempt = await this._process.createProcess('ATTEMPT')
    return Attempt
  }
  get_contactsInstition() {
    return this._process.getProcessByType('ATTEMPT')
  }
  // --------------------Generates_BL---------------------------
  async Generates_BL(address_Attempt) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Attempt = this._process.getProcessByAddress(address_Attempt)
    if (!check_Attempt || check_Attempt.type !== 'ATTEMPT')
      throw 'ATTEMPT IS NOT EXIST'
    let Generates_BL = await this._process.createProcess('GENERATES_BL')
    return Generates_BL
  }
  get_Generates_BL() {
    return this._process.getProcessByType('GENERATES_BL')
  }
  // --------------------Safely_Store---------------------------
  async Safely_Store(address_Generates_BL) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Generates_BL = this._process.getProcessByAddress(address_Generates_BL)
    if (!check_Generates_BL || check_Generates_BL.type !== 'GENERATES_BL')
      throw 'GENERATES_BL IS NOT EXIST'
    let Safely_Store = await this._process.createProcess('SAFELY')
    return Safely_Store
  }
  get_Safely_Store() {
    return this._process.getProcessByType('SAFELY')
  }
  // --------------------Safely_Store---------------------------
  async Contacts(address_Safely_Store) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Safely_Store = this._process.getProcessByAddress(address_Safely_Store)
    if (!check_Safely_Store || check_Safely_Store.type !== 'SAFELY')
      throw 'SAFELY IS NOT EXIST'
    let Contacts = await this._process.createProcess('CONTACTS')
    return Contacts
  }
  get_Contacts() {
    return this._process.getProcessByType('CONTACTS')
  }
  // --------------------Receiving_RJ---------------------------
  async Receiving_RJ(address_Safely_Store) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Safely_Store = this._process.getProcessByAddress(address_Safely_Store)
    if (!check_Safely_Store || check_Safely_Store.type !== 'SAFELY')
      throw 'SAFELY IS NOT EXIST'
    let Receiving_RJ = await this._process.createProcess('RECEIVING')
    return Receiving_RJ
  }
  get_Receiving_RJ() {
    return this._process.getProcessByType('RECEIVING')
  }
  // --------------------Verifies---------------------------
  async Verifies(address_Receiving_RJ) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Receiving_RJ = this._process.getProcessByAddress(address_Receiving_RJ)
    if (!check_Receiving_RJ || check_Receiving_RJ.type !== 'RECEIVING')
      throw 'RECEIVING IS NOT EXIST'
    let Verifies = await this._process.createProcess('VERIFIES')
    return Verifies
  }
  get_Verifies() {
    return this._process.getProcessByType('VERIFIES')
  }
  // --------------------Tranfer1---------------------------
  async Transfer1(address_Verifies) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Verifies = this._process.getProcessByAddress(address_Verifies)
    if (!check_Verifies || check_Verifies.type !== 'VERIFIES')
      throw 'VERIFIES IS NOT EXIST'
    let Transfer1 = await this._process.createProcess('TRANSFER')
    return Transfer1
  }
  get_Tranfer1() {
    return this._process.getProcessByType('TRANSFER')
  }
  // --------------------Send_inf---------------------------
  async Send_inf(address_Tranfer1) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Tranfer1 = this._process.getProcessByAddress(address_Tranfer1)
    if (!check_Tranfer1 || check_Tranfer1.type !== 'TRANFER1')
      throw 'TRANFER1 IS NOT EXIST'
    let Send_inf = await this._process.createProcess('SEND_INFOR')
    return Send_inf
  }
  get_Send_inf() {
    return this._process.getProcessByType('SEND_INFOR')
  }
  // --------------------Receiving_RR---------------------------
  async Receiving_RR(address_Send_inf) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Send_inf = this._process.getProcessByAddress(address_Send_inf)
    if (!check_Send_inf || check_Send_inf.type !== 'SEND_INFOR')
      throw 'SEND_INFOR IS NOT EXIST'
    let Receiving_RR = await this._process.createProcess('RECEIVING_RR')
    return Receiving_RR
  }
  get_Receiving_RR() {
    return this._process.getProcessByType('RECEIVING_RR')
  }
  // --------------------Tranfer2---------------------------
  async Transfer2(address_Receiving_RR) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Receiving_RR = this._process.getProcessByAddress(address_Receiving_RR)
    if (!check_Receiving_RR || check_Receiving_RR.type !== 'RECEIVING_RR')
      throw 'RECEIVING_RR IS NOT EXIST'
    let Transfer2 = await this._process.createProcess('TRANSFER2')
    return Transfer2
  }
  get_Transfer2() {
    return this._process.getProcessByType('TRANSFER2')
  }
  // --------------------Notifies---------------------------
  async Notifies(address_Transfer2) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Transfer2 = this._process.getProcessByAddress(address_Transfer2)
    if (!check_Transfer2 || check_Transfer2.type !== 'TRANSFER2')
      throw 'TRANSFER2 IS NOT EXIST'
    let Notifies = await this._process.createProcess('NOTIFIES')
    return Notifies
  }
  get_Notifies() {
    return this._process.getProcessByType('NOTIFIES')
  }
  // --------------------Verifies_theE---------------------------
  async Verifies_theE(address_Notifies) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Notifies = this._process.getProcessByAddress(address_Notifies)
    if (!check_Notifies || check_Notifies.type !== 'NOTIFIES')
      throw 'NOTIFIES IS NOT EXIST'
    let Verifies_theE = await this._process.createProcess('VERIFIES')
    return Verifies_theE
  }
  get_Verifies_theE() {
    return this._process.getProcessByType('VERIFIES')
  }
  // --------------------Transfer3---------------------------
  async Transfer3(address_Verifies_theE) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Notifies = this._process.getProcessByAddress(address_Verifies_theE)
    if (!check_Notifies || check_Notifies.type !== 'NOTIFIES')
      throw 'NOTIFIES IS NOT EXIST'
    let Transfer3 = await this._process.createProcess('TRANSFER3')
    return Transfer3
  }
  get_Transfer3() {
    return this._process.getProcessByType('TRANSFER3')
  }
  // --------------------Propagates---------------------------
  async Propagates(address_Transfer3) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Transfer3 = this._process.getProcessByAddress(address_Transfer3)
    if (!check_Transfer3 || check_Transfer3.type !== 'TRANSFER3')
      throw 'TRANSFER3 IS NOT EXIST'
    let Propagates = await this._process.createProcess('PROPAGATES')
    return Propagates
  }
  get_Propagates() {
    return this._process.getProcessByType('PROPAGATES')
  }
  // --------------------Send_IntructionsToU---------------------------
  async Send_IntructionsToU(address_Propagates) {
    this._user.checkUser(this.sender, 'MEMBER_UNIVERSITY')
    let check_Propagates = this._process.getProcessByAddress(address_Propagates)
    if (!check_Propagates || check_Propagates.type !== 'PROPAGATES')
      throw 'PROPAGATES IS NOT EXIST'
    let Send_IntructionsToU = await this._process.createProcess('SEND_INTRUCTIONTOU')
    return Send_IntructionsToU
  }
  get_Send_IntructionsToU() {
    return this._process.getProcessByType('SEND_INTRUCTIONTOU')
  }
  // --------------------SetUp_BL---------------------------
  async SetUp_BL(address_Send_IntructionsToU) {
    this._user.checkUser(this.sender, 'NEW_UNIVERSITY')
    let check_Send_IntructionsToU = this._process.getProcessByAddress(address_Send_IntructionsToU)
    if (!check_Send_IntructionsToU || check_Send_IntructionsToU.type !== 'SEND_INTRUCTIONTOU')
      throw 'SEND_INTRUCTIONTOU IS NOT EXIST'
    let SetUp_BL = await this._process.createProcess('SETUP')
    this.setToAddress(SetUp_BL.address)
    return 'SUCCESS'
  }
  // --------------------Transaction_Pro---------------------------
  async Transaction_Pro(address_Transfer3) {
    this._user.checkUser(this.sender, 'SYSTEM')
    let check_Transfer3 = this._process.getProcessByAddress(address_Transfer3)
    if (!check_Transfer3 || check_Transfer3.type !== 'TRANSFER3')
      throw 'TRANSFER3 IS NOT EXIST'
    let Transaction_Pro = await this._process.createProcess('TRANSACTION_PR')
    return Transaction_Pro
  }
  get_Transaction_Pro() {
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
    this.setToAddress(Unprocessed.address)
    return 'SUCCESS'
  }
}
export default TokenMain