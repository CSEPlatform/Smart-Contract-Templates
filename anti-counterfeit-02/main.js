import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Create_Product',
    'get_Create_NFC_Tag',
    'get_Check_NFC_Tag'
  ]
  static authenticationFuncs = [
    'Create_Product',
    'Create_NFC_Tag',
    'Check_NFC_Tag'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Create_Product',
    'get_Create_Product',
    'Create_NFC_Tag',
    'get_Create_NFC_Tag',
    'Check_NFC_Tag'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ANTI-COUNTERFEIT-02'
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
  // --------------------Create_NFC_Tag---------------- ----------- 
  async Create_NFC_Tag(address_Create_product) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_product1 = this._process.getProcessByAddress(address_Create_product)
    if (!check_Create_product1 || check_Create_product1.type !== 'CREATE_PRODUCT')
      throw 'CREATE_PRODUCT IS NOT EXIST'
    let NFC_Tag = await this._process.createProcess('CREATE_NFC_TAG')
    return NFC_Tag
  }
  get_Create_NFC_Tag() {
    return this._process.getProcessByType('CREATE_NFC_TAG')
  }
  // --------------------Check_NFC_Tag--------------------------- 
  async Check_NFC_Tag(address_Create_NFC_Tag) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_NFC_Tag= this._process.getProcessByAddress(address_Create_NFC_Tag)
    if (!check_Create_NFC_Tag || check_Create_NFC_Tag.type !== 'CREATE_NFC_TAG')
      throw 'CREATE_NFC_TAG IS NOT EXIST'
    let check = await this._process.createProcess('CHECK_NFC_TAG')
    this.setToAddress(check.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
