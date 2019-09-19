import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_RBI',
    'get_Schedule_Banks',
    'get_Non_Schedule_Banks',
    'get_Commercial_Banks',
    'get_Public_Sector_Banks',
    'get_Private_Sector_Banks',
    'get_Foreign_Banks',
    'get_Regional_Rural_Banks',
    'get_SBI_and_Associate_Banks',
    'get_Nationalize_Banks',
    'get_Orther_Public_sector_Banks',
    'get_Co_operative_Banks',
    'get_State_Co_operative_Banks',
    'get_District_Co_operative_Banks',
    'get_Orther_Co_operative_Banks'
  ]
  static authenticationFuncs = [
    'RBI',
    'Schedule_Banks',
    'Non_Schedule_Banks',
    'Commercial_Banks',
    'Public_Sector_Banks',
    'Private_Sector_Banks',
    'Foreign_Banks',
    'Regional_Rural_Banks',
    'SBI_and_Associate_Banks',
    'Nationalize_Banks',
    'Orther_Public_sector_Banks',
    'Co_operative_Banks',
    'State_Co_operative_Banks',
    'District_Co_operative_Banks',
    'Orther_Co_operative_Banks'
  ]
  static publicFuncs = [
    'User',
    'RBI',
    'get_RBI',
    'Schedule_Banks',
    'get_Schedule_Banks',
    'Non_Schedule_Banks',
    'get_Non_Schedule_Banks',
    'Commercial_Banks',
    'get_Commercial_Banks',
    'Public_Sector_Banks',
    'get_Public_Sector_Banks',
    'Private_Sector_Banks',
    'get_Private_Sector_Banks',
    'Foreign_Banks',
    'get_Foreign_Banks',
    'Regional_Rural_Banks',
    'get_Regional_Rural_Banks',
    'SBI_and_Associate_Banks',
    'get_SBI_and_Associate_Banks',
    'Nationalize_Banks',
    'get_Nationalize_Banks',
    'Orther_Public_sector_Banks',
    'get_Orther_Public_sector_Banks',
    'Co_operative_Banks',
    'get_Co_operative_Banks',
    'State_Co_operative_Banks',
    'get_State_Co_operative_Banks',
    'District_Co_operative_Banks',
    'get_District_Co_operative_Banks',
    'Orther_Co_operative_Banks',
    'get_Orther_Co_operative_Banks',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'BANKING_SECTOR'
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
  // --------------------RBI---------------------------
  async RBI() {
    await this.checkProcess2(this.sender, 'USER')
    let RBI = await this._process.createProcess('RBI')
    return RBI
  }
  get_RBI() {
    return this._process.getProcessByType('RBI')
  }
  // --------------------Schedule_Banks---------------------------
  async Schedule_Banks(address_RBI) {
    this._user.checkUser(this.sender, 'USER')
    let check_RBI = this._process.getProcessByAddress(address_RBI)
    if (!check_RBI || check_RBI.type !== 'RBI')
      throw 'RBI IS NOT EXIST'
    let Schedule_Banks = await this._process.createProcess('SCHEDULE_BANKS')
    return Schedule_Banks
  }
  get_Schedule_Banks() {
    return this._process.getProcessByType('SCHEDULE_BANKS')
  }
  // --------------------Non_Schedule_Banks---------------------------
  async Non_Schedule_Banks(address_RBI) {
    this._user.checkUser(this.sender, 'USER')
    let check_RBI = this._process.getProcessByAddress(address_RBI)
    if (!check_RBI || check_RBI.type !== 'RBI')
      throw 'RBI IS NOT EXIST'
    let Non_Schedule_Banks = await this._process.createProcess('NON_SCHEDULE_BANKS')
    return Non_Schedule_Banks
  }
  get_Non_Schedule_Banks() {
    return this._process.getProcessByType('NON_SCHEDULE_BANKS')
  }
  // --------------------Commercial_Banks---------------------------
  async Commercial_Banks(address_Schedule_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Schedule_Banks = this._process.getProcessByAddress(address_Schedule_Banks)
    if (!check_Schedule_Banks || check_Schedule_Banks.type !== 'SCHEDULE_BANKS')
      throw 'SCHEDULE_BANKS IS NOT EXIST'
    let Commercial_Banks = await this._process.createProcess('COMMERCIAL_BANKS')
    return Commercial_Banks
  }
  get_Commercial_Banks() {
    return this._process.getProcessByType('COMMERCIAL_BANKS')
  }
  // --------------------Co_operative_Banks---------------------------
  async Co_operative_Banks(address_Schedule_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Schedule_Banks = this._process.getProcessByAddress(address_Schedule_Banks)
    if (!check_Schedule_Banks || check_Schedule_Banks.type !== 'SCHEDULE_BANKS')
      throw 'SCHEDULE_BANKS IS NOT EXIST'
    let Co_operative_Banks = await this._process.createProcess('CO_OPERATIVE_BANKS')
    return Co_operative_Banks
  }
  get_Co_operative_Banks() {
    return this._process.getProcessByType('CO_OPERATIVE_BANKS')
  }
  // --------------------Public_Sector_Banks---------------------------
  async Public_Sector_Banks(address_Commercial_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Commercial_Banks = this._process.getProcessByAddress(address_Commercial_Banks)
    if (!check_Commercial_Banks || check_Commercial_Banks.type !== 'COMMERCIAL_BANKS')
      throw 'COMMERCIAL_BANKS IS NOT EXIST'
    let Public_Sector_Banks = await this._process.createProcess('PUBLIC_SECTOR_BANKS')
    return Public_Sector_Banks
  }
  get_Public_Sector_Banks() {
    return this._process.getProcessByType('PUBLIC_SECTOR_BANKS')
  }
  // --------------------Private_Sector_Banks---------------------------
  async Private_Sector_Banks(address_Commercial_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Commercial_Banks = this._process.getProcessByAddress(address_Commercial_Banks)
    if (!check_Commercial_Banks || check_Commercial_Banks.type !== 'COMMERCIAL_BANKS')
      throw 'COMMERCIAL_BANKS IS NOT EXIST'
    let Private_Sector_Banks = await this._process.createProcess('PRIVATE_SECTOR_BANKS')
    return Private_Sector_Banks
  }
  get_Private_Sector_Banks() {
    return this._process.getProcessByType('PRIVATE_SECTOR_BANKS')
  }
  // --------------------Regional_Rural_Banks---------------------------
  async Regional_Rural_Banks(address_Commercial_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Commercial_Banks = this._process.getProcessByAddress(address_Commercial_Banks)
    if (!check_Commercial_Banks || check_Commercial_Banks.type !== 'COMMERCIAL_BANKS')
      throw 'COMMERCIAL_BANKS IS NOT EXIST'
    let Regional_Rural_Banks = await this._process.createProcess('REGIONAL_RURAL_BANKS')
    return Regional_Rural_Banks
  }
  get_Regional_Rural_Banks() {
    return this._process.getProcessByType('REGIONAL_RURAL_BANKS')
  }
  // --------------------Foreign_Banks---------------------------
  async Foreign_Banks(address_Commercial_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Commercial_Banks = this._process.getProcessByAddress(address_Commercial_Banks)
    if (!check_Commercial_Banks || check_Commercial_Banks.type !== 'COMMERCIAL_BANKS')
      throw 'COMMERCIAL_BANKS IS NOT EXIST'
    let Foreign_Banks = await this._process.createProcess('FOREIGN_BANKS')
    return Foreign_Banks
  }
  get_Foreign_Banks() {
    return this._process.getProcessByType('FOREIGN_BANKS')
  }
  // --------------------SBI_and_Associate_Banks---------------------------
  async SBI_and_Associate_Banks(address_Public_Sector_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Public_Sector_Banks = this._process.getProcessByAddress(address_Public_Sector_Banks)
    if (!check_Public_Sector_Banks || check_Public_Sector_Banks.type !== 'PUBLIC_SECTOR_BANKS')
      throw 'PUBLIC_SECTOR_BANKS IS NOT EXIST'
    let SBI_and_Associate_Banks = await this._process.createProcess('SBI_AND_ASSOCIATE_BANK')
    return SBI_and_Associate_Banks
  }
  get_SBI_and_Associate_Banks() {
    return this._process.getProcessByType('SBI_AND_ASSOCIATE_BANK')
  }
  // --------------------Nationalize_Banks---------------------------
  async Nationalize_Banks(address_Public_Sector_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Public_Sector_Banks = this._process.getProcessByAddress(address_Public_Sector_Banks)
    if (!check_Public_Sector_Banks || check_Public_Sector_Banks.type !== 'PUBLIC_SECTOR_BANKS')
      throw 'PUBLIC_SECTOR_BANKS IS NOT EXIST'
    let Nationalize_Banks = await this._process.createProcess('NATIONALIZE_BANKS')
    return Nationalize_Banks
  }
  get_Nationalize_Banks() {
    return this._process.getProcessByType('NATIONALIZE_BANKS')
  }
  // --------------------Orther_Public_sector_Banks---------------------------
  async Orther_Public_sector_Banks(address_Public_Sector_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Public_Sector_Banks = this._process.getProcessByAddress(address_Public_Sector_Banks)
    if (!check_Public_Sector_Banks || check_Public_Sector_Banks.type !== 'PUBLIC_SECTOR_BANKS')
      throw 'PUBLIC_SECTOR_BANKS IS NOT EXIST'
    let Orther_Public_sector_Banks = await this._process.createProcess('ORTHER_PUBLIC_SECTOR_BANKS')
    return Orther_Public_sector_Banks
  }
  get_Orther_Public_sector_Banks() {
    return this._process.getProcessByType('ORTHER_PUBLIC_SECTOR_BANKS')
  }
  // --------------------State_Co_operative_Banks---------------------------
  async State_Co_operative_Banks(address_Co_operative_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Co_operative_Banks = this._process.getProcessByAddress(address_Co_operative_Banks)
    if (!check_Co_operative_Banks || check_Co_operative_Banks.type !== 'CO_OPERATIVE_BANKS')
      throw 'CO_OPERATIVE_BANKS IS NOT EXIST'
    let State_Co_operative_Banks = await this._process.createProcess('STATE_CO_OPERATIVE_BANKS')
    return State_Co_operative_Banks
  }
  get_State_Co_operative_Banks() {
    return this._process.getProcessByType('STATE_CO_OPERATIVE_BANKS')
  }
  // --------------------District_Co_openrative_Banks---------------------------
  async District_Co_openrative_Banks(address_Co_operative_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Co_operative_Banks = this._process.getProcessByAddress(address_Co_operative_Banks)
    if (!check_Co_operative_Banks || check_Co_operative_Banks.type !== 'CO_OPERATIVE_BANKS')
      throw 'CO_OPERATIVE_BANKS IS NOT EXIST'
    let District_Co_openrative_Banks = await this._process.createProcess('DISTRICT_CO_OPERATIVE_BANKS')
    return District_Co_openrative_Banks
  }
  get_District_Co_openrative_Banks() {
    return this._process.getProcessByType('DISTRICT_CO_OPERATIVE_BANKS')
  }
  // --------------------Orther_Co_openrative_Banks---------------------------
  async Orther_Co_openrative_Banks(address_Co_operative_Banks) {
    this._user.checkUser(this.sender, 'USER')
    let check_Co_operative_Banks = this._process.getProcessByAddress(address_Co_operative_Banks)
    if (!check_Co_operative_Banks || check_Co_operative_Banks.type !== 'CO_OPERATIVE_BANKS')
      throw 'CO_OPERATIVE_BANKS IS NOT EXIST'
    let Orther_Co_openrative_Banks = await this._process.createProcess('ORTHER_CO_OPERATIVE_BANKS')
    return Orther_Co_openrative_Banks
  }
  get_Orther_Co_openrative_Banks() {
    return this._process.getProcessByType('ORTHER_CO_OPERATIVE_BANKS')
  }
}
export default TokenMain;
