import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Beneficiaries_of_the_Assets',
    'get_Exempt_Trust',
    'get_Trust_Company_as_Manager',
    'get_Trading_Company',
    'get_Demand_Deposit_Account_Managed_by_Trust_Company',
    'get_Credit_Card_issued_to_Client',
    'get_Broker_Account_Precious_Metais_ect',
    'get_Online_banking_access_for_client',
    'get_Active_Business_and_Assets',
  ]
  static authenticationFuncs = [
    'User',
    'get_User',
    'Beneficiaries_of_the_Assets',
    'Exempt_Trust',
    'Trust_Company_as_Manager',
    'Trading_Company',
    'Demand_Deposit_Account_Managed_by_Trust_Company',
    'Credit_Card_issued_to_Client',
    'Broker_Account_Precious_Metais_ect',
    'Online_banking_access_for_client',
    'Active_Business_and_Assets'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Beneficiaries_of_the_Assets',
    'get_Beneficiaries_of_the_Assets',
    'Exempt_Trust',
    'get_Exempt_Trust',
    'Trust_Company_as_Manager', 
    'Trading_Company',
    'get_Trading_Company',
    'Demand_Deposit_Account_Managed_by_Trust_Company',
    'get_Demand_Deposit_Account_Managed_by_Trust_Company',
    'Credit_Card_issued_to_Client',
    'get_Credit_Card_issued_to_Client',
    'Broker_Account_Precious_Metais_ect',
    'get_Broker_Account_Precious_Metais_ect',
    'Online_banking_access_for_client',
    'get_Online_banking_access_for_client',
    'Active_Business_and_Assets',
    'get_Active_Business_and_Assets'
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
  // --------------------Beneficiaries_of_the_Assets---------------------------
  async Beneficiaries_of_the_Assets() {
    await this._user.checkUser(this.sender, 'USER')
    let Beneficiaries_of_the_Assets = await this._process.createProcess('BENEFICIARIES_OF_THE_ASSETS')
    return Beneficiaries_of_the_Assets
  }
  get_Beneficiaries_of_the_Assets() {
    return this._process.getProcessByType('BENEFICIARIES_OF_THE_ASSETS')
  }
  // --------------------Exempt_Trust---------------- ----------- 
  async Exempt_Trust(address_Beneficiaries_of_the_Assets) {
    this._user.checkUser(this.sender, 'USER')
    let check_Beneficiaries_of_the_Assets = this._process.getProcessByAddress(address_Beneficiaries_of_the_Assets)
    if (!check_Beneficiaries_of_the_Assets || check_Beneficiaries_of_the_Assets.type !== 'BENEFICIARIES_OF_THE_ASSETS')
      throw 'BENEFICIARIES_OF_THE_ASSETS IS NOT EXIST'
    let Exempt_Trust = await this._process.createProcess('EXEMPT_TRUST')
    return Exempt_Trust
  }
  get_Exempt_Trust() {
    return this._process.getProcessByType('EXEMPT_TRUST')
  }
  // --------------------Trust_Company_as_Manager---------------- ----------- 
  async Trust_Company_as_Manager(address_Beneficiaries_of_the_Assets) {
    this._user.checkUser(this.sender, 'USER')
    let check_Beneficiaries_of_the_Assets = this._process.getProcessByAddress(address_Beneficiaries_of_the_Assets)
    if (!check_Beneficiaries_of_the_Assets || check_Beneficiaries_of_the_Assets.type !== 'BENEFICIARIES_OF_THE_ASSETS')
      throw 'BENEFICIARIES_OF_THE_ASSETS IS NOT EXIST'
    let Trust_Company_as_Manager = await this._process.createProcess('TRUST_COMPANY_AS_MANAGER')
    return Trust_Company_as_Manager
  }
  get_Trust_Company_as_Manager() {
    return this._process.getProcessByType('TRUST_COMPANY_AS_MANAGER')
  }
  // --------------------Trading_Company---------------- ----------- 
  async Trading_Company(address_Beneficiaries_of_the_Assets) {
    this._user.checkUser(this.sender, 'USER')
    let check_Beneficiaries_of_the_Assets = this._process.getProcessByAddress(address_Beneficiaries_of_the_Assets)
    if (!check_Beneficiaries_of_the_Assets || check_Beneficiaries_of_the_Assets.type !== 'BENEFICIARIES_OF_THE_ASSETS')
      throw 'BENEFICIARIES_OF_THE_ASSETS IS NOT EXIST'
    let Trading_Company = await this._process.createProcess('TRADING_COMPANY')
    return Trading_Company
  }
  get_Trading_Company() {
    return this._process.getProcessByType('TRADING_COMPANY')
  }
  // --------------------Demand_Deposit_Account_Managed_by_Trust_Company---------------- ----------- 
  async Demand_Deposit_Account_Managed_by_Trust_Company(address_Trading_Company) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trading_Company = this._process.getProcessByAddress(address_Trading_Company)
    if (!check_Trading_Company || check_Trading_Company.type !== 'TRADING_COMPANY')
      throw 'TRADING_COMPANY IS NOT EXIST'
    let Demand = await this._process.createProcess('DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
    return Demand
  }
  get_Demand_Deposit_Account_Managed_by_Trust_Company() {
    return this._process.getProcessByType('DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
  }
  // --------------------Credit_Card_issued_to_Client---------------- ----------- 
  async Credit_Card_issued_to_Client(address_Trading_Company) {
    this._user.checkUser(this.sender, 'USER')
    let check_Demand_Deposit_Account_Managed_by_Trust_Company = this._process.getProcessByAddress(address_Trading_Company)
    if (!check_Demand_Deposit_Account_Managed_by_Trust_Company || check_Demand_Deposit_Account_Managed_by_Trust_Company.type !== 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
      throw 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY IS NOT EXIST'
    let Credit_Card_issued_to_Client = await this._process.createProcess('CREDIT_CARD_ISSUED_TO_CLIENT')
    return Credit_Card_issued_to_Client
  }
  get_Credit_Card_issued_to_Client() {
    return this._process.getProcessByType('CREDIT_CARD_ISSUED_TO_CLIENT')
  }
  // --------------------Broker_Account_Precious_Metais_ect---------------- ----------- 
  async Broker_Account_Precious_Metais_ect(address_Trading_Company) {
    this._user.checkUser(this.sender, 'USER')
    let check_Demand_Deposit_Account_Managed_by_Trust_Company = this._process.getProcessByAddress(address_Trading_Company)
    if (!check_Demand_Deposit_Account_Managed_by_Trust_Company || check_Demand_Deposit_Account_Managed_by_Trust_Company.type !== 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
      throw 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY IS NOT EXIST'
    let Broker_Account_Precious_Metais_ect = await this._process.createProcess('BROKER_ACCOUNT_PRECIOUS_METALS')
    return Broker_Account_Precious_Metais_ect
  }
  get_Broker_Account_Precious_Metals_ect() {
    return this._process.getProcessByType('BROKER_ACCOUNT_PRECIOUS_METALS')
  }
  // --------------------Online_banking_access_for_client---------------- ----------- 
  async Online_banking_access_for_client(address_Trading_Company) {
    this._user.checkUser(this.sender, 'USER')
    let check_Demand_Deposit_Account_Managed_by_Trust_Company = this._process.getProcessByAddress(address_Trading_Company)
    if (!check_Demand_Deposit_Account_Managed_by_Trust_Company || check_Demand_Deposit_Account_Managed_by_Trust_Company.type !== 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
      throw 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY IS NOT EXIST'
    let Online_banking_access_for_client = await this._process.createProcess('ONLINE_BANKING_ACCESS_FOR_CLIENT')
    return Online_banking_access_for_client
  }
  get_Online_banking_access_for_client() {
    return this._process.getProcessByType('ONLINE_BANKING_ACCESS_FOR_CLIENT')
  }
  // --------------------Active_Business_and_Assets---------------- ----------- 
  async Active_Business_and_Assets(address_Trading_Company) {
    this._user.checkUser(this.sender, 'USER')
    let check_Demand_Deposit_Account_Managed_by_Trust_Company = this._process.getProcessByAddress(address_Trading_Company)
    if (!check_Demand_Deposit_Account_Managed_by_Trust_Company || check_Demand_Deposit_Account_Managed_by_Trust_Company.type !== 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY')
      throw 'DEMAND_DEPOSIT_ACCOUNT_MANAGED_BY_TRUST_COMPANY IS NOT EXIST'
    let Active_Business_and_Assets = await this._process.createProcess('ACTIVE_BUSINESS_ACCESS_FOR_CLIENT')
    return Active_Business_and_Assets
  }
  get_Active_Business_and_Assets() {
    return this._process.getProcessByType('ACTIVE_BUSINESS_ACCESS_FOR_CLIENT')
  }
}
export default TokenMain;
