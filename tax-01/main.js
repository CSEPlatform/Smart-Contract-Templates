import Contract from 'Contract'
import Tax from './tax'
import QS from './QS'
class TokenMain extends Contract {
  static viewFuncs = [
    'getPeople',
    'getMachine',
    'getYou_are_married',
    'get_You_are_single',
    'get_Under_65_year_of_Age',
    'get_Above_65_year_of_Age'
  ]
  static authenticationFuncs = [
    'You_are_married',
    'You_are_single',
    'Under_65_year_of_Age',
    'Gross_income_less_than_$8450',
    'Gross_income_more_than_$8450',
    'Above_65_year_of_Age',
    'Gross_income_less_than_$9700',
    'Gross_income_more_than_$9700',
  ]
  static publicFuncs = [
    'createPeople',
    'getPeople',
    'createMachine',
    'getMacchine',
    'You_are_married',
    'get_You_are_married',
    'You_are_single',
    'get_You_are_single',
    'Under_65_years_of_Age',
    'get_Under_65_years_of_Age',
    'Gross_income_less_than_$8450',
    'Gross_income_more_than_$8450',
    'Above_65_years_of_Age',
    'get_Above_65_years_of_Age',
    'Gross_income_less_than_$9700',
    'Gross_income_more_than_$9700',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'TAX'
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
    this._tax = new Tax(data)
    this._QS = new QS(data)
  }
  //---------------------createPeople------------------------------
  async createPeople() {
    let people = await this._tax.createTax('PEOPLE')
    return people

  }
  getPeople() {
    let people = this._tax.getTaxByType('PEOPLE')
    return people
  }
  // --------------------createMachine--------------------------- 
  async createMachine() {
    let Machine = await this._tax.createTax('MACHINE')
    return Machine
  }
  getMachine() {
    let Machine = this._tax.getTaxByType('MACHINE')
    return Machine
  }
  // --------------------You_are_married--------------------------
  async You_are_married() {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let B = await this._QS.createQS('YOU_ARE_MARRIED')
    this.setToAddress(B.address)
    return 'YOU_ARE_MARRIED'
  }
  // --------------------You_are_single---------------------------
  async You_are_single() {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let You_are_single = await this._QS.createQS('YOU_ARE_SINGLE')
    return You_are_single
  }
  get_You_are_single() {
    return this._QS.getQSByType('YOU_ARE_SINGLE')
  }
  // --------------------Under_65_years_of_Age---------------------------
  async Under_65_years_of_Age(address_You_are_single) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_You_are_single = this._QS.getQSByAddress(address_You_are_single)
    if (!check_You_are_single || check_You_are_single.type !== 'YOU_ARE_SINGLE')
      throw 'YOU_ARE_SINGLE IS NOT EXIST'
    let under = await this._QS.createQS('UNDER_65_YEARS_OF_AGE')
    return under
  }
  get_Under_65_years_of_Age() {
    return this._QS.getQSByType('UNDER_65_YEARS_OF_AGE')
  }
  // --------------------Gross_income_less_than_$8450 ---------------------------
  async Gross_income_less_than_$8450(address_Under_65_years_of_Age) {
    this._tax.checkTax(this.sender, 'MACHINE')
    let check_Under_65_years_of_Age = this._QS.getQSByAddress(address_Under_65_years_of_Age)
    if (!check_Under_65_years_of_Age || check_Under_65_years_of_Age.type !== 'UNDER_65_YEARS_OF_AGE')
      throw 'UNDER_65_YEARS_OF_AGE NOT EXIST'
    let donot = await this._QS.createQS('YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(donot.address)
    return 'GROSS_INCOME_LESS_THAN_$8450_YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN'
  }
  // --------------------Gross_income_more_than_$8450 ---------------------------
  async Gross_income_more_than_$8450(address_Under_65_years_of_Age) {
    this._tax.checkTax(this.sender, 'MACHINE')
    let check_Under_65_years_of_Age = this._QS.getQSByAddress(address_Under_65_years_of_Age)
    if (!check_Under_65_years_of_Age || check_Under_65_years_of_Age.type !== 'UNDER_65_YEARS_OF_AGE')
      throw 'UNDER_65_YEARS_OF_AGE NOT EXIST'
    let haveto = await this._QS.createQS('YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(haveto.address)
    return 'GROSS_INCOME_MORE_THAN_$8450_YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN'
  }
  // --------------------Above_65_years_of_Age---------------------------
  async Above_65_years_of_Age(address_You_are_single) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_You_are_single = this._QS.getQSByAddress(address_You_are_single)
    if (!check_You_are_single || check_You_are_single.type !== 'YOU_ARE_SINGLE')
      throw 'YOU_ARE_SINGLE IS NOT EXIST'
    let above = await this._QS.createQS('ABOVE_65_YEARS_OF_AGE')
    return above
  }
  get_Above_65_years_of_Age() {
    return this._QS.getQSByType('ABOVE_65_YEARS_OF_AGE')
  }
  // --------------------Gross_income_less_than_$9700 ---------------------------
  async Gross_income_less_than_$9700(address_Above_65_years_of_Age) {
    this._tax.checkTax(this.sender, 'MACHINE')
    let check_Above_65_years_of_Age = this._QS.getQSByAddress(address_Above_65_years_of_Age)
    if (!check_Above_65_years_of_Age || check_Above_65_years_of_Age.type !== 'ABOVE_65_YEARS_OF_AGE')
      throw 'ABOVE_65_YEARS_OF_AGE NOT EXIST'
    let have = await this._QS.createQS('YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(have.address)
    return 'GROSS_INCOME_LESS_THAN_$9700_YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN'
  }
  // --------------------Gross_income_more_than_$9700 ---------------------------
  async Gross_income_more_than_$9700(address_Above_65_years_of_Age) {
    this._tax.checkTax(this.sender, 'MACHINE')
    let check_Above_65_years_of_Age = this._QS.getQSByAddress(address_Above_65_years_of_Age)
    if (!check_Above_65_years_of_Age || check_Above_65_years_of_Age.type !== 'ABOVE_65_YEARS_OF_AGE')
      throw 'ABOVE_65_YEAR_OF_AGE NOT EXIST'
    let not = await this._QS.createQS('YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(not.address)
    return 'GROSS_INCOME_MORE_THAN_$9700_YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN'
  }
}
export default TokenMain;
