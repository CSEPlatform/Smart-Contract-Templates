import Contract from 'Contract'
import Process from './process'
import User from './users'
import Place_Order from './place_order'
import Admin from './admin'
import Input from './input'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Create_new_customer',
    'get_Customer',
    'get_Place_Order',
    'get_Create_new_Order',
    'get_Admin',
    'get_Create_a_payback',
  ]
  static authenticationFuncs = [
    'createCustomer',
    'Check_Customer',
    'Create_new_Order',
    'Input_send_wallet',
    'Create_a_payback',
    'Input_Info',
    'Transfer',
  ]
  static publicFuncs = [
    'Place_Order',
    'get_Place_Order',
    'createCustomer',
    'get_Create_new_customer',
    'get_Customer',
    'Check_Customer',
    'Create_new_Order',
    'get_Create_new_Order',
    'Admin',
    'get_Admin',
    'Input_send_wallet',
    'Create_a_payback',
    'Input_Info',
    'Transfer',
    'get_Create_a_payback',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'PAY BACK'
    },
    accounts: [
      {
        balance: {
          type: Number,
          default: 0
        },
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
    this._place_order = new Place_Order(data)
    this._admin = new Admin(data)
    this._input = new Input(data)
  }
  async Place_Order() {
    let Place_Order = await this._place_order.createPlace_Order()
    return Place_Order
  }
  get_Place_Order() {
    return this._place_order.getPlace_Order()
  }
  async createCustomer(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE USER FAIL'
    await this._place_order.checkPlace_Order(this.sender)
    let user = await this._user.createUsers(type - 1, this.sender)
    this.setToAddress(user.address)
    return user
  }
  check_New_customer(address) {
    let check_New_customer = this.get_New_customerByAddress(address)
    if (!check_New_customer || check_New_customer.type !== 'CREATE_NEW_CUSTOMER') throw `CREATE_NEW_CUSTOMER IS NOT EXIST`
    return true
  }
  get_New_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async get_Create_new_customer() {
    await this._place_order.checkPlace_Order(this.sender)
    return this._user.getUsersByType('CREATE_NEW_CUSTOMER', this.sender)
  }
  check_Customer(address) {
    let check_Customer = this.get_CustomerByAddress(address)
    if (!check_Customer || check_Customer.type !== 'CUSTOMER') throw `CUSTOMER IS NOT EXIST`
    return true
  }
  get_CustomerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async get_Customer() {
    await this._place_order.checkPlace_Order(this.sender)
    return this._user.getUsersByType('CUSTOMER', this.sender)
  }
  // --------------------Create_new_Order---------------------------
  check_process(address) {
    this.check_New_customer = this.get_New_customerByAddress(address);
    this.check_Customer = this.get_CustomerByAddress(address);
    if (this.check_New_customer.type == 'CREATE_NEW_CUSTOMER') {
      return true;
    }
    else if (this.check_Customer.type == 'CUSTOMER') {
      return true;
    }
    else {
      throw `CREATE_NEW_CUSTOMER_OR_CUSTOMER IS NOT EXIST`;
    }
  }
  check_Customer01(address) {
    let check_Customer01 = this.get_Customer01ByAddress(address)
    if (!check_Customer01 || check_Customer01.type !== 'CHECK_CUSTOMER') throw `CHECK_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Customer01ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Check_Customer() {
    this.check_process(this.sender, 'CREATE_NEW_CUSTOMER_OR_CUSTOMER')
    let check = await this._process.createProcess('CHECK_CUSTOMER')
    return check
  }
  async Create_new_Order() {
    this.check_Customer01(this.sender, 'CHECK_CUSTOMER')
    let new_Order = await this._process.createProcess('CREATE_NEW_ORDER')
    return new_Order
  }
  get_Create_new_Order() {
    return this._process.getProcessByType('CREATE_NEW_ORDER')
  }
  // --------------------Admin---------------------------
  async Admin() {
    let Admin = await this._admin.createAdmin()
    return Admin
  }
  get_Admin() {
    return this._admin.getAdmin()
  }
  // --------------------Input_send_wallet---------------------------
  async Input_send_wallet(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'INPUT FAIL'
    await this._admin.checkAdmin(this.sender)
    let input = await this._input.createInput(type - 1, this.sender)
    this.setToAddress(input.address)
    return input
  }
  async get_Yes() {
    await this._admin.checkAdmin(this.sender)
    return this._input.getInputByType('INPUT_SEND_WALLET', this.sender)
  }
  async get_No() {
    await this._admin.checkAdmin(this.sender)
    return this._input.getInputByType('END', this.sender)
  }
  // --------------------Create_a_payback--------------------------- 
  async Create_a_payback(address_Input_send_wallet) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_Ct = this._process.getProcessByAddress(address_Input_send_wallet)
    if (!check_Ct || check_Ct.type !== 'INPUT_SEND_WALLET')
      throw 'INPUT_SEND_WALLET IS NOT EXIST'
    let Create_a_payback = await this._process.createProcess('CREATE_A_PAYBACK')
    return Create_a_payback
  }
  get_Create_a_payback() {
    return this._process.getProcessByType('CREATE_A_PAYBACK')
  }
  // --------------------Input_Infor--------------------------- 
  async Input_Info(Day_amount, Percent_perday, address_Create_a_payback) {
    await this._user.checkUser(this.sender, 'ADMIN')
    let Create_a_payback = this._user.getUserByAddress(address_Create_a_payback)
    if (!Create_a_payback || Create_a_payback.type !== 'CREATE_A_PAYBACK') throw 'CREATE_A_PAYBACK IS NOT EXIST'
    let input = await this._user.createPayback(Day_amount, Percent_perday, address_Create_a_payback)
    this.setToAddress(address_Create_a_payback)
    return input
  }
  // --------------------transfer--------------------------- 
  async Transfer(to, amount) {
    const fromAddress = this.sender;
    const walletFrom = this.getAccountByAddress(fromAddress);
    if (walletFrom.balance < amount) throw "No enough money";
    const walletTo = this.getAccountByAddress(to);
    walletFrom.balance -= amount;
    walletTo.balance += amount;
    return fromAddress
  }
  getAccountByAddress(address) {
    return this.accounts.find(account => (account.address = address));
  }
}
export default TokenMain