import Contract from 'Contract'
import Process from './process'
import User from './user'
import Login from './login'
import Answer from './answer'
class TokenMain extends Contract {
  static viewFuncs = [

  ]
  static authenticationFuncs = [

  ]
  static publicFuncs = [
    'Admin',
    'Affiliate',
    'Customer',
    'Count',
    'Login',
    'Vail',
    'Create_QRCode_Affiliate',
    'Create_QRCode_Promotion',
    'Scan_QRCode',
    'Go_to_page',
    'Input_Email',
    'Recieve_QRCode_from_Email',
    'Check_if_have_a_wallet',
    'Input_CSE_wallet',
    'Distribute_promotion_for_admin',
    'Get_CSE_to_wallet',
    'End',
    'Scan_QRCode',
    'Go_to_page',
    'Input_Email',
    'Recieve_QRCode_from_Email',
    'Use_QRCode'


  ]
  static schemas = {
    name: {
      type: String,
      default: 'QR-CODE-STATE-1'
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
    this._login = new Login(data)
    this._answer = new Answer(data)
  }
  //--------------------USER------------------------------
  async Admin() {
    let admin = await this._user.createUser('ADMIN')
    return admin
  }
  getAdmin() {
    let admin = this._user.getUserByType('ADMIN')
    return admin
  }
  async Affiliate() {
    let affiliate = await this._user.createUser('AFFILIATE')
    return affiliate
  }
  getAffiliaten() {
    let affiliate = this._user.getUserByType('AFFILIATE')
    return affiliate
  }
  async Customer() {
    let customer = await this._user.createUser('CUSTOMER')
    return customer
  }
  getCustomer() {
    let customer = this._user.getUserByType('CUSTOMER')
    return customer
  }
  //---------------------Login------------------------------
  async Login() {
    let login = await this._login.createLogin()
    return login
  }
  get_Login() {
    return this._login.getLogin()
  }
  async Valid(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE ANSWER FAIL'
    await this._login.checkLogin(this.sender)
    let answer = await this._answer.createAnswer(type - 1, this.sender)
    this.setToAddress(user.address)
    return answer
  }
  async getYes() {
    await this._login.checkLogin(this.sender)
    return this._answer.getAnswerByType('YES', this.sender)
  }
  async getNo() {
    await this._login.checkLogin(this.sender)
    return this._answer.getAnswerByType('NO', this.sender)
  }

  // --------------------Create_QRCode_Promotion--------------------------- 
  async Create_QRCode_Promotion(address_Valid) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_Valid = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid || check_Valid.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let createQRcodePr = await this._process.createProcess('QRCODE_PROMOTION')
    return createQRcodePr
  }
  get_Create_QRCode_Promotion() {
    return this._process.getProcessByType('QRCODE_PROMOTION')
  }
  // --------------------View_dashboard--------------------------- 
  async View_dashboard(address_Valid) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_Valid = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid || check_Valid.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let View_dashboard = await this._process.createProcess('VIEW_DASHBOARD')
    return View_dashboard
  }
  get_View_dashboard() {
    return this._process.getProcessByType('VIEW_DASHBOARD')
  }
  // --------------------People_register--------------------------- 
  async People_register(address_View_dashboard) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_View_dashboard = this._process.getProcessByAddress(address_View_dashboard)
    if (!check_View_dashboard || check_View_dashboard.type !== 'VIEW_DASHBOARD')
      throw 'VIEW_DASHBOARD IS NOT EXIST'
    let People_register = await this._process.createProcess('VIEW_HOW_MANY_PEOPLE_REGISTER')
    return People_register
  }
  get_People_register() {
    return this._process.getProcessByType('VIEW_HOW_MANY_PEOPLE_REGISTER')
  }
  // --------------------People_use_QRCode--------------------------- 
  async People_use_QRCode(address_View_dashboard) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_View_dashboard = this._process.getProcessByAddress(address_View_dashboard)
    if (!check_View_dashboard || check_View_dashboard.type !== 'VIEW_DASHBOARD')
      throw 'VIEW_DASHBOARD IS NOT EXIST'
    let People_use_QRCode = await this._process.createProcess('VIEW_HOW_MANY_PEOPLE_USE_QRCODE')
    return People_use_QRCode
  }
  get_People_use_QRCode() {
    return this._process.getProcessByType('VIEW_HOW_MANY_PEOPLE_USE_QRCODE')
  }
  // --------------------QRCode--------------------------- 
  async QRCode(address_View_dashboard) {
    this._user.checkUser(this.sender, 'ADMIN')
    let check_View_dashboard = this._process.getProcessByAddress(address_View_dashboard)
    if (!check_View_dashboard || check_View_dashboard.type !== 'VIEW_DASHBOARD')
      throw 'VIEW_DASHBOARD IS NOT EXIST'
    let QRCode = await this._process.createProcess('VIEW_HOW_MANY_QRCODE')
    return QRCode
  }
  get_QRCode() {
    return this._process.getProcessByType('VIEW_HOW_MANY_QRCODE')
  }
  // // --------------------Scan_QRCode--------------------------- 
  // check_User(address) {
  //   this._user.checkUser = this._user.getUserByAddress(address);
  //   this._user.checkUser = this._user.getUserByAddress(address);
  //   if (this._user.checkUser.type == 'AFFILIATE') {
  //     return true;
  //   }
  //   else if (this.check_Customer.type == 'CUSTOMER') {
  //     return true;
  //   }
  //   else {
  //     throw `AFFILIATE_OR_CUSTOMER IS NOT EXIST`;
  //   }
  // }
  // // async Affiliate_or_Customer() {
  // //   this.check_User(this.sender, 'AFFILIATE_OR_CUSTOMER_FOR_CHECK')
  // //   let check = await this._process.createProcess('AFFILIATE_OR_CUSTOMER')
  // //   return check
  // // }
  // // --------------------Create_QRCode_Affiliate_or_Distribute_promotion_for_admin--------------------------- 
  // check_Create_or_Distribute(address) {
  //   this.check_Create_QRCode_Affiliate = this.get_Create_QRCode_AffiliateByAddress(address);
  //   this.check_Distribute_promotion_for_admin = this.get_Distribute_promotion_for_adminByAddress(address);
  //   if (this.check_check_Create_QRCode_Affiliate.type == 'QRCODE_AFFILIATE') {
  //     return true;
  //   }
  //   else if (this.check_Distribute_promotion_for_admin.type == 'DISTRIBUTE_PROMOTION_FOR_ADMIN') {
  //     return true;
  //   }
  //   else {
  //     throw `QRCODE_AFFILIATE_OR_DISTRIBUTE_PROMOTION_FOR_ADMIN_FOR_CHECK IS NOT EXIST`;
  //   }
  // }
  // async Create_QRCode_Affiliate_or_Distribute_promotion_for_admin() {
  //   this.check_Create_or_Distribute(this.sender, 'QRCODE_AFFILIATE_OR_DISTRIBUTE_PROMOTION_FOR_ADMIN_FOR_CHECK')
  //   let check1 = await this._process.createProcess('QRCODE_AFFILIATE_OR_DISTRIBUTE_PROMOTION_FOR_ADMIN')
  //   return check1
  // }
  // --------------------Create_QRCode_Affiliate---------------------------
  check_Create_QRCode_Affiliate(address) {
    let check_Create_QRCode_Affiliate = this.get_Create_QRCode_AffiliateByAddress(address)
    if (!check_Create_QRCode_Affiliate || check_Create_QRCode_Affiliate.type !== 'QRCODE_AFFILIATE') throw `QRCODE_AFFILIATE IS NOT EXIST`
    return true
  }
  get_Create_QRCode_AffiliateByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_QRCode_Affiliate(address_Valid) {
    this._user.checkUser(this.sender, 'USER')
    let check_Valid = this._process.getProcessByAddress(address_Valid)
    if (!check_Valid || check_Valid.type !== 'YES')
      throw 'YES IS NOT EXIST'
    let createQRcodeAf = await this._process.createProcess('QRCODE_AFFILIATE')
    return createQRcodeAf
  }
  get_Create_QRCode_Affiliate() {
    return this._process.getProcessByType('QRCODE_AFFILIATE')
  }
  // --------------------Scan_QRCode ---------------------------
  async Scan_QRCode_1(address_Create_QRCode_Affiliate) {
    this.check_User(this.sender, 'AFFILIATE')
    let check_Create_QRCode_Affiliate = this._process.getProcessByAddress(address_Create_QRCode_Affiliate)
    if (!check_Create_QRCode_Affiliate || check_Create_QRCode_Affiliate.type !== 'QRCODE_AFFILIATE')
      throw 'QRCODE_AFFILIATE IS NOT EXIST'
    let Scan_QRCode_1 = await this._process.createProcess('SCAN_QRCODE_1')
    return Scan_QRCode_1
  }
  get_Scan_QRCode_1() {
    return this._process.getProcessByType('SCAN_QRCODE_1')
  }
  // --------------------Go_to_page ---------------------------
  async Go_to_page_1(address_Scan_QRCode_1) {
    this.check_User(this.sender, 'AFFILIATE')
    let check_Scan_QRCode_1 = this._process.getProcessByAddress(address_Scan_QRCode_1)
    if (!check_Scan_QRCode_1|| check_Scan_QRCode_1.type !== 'SCAN_QRCODE_1')
      throw 'SCAN_QRCODE_1 IS NOT EXIST'
    let Go_to_page_1 = await this._process.createProcess('GO_TO_PAGE_1')
    return Go_to_page_1
  }
  get_Go_to_page_1() {
    return this._process.getProcessByType('GO_TO_PAGE_1')
  }
  // --------------------Input_Email ---------------------------
  async Input_Email_1(address_Go_to_page_1) {
    this.check_User(this.sender, 'AFFILIATE')
    let check_Go_to_page_1 = this._process.getProcessByAddress(address_Go_to_page_1)
    if (!check_Go_to_page_1 || check_Go_to_page_1.type !== 'GO_TO_PAGE_1')
      throw 'GO_TO_PAGE_1 IS NOT EXIST'
    let Input_Email_1 = await this._process.createProcess('INPUT_EMAIL_1')
    return Input_Email_1
  }
  get_Input_Email1() {
    return this._process.getProcessByType('INPUT_EMAIL1')
  }
  // --------------------Recieve_QRCode_from_Email ---------------------------
  async Recieve_QRCode_from_Email_1(address_Input_Email_1) {
    this.check_User(this.sender, 'AFFILIATE')
    let check_Input_Email_1 = this._process.getProcessByAddress(address_Input_Email_1)
    if (!check_Input_Email_1 || check_Input_Email_1.type !== 'INPUT_EMAIL_1')
      throw 'INPUT_EMAIL_1 IS NOT EXIST'
    let Recieve_QRCode_from_Email_1 = await this._process.createProcess('RECIEVE_QRCODE_FROM_EMAIL_1')
    return Recieve_QRCode_from_Email_1
  }
  get_Recieve_QRCode_from_Email1() {
    return this._process.getProcessByType('RECIEVE_QRCODE_FROM_EMAIL_1')
  }
    // --------------------Distribute_promotion_for_admin ---------------------------
    async Distribute_promotion_for_admin(address_Input_Email) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Input_Email = this._process.getProcessByAddress(address_Input_Email)
      if (!check_Input_Email || check_Input_Email.type !== 'INPUT_EMAIL')
        throw 'INPUT_EMAIL IS NOT EXIST'
      let Distribute_promotion_for_admin = await this._process.createProcess('DISTRIBUTE_PROMOTION_FOR_ADMIN')
      return Distribute_promotion_for_admin
    }
    get_Distribute_promotion_for_admin() {
      return this._process.getProcessByType('DISTRIBUTE_PROMOTION_FOR_ADMIN')
    } 

    async Scan_QRCode_2(address_Distribute_promotion_for_admin) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Create_QRCode_Affiliate = this._process.getProcessByAddress(address_Distribute_promotion_for_admin)
      if (!check_Create_QRCode_Affiliate || check_Create_QRCode_Affiliate.type !== 'DISTRIBUTE_PROMOTION_FOR_ADMIN')
        throw 'DISTRIBUTE_PROMOTION_FOR_ADMIN IS NOT EXIST'
      let Scan_QRCode_2 = await this._process.createProcess('SCAN_QRCODE_2')
      return Scan_QRCode_2
    }
    get_Scan_QRCode_2() {
      return this._process.getProcessByType('SCAN_QRCODE_2')
    }
    // --------------------Go_to_page ---------------------------
    async Go_to_page_2(address_Scan_QRCode_2) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Scan_QRCode_2 = this._process.getProcessByAddress(address_Scan_QRCode_2)
      if (!check_Scan_QRCode_2 || check_Scan_QRCode_2.type !== 'SCAN_QRCODE_2')
        throw 'SCAN_QRCODE_2 IS NOT EXIST'
      let Go_to_page_2 = await this._process.createProcess('GO_TO_PAGE_2')
      return Go_to_page_2
    }
    get_Go_to_page_2() {
      return this._process.getProcessByType('GO_TO_PAGE_2')
    }
    // --------------------Input_Email ---------------------------
    async Input_Email_2(address_Go_to_page_2) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Go_to_page_2 = this._process.getProcessByAddress(address_Go_to_page_2)
      if (!check_Go_to_page_2 || check_Go_to_page_2.type !== 'GO_TO_PAGE')
        throw 'GO_TO_PAGE IS NOT EXIST'
      let Input_Email_2 = await this._process.createProcess('INPUT_EMAIL_2')
      return Input_Email_2
    }
    get_Input_Email_2() {
      return this._process.getProcessByType('INPUT_EMAIL_2')
    }
    // --------------------Recieve_QRCode_from_Email ---------------------------
    async Recieve_QRCode_from_Email_2(address_Input_Email_2) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Input_Email_2 = this._process.getProcessByAddress(address_Input_Email_2)
      if (!check_Input_Email_2 || check_Input_Email_2.type !== 'INPUT_EMAIL_2')
        throw 'INPUT_EMAIL2 IS NOT EXIST'
      let Recieve_QRCode_from_Email_2 = await this._process.createProcess('RECIEVE_QRCODE_FROM_EMAIL_2')
      return Recieve_QRCode_from_Email_2
    }
    get_Recieve_QRCode_from_Email_2() {
      return this._process.getProcessByType('RECIEVE_QRCODE_FROM_EMAIL_2')
    }
     // --------------------Use_QRCode ---------------------------
     async Use_QRCode(address_Input_Email_2) {
      this.check_User(this.sender, 'AFFILIATE')
      let check_Input_Email_2 = this._process.getProcessByAddress(address_Input_Email_2)
      if (!check_Input_Email_2 || check_Input_Email_2.type !== 'INPUT_EMAIL_2')
        throw 'INPUT_EMAIL2 IS NOT EXIST'
      let Use_QRCode = await this._process.createProcess('USE_QRCODE')
      return Use_QRCode
    }
    get_Use_QRCode() {
      return this._process.getProcessByType('USE_QRCODE')
    }
}
export default TokenMain;
