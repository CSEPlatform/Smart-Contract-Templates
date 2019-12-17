import Contract from 'Contract'
import User from './user'
import Process from './process'
import Certificate from './certificate'
import Verificaton from './verification'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Data',
    'get_Blockchain',
    'get_Key',
    'get_Certificate',
    'get_Digitally_signed_data',
    'get_Verification',
    'Equal',
    'Different',
    'get_The_signature_is_valid'
  ]
  static authenticationFuncs = [
    'Data',
    'Blockchain',
    'Key',
    'Certificate',
    'Digitally_signed_data',
    'Verification',
    'Equal',
    'Different',
    'The_signature_is_valid'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Data',
    'get_Data',
    'Blockchain',
    'get_Blockchain',
    'Key',
    'get_Key',
    'Certificate',
    'get_Certificate',
    'Digitally_signed_data',
    'get_Digitally_signed_data',
    'Verification',
    'get_Verification',
    'Equal',
    'Different',
    'The_signature_is_valid',
    'get_The_signature_is_valid',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ELECTRONIC_SIGNATURE'
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
    this._certificate = new Certificate(data)
    this._verification = new Verificaton(data)
  }
  //---------------------USER------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  get_User() {
    let user = this._user.getUserByType('USER')
    return user
  }
  // --------------------Data---------------------------
  check_Login(address) {
    let check_Login = this.get_LoginByAddress(address)
    if (!check_Login || check_Login.type !== 'LOGIN') throw `LOGIN IS NOT EXIST`
    return true
  }
  get_LoginByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Data() {
    await this._user.checkUser(this.sender, 'USER')
    let Data = await this._process.createProcess('DATA')
    return Data
  }
  get_Data() {
    return this._process.getProcessByType('DATA')
  }
  // --------------------Blockchain---------------------------
  async Blockchain(address_Data) {
    this._user.checkUser(this.sender, 'MANUFACTURE')
    let check_Data = this._process.getProcessByAddress(address_Data)
    if (!check_Data || check_Data.type !== 'DATA')
      throw 'DATA IS NOT EXIST'
    let Blockchain = await this._process.createProcess('BLOCKCHAIN')
    return Blockchain
  }
  get_Blockchain() {
    return this._process.getProcessByType('BLOCKCHAIN')
  }
  //---------------------Certificate------------------------------
  async Certificate() {
    let Certificate = await this._certificate.createCertificate('CERTIFICATE')
    return Certificate
  }
  get_Certificate() {
    let Certificate = this._certificate.getCertificateByType('CERTIFICATE')
    return Certificate
  }
  // --------------------Key---------------------------
  check_Key(address) {
    let check_Key = this.get_KeyByAddress(address)
    if (!check_Key || check_Key.type !== 'KEY') throw `KEY IS NOT EXIST`
    return true
  }
  get_KeyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Key(address_Blockchain) {
    this._user.checkUser(this.sender, 'USER')
    let check_Blockchain = this._process.getProcessByAddress(address_Blockchain)
    if (!check_Blockchain || check_Blockchain.type !== 'BLOCKCHAIN')
      throw 'BLOCKCHAIN IS NOT EXIST'
    let key = await this._process.createProcess('KEY')
    return key
  }
  get_Key() {
    return this._process.getProcessByType('KEY')
  }
  // --------------------Digitally_signed_data---------------------------
  checkImport_Data1(address) {
    this.check_Key = this.get_KeyByAddress(address);
    this._certificate.checkCertificate = this._certificate.getCertificateByAddress(address);

    if (this.check_Key.type == 'KEY') {
      return true;
    }
    else if (this._certificate.checkCertificate.type == 'CERTIFICATE') {
      return true;
    }
    else {
      throw `CERTIFICATE_AND_KEY IS NOT EXIST`;
    }
  }
  async Digitally_signed_data() {
    this.checkImport_Data1(this.sender, 'CERTIFICATE_AND_KEY')
    let digitally = await this._verification.createVerification)
    return digitally
  }
  get_Digitally_signed_data() {
    return this._verification.getVerification()
  }
  async Verification(type) {
    if (!type || !this.sender) throw 'CANNOT CREATE'
    if (![1, 2].includes(Number(type))) throw 'CREATE ANSWER FAIL'
    await this._verification.checkVerification(this.sender)
    let answer = await this._answer.createAnswer(type - 1, this.sender)
    this.setToAddress(answer.address)
    return answer
  }
  async Equal() {
    await this._login.checkLogin(this.sender)
    return this._answer.getAnswerByType('EQUAL', this.sender)
  }
  async Different() {
    await this._login.checkLogin(this.sender)
    return this._answer.getAnswerByType('DIFFERENT', this.sender)
  }
  // --------------------The_signature_is_valid---------------------------
  async The_signature_is_valid(address_Data) {
    this._user.checkUser(this.sender, 'USER')
    let check_Equal = this._process.getProcessByAddress(address_Data)
    if (!check_Equal || check_Equal.type !== 'EQUAL')
      throw 'EQUAL IS NOT EXIST'
    let valid = await this._process.createProcess('THE_SIGNATURE_IS_VALID')
    return valid
  }
  get_The_signature_is_valid() {
    return this._process.getProcessByType('THE_SIGNATURE_IS_VALID')
  }
  // --------------------Fail---------------------------
  async Fail(address_Different) {
    this._user.checkUser(this.sender, 'USER')
    let check_Different = this._process.getProcessByAddress(address_Different)
    if (!check_Different || check_Different.type !== 'DIFFERENT')
      throw 'DIFFERENT IS NOT EXIST'
    let Fail = await this._process.createProcess('FAIL')
    return Fail
  }
  get_Different() {
    return this._process.getProcessByType('FAIL')
  }
}
export default TokenMain;
