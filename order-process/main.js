import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Registered',
    'get_User_Registration',
    'get_Check_Register',
    'get_Login',
    'get_No_Shopping',
    'get_View_Account_Status',
    'get_Logout',
    'get_Check_Shop',
    'get_Shop',
    'get_View_Search_items',
    'get_Add_Item_to_Cart',
    'get_Display_Cart_Contents',
    'get_Change_Cart_Items',
    'get_No_Change_Cart_Items',
    'get_Change_Item_Quantities',
    'get_Change_Cart_Items_or_Change_Item_Quantities',
    'get_Checkout',
    'get_Checkout_or_No_Approved',
    'get_Shopping_Cart',
    'get_Payment_Info_to_Merchant',
    'get_Approved',
    'get_No_Approved',
    'get_Online_Payment_Integration',
    'get_Shipping_and_Handling',
    'get_Order_Confirmation',
  ]
  static authenticationFuncs = [
    'Registered',
    'User_Registration',
    'Check_Register',
    'Login',
    'No_Shopping',
    'View_Account_Status',
    'Logout',
    'Check_Shop',
    'Shop',
    'View_Search_items',
    'Add_Item_to_Cart',
    'Display_Cart_Contents',
    'Change_Cart_Items',
    'No_Change_Cart_Items',
    'Change_Item_Quantities',
    'Change_Cart_Items_or_Change_Item_Quantities',
    'Checkout',
    'Checkout_or_No_Approved',
    'Shopping_Cart',
    'Payment_Info_to_Merchant',
    'Approved',
    'No_Approved',
    'Online_Payment_Integration',
    'Shipping_and_Handling',
    'Order_Confirmation',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Registered',
    'get_Registered',
    'User_Registration',
    'get_User_Registration',
    'Check_Register',
    'get_Check_Register',
    'Login',
    'get_Login',
    'No_Shopping',
    'get_No_Shopping',
    'View_Account_Status',
    'get_View_Account_Status',
    'Logout',
    'get_Logout',
    'Check_Shop',
    'get_Check_Shop',
    'Shop',
    'get_Shop',
    'View_Search_items',
    'get_View_Search_items',
    'Add_Item_to_Cart',
    'get_Add_Item_to_Cart',
    'Display_Cart_Contents',
    'get_Display_Cart_Contents',
    'Change_Cart_Items',
    'get_Change_Cart_Items',
    'No_Change_Cart_Items',
    'get_No_Change_Cart_Items',
    'Change_Item_Quantities',
    'get_Change_Item_Quantities',
    'Change_Cart_Items_or_Change_Item_Quantities',
    'get_Change_Cart_Items_or_Change_Item_Quantities',
    'Checkout',
    'get_Checkout',
    'Checkout_or_No_Approved',
    'get_Checkout_or_No_Approved',
    'Shopping_Cart',
    'get_Shopping_Cart',
    'Payment_Info_to_Merchant',
    'get_Payment_Info_to_Merchant',
    'Approved',
    'get_Approved',
    'No_Approved',
    'get_No_Approved',
    'Online_Payment_Integration',
    'get_Online_Payment_Integration',
    'Shipping_and_Handling',
    'get_Shipping_and_Handling',
    'Order_Confirmation',
    'get_Order_Confirmation'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ORDER-PROCESS'
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
  // --------------------Registered---------------------------
  check_Registered(address) {
    let check_Registered = this.get_RegisteredByAddress(address)
    if (!check_Registered || check_Registered.type !== 'REGISTERED') throw `REGISTERED IS NOT EXIST`
    return true
  }
  get_RegisteredByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Registered() {
    await this._user.checkUser(this.sender, 'USER')
    let Registered = await this._process.createProcess('REGISTERED')
    return Registered
  }
  get_Registered() {
    return this._process.getProcessByType('REGISTERED')
  }
  // --------------------User_Registration---------------------------
  check_User_Registration(address) {
    let check_User_Registration = this.get_User_RegistrationByAddress(address)
    if (!check_User_Registration || check_User_Registration.type !== 'USER_REGISTRATION') throw `USER_REGISTRATION IS NOT EXIST`
    return true
  }
  get_User_RegistrationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async User_Registration() {
    await this._user.checkUser(this.sender, 'USER')
    let User_Registration = await this._process.createProcess('USER_REGISTRATION')
    return User_Registration
  }
  get_User_Registration() {
    return this._process.getProcessByType('USER_REGISTRATION')
  }
  // --------------------Login--------------------------- 
  check_Login(address) {
    let check_Login = this.get_LoginByAddress(address)
    if (!check_Login || check_Login.type !== 'LOGIN') throw `LOGIN IS NOT EXIST`
    return true
  }
  get_LoginByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checK_Process(address) {
    this.check_Registered = this.get_RegisteredByAddress(address);
    this.check_User_Registration = this.get_User_RegistrationByAddress(address);
    if (this.check_Registered.type == 'REGISTERED') {
      return true;
    }
    else if (this.check_User_Registration.type == 'USER_REGISTRATION') {
      return true;
    }
    else {
      throw `USER_REGISTRATION_OR_USER_REGISTRATION IS NOT EXIST`;
    }
  }
  async Check_Register() {
    await this.checK_Process(this.sender, 'USER_REGISTRATION_OR_USER_REGISTRATION')
    let Check_Register = await this._process.createProcess('CHECK_REGISTER')
    return Check_Register
  }
  get_Check_Register() {
    return this._process.getProcessByType('CHECK_REGISTER')
  }
  async Login(address_Check_Register) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Register = this._process.getProcessByAddress(address_Check_Register)
    if (!check_Check_Register || check_Check_Register.type !== 'CHECK_REGISTER')
      throw 'CHECK_REGISTER IS NOT EXIST'
    let Login = await this._process.createProcess('LOGIN')
    return Login
  }
  get_Login() {
    return this._process.getProcessByType('LOGIN')
  }
  // --------------------Login--------------------------- 
  checK_Process1(address) {
    this.check_Login = this.get_LoginByAddress(address);
    this.check_View_Search_items = this.get_View_Search_itemsByAddress(address);
    this.check_Add_Item_to_Cart = this.get_Add_Item_to_CartByAddress(address);
    this.check_Display_Cart_Contents = this.get_Display_Cart_ContentsByAddress(address);
    this.check_Change_Item_Quantities = this.get_Change_Item_QuantitiesByAddress(address);
    this.check_Checkout = this.get_CheckoutByAddress(address);
    this.check_View_Account_Statust = this.get_View_Account_StatusByAddress(address);
    if (this.check_Login.type == 'LOGIN') {
      return true;
    }
    else if (this.check_View_Search_items.type == 'VIEW_SEARCH_ITEMS') {
      return true;
    }
    else if (this.check_Add_Item_to_Cart.type == 'ADD_ITEM_TO_CART') {
      return true;
    }
    else if (this.check_Display_Cart_Contents.type == 'DISPLAY_CART_CONTENTS') {
      return true;
    }
    else if (this.check_Change_Item_Quantities.type == 'CHANGE_ITEM_QUANTITIES') {
      return true;
    }
    else if (this.check_Checkout.type == 'CHECK_OUT') {
      return true;
    }
    else if (this.check_View_Account_Status.type == 'VIEW_ACCOUNT_STATUS') {
      return true;
    }
    else {
      throw `LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Check_Shop() {
    await this.checK_Process1(this.sender, 'LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS_FOR_CHECK')
    let Check_Shop = await this._process.createProcess('LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS')
    return Check_Shop
  }
  get_Check_Shop() {
    return this._process.getProcessByType('LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS')
  }
  async Shop(address_Check_Shop) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Shop = this._process.getProcessByAddress(address_Check_Shop)
    if (!check_Check_Shop || check_Check_Shop.type !== 'LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS')
      throw 'LOGIN_OR_VIEW_SEARCH_ITEMS_ORADD_ITEM_TO_CART_OR_DISPLAY_CART_CONTENTS_OR_CHANGE_ITEM_QUANTITIES_OR_CHECK_OUT_OR_VIEW_ACCOUNT_STATUS IS NOT EXIST'
    let shop = await this._process.createProcess('SHOP')
    return shop
  }
  get_Shop() {
    return this._process.getProcessByType('SHOP')
  }
  // --------------------No_Shopping--------------------------- 
  async No_Shopping(address_Login) {
    this._user.checkUser(this.sender, 'USER')
    let check_Login = this._process.getProcessByAddress(address_Login)
    if (!check_Login || check_Login.type !== 'LOGIN')
      throw 'LOGIN IS NOT EXIST'
    let No_Shopping = await this._process.createProcess('NO_SHOPPING')
    return No_Shopping
  }
  get_No_Shopping() {
    return this._process.getProcessByType('NO_SHOPPING')
  }
  // --------------------View_Account_Status--------------------------- 
  check_View_Account_Status(address) {
    let check_View_Account_Status = this.get_View_Account_StatusByAddress(address)
    if (!check_View_Account_Status || check_View_Account_Status.type !== 'VIEW_ACCOUNT_STATUS') throw `VIEW_ACCOUNT_STATUS IS NOT EXIST`
    return true
  }
  get_View_Account_StatusByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async View_Account_Status(address_No_Shopping) {
    this._user.checkUser(this.sender, 'USER')
    let check_No_Shopping = this._process.getProcessByAddress(address_No_Shopping)
    if (!check_No_Shopping || check_No_Shopping.type !== 'NO_SHOPPING')
      throw 'NO_SHOPPING IS NOT EXIST'
    let View_Account_Status = await this._process.createProcess('VIEW_ACCOUNT_STATUS')
    return View_Account_Status
  }
  get_View_Account_Status() {
    return this._process.getProcessByType('VIEW_ACCOUNT_STATUS')
  }
  // --------------------Logout--------------------------- 
  async Logout(address_No_Shopping) {
    this._user.checkUser(this.sender, 'USER')
    let check_No_Shopping = this._process.getProcessByAddress(address_No_Shopping)
    if (!check_No_Shopping || check_No_Shopping.type !== 'NO_SHOPPING')
      throw 'NO_SHOPPING IS NOT EXIST'
    let Logout = await this._process.createProcess('LOGOUT')
    return Logout
  }
  get_Logout() {
    return this._process.getProcessByType('LOGOUT')
  }
  // --------------------View_Search_items--------------------------- 
  check_View_Search_items(address) {
    let check_View_Search_items = this.get_View_Search_itemsByAddress(address)
    if (!check_View_Search_items || check_View_Search_items.type !== 'VIEW_SEARCH_ITEMS') throw `VIEW_SEARCH_ITEMS IS NOT EXIST`
    return true
  }
  get_View_Search_itemsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async View_Search_items(address_Shop) {
    this._user.checkUser(this.sender, 'USER')
    let check_Shop = this._process.getProcessByAddress(address_Shop)
    if (!check_Shop || check_Shop.type !== 'SHOP')
      throw 'SHOP IS NOT EXIST'
    let View_Search_items = await this._process.createProcess('VIEW_SEARCH_ITEMS')
    return View_Search_items
  }
  get_View_Search_items() {
    return this._process.getProcessByType('VIEW_SEARCH_ITEMS')
  }
  // --------------------Add_Item_to_Cart--------------------------- 
  check_Add_Item_to_Cart(address) {
    let check_View_Search_items = this.get_Add_Item_to_CartByAddress(address)
    if (!check_View_Search_items || check_View_Search_items.type !== 'VIEW_SEARCH_ITEMS') throw `VIEW_SEARCH_ITEMS IS NOT EXIST`
    return true
  }
  get_Add_Item_to_CartByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Add_Item_to_Cart(address_View_Search_items) {
    this._user.checkUser(this.sender, 'USER')
    let checkView_Search_items = this._process.getProcessByAddress(address_View_Search_items)
    if (!checkView_Search_items || checkView_Search_items.type !== 'VIEW_SEARCH_ITEMS')
      throw 'VIEW_SEARCH_ITEMS IS NOT EXIST'
    let Add_Item_to_Cart = await this._process.createProcess('ADD_ITEM_TO_CART')
    return Add_Item_to_Cart
  }
  get_Add_Item_to_Cart() {
    return this._process.getProcessByType('ADD_ITEM_TO_CART')
  }
  // --------------------Display_Cart_Contents--------------------------- 
  check_Display_Cart_Contents(address) {
    let check_Display_Cart_Contents = this.get_Display_Cart_ContentsByAddress(address)
    if (!check_Display_Cart_Contents || check_Display_Cart_Contents.type !== 'DISPLAY_CART_CONTENTS') throw `DISPLAY_CART_CONTENTS IS NOT EXIST`
    return true
  }
  get_Display_Cart_ContentsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Display_Cart_Contents(address_Add_Item_to_Cart) {
    this._user.checkUser(this.sender, 'USER')
    let checkAdd_Item_to_Cart = this._process.getProcessByAddress(address_Add_Item_to_Cart)
    if (!checkAdd_Item_to_Cart || checkAdd_Item_to_Cart.type !== 'ADD_ITEM_TO_CART')
      throw 'ADD_ITEM_TO_CART IS NOT EXIST'
    let Display_Cart_Contents = await this._process.createProcess('DISPLAY_CART_CONTENTS')
    return Display_Cart_Contents
  }
  get_Display_Cart_Contents() {
    return this._process.getProcessByType('DISPLAY_CART_CONTENTS')
  }
  // --------------------Change_Cart_Items--------------------------- 
  check_Change_Cart_Items(address) {
    let check_Change_Cart_Items = this.get_Change_Cart_ItemsByAddress(address)
    if (!check_Change_Cart_Items || check_Change_Cart_Items.type !== 'CHANGE_CART_ITEMS') throw `CHANGE_CART_ITEMS IS NOT EXIST`
    return true
  }
  get_Change_Cart_ItemsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Change_Cart_Items(address_Display_Cart_Contents) {
    this._user.checkUser(this.sender, 'USER')
    let checkDisplay_Cart_Contents = this._process.getProcessByAddress(address_Display_Cart_Contents)
    if (!checkDisplay_Cart_Contents || checkDisplay_Cart_Contents.type !== 'DISPLAY_CART_CONTENTS')
      throw 'DISPLAY_CART_CONTENTS IS NOT EXIST'
    let Change_Cart_Items = await this._process.createProcess('CHANGE_CART_ITEMS')
    return Change_Cart_Items
  }
  get_Change_Cart_Items() {
    return this._process.getProcessByType('CHANGE_CART_ITEMS')
  }
  // --------------------No_Change_Cart_Items--------------------------- 
  check_No_Change_Cart_Items(address) {
    let check_No_Change_Cart_Items = this.get_No_Change_Cart_ItemsByAddress(address)
    if (!check_No_Change_Cart_Items || check_No_Change_Cart_Items.type !== 'NO_CHANGE_CART_ITEMS') throw `NO_CHANGE_CART_ITEMS IS NOT EXIST`
    return true
  }
  get_No_Change_Cart_ItemsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async No_Change_Cart_Items(address_Display_Cart_Contents) {
    this._user.checkUser(this.sender, 'USER')
    let checkDisplay_Cart_Contents = this._process.getProcessByAddress(address_Display_Cart_Contents)
    if (!checkDisplay_Cart_Contents || checkDisplay_Cart_Contents.type !== 'DISPLAY_CART_CONTENTS')
      throw 'DISPLAY_CART_CONTENTS IS NOT EXIST'
    let No_Change_Cart_Items = await this._process.createProcess('NO_CHANGE_CART_ITEMS')
    return No_Change_Cart_Items
  }
  get_No_Change_Cart_Items() {
    return this._process.getProcessByType('NO_CHANGE_CART_ITEMS')
  }
  // --------------------Change_Item_Quantities--------------------------- 
  check_Change_Item_Quantities(address) {
    let check_Change_Item_Quantities = this.get_Change_Item_QuantitiesByAddress(address)
    if (!check_Change_Item_Quantities || check_Change_Item_Quantities.type !== 'CHANGE_ITEM_QUANTITIES') throw `CHANGE_ITEM_QUANTITIES IS NOT EXIST`
    return true
  }
  get_Change_Item_QuantitiesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Change_Item_Quantities(address_Change_Cart_Items) {
    this._user.checkUser(this.sender, 'USER')
    let checkChange_Cart_Items = this._process.getProcessByAddress(address_Change_Cart_Items)
    if (!checkChange_Cart_Items || checkChange_Cart_Items.type !== 'CHANGE_CART_ITEMS')
      throw 'CHANGE_CART_ITEMS IS NOT EXIST'
    let Change_Item_Quantities = await this._process.createProcess('CHANGE_ITEM_QUANTITIES')
    return Change_Item_Quantities
  }
  get_Change_Item_Quantities() {
    return this._process.getProcessByType('CHANGE_ITEM_QUANTITIES')
  }
  // --------------------Checkout--------------------------- 
  checkProcess2(address) {
    this.check_Change_Cart_Items = this.get_Change_Cart_ItemsByAddress(address);
    this.check_Change_Item_Quantities = this.get_Change_Item_QuantitiesByAddress(address);
    if (this.check_Change_Cart_Items.type == 'CHANGE_CART_ITEMS') {
      return true;
    }
    else if (this.check_Change_Item_Quantities.type == 'CHANGE_ITEM_QUANTITIES') {
      return true;
    }
    else {
      throw `CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Change_Cart_Items_or_Change_Item_Quantities() {
    await this.checkProcess2(this.sender, 'CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES_FOR_CHECK')
    let process2 = await this._process.createProcess('CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES')
    return process2
  }
  get_Change_Cart_Items_or_Change_Item_Quantities() {
    return this._process.getProcessByType('CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES')
  }
  check_Checkout(address) {
    let check_Checkout = this.get_CheckoutByAddress(address)
    if (!check_Checkout || check_Checkout.type !== 'CHECK_OUT') throw `CHECK_OUT IS NOT EXIST`
    return true
  }
  get_CheckoutByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Checkout(address_Change_Cart_Items_or_Change_Item_Quantities) {
    this._user.checkUser(this.sender, 'USER')
    let checkChange_Cart_Items_or_Change_Item_Quantities = this._process.getProcessByAddress(address_Change_Cart_Items_or_Change_Item_Quantities)
    if (!checkChange_Cart_Items_or_Change_Item_Quantities || checkChange_Cart_Items_or_Change_Item_Quantities.type !== 'CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES')
      throw 'CHANGE_CART_ITEMS_OR_CHANGE_ITEM_QUANTITIES IS NOT EXIST'
    let Checkout = await this._process.createProcess('CHECK_OUT')
    return Checkout
  }
  get_Checkout() {
    return this._process.getProcessByType('CHECK_OUT')
  }
  // --------------------Shopping_Cart--------------------------- 
  checkProcess3(address) {
    this.check_Checkout = this.get_Change_Cart_ItemsByAddress(address);
    this.check_No_Approved = this.get_Change_Item_QuantitiesByAddress(address);
    if (this.check_Checkout.type == 'CHECK_OUT') {
      return true;
    }
    else if (this.check_No_Approved.type == 'NO_APPROVED') {
      return true;
    }
    else {
      throw `CHECK_OUT_OR_NO_APPROVED_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Checkout_or_No_Approved() {
    await this.checkProcess3(this.sender, 'CHECK_OUT_OR_NO_APPROVED_FOR_CHECK')
    let process3 = await this._process.createProcess('CHECK_OUT_OR_NO_APPROVED')
    return process3
  }
  get_Checkout_or_No_Approved() {
    return this._process.getProcessByType('CHECK_OUT_OR_NO_APPROVED')
  }
  async Shopping_Cart(address_Checkout_or_No_Approved) {
    this._user.checkUser(this.sender, 'USER')
    let checkCheckout_or_No_Approved = this._process.getProcessByAddress(address_Checkout_or_No_Approved)
    if (!checkCheckout_or_No_Approved || checkCheckout_or_No_Approved.type !== 'CHECK_OUT_OR_NO_APPROVED')
      throw 'CHECK_OUT_OR_NO_APPROVED IS NOT EXIST'
    let Shopping_Cart = await this._process.createProcess('SHOPPING_CART')
    return Shopping_Cart
  }
  get_Shopping_Cart() {
    return this._process.getProcessByType('SHOPPING_CART')
  }
  // --------------------Payment_Info_to_Merchant--------------------------- 
  check_Payment_Info_to_Merchant(address) {
    let check_Payment_Info_to_Merchant = this.get_Payment_Info_to_MerchantByAddress(address)
    if (!check_Payment_Info_to_Merchant || check_Payment_Info_to_Merchant.type !== 'PAYMENT_INFO_TO_MERCHANT') throw `PAYMENT_INFO_TO_MERCHANT IS NOT EXIST`
    return true
  }
  get_Payment_Info_to_MerchantByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Payment_Info_to_Merchant(address_Shopping_Cart) {
    this._user.checkUser(this.sender, 'USER')
    let check_Shopping_Cart = this._process.getProcessByAddress(address_Shopping_Cart)
    if (!check_Shopping_Cart || check_Shopping_Cart.type !== 'SHOPPING_CART')
      throw 'SHOPPING_CART IS NOT EXIST'
    let Payment_Info_to_Merchant = await this._process.createProcess('PAYMENT_INFO_TO_MERCHANT')
    return Payment_Info_to_Merchant
  }
  get_Payment_Info_to_Merchant() {
    return this._process.getProcessByType('PAYMENT_INFO_TO_MERCHANT')
  }
  // --------------------Approved--------------------------- 
  async Approved(address_Payment_Info_to_Merchant) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payment_Info_to_Merchant = this._process.getProcessByAddress(address_Payment_Info_to_Merchant)
    if (!check_Payment_Info_to_Merchant || check_Payment_Info_to_Merchant.type !== 'PAYMENT_INFO_TO_MERCHANT')
      throw 'PAYMENT_INFO_TO_MERCHANT IS NOT EXIST'
    let Approved = await this._process.createProcess('APPROVED')
    return Approved
  }
  get_Approved() {
    return this._process.getProcessByType('APPROVED')
  }
  // --------------------No_Approved--------------------------- 
  async No_Approved(address_Payment_Info_to_Merchant) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payment_Info_to_Merchant = this._process.getProcessByAddress(address_Payment_Info_to_Merchant)
    if (!check_Payment_Info_to_Merchant || check_Payment_Info_to_Merchant.type !== 'PAYMENT_INFO_TO_MERCHANT')
      throw 'PAYMENT_INFO_TO_MERCHANT IS NOT EXIST'
    let No_Approved = await this._process.createProcess('NO_APPROVED')
    return No_Approved
  }
  get_No_Approved() {
    return this._process.getProcessByType('NO_APPROVED')
  }
  // --------------------Online_Payment_Integration--------------------------- 
  async Online_Payment_Integration(address_Approved) {
    this._user.checkUser(this.sender, 'USER')
    let check_Approved = this._process.getProcessByAddress(address_Approved)
    if (!check_Approved || check_Approved.type !== 'APPROVED')
      throw 'APPROVED IS NOT EXIST'
    let Online_Payment_Integration = await this._process.createProcess('ONLINE_PAYMENT_INTEGRATIION')
    return Online_Payment_Integration
  }
  get_Online_Payment_Integration() {
    return this._process.getProcessByType('ONLINE_PAYMENT_INTEGRATIION')
  }
  // --------------------Shipping_and_Handling--------------------------- 
  async Shipping_and_Handling(address_Online_Payment_Integration) {
    this._user.checkUser(this.sender, 'USER')
    let check_Online_Payment_Integration = this._process.getProcessByAddress(address_Online_Payment_Integration)
    if (!check_Online_Payment_Integration || check_Online_Payment_Integration.type !== 'ONLINE_PAYMENT_INTEGRATIION')
      throw 'ONLINE_PAYMENT_INTEGRATIION IS NOT EXIST'
    let Shipping_and_Handling = await this._process.createProcess('SHIPPING_AND_HANDLING')
    return Shipping_and_Handling
  }
  get_Shipping_and_Handling() {
    return this._process.getProcessByType('SHIPPING_AND_HANDLING')
  }
  // --------------------Order_Confirmation--------------------------- 
  async Order_Confirmation(address_Shipping_and_Handling) {
    this._user.checkUser(this.sender, 'USER')
    let check_Shipping_and_Handling = this._process.getProcessByAddress(address_Shipping_and_Handling)
    if (!check_Shipping_and_Handling || check_Shipping_and_Handling.type !== 'SHIPPING_AND_HANDLING')
      throw 'SHIPPING_AND_HANDLING IS NOT EXIST'
    let Order_Confirmation = await this._process.createProcess('ORDER_CONFIRMATION')
    return Order_Confirmation
  }
  get_Order_Confirmation() {
    return this._process.getProcessByType('ORDER_CONFIRMATION')
  }
}
export default TokenMain;
