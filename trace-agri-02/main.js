import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'getUser',
    'getFarm',
    'getFactory',
    'getTransportation',
    'getBorderCrossing',
    'getWarehouse',
    'getMarket',
    'getEndUser'
  ]
  static authenticationFuncs = [
    'Farm',
    'Factory',
    'addWashing',
    'addPacking',
    'addProcessing',
    'Transportation',
    'BorderCrossing',
    'WareHouse',
    'addDistributioncenter',
    'Market',
    'EndUser'
  ]
  static publicFuncs = [
    'User',
    'getUser',
    'Farm',
    'getFarm',
    'Factory',
    'getFactory',
    'addWashing',
    'addPacking',
    'addProcessing',
    'Transportation',
    'getTransportation',
    'BorderCrossing',
    'getBorderCrossing',
    'WareHouse',
    'getWarehouse',
    'addDistributioncenter',
    'Market',
    'getMarket',
    'EndUser',
    'getEndUser'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'TRACE-AGRI-02'
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
  //--------------------USER------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  getUser() {
    let user = this._user.getUserByType('USER')
    return user
  }
  //---------------------FARM------------------------------
  async Farm() {
    await this._user.checkUser(this.sender, 'USER')
    let Farm = await this._process.createProcess('FARM')
    return Farm
  }
  getFarm() {
    return this._process.getProcessByType('FARM')
  }
  // --------------------FACTORY--------------------------- 
  async Factory(address_Farm) {
    this._user.checkUser(this.sender, 'USER')
    let check_Farm = this._process.getProcessByAddress(address_Farm)
    if (!check_Farm || check_Farm.type !== 'FARM')
      throw 'FARM IS NOT EXIST'
    let Factory = await this._process.createProcess('FACTORY')
    return Factory
  }
  getFactory() {
    return this._process.getProcessByType('FACTORY')
  }
  async addWashing(address_Factory) {
    this._user.checkUser(this.sender, 'USER')
    let check_Factory = this._process.getProcessByAddress(address_Factory)
    if (!check_Factory || check_Factory.type !== 'FACTORY')
      throw 'FACTORY IS NOT EXIST'
    let addWashing = await this._process.createProcess('WASHING')
    this.setToAddress(addWashing.address)
    return 'ADD SUCCESS'
  }
  async addPacking(address_Factory) {
    this._user.checkUser(this.sender, 'USER')
    let check_Factory = this._process.getProcessByAddress(address_Factory)
    if (!check_Factory || check_Factory.type !== 'FACTORY')
      throw 'FACTORY IS NOT EXIST'
    let addPacking = await this._process.createProcess('PACKING')
    this.setToAddress(addPacking.address)
    return 'ADD SUCCESS'
  }
  async addProcessing(address_Factory) {
    this._user.checkUser(this.sender, 'USER')
    let check_Factory = this._process.getProcessByAddress(address_Factory)
    if (!check_Factory || check_Factory.type !== 'FACTORY')
      throw 'FACTORY IS NOT EXIST'
    let addProcessing = await this._process.createProcess('PROCESSING')
    this.setToAddress(addProcessing.address)
    return 'ADD SUCCESS'
  }
  // --------------------TRANSPORTATION--------------------------
  async Transportation(address_Factory) {
    this._user.checkUser(this.sender, 'USER')
    let check_Factory = this._process.getProcessByAddress(address_Factory)
    if (!check_Factory || check_Factory.type !== 'FACTORY')
      throw 'FACTORY IS NOT EXIST'
    let transportation = await this._process.createProcess('TRANSPORTATION')
    return transportation
  }
  getTransportation() {
    return this._process.getProcessByType('TRANSPORTATION')
  }
  // --------------------BORDERCROSSING---------------------------
  async BorderCrossing(address_Transportation) {
    this._user.checkUser(this.sender, 'USER')
    let check_Transportation = this._process.getProcessByAddress(address_Transportation)
    if (!check_Transportation || check_Transportation.type !== 'TRANSPORTATION')
      throw 'TRANSPORTATION IS NOT EXIST'
    let bordercrossing = await this._process.createProcess('BORDERCROSSING')
    return bordercrossing
  }
  getTransportation() {
    return this._process.getProcessByType('BORDERCROSSING')
  }
  // --------------------WAREHOUSE---------------------------
  async WareHouse(address_BorderCrossing) {
    this._user.checkUser(this.sender, 'USER')
    let check_BorderCrossing = this._process.getProcessByAddress(address_BorderCrossing)
    if (!check_BorderCrossing || check_BorderCrossing.type !== 'BORDERCROSSING')
      throw 'BORDERCROSSING IS NOT EXIST'
    let warehouse = await this._process.createProcess('WAREHOUSE')
    return warehouse
  }
  getWareHouse() {
    return this._process.getProcessByType('WAREHOUSE')
  }
  async addDistributioncenter(address_Warehouse) {
    this._user.checkUser(this.sender, 'USER')
    let check_Warehouse = this._process.getProcessByAddress(address_Warehouse)
    if (!check_Warehouse || check_Warehouse.type !== 'WAREHOUSE')
      throw 'WAREHOUSE IS NOT EXIST'
    let distributioncenter = await this._process.createProcess('DISTRIBUTIONCENTER')
    this.setToAddress(distributioncenter.address)
    return 'ADD SUCCESS'
  }
  // --------------------MARKET---------------------------
  async Market(address_Warehouse) {
    this._user.checkUser(this.sender, 'USER')
    let check_Warehouse = this._process.getProcessByAddress(address_Warehouse)
    if (!check_Warehouse || check_Warehouse.type !== 'WAREHOUSE')
      throw 'WAREHOUSE IS NOT EXIST'
    let market = await this._process.createProcess('MARKET')
    return market
  }
  getMarket() {
    return this._process.getProcessByType('MARKET')
  }
  // --------------------END USER ---------------------------
  async EndUser(address_Market) {
    this._user.checkUser(this.sender, 'USER')
    let check_Market = this._process.getProcessByAddress(address_Market)
    if (!check_Market || check_Market.type !== 'MARKET')
      throw 'MARKET IS NOT EXIST'
    let endUser = await this._process.createProcess('END_USER')
    return endUser
  }
  getEndUser() {
    return this._process.getProcessByType('END_USER')
  }
}
export default TokenMain;
