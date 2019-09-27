import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Direct',
    'get_Indirect',
    'get_Check_Investment_Type',
    'get_Investment_Type',
    'get_Expost',
    'get_Exante'
  ]
  static authenticationFuncs = [
    'Direct',
    'Indirect',
    'Check_Investment_Type',
    'Investment_Type',
    'Expost',
    'Exante'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Direct',
    'get_Direct',
    'Indirect',
    'get_Indirect',
    'Check_Investment_Type',
    'get_Check_Investment_Type',
    'Investment_Type',
    'get_Investment_Type',
    'Expost',
    'get_Expost',
    'Exante',
    'get_Exante'

  ]
  static schemas = {
    name: {
      type: String,
      default: 'CROWFUNDINGS-MODEL-04'
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
  // --------------------Direct---------------------------
  check_Direct(address) {
    let check_Direct = this.get_DirectByAddress(address)
    if (!check_Direct || check_Direct.type !== 'DIRECT') throw `DIRECT IS NOT EXIST`
    return true
  }
  get_DirectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Direct() {
    await this._user.checkUser(this.sender, 'USER')
    let Direct = await this._process.createProcess('DIRECT')
    return Direct
  }
  get_Direct() {
    return this._process.getProcessByType('DIRECT')
  }
  // --------------------Indirect---------------------------
  check_Indirect(address) {
    let check_Indirect = this.get_IndirectByAddress(address)
    if (!check_Indirect || check_Indirect.type !== 'INDIRECT') throw `INDIRECT IS NOT EXIST`
    return true
  }
  get_IndirectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Indirect() {
    await this._user.checkUser(this.sender, 'USER')
    let Indirect = await this._process.createProcess('INDIRECT')
    return Indirect
  }
  get_Indirect() {
    return this._process.getProcessByType('INDIRECT')
  }
  // --------------------Direct--------------------------- 
  checkProcess(address) {
    this.check_Direct = this.get_DirectByAddress(address);
    this.check_Indirect = this.get_IndirectByAddress(address);

    if (this.check_Direct.type == 'DIRECT') {
      return true;
    }
    else if (this.check_Indirect.type == 'INDIRECT') {
      return true;
    }
    else {
      throw `DIRECT_OR_INDIRECT IS NOT EXIST`;
    }
  }
  async Check_Investment_Type() {
    await this.checkProcess(this.sender, 'DIRECT_OR_INDIRECT')
    let check = await this._process.createProcess('CHECK_INVESTMENT_TYPE')
    return check
  }
  get_Check_Investment_Type() {
    return this._process.getProcessByType('CHECK_INVESTMENT_TYPE')
  }
  async Investment_Type(address_Check_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Investment_Type = this._process.getProcessByAddress(address_Check_Investment_Type)
    if (!check_Check_Investment_Type || check_Check_Investment_Type.type !== 'CHECK_INVESTMENT_TYPE')
      throw 'CHECK_INVESTMENT_TYPE IS NOT EXIST'
    let Investment_Type = await this._process.createProcess('INVESTMENT_TYPE')
    return Investment_Type
  }
  get_Investment_Typet() {
    return this._process.getProcessByType('INVESTMENT_TYPE')
  }
  // --------------------Expost--------------------------- 
  async Expost(address_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Type = this._process.getProcessByAddress(address_Investment_Type)
    if (!check_Investment_Type || check_Investment_Type.type !== 'INVESTMENT_TYPE')
      throw 'INVESTMENT_TYPE IS NOT EXIST'
    let Expost = await this._process.createProcess('EXPOST')
    return Expost
  }
  get_Expost() {
    return this._process.getProcessByType('EXPOST')
  }
  // --------------------Exante--------------------------- 
  async Exante(address_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Type = this._process.getProcessByAddress(address_Investment_Type)
    if (!check_Investment_Type || check_Investment_Type.type !== 'INVESTMENT_TYPE')
      throw 'INVESTMENT_TYPE IS NOT EXIST'
    let Exante = await this._process.createProcess('EXANTE')
    return Exante
  }
  get_Exante() {
    return this._process.getProcessByType('EXANTE')
  }
}
export default TokenMain;
