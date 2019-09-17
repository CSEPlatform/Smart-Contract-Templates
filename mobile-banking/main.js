import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Registration',
    'get_Registration_Details_Correct',
    'get_Registration_Details_Incorrect',
    'get_Register_Successfully',
    'get_Login_or_Register_Successfully',
    'get_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server ',
    'get_User_Credentials_Verified',
    'get_Access_Bank_Services',
    'get_User_Credentials_have_not_been_verified',
    'get_Alert_Customer_Emergency_Number_and_Redirect_to_honneypot',
    'get_Condition_Exit',
  ]
  static authenticationFuncs = [
    'Registration',
    'Registration_Details_Correct',
    'Registration_Details_Incorrect',
    'Register_Successfully',
    'Login_or_Register_Successfully',
    'Enter_your_BVN_and_Scan_finger_and_trasmit_to_server ',
    'User_Credentials_Verified',
    'Access_Bank_Services',
    'User_Credentials_have_not_been_verified',
    'Alert_Customer_Emergency_Number_and_Redirect_to_honneypot',
    'Condition_Exit',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Registration',
    'get_Registration',
    'Registration_Details_Correct',
    'get_Registration_Details_Correct',
    'Registration_Details_Incorrect',
    'get_Registration_Details_Incorrect',
    'Register_Successfully',
    'get_Register_Successfully',
    'Login_or_Register_Successfully',
    'get_Login_or_Register_Successfully',
    'Enter_your_BVN_and_Scan_finger_and_trasmit_to_server ',
    'get_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server',
    'User_Credentials_Verified',
    'get_User_Credentials_Verified',
    'Access_Bank_Services',
    'get_Access_Bank_Services',
    'User_Credentials_have_not_been_verified',
    'get_User_Credentials_have_not_been_verified',
    'Alert_Customer_Emergency_Number_and_Redirect_to_honneypot',
    'get_Alert_Customer_Emergency_Number_and_Redirect_to_honneypot',
    'Condition_Exit',
    'get_Condition_Exit',
    'Exit'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MOBILE_BANKING'
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
    let User = await this._user.createUser('USER')
    return User
  }
  get_User() {
    let User = this._user.getUserByType('USER')
    return User
  }
  // --------------------Login---------------------------
  check_Login(address) {
    let check_Login = this.get_LoginByAddress(address)
    if (!check_Login || check_Login.type !== 'LOGIN')throw `LOGIN IS NOT EXIST`
    return true
  }
  get_LoginByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Login() {
    await this._user.checkUser(this.sender, 'USER')
    let Login = await this._process.createProcess('LOGIN')
    return Login
  }
  get_Login() {
    return this._process.getProcessByType('LOGIN')
  }
  // --------------------Registration---------------------------
  async Registration() {
    await this._user.checkUser(this.sender, 'USER')
    let Registration = await this._process.createProcess('REGISTRATION')
    return Registration
  }
  get_Registration() {
    return this._process.getProcessByType('REGISTRATION')
  }
  // --------------------Enter_Information---------------- ----------- 
  async Enter_Information(address_Registration) {
    this._user.checkUser(this.sender, 'USER')
    let check_Registration = this._process.getProcessByAddress(address_Registration)
    if (!check_Registration || check_Registration.type !== 'REGISTRATION')
      throw 'REGISTRATION IS NOT EXIST'
    let Enter_Information = await this._process.createProcess('ENTER')
    return Enter_Information
  }
  get_Enter_Information() {
    return this._process.getProcessByType('ENTER')
  }
  // --------------------Registration_Details_Correct---------------- ----------- 
  async Registration_Details_Correct(address_Enter_Information) {
    this._user.checkUser(this.sender, 'USER')
    let check_Enter_Information = this._process.getProcessByAddress(address_Enter_Information)
    if (!check_Enter_Information || check_Enter_Information.type !== 'ENTER')
      throw 'ENTER IS NOT EXIST'
    let Registration_Details_Correct = await this._process.createProcess('REGISTRATION_DETAULS_CORRECT')
    return Registration_Details_Correct
  }
  get_Registration_Details_Correct() {
    return this._process.getProcessByType('REGISTRATION_DETAULS_CORRECT')
  }
  // --------------------Register_Successfully---------------- ----------- 
  check_Register_Successfully(address) {
    let check_Register_Successfully = this.get_Register_SuccessfullyByAddress(address)
    if (!check_Register_Successfully || check_Register_Successfully.type !== 'REGISTER_SUCESSFULLY') throw `REGISTER_SUCESSFULLY IS NOT EXIST`
    return true
  }
  get_Register_SuccessfullyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Register_Successfully(address_Registration_Details_Correct) {
    this._user.checkUser(this.sender, 'USER')
    let check_Registration_Details_Correct = this._process.getProcessByAddress(address_Registration_Details_Correct)
    if (!check_Registration_Details_Correct || check_Registration_Details_Correct.type !== 'REGISTRATION_DETAULS_CORRECT')
      throw 'REGISTRATION_DETAULS_CORRECT IS NOT EXIST'
    let Register_Successfully = await this._process.createProcess('REGISTER_SUCESSFULLY')
    return Register_Successfully
  }
  get_Register_Successfully() {
    return this._process.getProcessByType('REGISTER_SUCESSFULLY')
  }
  // --------------------Registration_Details_Incorrect---------------- ----------- 
  check_Registration_Details_Incorrect(address) {
    let check_Registration_Details_Incorrect = this.get_Registration_Details_IncorrectByAddress(address)
    if (!check_Registration_Details_Incorrect || check_Registration_Details_Incorrect.type !== 'REGISTRATION_DETAULS_INCORRECT') throw `REGISTRATION_DETAULS_INCORRECT IS NOT EXIST`
    return true
  }
  get_Registration_Details_IncorrectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Registration_Details_Incorrect(address_Enter_Information) {
    this._user.checkUser(this.sender, 'USER')
    let check_Enter_Information = this._process.getProcessByAddress(address_Enter_Information)
    if (!check_Enter_Information || check_Enter_Information.type !== 'ENTER ')
      throw 'ENTER INFORMATION AGAIN'
    let Registration_Details_Incorrect = await this._process.createProcess('REGISTRATION_DETAULS_INCORRECT')
    return Registration_Details_Incorrect
  }
  get_Registration_Details_Incorrect() {
    return this._process.getProcessByType('REGISTRATION_DETAULS_INCORRECT')
  }
  // --------------------Enter_your_BVN_and_Scan_finger_and_trasmit_to_server---------------- ----------- 
  check_Process1(address) {
    this.check_Login = this.get_LoginByAddress(address);
    this.check_Register_Successfully = this.get_Register_SuccessfullyByAddress(address);
    if (this.check_Login.type == 'LOGIN') {
      return true;
    }
    else if (this.check_Register_Successfully.type == 'REGISTER_SUCESSFULLY') {
      return true;
    }
    else {
      throw `LOGIN_OR_REGISTER_SUCESSFULLY_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Login_or_Register_Successfully() {
    this.check_Process1(this.sender, 'LOGIN_OR_REGISTER_SUCESSFULLY_FOR_CHECK')
    let process = await this._process.createProcess('LOGIN_OR_REGISTER_SUCESSFULLY')
    return process
  }
  async Enter_your_BVN_and_Scan_finger_and_trasmit_to_server(address_Login_or_Register_Successfully) {
    this._user.checkUser(this.sender, 'USER')
    let check_Login_or_Register_Successfully = this._process.getProcessByAddress(address_Login_or_Register_Successfully)
    if (!check_Login_or_Register_Successfully || check_Login_or_Register_Successfully.type !== 'LOGIN_OR_REGISTER_SUCESSFULLY')
      throw 'LOGIN_OR_REGISTER_SUCESSFULLY IS NOT EXIST'
    let bvn_and_scan = await this._process.createProcess('ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER')
    return bvn_and_scan
  }
  get_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server() {
    return this._process.getProcessByType('ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER')
  }
  // --------------------User_Credentials_Verified---------------- ----------- 
  async User_Credentials_Verified(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server) {
    this._user.checkUser(this.sender, 'USER')
    let check_bvn_and_scan = this._process.getProcessByAddress(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server)
    if (!check_bvn_and_scan || check_bvn_and_scan.type !== 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER')
      throw 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER IS NOT EXIST'
    let User_Credentials_Verified = await this._process.createProcess('USER_CREDENTIALS_VERIFIED')
    return User_Credentials_Verified
  }
  get_User_Credentials_Verified() {
    return this._process.getProcessByType('USER_CREDENTIALS_VERIFIED')
  }
  // --------------------Access_Bank_Services---------------- ----------- 
  check_Access_Bank_Services(address) {
    let check_Access_Bank_Services = this.get_Access_Bank_ServicesByAddress(address)
    if (!check_Access_Bank_Services || check_Access_Bank_Services.type !== 'ACCESS_BANK_SERVICES')
      throw `ACCESS_BANK_SERVICES IS NOT EXIST`
    return true
  }
  get_Access_Bank_ServicesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Access_Bank_Services(address_User_Credentials_Verified) {
    this._user.checkUser(this.sender, 'USER')
    let check_User_Credentials_Verified = this._process.getProcessByAddress(address_User_Credentials_Verified)
    if (!check_User_Credentials_Verified || check_User_Credentials_Verified.type !== 'USER_CREDENTIALS_VERIFIED')
      throw 'USER_CREDENTIALS_VERIFIED IS NOT EXIST'
    let Access_Bank_Services = await this._process.createProcess('ACCESS_BANK_SERVICES')
    return Access_Bank_Services
  }
  get_Access_Bank_Services() {
    return this._process.getProcessByType('ACCESS_BANK_SERVICES')
  }
  // --------------------User_Credentials_have_not_been_verified---------------- ----------- 
  async User_Credentials_have_not_been_verified(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server) {
    this._user.checkUser(this.sender, 'USER')
    let check_bvn_and_scan = this._process.getProcessByAddress(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server)
    if (!check_bvn_and_scan || check_bvn_and_scan.type !== 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER')
      throw 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER IS NOT EXIST'
    let User_Credentials_have_not_been_verified = await this._process.createProcess('USER_CREDENTIALS_HAVE_NOT_BEEN_VERIFIED')
    return User_Credentials_have_not_been_verified
  }
  get_User_Credentials_have_not_been_verified() {
    return this._process.getProcessByType('USER_CREDENTIALS_HAVE_NOT_BEEN_VERIFIED')
  }
  // --------------------Alert_Customer_Emergency_Number_and_Redirect_to_honneypot---------------- ----------- 
  check_Alert_Customer(address) {
    let check_Alert_Customer = this.get_Alert_CustomerByAddress(address)
    if (!check_Alert_Customer || check_Alert_Customer.type !== 'ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT')
      throw `ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT IS NOT EXIST`
    return true
  }
  get_Alert_CustomerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Alert_Customer_Emergency_Number_and_Redirect_to_honneypot(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server) {
    this._user.checkUser(this.sender, 'USER')
    let check_bvn_and_scan = this._process.getProcessByAddress(address_Enter_your_BVN_and_Scan_finger_and_trasmit_to_server)
    if (!check_bvn_and_scan || check_bvn_and_scan.type !== 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER')
      throw 'ENTER_YOUR_SCAN_FINGER_AND_TRASMIT_TO_SERVER IS NOT EXIST'
    let Alert_Customer = await this._process.createProcess('ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT')
    return Alert_Customer
  }
  get_Alert_Customer_Emergency_Number_and_Redirect_to_honneypot() {
    return this._process.getProcessByType('ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT')
  }
  // --------------------Exit---------------- ----------- 
  check_Process2(address) {
    this.check_Alert_Customer = this.get_Alert_CustomerByAddress(address);
    this.check_Access_Bank_Services = this.get_Alert_CustomerByAddress(address);
    if (this.check_Access_Bank_Services.type == 'ACCESS_BANK_SERVICES') {
      return true;
    }
    else if (this.check_Alert_Customer.type == 'ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT') {
      return true;
    }
    else {
      throw `ACCESS_BANK_SERVICES_OR_ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT_FOR_CHECK IS NOT EXIST`;
    }
  }
  async Condition_Exit() {
    this.check_Process2(this.sender, 'ACCESS_BANK_SERVICES_OR_ALERT_CUSTOMER_EMERGENCY_NUMBER_AND_REDIRECT_TO_HONNEYPOT')
    let Condition_Exit = await this._process.createProcess('CONDITION_EXIT')
    return Condition_Exit
  }
  async Condition_Exit() {
    return this._process.getProcessByType('CONDITION_EXIT')
  }
  async Exit(address_Condition_Exit) {
    this._user.checkUser(this.sender, 'USER')
    let check_Condition_Exit = this._process.getProcessByAddress(address_Condition_Exit)
    if (!check_Condition_Exit || check_Condition_Exit.type !== 'CONDITION_EXIT')
      throw 'CONDITION_EXIT IS NOT EXIST'
    this.setToaddress(Exit.address)
    return 'Exit'
  }
}
export default TokenMain;
