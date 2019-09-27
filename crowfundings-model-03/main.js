import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Type_of_Fundraising',
    'get_Direct',
    'get_Indirect'
  ]
  static authenticationFuncs = [
    'Type_of_Fundraising',
    'Direct',
    'Indirect'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Type_of_Fundraising',
    'get_Type_of_Fundraising',
    'Direct',
    'get_Direct',
    'Indirect',
    'get_Indirect'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CROWFUNDINGS-MODEL-03'
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
  // --------------------Type_of_Fundraising---------------------------
  async Type_of_Fundraising() {
    await this._user.checkUser(this.sender, 'USER')
    let Type_of_Fundraising = await this._process.createProcess('TYPE_OF_FUNDRAISING')
    return Type_of_Fundraising
  }
  get_Type_of_Fundraising() {
    return this._process.getProcessByType('TYPE_OF_FUNDRAISING')
  }
  // --------------------Direct--------------------------- 
  async Direct(address_Type_of_Fundraising) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Fundraising = this._process.getProcessByAddress(address_Type_of_Fundraising)
    if (!check_Type_of_Fundraising || check_Type_of_Fundraising.type !== 'TYPE_OF_FUNDRAISING')
      throw 'TYPE_OF_FUNDRAISING IS NOT EXIST'
    let Direct = await this._process.createProcess('DIRECT')
    return Direct
  }
  get_Direct() {
    return this._process.getProcessByType('DIRECT')
  }
  // --------------------Indirect--------------------------- 
  async Indirect(address_Type_of_Fundraising) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Fundraising = this._process.getProcessByAddress(address_Type_of_Fundraising)
    if (!check_Type_of_Fundraising || check_Type_of_Fundraising.type !== 'TYPE_OF_FUNDRAISING')
      throw 'TYPE_OF_FUNDRAISING IS NOT EXIST'
    let Indirect = await this._process.createProcess('INDIRECT')
    return Indirect
  }
  get_Indirect() {
    return this._process.getProcessByType('INDIRECT')
  }
}
export default TokenMain;
