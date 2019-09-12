import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Place_Order',
    'get_Are_you_new_Customer_or_old_Customer',
    'get_New_Customer',
    'get_Create_New_Customer',
    'get_New_Customer_or_old_Customer',
    'get_Create_new_Order',
  ]
  static authenticationFuncs = [
    'Place_Order',
    'Are_you_new_Customer_or_old_Customer',
    'New_Customer',
    'Create_New_Customer',
    'New_Customer_or_old_Customer',
    'Create_new_Order',
    'Transaction_Product_Order',
    'Transaction_Order_Customer',
    'Webhook'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Place_Order',
    'get_Place_Order',
    'Are_you_new_Customer_or_old_Customer',
    'get_Are_you_new_Customer_or_old_Customer',
    'New_Customer',
    'get_New_Customer',
    'Create_New_Customer',
    'get_Create_New_Customer',
    'New_Customer_or_old_Customer',
    'get_New_Customer_or_old_Customer',
    'Create_new_Order',
    'get_Create_new_Order',
    'Transaction_Product_Order',
    'Transaction_Order_Customer',
    'Webhook'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ECOMERCE-ORDERS'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        balance: {
          type: Number,
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
  //--------------------Place_Order------------------------------
  async  Place_Order() {
    this._user.checkUser(this.sender, 'USER')
    let Place_Order = await this._act.createAct('PLACE_ORDER')
    return Place_Order
  }
  get_Place_Order() {
    return this._act.getActByType('PLACE_ORDER')
  }
  //--------------------Are_you_new_Customer_or_old_Customer------------------------------
  async Are_you_new_Customer_or_old_Customer(address_Place_Order) {
    this._user.checkUser(this.sender, 'USER')
    let check_Place_Order = this._act.getActByAddress(address_Place_Order)
    if (!check_Place_Order || check_Place_Order.type !== 'PLACE_ORDER')
      throw 'PLACE_ORDER IS NOT EXIST'
    let qs1 = await this._act.createAct('ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
    return qs1
  }
  get_Are_you_New_or_Old() {
    return this._act.getActByType('ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
  }
  //--------------------New_Customer------------------------------
  check_New_Customer(address) {
    let check_New_Customer = this.get_New_CustomerByAddress(address)
    if (!check_New_Customer || check_New_Customer.type !== 'NEW_CUSTOMER')
      throw `NEW_CUSTOMER IS NOT EXIST`
    return true
  }
  get_New_CustomerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async New_Customer(address_Are_you_new_Customer_or_old_Customer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Qs = this._act.getActByAddress(address_Are_you_new_Customer_or_old_Customer)
    if (!check_Qs || check_Qs.type !== 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
      throw 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER IS NOT EXIST'
    let New_Customer = await this._act.createAct('NEW_CUSTOMER')
    return New_Customer
  }
  get_New_Customer() {
    return this._act.getActByType('NEW_CUSTOMER')
  }
  //--------------------Create_New_Customer------------------------------
  check_Create_New_Customer(address) {
    let check_Create_New_Customer = this.get_Create_New_CustomerrByAddress(address)
    if (!check_Create_New_Customer || check_Create_New_Customer.type !== 'CREATE_NEW_CUSTOMER')
      throw `CREATE_NEW_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Create_New_CustomerrByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_New_Customer(address_Are_you_new_Customer_or_old_Customer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Qs = this._act.getActByAddress(address_Are_you_new_Customer_or_old_Customer)
    if (!check_Qs || check_Qs.type !== 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
      throw 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER IS NOT EXIST'
    let Create_New_Customer = await this._act.createAct('CREATE_NEW_CUSTOMER')
    return Create_New_Customer
  }
  get_Create_New_Customer() {
    return this._act.getActByType('CREATE_NEW_CUSTOMER')
  }
  //--------------------Create_new_Order------------------------------
  checkAct(address) {
    this.check_New_Customer = this.get_New_CustomerByAddress(address);
    this.check_Create_New_Customer = this.get_Create_New_CustomerrByAddress(address);
    if (this.check_New_Customer.type == 'NEW_CUSTOMER') {
      return true;
    }
    else if (this.check_Reserve_warehouse.type == 'CREATE_NEW_CUSTOMER') {
      return true;
    }
    else {
      throw `NEW_CUSTOMER_OR_OLD_CUSTOMER_FOR_CHECK NOT EXIST`;
    }
  }
  async  New_Customer_or_old_Customer() {
    this.checkAct(this.sender, 'NEW_CUSTOMER_OR_OLE_CUSTOMER_FOR_CHECK')
    let check_Act = await this._act.createAct('NEW_CUSTOMER_OR_OLD_CUSTOMER')
    return check_Act
  }
  get_New_Customer_or_old_Customer() {
    return this._act.getActByType('NEW_CUSTOMER_OR_OLD_CUSTOMER')
  }
  check_Create_new_Order(address) {
    let check_Create_new_Order = this.get_Create_new_OrderByAddress(address)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw `CREATE_NEW_ORDER IS NOT EXIST`
    return true
  }
  get_Create_new_OrderByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_new_Order(address_New_Customer_or_old_Customer) {
    this._user.checkUser(this.sender, 'USER')
    let check_New_Customer_or_old_Customer = this._act.getActByAddress(address_New_Customer_or_old_Customer)
    if (!check_New_Customer_or_old_Customer || check_New_Customer_or_old_Customer.type !== 'NEW_CUSTOMER_OR_OLD_CUSTOMER')
      throw 'NEW_CUSTOMER_OR_OLD_CUSTOMER IS NOT EXIST'
    let Create_new_Order = await this._act.createAct('CREATE_NEW_ORDER')
    return Create_new_Order
  }
  get_Create_new_Order() {
    return this._act.getActByType('CREATE_NEW_ORDER')
  }
  //--------------------Transaction_Product_Order------------------------------
  async Transaction_Product_Order(address_Create_new_Order,) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_new_Order = this._act.getActByAddress(address_Create_new_Order)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw 'CREATE_NEW_ORDER IS NOT EXIST'
      this.setToAddress(address_Create_new_Order)
      return {rs: 'Transaction successfully'}
  }
  async Product_Order(order, amount) {
    if (!amount) throw 'not have amount'
    const fromAddress = this.sender // from headers // privatekey => public key
    const walletFrom = this.getAccountByAddress(fromAddress)
    if (!walletFrom) throw 'FROM_ADDRESS_INVALID'
    if (walletFrom.balance < amount) throw 'No enough money'
    const walletTo = this.getAccountByAddress(to)
    if (!walletTo) throw 'TO_ADDRESS_INVALID'
    this.setToAddress(walletTo.address)
    // subtract from wallet
    walletFrom.balance -= amount
    // add to wallet
    walletTo.balance += amount
    return 'Tranfer Success'
  }
  //--------------------Transaction_Order_Customer------------------------------
  async Transaction_Order_Customer(address_Create_new_Order) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_new_Order = this._act.getActByAddress(address_Create_new_Order)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw 'CREATE_NEW_ORDER IS NOT EXIST'
      this.setToAddress(address_Create_new_Order)
      return {rs: 'Transaction successfully'}
  }
  //--------------------Webhook------------------------------
  async Webhook(address_Create_new_Order) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_new_Order = this._act.getActByAddress(address_Create_new_Order)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw 'CREATE_NEW_ORDER IS NOT EXIST'
    this.setToAddress(address_Create_new_Order)
    return {rs: 'Order successfully'}
  }
}
export default TokenMain;
