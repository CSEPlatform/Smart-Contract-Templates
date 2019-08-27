import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Create_Product',
    'get_Create_Stamp',
    'get_Check_Stamp'
  ]
  static authenticationFuncs = [
    'Create_Product',
    'Create_Stamp',
    'Check_Stamp'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Create_Product',
    'get_Create_Product',
    'Create_Stamp',
    'get_Create_Stamp',
    'Check_Stamp'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ANTI-COUNTERFEIT-01'
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
  // --------------------Create_product---------------------------
  async Create_Product() {
    await this._user.checkUser(this.sender, 'USER')
    let create = await this._process.createProcess('CREATE_PRODUCT')
    return create
  }
  get_Create_product() {
    return this._process.getProcessByType('CREATE_PRODUCT')
  }
  // --------------------Create_Stamp--------------------------- 
  async Create_Stamp(address_Create_product) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_product1 = this._process.getProcessByAddress(address_Create_product)
    if (!check_Create_product1 || check_Create_product1.type !== 'CREATE_PRODUCT')
      throw 'CREATE_PRODUCT IS NOT EXIST'
    let stamp = await this._process.createProcess('CREATE_STAMP')
    return stamp
  }
  get_Create_Stamp() {
    return this._process.getProcessByType('CREATE_STAMP')
  }
  // --------------------Check_Stamp--------------------------- 
  async Check_Stamp(address_Create_Stamp) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_Stamp = this._process.getProcessByAddress(address_Create_Stamp)
    if (!check_Create_Stamp || check_Create_Stamp.type !== 'CREATE_STAMP')
      throw 'CREATE_STAMP IS NOT EXIST'
    let stamp = await this._process.createProcess('CHECK_STAMP')
    this.setToAddress(stamp.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
