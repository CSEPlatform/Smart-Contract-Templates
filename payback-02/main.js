import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Investment_Decision',
    'get_Tranditional',
    'get_Payback_Period',
    'get_Accounting_Rate_of_Return',
    'get_Time_Adjusted',
    'get_Net_Present_Value',
    'get_Profitability_Index',
    'get_Internal_Rate_of_Return',
    'get_Modified_IRR',
    'get_Discounted_Payback_Period'
  ]
  static authenticationFuncs = [
    'Investment_Decision',
    'Tranditional',
    'Payback_Period',
    'Accounting_Rate_of_Return',
    'Time_Adjusted',
    'Net_Present_Value',
    'Profitability_Index',
    'Internal_Rate_of_Return',
    'Modified_IRR',
    'Discounted_Payback_Period',
  ]
  static publicFuncs = [
    'User',
    'Investment_Decision',
    'get_Investment_Decision',
    'Tranditional',
    'get_Tranditional',
    'Payback_Period',
    'get_Payback_Period',
    'Accounting_Rate_of_Return',
    'get_Accounting_Rate_of_Return',
    'Time_Adjusted',
    'get_Time_Adjusted',
    'Net_Present_Value',
    'get_Net_Present_Value',
    'Profitability_Index',
    'get_Profitability_Index',
    'Internal_Rate_of_Return',
    'get_Internal_Rate_of_Return',
    'Modified_IRR',
    'get_Modified_IRR',
    'Discounted_Payback_Period',
    'get_Discounted_Payback_Period'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'PAYBACK'
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
    this._process = new Process(data)
  }
  //---------------------User------------------------------
  async User() {
    let User = await this._user.createUser('USER')
    return User
  }
  // --------------------Investment_Decision---------------------------
  async Investment_Decision() {
    await this._user.checkUser(this.sender, 'USER')
    let Investment_Decision = await this._process.createProcess('INVESTMENT_DECISION')
    return Investment_Decision
  }
  get_Investment_Decision() {
    return this._process.getProcessByType('INVESTMENT_DECISION')
  }
  // --------------------Tranditional---------------------------
  async Tranditional(address_Investment_Decision) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Decision = this._process.getProcessByAddress(address_Investment_Decision)
    if (!check_Investment_Decision || check_Investment_Decision.type !== 'INVESTMENT_DECISION')
      throw 'INVESTMENT_DECISION IS NOT EXIST'
    let Tranditional = await this._process.createProcess('TRANDITIONAL')
    return Tranditional
  }
  get_Tranditional() {
    return this._process.getProcessByType('TRANDITIONAL')
  }
  // --------------------Time_Adjusted---------------------------
  async Time_Adjusted(address_Investment_Decision) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Decision = this._process.getProcessByAddress(address_Investment_Decision)
    if (!check_Investment_Decision || check_Investment_Decision.type !== 'INVESTMENT_DECISION')
      throw 'INVESTMENT_DECISION IS NOT EXIST'
    let Time_Adjusted = await this._process.createProcess('TIME_ADJUSTED')
    return Time_Adjusted
  }
  get_Time_Adjusted() {
    return this._process.getProcessByType('TIME_ADJUSTED')
  }
  // --------------------Accounting_Rate_of_Return---------------------------
  async Accounting_Rate_of_Return(address_Tranditional) {
    this._user.checkUser(this.sender, 'USER')
    let check_Tranditional = this._process.getProcessByAddress(address_Tranditional)
    if (!check_Tranditional || check_Tranditional.type !== 'TRANDITIONAL')
      throw 'TRANDITIONAL IS NOT EXIST'
    let Accounting_Rate_of_Return = await this._process.createProcess('ACCOUNTING_RATE_OF_RETURN')
    return Accounting_Rate_of_Return
  }
  get_Accounting_Rate_of_Return() {
    return this._process.getProcessByType('ACCOUNTING_RATE_OF_RETURN')
  }
  // --------------------Payback_Period---------------------------
  async Payback_Period(address_Tranditional) {
    this._user.checkUser(this.sender, 'USER')
    let check_Tranditional = this._process.getProcessByAddress(address_Tranditional)
    if (!check_Tranditional || check_Tranditional.type !== 'TRANDITIONAL')
      throw 'TRANDITIONAL IS NOT EXIST'
    let Payback_Period = await this._process.createProcess('PAYBACK_PERIOD')
    return Payback_Period
  }
  get_Payback_Period() {
    return this._process.getProcessByType('PAYBACK_PERIOD')
  }
  // --------------------Net_Present_Value---------------------------
  async Net_Present_Value(address_Time_Adjusted) {
    this._user.checkUser(this.sender, 'USER')
    let check_Time_Adjusted = this._process.getProcessByAddress(address_Time_Adjusted)
    if (!check_Time_Adjusted || check_Time_Adjusted.type !== 'TIME_ADJUSTED')
      throw 'TIME_ADJUSTED IS NOT EXIST'
    let Net_Present_Value = await this._process.createProcess('NET_PRESENT_VALUE')
    return Net_Present_Value
  }
  get_Net_Present_Value() {
    return this._process.getProcessByType('NET_PRESENT_VALUE')
  }
  // --------------------Profitability_Index---------------------------
  async Profitability_Index(address_Time_Adjusted) {
    this._user.checkUser(this.sender, 'USER')
    let check_Time_Adjusted = this._process.getProcessByAddress(address_Time_Adjusted)
    if (!check_Time_Adjusted || check_Time_Adjusted.type !== 'TIME_ADJUSTED')
      throw 'TIME_ADJUSTED IS NOT EXIST'
    let Profitability_Index = await this._process.createProcess('PROFITABILETY_INDEX')
    return Profitability_Index
  }
  get_Profitability_Index() {
    return this._process.getProcessByType('PROFITABILITY_INDEX')
  }
  // --------------------Internal_Rate_of_Return---------------------------
  async Internal_Rate_of_Return(address_Time_Adjusted) {
    this._user.checkUser(this.sender, 'USER')
    let check_Time_Adjusted = this._process.getProcessByAddress(address_Time_Adjusted)
    if (!check_Time_Adjusted || check_Time_Adjusted.type !== 'TIME_ADJUSTED')
      throw 'TIME_ADJUSTED IS NOT EXIST'
    let Internal_Rate_of_Return = await this._process.createProcess('INTERNAL_RATE_OF_RETURN')
    return Internal_Rate_of_Return
  }
  get_Internal_Rate_of_Return() {
    return this._process.getProcessByType('INTERNAL_RATE_OF_RETURN')
  }
  // --------------------Modified_IRR---------------------------
  async Modified_IRR(address_Time_Adjusted) {
    this._user.checkUser(this.sender, 'USER')
    let check_Time_Adjusted = this._process.getProcessByAddress(address_Time_Adjusted)
    if (!check_Time_Adjusted || check_Time_Adjusted.type !== 'TIME_ADJUSTED')
      throw 'TIME_ADJUSTED IS NOT EXIST'
    let Modified_IRR = await this._process.createProcess('MODIFIED_IRR')
    return Modified_IRR
  }
  get_Modified_IRR() {
    return this._process.getProcessByType('MODIFIED_IRR')
  }
  // --------------------Discounted_Payback_Period---------------------------
  async Discounted_Payback_Period(address_Time_Adjusted) {
    this._user.checkUser(this.sender, 'USER')
    let check_Time_Adjusted = this._process.getProcessByAddress(address_Time_Adjusted)
    if (!check_Time_Adjusted || check_Time_Adjusted.type !== 'TIME_ADJUSTED')
      throw 'TIME_ADJUSTED IS NOT EXIST'
    let Discounted_Payback_Period = await this._process.createProcess('DISCOUNTED_PAYBACK_PERIOD')
    return Discounted_Payback_Period
  }
  get_Discounted_Payback_Period() {
    return this._process.getProcessByType('DISCOUNTED_PAYBACK_PERIOD')
  }
}
export default TokenMain;
