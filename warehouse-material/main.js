import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Receipt',
    'get_Reserve_warehouse',
    'get_Reserve_warehouse_or_Receipt',
    'get_Dicision_of_the_Load',
    'get_Reserve_warehouse_or_Dicision_of_the_Load',
    'get_Intermediate_product_warehouse',
    'get_Handling',
    'get_Finished_product',
    'get_Preparation_of_orders_for_check',
    'get_Preparation_of_orders',
    'get_Quality_control_and_or_Packaging',
    'get_Consolidation',
  ]
  static authenticationFuncs = [
    'Receipt',
    'Reserve_warehouse',
    'Reserve_warehouse_or_Receipt',
    'Dicision_of_the_Load',
    'Reserve_warehouse_or_Dicision_of_the_Load',
    'Intermediate_product_warehouse',
    'Handling',
    'Finished_product',
    'Preparation_of_orders_for_check',
    'Preparation_of_orders',
    'Quality_control_and_or_Packaging',
    'Consolidation',
    'Dispatch'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Receipt',
    'get_Receipt',
    'Reserve_warehouse',
    'get_Reserve_warehouse',
    'Reserve_warehouse_or_Receipt',
    'get_Reserve_warehouse_or_Receipt',
    'Dicision_of_the_Load',
    'get_Dicision_of_the_Load',
    'Reserve_warehouse_or_Dicision_of_the_Load',
    'get_Reserve_warehouse_or_Dicision_of_the_Load',
    'Intermediate_product_warehouse',
    'get_Intermediate_product_warehouse',
    'Handling',
    'get_Handling',
    'Finished_product',
    'get_Finished_product',
    'Preparation_of_orders_for_check',
    'get_Preparation_of_orders_for_check',
    'Preparation_of_orders',
    'get_Preparation_of_orders',
    'Quality_control_and_or_Packaging',
    'get_Quality_control_and_or_Packaging',
    'Consolidation',
    'get_Consolidation',
    'Dispatch'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'WAREHOUSE-MATERIAL'
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
    this._user = new User(data)
    this._act = new Act(data)
  }
  //---------------------User------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  get_USer() {
    let Iot_Device = this._user.getUserByType('IOT_DEVICE')
    return Iot_Device
  }
  //-------------------Receipt------------------------------
  async  Receipt() {
    this._user.checkUser(this.sender, 'USER')
    let Receipt = await this._act.createAct('RECEIPT')
    return Receipt
  }
  get_Receipt() {
    return this._act.getActByType('RECEIPT')
  }
  //--------------------Reserve_warehouse------------------------------
  check_Reserve_warehouse(address) {
    let check_Reserve_warehouse = this.get_Reserve_warehouseByAddress(address)
    if (!check_Reserve_warehouse || check_Reserve_warehouse.type !== 'RESERVE_WAREHOUSE')
      throw `RESERVE_WAREHOUSE IS NOT EXIST`
    return true
  }
  get_Reserve_warehouseByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Reserve_warehouse(address_Receipt) {
    this._user.checkUser(this.sender, 'USER')
    let check_Receipt = this._act.getActByAddress(address_Receipt)
    if (!check_Receipt || check_Receipt.type !== 'RECEIPT')
      throw 'RECEIPT IS NOT EXIST'
    let Reserve_warehouse = await this._act.createAct('RESERVE_WAREHOUSE')
    return Reserve_warehouse
  }
  get_Reserve_warehouse() {
    return this._act.getActByType('RESERVE_WAREHOUSE')
  }
  //--------------------Dicision_of_the_Load------------------------------
  check_Dicision_of_the_Load(address) {
    let check_Dicision_of_the_Load = this.get_Dicision_of_the_LoadByAddress(address)
    if (!check_Dicision_of_the_Load || check_Dicision_of_the_Load.type !== 'DICISION_OF_THE_LOAD')
      throw `DICISION_OF_THE_LOAD IS NOT EXIST`
    return true
  }
  get_Dicision_of_the_LoadByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkAct(address) {
    this.check_Receipt = this.get_Write_known_and_trustedByAddress(address);
    this.check_Reserve_warehouse = this.get_Do_not_write_known_and_trustedDByAddress(address);
    if (this.check_Receipt.type == 'RECEIPT') {
      return true;
    }
    else if (this.check_Reserve_warehouse.type == 'RESERVE_WAREHOUSE') {
      return true;
    }
    else {
      throw `RECEIPT_OR_RESERVE_WAREHOUSE_FOR_CHECK NOT EXIST`;
    }
  }
  async  Reserve_warehouse_or_Receipt() {
    this.checkAct(this.sender, 'RECEIPT_OR_RESERVE_WAREHOUSE_FOR_CHECK')
    let check_Act = await this._act.createAct('RECEIPT_OR_RESERVE_WAREHOUSE')
    return check_Act
  }
  get_Reserve_warehouse_or_Receipt() {
    return this._act.getActByType('RECEIPT_OR_RESERVE_WAREHOUSE')
  }
  async  Dicision_of_the_Load(address_Reserve_warehouse_or_Receipt) {
    this._user.checkUser(this.sender, 'USER')
    let check_Reserve_warehouse_or_Receipt = this._act.getActByAddress(address_Reserve_warehouse_or_Receipt)
    if (!check_Reserve_warehouse_or_Receipt || check_Reserve_warehouse_or_Receipt.type !== 'RECEIPT_OR_RESERVE_WAREHOUSE')
      throw 'RECEIPT_OR_RESERVE_WAREHOUSE IS NOT EXIST'
    let Dicision_of_the_Load = await this._act.createAct('DICISION_OF_THE_LOAD')
    return Dicision_of_the_Load
  }
  get_Dicision_of_the_Load() {
    return this._act.getActByType('DICISION_OF_THE_LOAD')
  }
  //--------------------Intermediate_product_warehouse------------------------------
  check_Intermediate_product_warehouse(address) {
    let check_Intermediate_product_warehouse = this.get_Intermediate_product_warehouseByAddress(address)
    if (!check_Intermediate_product_warehouse || get_Dicision_of_the_LoadByAddress.type !== 'DICISION_OF_THE_LOAD')
      throw `DICISION_OF_THE_LOAD IS NOT EXIST`
    return true
  }
  get_Intermediate_product_warehouseByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkAct1(address) {
    this.check_Reserve_warehouse = this.get_Do_not_write_known_and_trustedDByAddress(address);
    this.check_Dicision_of_the_Load = this.get_Dicision_of_the_LoadByAddress(address);
    if (this.check_Reserve_warehouse.type == 'RESERVE_WAREHOUSE') {
      return true;
    }
    else if (this.check_Dicision_of_the_Load.type == 'DICISION_OF_THE_LOAD') {
      return true;
    }
    else {
      throw `DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE_FOR_CHECK NOT EXIST`;
    }
  }
  async  Reserve_warehouse_or_Dicision_of_the_Load() {
    this.checkAct1(this.sender, 'DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE_FOR_CHECK')
    let check_Act1 = await this._act.createAct('DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE')
    return check_Act1
  }
  get_Reserve_warehouse_or_Dicision_of_the_Load() {
    return this._act.getActByType('DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE')
  }
  async  Intermediate_product_warehouse(address_Reserve_warehouse_or_Dicision_of_the_Load) {
    this._user.checkUser(this.sender, 'USER')
    let check_Reserve_warehouse_or_Dicision_of_the_Load = this._act.getActByAddress(address_Reserve_warehouse_or_Dicision_of_the_Load)
    if (!check_Reserve_warehouse_or_Dicision_of_the_Load || check_Reserve_warehouse_or_Dicision_of_the_Load.type !== 'DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE')
      throw 'DICISION_OF_THE_LOAD_OR_RESERVE_WAREHOUSE IS NOT EXIST'
    let Intermediate_product_warehouse = await this._act.createAct('INTERMEDIATE_PRODUCT_WAREHOUSE')
    return Intermediate_product_warehouse
  }
  get_Intermediate_product_warehouse() {
    return this._act.getActByType('INTERMEDIATE_PRODUCT_WAREHOUSE')
  }
  //--------------------Handling------------------------------
  async  Handling(address_Intermediate_product_warehouse) {
    this._user.checkUser(this.sender, 'USER')
    let check_Intermediate_product_warehouse = this._act.getActByAddress(address_Intermediate_product_warehouse)
    if (!check_Intermediate_product_warehouse || check_Intermediate_product_warehouse.type !== 'INTERMEDIATE_PRODUCT_WAREHOUSE')
      throw 'INTERMEDIATE_PRODUCT_WAREHOUSE IS NOT EXIST'
    let Handling = await this._act.createAct('HANDLING')
    return Handling
  }
  get_Handling() {
    return this._act.getActByType('HANDLING')
  }
  //--------------------Finished_product------------------------------
  check_Finished_product(address) {
    let check_Finished_product = this.get_Finished_productByAddress(address)
    if (!check_Finished_product || check_Finished_product.type !== 'RESERVE_WAREHOUSE')
      throw `RESERVE_WAREHOUSE IS NOT EXIST`
    return true
  }
  get_Finished_productByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Finished_product(address_Handling) {
    this._user.checkUser(this.sender, 'USER')
    let check_Handling = this._act.getActByAddress(address_Handling)
    if (!check_Handling || check_Handling.type !== 'HANDLING')
      throw 'HANDLING IS NOT EXIST'
    let Finished_product = await this._act.createAct('FINISHED_PRODUCT')
    return Finished_product
  }
  get_Finished_product() {
    return this._act.getActByType('FINISHED_PRODUCT')
  }
  //--------------------Preparation_of_orders------------------------------
  check_Preparation_of_orders(address) {
    let check_Preparation_of_orders = this.get_Preparation_of_ordersByAddress(address)
    if (!check_Preparation_of_orders || check_Preparation_of_orders.type !== 'PREPRATION_OF_ORDER')
      throw `PREPRATION_OF_ORDER IS NOT EXIST`
    return true
  }
  get_Preparation_of_ordersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkAct2(address) {
    this.check_Reserve_warehouse = this.get_Do_not_write_known_and_trustedDByAddress(address);
    this.check_Intermediate_product_warehouse = this.get_Intermediate_product_warehouseByAddress(address);
    this.check_Finished_product = this.get_Finished_productByAddress(address);
    if (this.check_Reserve_warehouse.type == 'RESERVE_WAREHOUSE') {
      return true;
    }
    else if (this.check_Intermediate_product_warehouse.type == 'INTERMEDIATE_PRODUCT_WAREHOUSE') {
      return true;
    }
    else if (this.check_Finished_product.type == 'FINISHED_PRODUCT') {
      return true;
    }
    else {
      throw `FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE_FOR_CHECK NOT EXIST`;
    }
  }
  async  Preparation_of_orders_for_check() {
    this.checkAct2(this.sender, 'FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE_FOR_CHECK')
    let check_Act2 = await this._act.createAct('FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE')
    return check_Act2
  }
  get_Preparation_of_orders_for_check() {
    return this._act.getActByType('FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE')
  }
  async  Preparation_of_orders(address_Preparation_of_orders_for_check) {
    this._user.checkUser(this.sender, 'USER')
    let check_Preparation_of_orders_for_check = this._act.getActByAddress(address_Preparation_of_orders_for_check)
    if (!check_Preparation_of_orders_for_check || check_Preparation_of_orders_for_check.type !== 'FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE')
      throw 'FINISHED_PRODUCT_OR_INTERMEDIATE_PRODUCT_WAREHOUSE_OR_RESERVE_WAREHOUSE IS NOT EXIST'
    let Preparation_of_orders = await this._act.createAct('PREPRATION_OF_ORDER')
    return Preparation_of_orders
  }
  get_Preparation_of_orders() {
    return this._act.getActByType('PREPRATION_OF_ORDER')
  }
  //--------------------Quality_control_and_or_Packaging------------------------------
  check_Quality_control_and_or_Packaging(address) {
    let check_Finished_product = this.get_Quality_control_and_or_PackagingByAddress(address)
    if (!check_Finished_product || check_Finished_product.type !== 'RESERVE_WAREHOUSE')
      throw `RESERVE_WAREHOUSE IS NOT EXIST`
    return true
  }
  get_Quality_control_and_or_PackagingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Quality_control_and_or_Packaging(address_Preparation_of_orders) {
    this._user.checkUser(this.sender, 'USER')
    let check_Preparation_of_orders = this._act.getActByAddress(address_Preparation_of_orders)
    if (!check_Preparation_of_orders || check_Preparation_of_orders.type !== 'PREPRATION_OF_ORDER')
      throw 'PREPRATION_OF_ORDER IS NOT EXIST'
    let Quality_control_and_or_Packaging = await this._act.createAct('QUALITY_CONTROL_AND_OR_PACKAGING')
    return Quality_control_and_or_Packaging
  }
  get_Quality_control_and_or_Packaging() {
    return this._act.getActByType('QUALITY_CONTROL_AND_OR_PACKAGING')
  }
  //--------------------Consolidation------------------------------
  checkAct4(address) {
    this.check_Quality_control_and_or_Packaging = this.get_Quality_control_and_or_PackagingByAddress(address);
    this.check_Preparation_of_orders = this.get_Preparation_of_ordersByAddress(address);
    if (this.check_Quality_control_and_or_Packaging.type == 'QUALITY_CONTROL_AND_OR_PACKAGING') {
      return true;
    }
    else if (this.check_Preparation_of_orders.type == 'PREPRATION_OF_ORDER') {
      return true;
    }
    else {
      throw `FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_FOR_CHECK NOT EXIST`;
    }
  }
  async  Quality_control_and_or_Packaging_or_Preparation_of_orders() {
    this.checkAct4(this.sender, 'FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_FOR_CHECK')
    let check_Act4 = await this._act.createAct('FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_')
    return check_Act4
  }
  get_Quality_control_and_or_Packaging_or_Preparation_of_orders() {
    return this._act.getActByType('FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_')
  }
  async  Consolidation(address_Quality_control_and_or_Packaging_or_Preparation_of_orders) {
    this._user.checkUser(this.sender, 'USER')
    let check_Quality_control_and_or_Packaging_or_Preparation_of_orders = this._act.getActByAddress(address_Quality_control_and_or_Packaging_or_Preparation_of_orders)
    if (!check_Quality_control_and_or_Packaging_or_Preparation_of_orders || check_Quality_control_and_or_Packaging_or_Preparation_of_orders.type !== 'FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_')
      throw 'FPREPRATION_OF_ORDER_OR_QUALITY_CONTROL_AND_OR_PACKAGING_ IS NOT EXIST'
    let Consolidation = await this._act.createAct('CONSOLIDATION')
    return Consolidation
  }
  get_Consolidation() {
    return this._act.getActByType('CONSOLIDATION')
  }
  //--------------------Dispatch------------------------------
  async  Dispatch(address_Consolidation) {
    this._user.checkUser(this.sender, 'USER')
    let check_Consolidation = this._act.getActByAddress(address_Consolidation)
    if (!check_Consolidation || check_Consolidation.type !== 'CONSOLIDATION')
      throw 'CONSOLIDATION IS NOT EXIST'
    let Dispatch = await this._act.createAct('DISPATCH')
    this.setToAddress(Dispatch.address)
    return { Dispatch }
  }
}
export default TokenMain;
