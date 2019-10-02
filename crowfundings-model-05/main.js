import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Securities_Determination',
    'get_Securities_Exemptions',
    'get_Successful_Investment',
    'get_Reinvest'
  ]
  static authenticationFuncs = [
    'Securities_Determination',
    'Securities_Indetermination',
    'Securities_Exemptions',
    'Successful_Investment',
    'Fail_Investment',
    'Reinvest'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Securities_Determination',
    'get_Securities_Determination',
    'Securities_Indetermination',
    'Securities_Exemptions',
    'get_Securities_Exemptions',
    'Successful_Investment',
    'get_Successful_Investment',
    'Fail_Investment',
    'Reinvest',
    'get_Reinvest',

  ]
  static schemas = {
    name: {
      type: String,
      default: 'CROWFUNDINGS-MODEL-05'
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
  //----------Securities_Determination---------------------------
  async Securities_Determination() {
    this._user.checkUser(this.sender, 'USER')
    let Securities_Determination = await this._process.createProcess('SECURITIES_DETERMINATION')
    return Securities_Determination
  }
  get_Securities_Determination() {
    return this._process.getProcessByType('SECURITIES_DETERMINATION')
  }
  //----------Securities_Indetermination---------------------------
  async Securities_Indetermination(address_Reinvest) {
    this._user.checkUser(this.sender, 'USER')
    let check_Reinvest = this._process.getProcessByAddress(address_Reinvest)
    if (!check_Reinvest || check_Reinvest.type !== 'REINVEST')
      throw 'REINVEST IS NOT EXIST'
    let Securities_Indetermination = await this._process.createProcess('SECURITIES_INDETERMINATION')
    this.setToAddress(Securities_Indetermination.address)
    return 'END'
  }
  //----------Securities_Exemptions---------------------------
  async Securities_Exemptions(address_Securities_Determination) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Determination = this._process.getProcessByAddress(address_Securities_Determination)
    if (!check_Securities_Determination || check_Securities_Determination.type !== 'SECURITIES_DETERMINATION')
      throw 'SECURITIES_DETERMINATION IS NOT EXIST'
    let Securities_Exemptions = await this._process.createProcess('SECURITIES_EXMPTIONS')
    return Securities_Exemptions
  }
  get_Securities_Exemptions() {
    return this._process.getProcessByType('SECURITIES_EXMPTIONS')
  }
  //----------Successful_Investment---------------------------
  async Successful_Investment(address_Securities_Exemptions) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Exemptions = this._process.getProcessByAddress(address_Securities_Exemptions)
    if (!check_Securities_Exemptions || check_Securities_Exemptions.type !== 'SECURITIES_EXMPTIONS')
      throw 'SECURITIES_EXMPTIONS IS NOT EXIST'
    let Successful_Investment = await this._process.createProcess('SUCCESSFUL_INVESTMENT')
    return Successful_Investment
  }
  get_Successful_Investment() {
    return this._process.getProcessByType('SUCCESSFUL_INVESTMENT')
  }
  //----------Successful_Investment---------------------------
  async Fail_Investment(address_Securities_Exemptions) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Exemptions = this._process.getProcessByAddress(address_Securities_Exemptions)
    if (!check_Securities_Exemptions || check_Securities_Exemptions.type !== 'SECURITIES_EXMPTIONS')
      throw 'SECURITIES_EXMPTIONS IS NOT EXIST'
    let Fail_Investment = await this._process.createProcess('FAIL_INVESTMENT')
    this.setToAddress(Fail_Investment.address)
    return 'END'
  }
  get_Fail_Investment() {
    return this._process.getProcessByType('FAIL_INVESTMENT')
  }
  //----------Reinvest---------------------------}
  async Reinvest(address_Successful_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Successful_Investment = this._process.getProcessByAddress(address_Successful_Investment)
    if (!check_Successful_Investment || check_Successful_Investment.type !== 'SUCCESSFUL_INVESTMENT')
      throw 'SUCCESSFUL_INVESTMENT IS NOT EXIST'
    let Reinvest = await this._process.createProcess('REINVEST')
    return Reinvest
  }
  get_Reinvest() {
    return this._process.getProcessByType('REINVEST')
  }
}
export default TokenMain;
