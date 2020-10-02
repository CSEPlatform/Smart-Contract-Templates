import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Intellectual_Property',
    'get_Copyright',
    'get_Trade'
  ]
  static authenticationFuncs = [
    'Intellectual_Property',
    'Patent',
    'Industrial_Design',
    'Innovation',
    'Petty_Patent',
    'Copyright', ,
    'Computer_Program',
    'Neighbroring_Rights',
    'Trade',
    'TradeMark',
    'Servicemark',
    'CertificationMark',
    'CollectiveMark',
    'Traditional_Knowledge',
    'Trade_Secrets',
    'Gegraphical_Indication',
    'Optical_Dise',
    'Layout_Design',
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Intellectual_Property',
    'get_Intellectual_Property',
    'Patent',
    'get_Patent',
    'Industrial_Design',
    'Innovation',
    'Petty_Patent',
    'Copyright',
    'get_Copyright',
    'Computer_Program',
    'Neighbroring_Rights',
    'Trade',
    'get_Trade',
    'TradeMark',
    'Servicemark',
    'CertificationMark',
    'CollectiveMark',
    'Traditional_Knowledge',
    'Trade_Secrets',
    'Gegraphical_Indication',
    'Optical_Dise',
    'Layout_Design',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'INTELLECTUAL PROPERTY RIGHT IN THAILAND'
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
  //--------------------USER------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  getUser() {
    let user = this._user.getUserByType('USER')
    return user
  }
  //---------------------INTELLECTUAL_PROPERTY------------------------------
  async Intellectual_Property() {
    this._user.checkUser(this.sender, 'USER')
    let Intellectual_Property = await this._process.createProcess('INTELLECTUAL_PROPERTY')
    return Intellectual_Property
  }
  get_Intellectual_Property() {
    return this._process.getProcessByType('INTELLECTUAL_PROPERTY')
  }
  async Traditional_Knowledge(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Traditional_Knowledge = await this._process.createProcess('TRANDITIONAL_KNOWLEDGE')
    this.setToAddress(Traditional_Knowledge.address)
    return 'SUCCESS'
  }
  async Trade_Secrets(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Trade_Secrets = await this._process.createProcess('TRADE_SECRETS')
    this.setToAddress(Trade_Secrets.address)
    return 'SUCCESS'
  }
  async Gegraphical_Indication(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Gegraphical_Indication = await this._process.createProcess('GEGRAPHICAL_INDICATION')
    this.setToAddress(Gegraphical_Indication.address)
    return 'SUCCESS'
  }
  async Optical_Dise(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Optical_Dise = await this._process.createProcess('OPTICAL_DISE')
    this.setToAddress(Optical_Dise.address)
    return 'SUCCESS'
  }
  async Layout_Design(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Layout_Design = await this._process.createProcess('LAYOUT_DESIGN_OF_INTERGRATED_CIRCUIT')
    this.setToAddress(Layout_Design.address)
    return 'SUCCESS'
  }

  // --------------------PATENT--------------------------- 
  async Patent(address_Intellectual_Property) {
    this._user.checkUser(this.sender, 'USER')
    let check_Intellectual_Property = this._process.getProcessByAddress(address_Intellectual_Property)
    if (!check_Intellectual_Property || check_Intellectual_Property.type !== 'INTELLECTUAL_PROPERTY')
      throw 'INTELLECTUAL_PROPERTY IS NOT EXIST'
    let Patent = await this._process.createProcess('PATENT')
    return Patent
  }
  get_Patent() {
    return this._process.getProcessByType('PATENT')
  }
  async Industrial_Design(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Industrial_Design = await this._process.createProcess('INDUSTRIAL_DESIGN')
    this.setToAddress(Industrial_Design.address)
    return 'SUCCESS'
  }
  async Innovation(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Innovation = await this._process.createProcess('INNOVATION')
    this.setToAddress(Innovation.address)
    return 'SUCCESS'
  }
  async Petty_Patent(address_Patent) {
    this._user.checkUser(this.sender, 'USER')
    let check_Patent = this._process.getProcessByAddress(address_Patent)
    if (!check_Patent || check_Patent.type !== 'PATENT')
      throw 'PATENT IS NOT EXIST'
    let Petty_Patent = await this._process.createProcess('PETTY_PATENT')
    this.setToAddress(Petty_Patent.address)
    return 'SUCCESS'
  }
  // --------------------COPYRIGHT--------------------------
  async Copyright(address_Intellectual_Property) {
    this._user.checkUser(this.sender, 'USER')
    let check_Intellectual_Property = this._process.getProcessByAddress(address_Intellectual_Property)
    if (!check_Intellectual_Property || check_Intellectual_Property.type !== 'INTELLECTUAL_PROPERTY')
      throw 'INTELLECTUAL_PROPERTY IS NOT EXIST'
    let Copyright = await this._process.createProcess('COPYRIGHT')
    return Copyright
  }
  get_Copyright() {
    return this._process.getProcessByType('COPYRIGHT')
  }
  async Computer_Program(address_Copyright) {
    this._user.checkUser(this.sender, 'USER')
    let check_Copyright = this._process.getProcessByAddress(address_Copyright)
    if (!check_Copyright || check_Copyright.type !== 'COPYRIGHT')
      throw 'COPYRIGHT IS NOT EXIST'
    let Computer_Program = await this._process.createProcess('COMPYTER_PROGRAM')
    this.setToAddress(Computer_Program.address)
    return 'SUCCESS'
  }
  async Neighbroring_Rights(address_Copyright) {
    this._user.checkUser(this.sender, 'USER')
    let check_Copyright = this._process.getProcessByAddress(address_Copyright)
    if (!check_Copyright || check_Copyright.type !== 'COPYRIGHT')
      throw 'COPYRIGHT IS NOT EXIST'
    let Neighbroring_Rights = await this._process.createProcess('NEIGHBROING_RIGHTS')
    this.setToAddress(Neighbroring_Rights.address)
    return 'SUCCESS'
  }
  // --------------------TRADE---------------------------
  async Trade(address_Intellectual_Property) {
    this._user.checkUser(this.sender, 'USER')
    let check_Intellectual_Property = this._process.getProcessByAddress(address_Intellectual_Property)
    if (!check_Intellectual_Property || check_Intellectual_Property.type !== 'INTELLECTUAL_PROPERTY')
      throw 'INTELLECTUAL_PROPERTY IS NOT EXIST'
    let Trade = await this._process.createProcess('TRADE')
    return Trade
  }
  get_Trade() {
    return this._process.getProcessByType('TRADE')
  }
  async TradeMark(address_Trade) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trade = this._process.getProcessByAddress(address_Trade)
    if (!check_Trade || check_Trade.type !== 'TRADE')
      throw 'TRADE IS NOT EXIST'
    let TradeMark = await this._process.createProcess('TRADE_MARK')
    this.setToAddress(TradeMark.address)
    return 'SUCCESS'
  }
  async Servicemark(address_Trade) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trade = this._process.getProcessByAddress(address_Trade)
    if (!check_Trade || check_Trade.type !== 'TRADE')
      throw 'TRADE IS NOT EXIST'
    let Servicemark = await this._process.createProcess('SERVICE_MARK')
    this.setToAddress(Servicemark.address)
    return 'SUCCESS'
  }
  async CertificationMark(address_Trade) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trade = this._process.getProcessByAddress(address_Trade)
    if (!check_Trade || check_Trade.type !== 'TRADE')
      throw 'TRADE IS NOT EXIST'
    let CertificationMark = await this._process.createProcess('CERTIFICATION_MARK')
    this.setToAddress(CertificationMark.address)
    return 'SUCCESS'
  }
  async CollectiveMark(address_Trade) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trade = this._process.getProcessByAddress(address_Trade)
    if (!check_Trade || check_Trade.type !== 'TRADE')
      throw 'TRADE IS NOT EXIST'
    let CollectiveMark = await this._process.createProcess('COLLECTIVE_MARK')
    this.setToAddress(CollectiveMark.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
