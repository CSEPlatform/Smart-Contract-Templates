import Contract from 'Contract'
import Process from './process'
import Tax from './tax'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Employers_send_W_2s_to_SSA',
    'get_Historical_economic_data_from_BLS_and_BEA',
    'get_Economic_assumptions_from_OMB',
    'get_Quarterly_wages_by_employer_from_IRS',
    'get_SSA_maintains_record_on_Individuals_earmings',
    'get_Quarterly_report_on_earmings',
    'get_SSA_estimates_tax_revenue',
    'get_Estimated-quarterly_FICA_and_SECA_tax_collections_and_liabilities',
    'get_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts',
    'get_Monthly_report_of_estimated_tax_liability',
    'get_Report_of_monthly_tax_deposits',
    'get_BFS_computes_tax_adjustments',
  ]
  static authenticationFuncs = [
    'SSA_maintains_record_on_Individuals_earmings',
    'Quarterly_report_on_earmings',
    'SSA_estimates_tax_revenue',
    'Estimated-quarterly_FICA_and_SECA_tax_collections_and_liabilities',
    'OTA_splits_estimated_quarterly_amounts_into_monthly_amounts',
    'Monthly_report_of_estimated_tax_liability',
    'Report_of_monthly_tax_deposits',
    'BFS_computes_tax_adjustments',
    'BFS_credits_Trust_Funds_with_taxes_and_adjustment'
  ]
  static publicFuncs = [
    'Employers_send_W_2s_to_SSA',
    'get_Employers_send_W_2s_to_SSA',
    'IRS_sends_data_on_self_employment_income_to_SSA',
    'get_IRS_sends_data_on_self_employment_income_to_SSA',
    'Historical_economic_data_from_BLS_and_BEA',
    'get_Historical_economic_data_from_BLS_and_BEA',
    'Economic_assumptions_from_OMB',
    'get_Economic_assumptions_from_OMB',
    'Quarterly_wages_by_employer_from_IRS',
    'get_Quarterly_wages_by_employer_from_IRS',
    'SSA_maintains_record_on_Individuals_earmings',
    'get_SSA_maintains_record_on_Individuals_earmings',
    'Quarterly_report_on_earmings',
    'get_Quarterly_report_on_earmings',
    'SSA_estimates_tax_revenue',
    'get_SSA_estimates_tax_revenue',
    'Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities',
    'get_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities',
    'OTA_splits_estimated_quarterly_amounts_into_monthly_amounts',
    'get_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts',
    'Monthly_report_of_estimated_tax_liability',
    'get_Monthly_report_of_estimated_tax_liability',
    'Report_of_monthly_tax_deposits',
    'get_Report_of_monthly_tax_deposits',
    'BFS_computes_tax_adjustments',
    'get_BFS_computes_tax_adjustments',
    'BFS_credits_Trust_Funds_with_taxes_and_adjustment',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'TAX_DEPOSITS_AND_ADJUSTMENT'
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
  async Employers_send_W_2s_to_SSA() {
    let employers = await this._process.createProcess('EMPLOYERS_SEND_W_2S_TO_SSA')
    return employers
  }
  get_Employers_send_W_2s_to_SSA() {
    let employers = this._process.getProcessByType('EMPLOYERS_SEND_W_2S_TO_SSA')
    return employers
  }
  async IRS_sends_data_on_self_employment_income_to_SSA() {
    let irs = await this._process.createProcess('IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA')
    return irs
  }
  get_IRS_sends_data_on_self_employment_income_to_SSA() {
    let irs = this._process.getProcessByType('IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA')
    return irs
  }
  async Historical_economic_data_from_BLS_and_BEA() {
    let historical = await this._process.createProcess('HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA')
    return historical
  }
  get_Historical_economic_data_from_BLS_and_BEA() {
    let historical = this._process.getProcessByType('HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA')
    return historical
  }
  async Economic_assumptions_from_OMB() {
    let economic = await this._process.createProcess('ECONOMIC_ASSUMPTIONS_FROM_OMB')
    return economic
  }
  get_Economic_assumptions_from_OMB() {
    let economic = this._process.getProcessByType('ECONOMIC_ASSUMPTIONS_FROM_OMB')
    return economic
  }
  async Quarterly_wages_by_employer_from_IRS() {
    let quarterly = await this._process.createProcess('QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS')
    return quarterly
  }
  get_Quarterly_wages_by_employer_from_IRS() {
    let quarterly = this._process.getProcessByType('QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS')
    return quarterly
  }
  // --------------------SSA_maintains_record_on_Individuals_earmings---------------------------  
  checkProcess(address) {
    this._process.checkProcess = this._process.getProcessByAddress(address);

    if (this._process.checkProcess.type == 'EMPLOYERS_SEND_W_2S_TO_SSA') {
      return true;
    }
    else if (this._process.checkProcess.type == 'IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA') {
      return true;
    }
    else {
      throw `EMPLOYERS_SEND_W_2S_TO_SSA_OR_IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA IS NOT EXIST`;

    }
  }
  check_SSA_maintains_record_on_Individuals_earmings(address) {
    let check_SSA_maintains_record_on_Individuals_earmings = this.get_SSA_maintains_record_on_Individuals_earmingsByAddress(address)
    if (!check_SSA_maintains_record_on_Individuals_earmings || check_SSA_maintains_record_on_Individuals_earmings.type !== 'SSA_MAINTAINS_RECORD_ON_INDIVIDUALS_EARMINGS') throw `SSA_MAINTAINS_RECORD_ON_INDIVIDUALS_EARMINGS IS NOT EXIST`
    return true
  }
  get_SSA_maintains_record_on_Individuals_earmingsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async SSA_maintains_record_on_Individuals_earmings() {
    await this.checkProcess(this.sender, 'EMPLOYERS_SEND_W_2S_TO_SSA_OR_IRS_SEND_DATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA')
    let two_process = await this._tax.createTax('SSA_MAINTAINS_RECORD_ON_INDIVIDUALS_EARMINGS')
    return two_process
  }
  get_SSA_maintains_record_on_Individuals_earmings() {
    return this._tax.getTaxByType('SSA_MAINTAINS_RECORD_ON_INDIVIDUALS_EARMINGS')
  }
  //--------------------Quarterly_report_on_earmings---------------------------
  check_Quarterly_report_on_earmings(address) {
    let check_Quarterly_report_on_earmings = this.get_Quarterly_report_on_earmingsByAddress(address)
    if (!check_Quarterly_report_on_earmings || check_Quarterly_report_on_earmings.type !== 'QUARTERLY_REPORT_ON_EARMINGS') throw `QUARTERLY_REPORT_ON_EARMINGS IS NOT EXIST`
    return true
  }
  get_Quarterly_report_on_earmingsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Quarterly_report_on_earmings() {
    await this.check_SSA_maintains_record_on_Individuals_earmings(this.sender, 'SSA_MAINTAINS_RECORD_ON_INDIVIDUALS_EARMINGS')
    let Order_goods_with_the_outsourcer_or_Update_order_with_the_outsourcer = await this._tax.createTax('QUARTERLY_REPORT_ON_EARMINGS')
    return Order_goods_with_the_outsourcer_or_Update_order_with_the_outsourcer
  }
  get_Quarterly_report_on_earmings() {
    return this._tax.getTaxByType('QUARTERLY_REPORT_ON_EARMINGS')
  }
  // -----------------------SSA_estimates_tax_revenue------------------------
  check3Process(address) {
    this._process.checkProcess = this._process.getProcessByAddress(address);
    this.check_Quarterly_report_on_earmings = this.get_Quarterly_report_on_earmingsByAddress(address);
    if (this._process.checkProcess.type == 'HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA') {
      return true;
    }
    else if (this._process.checkProcess.type == 'IRS_SEND_ECONOMIC_ASSUMPTIONS_FROM_OMBDATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA') {
      return true;
    }
    else if (this._process.checkProcess.type == 'QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS') {
      return true;
    }
    else if (this.check_Quarterly_report_on_earmings.type == 'QUARTERLY_REPORT_ON_EARMINGS') {
      return true;
    }
    else {
      throw `HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA_OR_IRS_SEND_ECONOMIC_ASSUMPTIONS_FROM_OMBDATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA_OR_QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS_OR_QUARTERLY_REPORT_ON_EARMINGS IS NOT EXIST`;
    }
  }
  check_SSA_estimates_tax_revenue(address) {
    let check_SSA_estimates_tax_revenue = this.get_SSA_estimates_tax_revenueByAddress(address)
    if (!check_SSA_estimates_tax_revenue || check_SSA_estimates_tax_revenue.type !== 'SSA_ESTIMATES_TAX_REVENUE') throw `SSA_ESTIMATES_TAX_REVENUE IS NOT EXIST`
    return true
  }
  get_SSA_estimates_tax_revenueByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async SSA_estimates_tax_revenue() {
    this.check3Process(this.sender, 'HISTORICAL_ECONOMIC_DATA_FROM_BLS_AND_BEA_OR_IRS_SEND_ECONOMIC_ASSUMPTIONS_FROM_OMBDATA_ON_SELF_EMPLOYMENT_IMCOME_TO_SSA_OR_QUARTERLY_WAGES_BY_EMPLOYER_FROM_IRS_OR_QUARTERLY_REPORT_ON_EARMINGS')
    let SSA_estimates_tax_revenue = await this._tax.createTax('SSA_ESTIMATES_TAX_REVENUE')
    return SSA_estimates_tax_revenue
  }
  get_SSA_estimates_tax_revenue() {
    return this._tax.getTaxByType('SSA_ESTIMATES_TAX_REVENUE')
  }
  // --------------------Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities---------------------------
  check_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities(address) {
    let check_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities = this.get_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilitiesByAddress(address)
    if (!check_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities || check_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities.type !== 'ESTIMATED_QUARTERLY_FICA_AND_SECA_TAX_COLLECTIONS_AND_LIABILITIES') throw `ESTIMATED_QUARTERLY_FICA_AND_SECA_TAX_COLLECTIONS_AND_LIABILITIES IS NOT EXIST`
    return true
  }
  get_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilitiesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities() {
    this.check_SSA_estimates_tax_revenue(this.sender, 'SSA_ESTIMATES_TAX_REVENUE')
    let estimated = await this._tax.createTax('ESTIMATED_QUARTERLY_FICA_AND_SECA_TAX_COLLECTIONS_AND_LIABILITIES')
    return estimated
  }
  get_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities() {
    return this._tax.getTaxByType('ESTIMATED_QUARTERLY_FICA_AND_SECA_TAX_COLLECTIONS_AND_LIABILITIES')
  }
  // --------------------OTA_splits_estimated_quarterly_amounts_into_monthly_amounts---------------------------
  check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts(address) {
    let check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts = this.get_OTA_splits_estimated_quarterly_amounts_into_monthly_amountsByAddress(address)
    if (!check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts || check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts.type !== 'OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS') throw `OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS IS NOT EXIST`
    return true
  }
  get_OTA_splits_estimated_quarterly_amounts_into_monthly_amountsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  OTA_splits_estimated_quarterly_amounts_into_monthly_amounts() {
    this.check_Estimated_quarterly_FICA_and_SECA_tax_collections_and_liabilities(this.sender, 'ESTIMATED_QUARTERLY_FICA_AND_SECA_TAX_COLLECTIONS_AND_LIABILITIES')
    let OTA = await this._tax.createTax('OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS')
    return OTA
  }
  get_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts() {
    return this._tax.getTaxByType('OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS')
  }
  // --------------------Monthly_report_of_estimated_tax_liability---------------------------
  check_Monthly_report_of_estimated_tax_liability(address) {
    let check_Monthly_report_of_estimated_tax_liability = this.get_Monthly_report_of_estimated_tax_liabilityByAddress(address)
    if (!check_Monthly_report_of_estimated_tax_liability || check_Monthly_report_of_estimated_tax_liability.type !== 'MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY') throw `MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY IS NOT EXIST`
    return true
  }
  get_Monthly_report_of_estimated_tax_liabilityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Monthly_report_of_estimated_tax_liability() {
    this.check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts(this.sender, 'OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS')
    let OTA = await this._tax.createTax('MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY')
    return OTA
  }
  get_Monthly_report_of_estimated_tax_liability() {
    return this._tax.getTaxByType('MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY')
  }
  // --------------------Report_of_monthly_tax_deposits---------------------------
  check_Report_of_monthly_tax_deposits(address) {
    let check_Report_of_monthly_tax_deposits = this.get_Report_of_monthly_tax_depositsByAddress(address)
    if (!check_Report_of_monthly_tax_deposits || check_Report_of_monthly_tax_deposits.type !== 'REPORT_OF_MONTHLY_TAX_DEPOSITS') throw `REPORT_OF_MONTHLY_TAX_DEPOSITS IS NOT EXIST`
    return true
  }
  get_Report_of_monthly_tax_depositsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Report_of_monthly_tax_deposits() {
    this.check_OTA_splits_estimated_quarterly_amounts_into_monthly_amounts(this.sender, 'OTA_SPLITS_ESTIMATED_QUARTERLY_AMOUNTS_INTO_MONTHLY_AMOUNTS')
    let report = await this._tax.createTax('REPORT_OF_MONTHLY_TAX_DEPOSITS')
    return report
  }
  get_Report_of_monthly_tax_deposits() {
    return this._tax.getTaxByType('REPORT_OF_MONTHLY_TAX_DEPOSITS')
  }
  // --------------------BFS_computes_tax_adjustments---------------------------
  checkMonthly_and_Quarterly(address) {
    this.check_Monthly_report_of_estimated_tax_liability = this.get_Monthly_report_of_estimated_tax_liabilityByAddress(address);
    this.check_Quarterly_report_on_earmings = this.get_Quarterly_report_on_earmingsByAddress(address);
    if (this.check_Monthly_report_of_estimated_tax_liability.type == 'MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY') {
      return true;
    }
    else if (this.check_Quarterly_report_on_earmings.type == 'QUARTERLY_REPORT_ON_EARMINGS') {
      return true;
    }
    else {
      throw `MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY_OR_QUARTERLY_REPORT_ON_EARMINGS IS NOT EXIST`;
    }
  }
  check_BFS_computes_tax_adjustments(address) {
    let check_BFS_computes_tax_adjustments = this.get_BFS_computes_tax_adjustmentsByAddress(address)
    if (!check_BFS_computes_tax_adjustments || check_BFS_computes_tax_adjustments.type !== 'BFS_COMPUTES_TAX_ADJUSTMENTS') throw `BFS_COMPUTES_TAX_ADJUSTMENTS IS NOT EXIST`
    return true
  }
  get_BFS_computes_tax_adjustmentsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async BFS_computes_tax_adjustments() {
    await this.checkMonthly_and_Quarterly(this.sender, 'MONTHLY_REPPORT_OF_ESTIMATED_TAX_LIABILITY_OR_QUARTERLY_REPORT_ON_EARMINGS')
    let BFS_computes_tax_adjustments = await this._tax.createTax('BFS_COMPUTES_TAX_ADJUSTMENTS')
    return BFS_computes_tax_adjustments
  }
  get_BFS_computes_tax_adjustments() {
    return this._tax.getTaxByType('BFS_COMPUTES_TAX_ADJUSTMENTS')
  }
  //--------------------BFS_credits_Trust_Funds_with_taxes_and_adjustment---------------------------
  check_BFS_and_report(address) {
    this.check_BFS_computes_tax_adjustments = this.get_BFS_computes_tax_adjustmentsByAddress(address);
    this.check_Report_of_monthly_tax_deposits = this.get_Quarterly_report_on_earmingsByAddress(address);
    if (this.check_BFS_computes_tax_adjustments.type == 'BFS_COMPUTES_TAX_ADJUSTMENTS') {
      return true;
    }
    else if (this.check_Report_of_monthly_tax_deposits.type == 'REPORT_OF_MONTHLY_TAX_DEPOSITS') {
      return true;
    }
    else {
      throw `BFS_COMPUTES_TAX_ADJUSTMENTS_OR_REPORT_OF_MONTHLY_TAX_DEPOSITS IS NOT EXIST`;
    }
  }
  async BFS_credits_Trust_Funds_with_taxes_and_adjustment() {
    this.check_BFS_and_report(this.sender, 'BFS_COMPUTES_TAX_ADJUSTMENTS_OR_REPORT_OF_MONTHLY_TAX_DEPOSITS')
    let BFS_credits = await this._tax.createTax('BFS_CREDITS_TRUST_FUNDS_WITH_TAXES_AND_ADJUMENTS')
    this.setToAddress(BFS_credits.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
