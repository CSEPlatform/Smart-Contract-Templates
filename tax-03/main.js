import Contract from 'Contract'
import Process from './process'
import Tax from './tax'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_BC',
    'get_BC6_Application',
    'get_BC5_Taxable_income',
    'get_BC6_Application_or_BC5_Taxable_income',
    'get_Bacsic_tax_rate',
    'get_Equals',
    'get_BC6_Result_negative_income_tax_liability',
    'get_BC6_Result_positive_income_tax_liability',
    'get_BC6_Result_negative_or_positive_income_tax_liability',
  ]
  static authenticationFuncs = [
    'BC6_Application',
    'BC5_Taxable_income',
    'BC6_Application_or_BC5_Taxable_income',
    'Bacsic_tax_rate',
    'Equals',
    'BC6_Result_negative_income_tax_liability',
    'BC6_Result_positive_income_tax_liability',
    'BC6_Result_negative_or_positive_income_tax_liability',
    'BC8_Saticfaction_of_income_tax_liability'
  ]
  static publicFuncs = [
    'BC',
    'get_BC',
    'BC6_Application',
    'get_BC6_Application',
    'BC5_Taxable_income',
    'get_BC5_Taxable_income',
    'BC6_Application_or_BC5_Taxable_income',
    'get_BC6_Application_or_BC5_Taxable_income',
    'Bacsic_tax_rate',
    'get_Bacsic_tax_rate',
    'Equals',
    'get_Equals',
    'BC6_Result_negative_income_tax_liability',
    'get_BC6_Result_negative_income_tax_liability',
    'BC6_Result_positive_income_tax_liability',
    'get_BC6_Result_positive_income_tax_liability'
    'BC6_Result_negative_or_positive_income_tax_liability',
    'get_BC6_Result_negative_or_positive_income_tax_liability',
    'BC8_Saticfaction_of_income_tax_liability'
	'get_BC8_Saticfaction_of_income_tax_liability'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'TAX-3'
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
    this._tax = new Tax(data)
  }
  //---------------------PROCESS------------------------------
  async BC() {
    let bc = await this._process.createProcess('BC')
    return bc
  }
  get_BC() {
    let bc = this._process.getProcessByType('BC')
    return bc
  }
  // --------------------BC6_Application---------------------------
  check_BC6_Application(address) {
    let check_BC6_Application = this.get_BC6_ApplicationByAddress(address)
    if (!check_BC6_Application || check_BC6_Application.type !== 'BC6_APPLICATION') throw `BC6_APPLICATION IS NOT EXIST`
    return true
  }
  get_BC6_ApplicationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  BC6_Application() {
    this._process.checkProcess(this.sender, 'BC')
    let bc6 = await this._tax.createTax('BC6_APPLICATION')
    return bc6
  }

  get_BC6_Application() {
    return this._tax.getTaxByType('BC6_APPLICATION')
  }
  // --------------------BC5_Taxable_income---------------------------
  check_BC5_Taxable_income(address) {
    let check_BC5_Taxable_income = this.get_BC5_Taxable_incomeByAddress(address)
    if (!check_BC5_Taxable_income || check_BC5_Taxable_income.type !== 'BC5_TAXABLE_INCOME') throw `BC5_TAXABLE_INCOME IS NOT EXIST`
    return true
  }
  get_BC5_Taxable_incomeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  BC5_Taxable_income() {
    this._process.checkProcess(this.sender, 'BC')
    let bc5 = await this._tax.createTax('BC5_TAXABLE_INCOME')
    return bc5
  }
  get_BC5_Taxable_income() {
    return this._tax.getTaxByType('BC5_TAXABLE_INCOME')
  }
  // --------------------Taxable_income---------------------------  
  checkProcess(address) {
    this.check_BC6_Application = this.get_BC6_ApplicationByAddress(address);
    this.check_BC5_Taxable_income = this.get_BC5_Taxable_incomeByAddress(address);

    if (this.check_BC6_Application.type == 'BC6_APPLICATION') {
      return true;
    }
    else if (this.check_BC5_Taxable_income.type == 'BC5_TAXABLE_INCOME') {
      return true;
    }
    else {
      throw `BC6_APPLICATION_OR_BC5_TAXABLE_INCOME_FOR_CHECK IS NOT EXIST`;
    }
  }
  async  BC6_Application_or_BC5_Taxable_income() {
    this.checkProcess(this.sender, 'BC6_APPLICATION_OR_BC5_TAXABLE_INCOME_FOR_CHECK')
    let bc5_bc6 = await this._tax.createTax('BC6_APPLICATION_OR_BC5_TAXABLE_INCOME')
    return bc5_bc6
  }
  get_BC6_Application_or_BC5_Taxable_income() {
    return this._tax.getTaxByType('BC6_APPLICATION_OR_BC5_TAXABLE_INCOME')
  }
  async Taxable_income(address_BC6_Application_or_BC5_Taxable_income) {
    this._process.checkProcess(this.sender, 'BC')
    let check_bc5_bc6 = this._tax.getTaxByAddress(address_BC6_Application_or_BC5_Taxable_income)
    if (!check_bc5_bc6 || check_bc5_bc6.type !== 'BC6_APPLICATION_OR_BC5_TAXABLE_INCOME')
      throw 'BC6_APPLICATION_OR_BC5_TAXABLE_INCOME IS NOT EXIST'
    let Taxable_income = await this._tax.createTax('TAXABLE_INCOME')
    return Taxable_income
  }
  // --------------------Bacsic_tax_rate--------------------------- 
  async Bacsic_tax_rate(address_Taxable_income) {
    this._process.checkProcess(this.sender, 'BC')
    let check_Taxable_income = this._tax.getTaxByAddress(address_Taxable_income)
    if (!check_Taxable_income || check_Taxable_income.type !== 'TAXABLE_INCOME')
      throw 'TAXABLE_INCOME IS NOT EXIST'
    let Bacsic_tax_rate = await this._tax.createTax('BAXSIC_TAX_TAX')
    return Bacsic_tax_rate
  }
  get_Bacsic_tax_rate() {
    return this._tax.getTaxByType('BAXSIC_TAX_TAX')
  }
  // --------------------Equals---------------------------  
  async Equals(address_Taxable_income) {
    this._process.checkProcess(this.sender, 'BC')
    let check_Bacsic_tax_rate = this._tax.getTaxByAddress(address_Taxable_income)
    if (!check_Bacsic_tax_rate || check_Bacsic_tax_rate.type !== 'BAXSIC_TAX_TAX')
      throw 'BAXSIC_TAX_TAX IS NOT EXIST'
    let Equals = await this._tax.createTax('EQUALS')
    return Equals
  }
  get_Equals() {
    return this._tax.getTaxByType('EQUALS')
  }
  // --------------------BC6_Result_negative_income_tax_liability---------------------------  
  check_BC6_Result_negative_income_tax_liability(address) {
    let check_BC6_Result_negative_income_tax_liability = this.get_BC6_Result_negative_income_tax_liabilityByAddress(address)
    if (!check_BC6_Result_negative_income_tax_liability || check_BC6_Result_negative_income_tax_liability.type !== 'BC6_RESULT_NEGATIVE_INCOME_TAX_LIABILITY') throw `BC6_RESULT_NEGATIVE_INCOME_TAX_LIABILITY IS NOT EXIST`
    return true
  }
  get_BC6_Result_negative_income_tax_liabilityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async BC6_Result_negative_income_tax_liability(address_Taxable_income) {
    this._process.checkProcess(this.sender, 'BC')
    let check_Equals = this._tax.getTaxByAddress(address_Taxable_income)
    if (!check_Equals || check_Equals.type !== 'EQUALS')
      throw 'EQUALS IS NOT EXIST'
    let BC6_Result_negative_income_tax_liability = await this._tax.createTax('BC6_RESULT_NEGATIVE_INCOME_TAX_LIABILITY')
    return BC6_Result_negative_income_tax_liability
  }
  get_BC6_Result_negative_income_tax_liability() {
    return this._tax.getTaxByType('BC6_RESULT_NEGATIVE_INCOME_TAX_LIABILITY')
  }
  // --------------------BC6_Result_positive_income_tax_liability---------------------------  
  check_BC6_Result_positive_income_tax_liability(address) {
    let check_BC6_Result_positive_income_tax_liability = this.get_BC6_Result_positive_income_tax_liabilityByAddress(address)
    if (!check_BC6_Result_positive_income_tax_liability || check_BC6_Result_positive_income_tax_liability.type !== 'BC6_RESULT_POSITIVE_INCOME_TAX_LIABILITY') throw `BC6_RESULT_POSITIVE_INCOME_TAX_LIABILITY IS NOT EXIST`
    return true
  }
  get_BC6_Result_positive_income_tax_liabilityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async BC6_Result_positive_income_tax_liability(address_Taxable_income) {
    this._process.checkProcess(this.sender, 'BC')
    let check_Equals = this._tax.getTaxByAddress(address_Taxable_income)
    if (!check_Equals || check_Equals.type !== 'EQUALS')
      throw 'EQUALS IS NOT EXIST'
    let BC6_Result_positive_income_tax_liability = await this._tax.createTax('BC6_RESULT_POSITIVE_INCOME_TAX_LIABILITY')
    return BC6_Result_positive_income_tax_liability
  }
  get_BC6_Result_negative_income_tax_liability() {
    return this._tax.getTaxByType('BC6_RESULT_POSITIVE_INCOME_TAX_LIABILITY')
  }
  //--------------------BC8_Saticfaction_of_income_tax_liability---------------------------
  checkProcess2(address) {
    this.check_BC6_Result_negative_income_tax_liability = this.get_BC6_Result_negative_income_tax_liabilityByAddress(address);
    this.check_BC6_Result_positive_income_tax_liability = this.get_BC6_Result_positive_income_tax_liabilityByAddress(address);

    if (this.check_BC6_Result_negative_income_tax_liability.type == 'BC6_RESULT_NEGATIVE_INCOME_TAX_LIABILITY') {
      return true;
    }
    else if (this.check_BC6_Result_positive_income_tax_liability.type == 'BC6_RESULT_POSITIVE_INCOME_TAX_LIABILITY') {
      return true;
    }
    else {
      throw `BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY_FOR_CHECK IS NOT EXIST`;
    }
  }
  async  BC6_Result_negative_or_positive_income_tax_liability() {
    this.checkProcess(this.sender, 'BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY_FOR_CHECK')
    let result = await this._tax.createTax('BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY')
    return result
  }
  get_BC6_Result_negative_or_positive_income_tax_liability() {
    return this._tax.getTaxByType('BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY')
  }
  async BC8_Saticfaction_of_income_tax_liability(address_BC6_Result_negative_or_positive_income_tax_liability) {
    this._process.checkProcess(this.sender, 'BC')
    let check_result = this._tax.getTaxByAddress(address_BC6_Result_negative_or_positive_income_tax_liability)
    if (!check_result || check_result.type !== 'BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY')
      throw 'BC6_RESULT_NEGATIVE_OR_POSITIVE_INCOME_TAX_LIABILITY IS NOT EXIST'
    let BC8 = await this._tax.createTax('BC8_SACTICFACTION_OF_INCOME_TAX_LIABILITY')
    this.setToAddress(BC8.address)
    return BC8
  }
}
export default TokenMain;
