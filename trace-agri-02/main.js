import Contract from 'Contract'
import Product from './product'
import Farm from './farm'
class TokenMain extends Contract {
  static viewFuncs = [
    'getFarm',
    'getFactory',
    'getTransportation',
    'getBorderCrossing',
    'getWarehouse',
    'getMarket',
    'getEnduser'
  ]
  static authenticationFuncs = [
    'addWashing',
    'addPacking',
    'addProcessing',
    'addDistributioncenter',
    'addEnduser'
  ]
  static publicFuncs = [
    'createFarm',
    'getFarm',
    'createFactory',
    'getFactory',
    'addWashing',
    'addPacking',
    'addProcessing',
    'createTransportation',
    'getTransportation',
    'createBorderCrossing',
    'getBorderCrossing',
    'createWarehouse',
    'getWarehouse',
    'addDistributioncenter',
    'createMarket',
    'getMarket',
    'addEnduser'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'AGRI_FLOWCHART_SAMPLE'
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
    this._product = new Product(data)
    this._farm = new Farm(data)
  }
  //---------------------FARM------------------------------
  async createFarm() {
    let farm = await this._farm.createFarm('FARM')
    return farm
  }
  getFarm() {
    let farm = this._farm.getFarmByType('FARM')
    return farm
  }
  // --------------------FACTORY--------------------------- 
  checkFactory(address) {
    let checkFactory = this.getFactoryByAddress(address)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw `FACTORY IS NOT EXIST`
    return true
  }
  getFactoryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createFactory() {
    await this._farm.checkFarm(this.sender, 'FARM')
    let factory = await this._product.createProduct('FACTORY')
    return factory
  }
  async addWashing() {
    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let washing = await this._product.createProduct('WASHING')
    this.setToAddress(washing.address)
    return 'ADD SUCCESS'
  }
  async addPacking() {
    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let Packing = await this._product.createProduct('PACKING')
    this.setToAddress(Packing.address)
    return 'ADD SUCCESS'
  }
  async addProcessing() {
    let checkFactory = this._product.getProductByAddress(this.sender)
    if (!checkFactory || checkFactory.type !== 'FACTORY') throw 'FACTORY IS NOT EXIST'
    let Processing = await this._product.createProduct('PROCESSING')
    this.setToAddress(Processing.address)
    return 'ADD SUCCESS'
  }
  // --------------------TRASPORTATION--------------------------
  checkTransportation(address) {
    let checkTransportation = this.getFactoryByAddress(address)
    if (!checkTransportation || checkTransportation.type !== 'TRANSPORTATION') throw `TRANSPORTATION IS NOT EXIST`
    return true
  }
  getTransportationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createTransportation() {
    await this.checkFactory(this.sender, 'FACTORY')
    let transportation = await this._product.createProduct('TRANSPORTATION')
    return transportation
  }
  // --------------------BORDERCROSSING---------------------------
  checkBorderCrossing(address) {
    let checkBorderCrossing = this.getFactoryByAddress(address)
    if (!checkBorderCrossing || checkBorderCrossing.type !== 'BORDERCROSSING') throw `BORDERCROSSING IS NOT EXIST`
    return true
  }
  getBorderCrossingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createBorderCrossing() {
    await this.checkTransportation(this.sender, 'TRANSPORTATION')
    let bordercrossing = await this._product.createProduct('BORDERCROSSING')
    return bordercrossing
  }
  // --------------------WAREHOUSE---------------------------
  checkWarehouse(address) {
    let checkWarehouse = this.getFactoryByAddress(address)
    if (!checkWarehouse || checkWarehouse.type !== 'WAREHOUSE') throw `WAREHOUSE IS NOT EXIST`
    return true
  }
  getWarehouseByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createWarehouse() {
    await this.checkBorderCrossing(this.sender, 'BORDERCROSSING')
    let warehouse = await this._product.createProduct('WAREHOUSE')
    return warehouse
  }
  async addDistributioncenter() {
    let checkWarehouse = this._product.getProductByAddress(this.sender)
    if (!checkWarehouse || checkWarehouse.type !== 'WAREHOUSE') throw 'MARKET IS NOT EXIST'
    let distributioncenter = await this._product.createProduct('DISTRIBUTIONCENTER')
    this.setToAddress(distributioncenter.address)
    return 'ADD SUCCESS'
  }
  // --------------------MARKET---------------------------
  checkMarket(address) {
    let checkMarket = this.getFactoryByAddress(address)
    if (!checkMarket || checkMarket.type !== 'MARKET') throw `MARKET IS NOT EXIST`
    return true
  }
  getMarketByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createMarket() {
    await this.checkWarehouse(this.sender, 'WAREHOUSE')
    let market = await this._product.createProduct('MARKET')
    return market
  }
  // --------------------END USER ---------------------------
  async addEnduser() {
    let checkMarket = this._product.getProductByAddress(this.sender)
    if (!checkMarket || checkMarket.type !== 'MARKET') throw 'MARKET IS NOT EXIST'
    let Enduser = await this._product.createProduct('ENDUSER')
    this.setToAddress(Enduser.address)
    return 'SUCCESS'
  }
  //-------------------------Get----------------------------------
  getFactory() {
    return this._product.getProductsByType('FACTORY')
  }
  getTransportation() {
    return this._product.getProductsByType('TRANSPORTATION')
  }
  getBorderCrossing() {
    return this._product.getProductsByType('BORDERCROSSING')
  }
  getWarehouse() {
    return this._product.getProductsByType('WAREHOUSE')
  }
  getMarket() {
    return this._product.getProductsByType('MARKET')
  }
}
export default TokenMain;
