import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Place_Order',
    'get_Are_you_new_Customer_or_old_Customer',
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
    'Transaction_Order_Customer'
  ]
  static publicFuncs = [
    'User',
    'Place_Order',
    'get_Place_Order',
    'Are_you_new_Customer_or_old_Customer',
    'get_Are_you_new_Customer_or_old_Customer',
    'Customer',
    'Create_New_Customer',
    'New_Customer_or_old_Customer',
    'get_New_Customer_or_old_Customer',
    'Create_new_Order',
    'get_Create_new_Order',
    'Transaction_Product_Order',
    'Transaction_Order_Customer'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ECOMMERCE-ORDERS'
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
  get_Are_you_new_Customer_or_old_Customer() {
    return this._act.getActByType('ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
  }
  //--------------------Customer------------------------------
  check_Customer(address) {
    let check_New_Customer = this.get_CustomerByAddress(address)
    if (!check_New_Customer || check_New_Customer.type !== 'CUSTOMER')
      throw `CUSTOMER IS NOT EXIST`
    return true
  }
  get_CustomerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Customer(address_Are_you_new_Customer_or_old_Customer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Qs = this._act.getActByAddress(address_Are_you_new_Customer_or_old_Customer)
    if (!check_Qs || check_Qs.type !== 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER')
      throw 'ARE_YOU_NEW_CUSTOMER_OR_OLD_CUSTOMER IS NOT EXIST'
    let Customer = await this._act.createAct('CUSTOMER')
    return Customer
  }
  //--------------------Create_New_Customer------------------------------
  check_Create_New_Customer(address) {
    let check_Create_New_Customer = this.get_Create_New_CustomerByAddress(address)
    if (!check_Create_New_Customer || check_Create_New_Customer.type !== 'CREATE_NEW_CUSTOMER')
      throw `CREATE_NEW_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Create_New_CustomerByAddress(address) {
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
  //--------------------Create_new_Order------------------------------
  checkAct(address) {
    this.check_Customer = this.get_CustomerByAddress(address);
    this.check_Create_New_Customer = this.get_Create_New_CustomerByAddress(address);
    if (this.check_Customer.type == 'CUSTOMER') {
      return true;
    }
    else if (this.check_Create_New_Customer.type == 'CREATE_NEW_CUSTOMER') {
      return true;
    }
    else {
      throw `NEW_CUSTOMER_OR_OLD_CUSTOMER_FOR_CHECK NOT EXIST`;
    }
  }
  async  New_Customer_or_old_Customer() {
    this.checkAct(this.sender, 'NEW_CUSTOMER_OR_OLD_CUSTOMER_FOR_CHECK')
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
  async Transaction_Product_Order(address_Create_new_Order) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_new_Order = this._act.getActByAddress(address_Create_new_Order)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw 'CREATE_NEW_ORDER IS NOT EXIST'
    let Transaction1 = await this._act.addAct('PRODUCT_AND_ORDER')
    this.setToAddress(Transaction1.address)
    return { Transaction1 }
  }
  //--------------------Transaction_Order_Customer------------------------------
  async Transaction_Order_Customer(address_Create_new_Order) {
    this._user.checkUser(this.sender, 'USER')
    let check_Create_new_Order = this._act.getActByAddress(address_Create_new_Order)
    if (!check_Create_new_Order || check_Create_new_Order.type !== 'CREATE_NEW_ORDER')
      throw 'CREATE_NEW_ORDER IS NOT EXIST'
    let Transaction2 = await this._act.addAct('ORDER_AND_CUSTOMER')
    this.setToAddress(Transaction2.address)
    return { Transaction2 }
  }
  
}
export default TokenMain;
