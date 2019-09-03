import Contract from 'Contract'
import Process from './process'
import User from './users'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Request_EMAIL',
    'get_Recieve_The_Confirm_EMAIL',
    'get_Complete_Registration'
  ]
  static authenticationFuncs = [
    'check_EMAIL_Format',
    'check_EMAIL_Format_After_Confirm_EMAIL',
    'verify'
  ]
  static publicFuncs = [
    'create_Registration_Request_EMAIL',
    'get_Request_EMAIL',
    'check_EMAIL_Format',
    'get_Recieve_The_Confirm_EMAIL',
    'check_EMAIL_Format_After_Confirm_EMAIL',
    'verify',
    'get_Complete_Registration'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MRSCUSTOMER'
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
   //---------------------Customer------------------------------
  async create_Registration_Request_EMAIL() {
    let customer = await this._user.createUsers('CUSTOMEREMAIL')
    return customer
  }
  get_Request_EMAIL() {
    let customer = this._user.getUsersByType('CUSTOMEREMAIL')
    return customer
  }

  async check_EMAIL_Format() {
    let checkEMAILFormat = this._process.getProcessByAddress(this.sender)
    if (!checkEMAILFormat || checkEMAILFormat.type !== 'CUSTOMEREMAIL') throw 'EMAIL FORMAT IS NOT EXIST'
    let confirmEMAIL = await this._process.createProcess('CONFIRMEMAIL')
    this.setToAddress(confirmEMAIL.address)
    return { confirmEMAIL }
  }

  get_Recieve_The_Confirm_EMAIL() {
    let recieveConfirmEMAIL = this._user.getUsersByType('CONFIRMEMAIL')
    return recieveConfirmEMAIL
  }

  async check_EMAIL_Format_After_Confirm_EMAIL() {
    let CheckEMAILFormatAfterConfirmEMAIL = this._process.getProcessByAddress(this.sender)
    if (!CheckEMAILFormatAfterConfirmEMAIL || CheckEMAILFormatAfterConfirmEMAIL.type !== 'CONFIRMEMAIL') throw 'EMAIL FORMAT IS NOT EXIST'
    let exactData = await this._process.createProcess('EXACTDATA')
    this.setToAddress(exactData.address)
    return { exactData }
  }

  async verify() {
    let verify = this._process.getProcessByAddress(this.sender)
    if (!verify || verify.type !== 'EXACTDATA') throw 'REGISTRATION IS FAILURE'
    let information = await this._process.createProcess('INFORMATION')
    this.setToAddress(information.address)
    return { information }
  }

  get_Complete_Registration() {
    let completeRegistration = this._user.getUsersByType('INFORMATION')
    return completeRegistration
  }

}
export default TokenMain