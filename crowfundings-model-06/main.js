import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_User_or_Reinvest',
    'get_Start',
    'get_Type_of_Fundraising',
    'get_Direct',
    'get_Indirect',
    'get_Check_Investment_Type',
    'get_Investment_Type',
    'get_Expost',
    'get_Exante',
    'get_Check_Type_of_Crowdfunding_and_Funding_Models',
    'get_Type_of_Crowdfunding_and_Funding_Models',
    'get_Payou_Modes',
    'get_All_or_Nothing',
    'get_All_or_More',
    'get_Holding',
    'get_Club_Menbership',
    'get_Check_Reward_Modes',
    'get_Check_Check_Reward_Modes',
    'get_Reward_Modes',
    'get_Orther',
    'get_Donation',
    'get_Passive_Investment',
    'get_Active_Investment',
    'get_Intrinsic_Value',
    'get_Pre_purchase',
    'get_Patronage',
    'get_Equity',
    'get_PPO',
    'get_Profit_Sharing',
    'get_Patronage_Plus',
    'get_Check_Transfer',
    'get_Transfer',
    'get_Securities_Determination',
    'get_Securities_Exemptions',
    'get_Successful_Investment',
    'get_Reinvest'
  ]
  static authenticationFuncs = [
    'User_or_Reinvest',
    'Start',
    'Type_of_Fundraising',
    'Direct',
    'Indirect',
    'Check_Investment_Type',
    'Investment_Type',
    'Expost',
    'Exante',
    'Check_Type_of_Crowdfunding_and_Funding_Models',
    'Type_of_Crowdfunding_and_Funding_Models',
    'Payou_Modes',
    'All_or_Nothing',
    'All_or_More',
    'Holding',
    'Club_Menbership',
    'Check_Reward_Modes',
    'Check_Check_Reward_Modes',
    'Reward_Modes',
    'Orther',
    'Donation',
    'Passive_Investment',
    'Active_Investment',
    'Intrinsic_Value',
    'Pre_purchase',
    'Patronage',
    'Equity',
    'PPO',
    'Profit_Sharing',
    'Patronage_Plus',
    'Check_Transfer',
    'Transfer',
    'Securities_Determination',
    'Securities_Indetermination',
    'Securities_Exemptions',
    'Successful_Investment',
    'Fail_Investment',
    'Reinvest'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'User_or_Reinvest',
    'get_User_or_Reinvest',
    'Start',
    'get_Start',
    'Type_of_Fundraising',
    'get_Type_of_Fundraising',
    'Direct',
    'get_Direct',
    'Indirect',
    'get_Indirect',
    'Check_Investment_Type',
    'get_Check_Investment_Type',
    'Investment_Type',
    'get_Investment_Type',
    'Expost',
    'get_Expost',
    'Exante',
    'get_Exante',
    'Check_Type_of_Crowdfunding_and_Funding_Models',
    'get_Check_Type_of_Crowdfunding_and_Funding_Models',
    'Type_of_Crowdfunding_and_Funding_Models',
    'get_Type_of_Crowdfunding_and_Funding_Models',
    'Payou_Modes',
    'get_Payou_Modes',
    'All_or_Nothing',
    'get_All_or_Nothing',
    'All_or_More',
    'get_All_or_More',
    'Holding',
    'get_Holding',
    'Club_Menbership',
    'get_Club_Menbership',
    'Check_Reward_Modes',
    'get_Check_Reward_Modes',
    'Check_Reward_Modes',
    'get_Check_Reward_Modes',
    'Reward_Modes',
    'get_Reward_Modes',
    'Orther',
    'get_Orther',
    'Donation',
    'get_Donation',
    'get_get_Donation',
    'Passive_Investment',
    'get_Passive_Investment',
    'get_Passive_Investment',
    'get_get_Passive_Investment',
    'Active_Investment',
    'get_Active_Investment',
    'get_Active_Investment',
    'get_get_Active_Investment',
    'Intrinsic_Value',
    'get_Intrinsic_Value',
    'Pre_purchase',
    'get_Pre_purchase',
    'Patronage',
    'get_Patronage',
    'Equity',
    'get_Equity',
    'PPO',
    'get_PPO',
    'Profit_Sharing',
    'get_Profit_Sharing',
    'Patronage_Plus',
    'get_Patronage_Plus',
    'Check_Transfer',
    'get_Check_Transfer',
    'Transfer',
    'get_Transfer',
    'Securities_Determination',
    'get_Securities_Determination',
    'Securities_Indetermination',
    'Securities_Exemptions',
    'get_Securities_Exemptions',
    'Successful_Investment',
    'get_Successful_Investment',
    'Fail_Investment',
    'Reinvest',
    'get_Reinvest',

  ]
  static schemas = {
    name: {
      type: String,
      default: 'CROWFUNDINGS-MODEL-06'
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
  // --------------------Start---------------------------
  checkProcess1(address) {
    this._user.checkUser = this._user.getUserByAddress(address);
    this.check_Reinvest = this.get_ReinvestByAddress(address);

    if (this._user.checkUser.type == 'USER') {
      return true;
    }
    else if (this.check_Reinvest.type == 'REINVEST') {
      return true;
    }
    else {
      throw `USER_OR_REINVEST_FOR_CHECK IS NOT EXIST`;
    }
  }
  async User_or_Reinvest() {
    await this.checkProcess1(this.sender, 'USER_OR_REINVEST_FOR_CHECK')
    let check1 = await this._process.createProcess('USER_OR_REINVEST')
    return check1
  }
  get_User_or_Reinvest() {
    return this._process.getProcessByType('USER_OR_REINVEST')
  }
  async Start(address_User_or_Reinvest) {
    await this._user.checkUser(this.sender, 'USER')
    let check_User_or_Reinvest = this._process.getProcessByAddress(address_User_or_Reinvest)
    if (!check_User_or_Reinvest || check_User_or_Reinvest.type !== 'USER_OR_REINVEST')
      throw 'USER_OR_REINVEST IS NOT EXIST'
    let Start = await this._process.createProcess('START')
    return Start
  }
  get_Start() {
    return this._process.getProcessByType('START')
  }
  // --------------------Type_of_Fundraising---------------------------
  async Type_of_Fundraising(address_Start) {
    this._user.checkUser(this.sender, 'USER')
    let check_Start = this._process.getProcessByAddress(address_Start)
    if (!check_Start || check_Start.type !== 'START')
      throw 'START IS NOT EXIST'
    let Type_of_Fundraising = await this._process.createProcess('TYPE_OF_FUNDRAISING')
    return Type_of_Fundraising
  }
  get_Type_of_Fundraising() {
    return this._process.getProcessByType('TYPE_OF_FUNDRAISING')
  }
  // --------------------Direct--------------------------- 
  check_Direct(address) {
    let check_Direct = this.get_DirectByAddress(address)
    if (!check_Direct || check_Direct.type !== 'DIRECT') throw `DIRECT IS NOT EXIST`
    return true
  }
  get_DirectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Direct(address_Type_of_Fundraising) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Fundraising = this._process.getProcessByAddress(address_Type_of_Fundraising)
    if (!check_Type_of_Fundraising || check_Type_of_Fundraising.type !== 'TYPE_OF_FUNDRAISING')
      throw 'TYPE_OF_FUNDRAISING IS NOT EXIST'
    let Direct = await this._process.createProcess('DIRECT')
    return Direct
  }
  get_Direct() {
    return this._process.getProcessByType('DIRECT')
  }
  // --------------------Indirect--------------------------- 
  check_Indirect(address) {
    let check_Indirect = this.get_IndirectByAddress(address)
    if (!check_Indirect || check_Indirecttype !== 'INDIRECT') throw `INDIRECT IS NOT EXIST`
    return true
  }
  get_IndirectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Indirect(address_Type_of_Fundraising) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Fundraising = this._process.getProcessByAddress(address_Type_of_Fundraising)
    if (!check_Type_of_Fundraising || check_Type_of_Fundraising.type !== 'TYPE_OF_FUNDRAISING')
      throw 'TYPE_OF_FUNDRAISING IS NOT EXIST'
    let Indirect = await this._process.createProcess('INDIRECT')
    return Indirect
  }
  get_Indirect() {
    return this._process.getProcessByType('INDIRECT')
  }
  // --------------------Investment_Type--------------------------- 
  checkProcess(address) {
    this.check_Direct = this.get_DirectByAddress(address);
    this.check_Indirect = this.get_IndirectByAddress(address);

    if (this.check_Direct.type == 'DIRECT') {
      return true;
    }
    else if (this.check_Indirect.type == 'INDIRECT') {
      return true;
    }
    else {
      throw `DIRECT_OR_INDIRECT IS NOT EXIST`;
    }
  }
  async Check_Investment_Type() {
    await this.checkProcess(this.sender, 'DIRECT_OR_INDIRECT')
    let check = await this._process.createProcess('CHECK_INVESTMENT_TYPE')
    return check
  }
  get_Check_Investment_Type() {
    return this._process.getProcessByType('CHECK_INVESTMENT_TYPE')
  }
  async Investment_Type(address_Check_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Investment_Type = this._process.getProcessByAddress(address_Check_Investment_Type)
    if (!check_Check_Investment_Type || check_Check_Investment_Type.type !== 'CHECK_INVESTMENT_TYPE')
      throw 'CHECK_INVESTMENT_TYPE IS NOT EXIST'
    let Investment_Type = await this._process.createProcess('INVESTMENT_TYPE')
    return Investment_Type
  }
  get_Investment_Typet() {
    return this._process.getProcessByType('INVESTMENT_TYPE')
  }
  // --------------------Expost--------------------------- 
  check_Expost(address) {
    let check_Expost = this.get_ExpostByAddress(address)
    if (!check_Expost || check_Expost !== 'EXPOST') throw `EXPOST IS NOT EXIST`
    return true
  }
  get_ExpostByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Expost(address_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Type = this._process.getProcessByAddress(address_Investment_Type)
    if (!check_Investment_Type || check_Investment_Type.type !== 'INVESTMENT_TYPE')
      throw 'INVESTMENT_TYPE IS NOT EXIST'
    let Expost = await this._process.createProcess('EXPOST')
    return Expost
  }
  get_Expost() {
    return this._process.getProcessByType('EXPOST')
  }
  // --------------------Exante--------------------------- 
  check_Exante(address) {
    let check_Exante = this.get_ExanteByAddress(address)
    if (!check_Exante || check_Exante !== 'EXANTE') throw `EXANTE IS NOT EXIST`
    return true
  }
  get_ExanteByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Exante(address_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Investment_Type = this._process.getProcessByAddress(address_Investment_Type)
    if (!check_Investment_Type || check_Investment_Type.type !== 'INVESTMENT_TYPE')
      throw 'INVESTMENT_TYPE IS NOT EXIST'
    let Exante = await this._process.createProcess('EXANTE')
    return Exante
  }
  get_Exante() {
    return this._process.getProcessByType('EXANTE')
  }
  // --------------------Type_of_Crowdfunding_and_Funding_Models--------------------------- 
  checkProcess2(address) {
    this.check_Expost = this.get_ExpostByAddress(address);
    this.check_Exante = this.get_ExanteByAddress(address);

    if (this.check_Expost.type == 'EXPOST') {
      return true;
    }
    else if (this.check_Exante.type == 'EXANTE') {
      return true;
    }
    else {
      throw `EXPOST_OR_EXANTE IS NOT EXIST`;
    }
  }
  async Check_Type_of_Crowdfunding_and_Funding_Models() {
    await this.checkProcess2(this.sender, 'EXPOST_OR_EXANTE')
    let check2 = await this._process.createProcess('CHECK_TYPE_OF_CROWDFUNDING_AND_FUNDING_MODELS')
    return check2
  }
  get_Check_Type_of_Crowdfunding_and_Funding_Models() {
    return this._process.getProcessByType('CHECK_INVESTMENT_TYPE')
  }
  async Type_of_Crowdfunding_and_Funding_Models(address_Check_Investment_Type) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Investment_Type = this._process.getProcessByAddress(address_Check_Investment_Type)
    if (!check_Check_Investment_Type || check_Check_Investment_Type.type !== 'CHECK_INVESTMENT_TYPE')
      throw 'CHECK_INVESTMENT_TYPE IS NOT EXIST'
    let process = await this._process.createProcess('TYPE_OF_CROWDFUNDING_AND_FUNDING_MODELS')
    return process
  }
  get_Type_of_Crowdfunding_and_Funding_Models() {
    return this._process.getProcessByType('TYPE_OF_CROWDFUNDING_AND_FUNDING_MODELS')
  }
  //---------------------Payou_Modes------------------------------
  async Payou_Modes(address_Type_of_Crowdfunding_and_Funding_Models) {
    this._user.checkUser(this.sender, 'USER')
    let check_process = this._process.getProcessByAddress(address_Type_of_Crowdfunding_and_Funding_Models)
    if (!check_process || check_process.type !== 'TYPE_OF_CROWDFUNDING_AND_FUNDING_MODELS')
      throw 'TYPE_OF_CROWDFUNDING_AND_FUNDING_MODELS IS NOT EXIST'
    let Payou_Modes = await this._process.createProcess('PAYOUT_MODES')
    return Payou_Modes
  }
  get_Payou_Modes() {
    return this._process.getProcessByType('PAYOUT_MODES')
  }
  //----------All_or_Nothing--------------------------
  check_All_or_Nothing(address) {
    let check_All_or_Nothing = this.get_All_or_NothingByAddress(address)
    if (!check_All_or_Nothing || check_All_or_Nothing !== 'ALL_OR_NOTHING') throw `ALL_OR_NOTHING IS NOT EXIST`
    return true
  }
  get_All_or_NothingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async All_or_Nothing(address_Payou_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payou_Modes = this._process.getProcessByAddress(address_Payou_Modes)
    if (!check_Payou_Modes || check_Payou_Modes.type !== 'PAYOUT_MODES')
      throw 'PAYOUT_MODES IS NOT EXIST'
    let All_or_Nothing = await this._process.createProcess('ALL_OR_NOTHING')
    return All_or_Nothing
  }
  get_All_or_Nothing() {
    return this._process.getProcessByType('ALL_OR_NOTHING')
  }
  //----------All_or_More---------------------------
  check_All_or_More(address) {
    let check_All_or_More = this.get_All_or_MoreByAddress(address)
    if (!check_All_or_More || check_All_or_More !== 'ALL_OR_MORE') throw `ALL_OR_MORE IS NOT EXIST`
    return true
  }
  get_All_or_MoreByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async All_or_More(address_Payou_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payou_Modes = this._process.getProcessByAddress(address_Payou_Modes)
    if (!check_Payou_Modes || check_Payou_Modes.type !== 'PAYOUT_MODES')
      throw 'PAYOUT_MODES IS NOT EXIST'
    let All_or_More = await this._process.createProcess('ALL_OR_MORE')
    return All_or_More
  }
  get_All_or_More() {
    return this._process.getProcessByType('ALL_OR_MORE')
  }
  //----------Holding---------------------------
  check_Holding(address) {
    let check_Holding = this.get_HoldingByAddress(address)
    if (!check_Holding || check_Holding !== 'HOLDING') throw `HOLDING IS NOT EXIST`
    return true
  }
  get_HoldingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Holding(address_Payou_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payou_Modes = this._process.getProcessByAddress(address_Payou_Modes)
    if (!check_Payou_Modes || check_Payou_Modes.type !== 'PAYOUT_MODES')
      throw 'PAYOUT_MODES IS NOT EXIST'
    let Holding = await this._process.createProcess('HOLDING')
    return Holding
  }
  get_Holding() {
    return this._process.getProcessByType('HOLDING')
  }
  //----------Club_Menbership---------------------------
  check_Club_Menbership(address) {
    let check_Club_Menbership = this.get_Club_MenbershipByAddress(address)
    if (!check_Club_Menbership || check_Club_Menbership !== 'CLUB_MENBERSHIP') throw `CLUB_MENBERSHIP IS NOT EXIST`
    return true
  }
  get_Club_MenbershipByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Club_Menbership(address_Payou_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Payou_Modes = this._process.getProcessByAddress(address_Payou_Modes)
    if (!check_Payou_Modes || check_Payou_Modes.type !== 'PAYOUT_MODES')
      throw 'PAYOUT_MODES IS NOT EXIST'
    let Club_Menbership = await this._process.createProcess('CLUB_MENBERSHIP')
    return Club_Menbership
  }
  get_Club_Menbership() {
    return this._process.getProcessByType('CLUB_MENBERSHIP')
  }
  // --------------------Type_of_Crowdfunding_and_Funding_Models--------------------------- 
  checkProcess3(address) {
    this.check_All_or_Nothing = this.get_All_or_NothingByAddress(address);
    this.check_All_or_More = this.get_All_or_MoreByAddress(address);
    this.check_Holding = this.get_HoldingByAddress(address);
    this.check_Club_Menbership = this.get_Club_MenbershipByAddress(address);

    if (this.check_Expost.type == 'ALL_OR_NOTHING') {
      return true;
    }
    else if (this.check_All_or_More.type == 'ALL_OR_MORE') {
      return true;
    }
    else if (this.check_Holding.type == 'HOLDING') {
      return true;
    }
    else if (this.check_Club_Menbership.type == 'CLUB_MENBERSHIP') {
      return true;
    }
    else {
      throw `ALL_OR_NOTHING_OR_ALL_OR_MORE_OR_HOLDING_OR_CLUB_MENBERSHIP IS NOT EXIST`;
    }
  }
  async Check_Reward_Modes() {
    await this.checkProcess3(this.sender, 'ALL_OR_NOTHING_OR_ALL_OR_MORE_OR_HOLDING_OR_CLUB_MENBERSHIP')
    let check3 = await this._process.createProcess('CHECK_REWARD_MODES')
    return check3
  }
  get_Check_Reward_Modes() {
    return this._process.getProcessByType('CHECK_REWARD_MODES')
  }
  async Reward_Modes(address_Check_Reward_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Reward_Modes = this._process.getProcessByAddress(address_Check_Reward_Modes)
    if (!check_Check_Reward_Modes || check_Check_Reward_Modes.type !== 'CHECK_REWARD_MODES')
      throw 'CHECK_REWARD_MODES IS NOT EXIST'
    let Reward_Modes = await this._process.createProcess('REWARD_MODES')
    return Reward_Modes
  }
  get_Reward_Modes() {
    return this._process.getProcessByType('REWARD_MODES')
  }
  //--------------------- Type_of_Investment------------------------------
  async Type_of_Investment(address_Reward_Modes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Reward_Modes = this._process.getProcessByAddress(address_Reward_Modes)
    if (!check_Reward_Modes || check_Reward_Modes.type !== 'REWARD_MODES')
      throw 'REWARD_MODES IS NOT EXIST'
    let Type_of_Investment = await this._process.createProcess('TYPE_OF_INVESTMENT')
    return Type_of_Investment
  }
  get_Type_of_Investment() {
    return this._process.getProcessByType('TYPE_OF_INVESTMENT')
  }
  //---------------------Orther------------------------------
  async Orther(address_Type_of_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Investment = this._process.getProcessByAddress(address_Type_of_Investment)
    if (!check_Type_of_Investment || check_Type_of_Investment.type !== 'TYPE_OF_INVESTMENT')
      throw 'TYPE_OF_INVESTMENT IS NOT EXIST'
    let Orther = await this._process.createProcess('ORTHER')
    return Orther
  }
  get_Orther() {
    return this._process.getProcessByType('ORTHER')
  }
  //---------------------Donation------------------------------
  async Donation(address_Type_of_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Investment = this._process.getProcessByAddress(address_Type_of_Investment)
    if (!check_Type_of_Investment || check_Type_of_Investment.type !== 'TYPE_OF_INVESTMENT')
      throw 'TYPE_OF_INVESTMENT IS NOT EXIST'
    let Donation = await this._process.createProcess('DONATION')
    return Donation
  }
  get_Donation() {
    return this._process.getProcessByType('DONATION')
  }
  //---------------------Passive_Investment------------------------------
  async Passive_Investment(address_Type_of_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Investment = this._process.getProcessByAddress(address_Type_of_Investment)
    if (!check_Type_of_Investment || check_Type_of_Investment.type !== 'TYPE_OF_INVESTMENT')
      throw 'TYPE_OF_INVESTMENT IS NOT EXIST'
    let Passive_Investment = await this._process.createProcess('PASSIVE_INVESTMENT')
    return Passive_Investment
  }
  get_Passive_Investment() {
    return this._process.getProcessByType('PASSIVE_INVESTMENT')
  }
  //---------------------Active_Investment------------------------------
  async Active_Investment(address_Type_of_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Type_of_Investment = this._process.getProcessByAddress(address_Type_of_Investment)
    if (!check_Type_of_Investment || check_Type_of_Investment.type !== 'TYPE_OF_INVESTMENT')
      throw 'TYPE_OF_INVESTMENT IS NOT EXIST'
    let Active_Investment = await this._process.createProcess('ACTIVE_INVESTMENT')
    return Active_Investment
  }
  get_Active_Investment() {
    return this._process.getProcessByType('ACTIVE_INVESTMENT')
  }
  //---------------------Intrinsic_Value------------------------------
  async Intrinsic_Value(address_Donation) {
    this._user.checkUser(this.sender, 'USER')
    let check_Donation = this._process.getProcessByAddress(address_Donation)
    if (!check_Donation || check_Donation.type !== 'DONATION')
      throw 'DONATION IS NOT EXIST'
    let Intrinsic_Value = await this._process.createProcess('INTRINSIC_VALUE')
    return Intrinsic_Value
  }
  get_Intrinsic_Value() {
    return this._process.getProcessByType('INTRINSIC_VALUE')
  }
  //----------Pre_purchase---------------------------
  async Pre_purchase(address_Passive_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Passive_Investment = this._process.getProcessByAddress(address_Passive_Investment)
    if (!check_Passive_Investment || check_Passive_Investment.type !== 'PASSIVE_INVESTMENT')
      throw 'PASSIVE_INVESTMENT IS NOT EXIST'
    let Pre_purchase = await this._process.createProcess('PRE_PURCHASE')
    return Pre_purchase
  }
  get_Pre_purchase() {
    return this._process.getProcessByType('PRE_PURCHASE')
  }
  //----------Patronage---------------------------
  async Patronage(address_Passive_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Passive_Investment = this._process.getProcessByAddress(address_Passive_Investment)
    if (!check_Passive_Investment || check_Passive_Investment.type !== 'PASSIVE_INVESTMENT')
      throw 'PASSIVE_INVESTMENT IS NOT EXIST'
    let Patronage = await this._process.createProcess('PATRONAGE')
    return Patronage
  }
  get_Patronage() {
    return this._process.getProcessByType('PATRONAGE')
  }
  //----------Equity---------------------------
  check_Equity(address) {
    let check_Equity = this.get_EquityByAddress(address)
    if (!check_Equity || check_Equity !== 'EQUITY') throw `EQUITY IS NOT EXIST`
    return true
  }
  get_EquityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Equity(address_Active_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Active_Investment = this._process.getProcessByAddress(address_Active_Investment)
    if (!check_Active_Investment || check_Active_Investment.type !== 'ACTIVE_INVESTMENT')
      throw 'ACTIVE_INVESTMENT IS NOT EXIST'
    let Equity = await this._process.createProcess('EQUITY')
    return Equity
  }
  get_Equity() {
    return this._process.getProcessByType('EQUITY')
  }
  //----------PPO---------------------------
  check_PPO(address) {
    let check_PPO = this.get_PPOByAddress(address)
    if (!check_PPO || check_PPO !== 'PPO') throw `PPO IS NOT EXIST`
    return true
  }
  get_PPOByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async PPO(address_Active_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Active_Investment = this._process.getProcessByAddress(address_Active_Investment)
    if (!check_Active_Investment || check_Active_Investment.type !== 'ACTIVE_INVESTMENT')
      throw 'ACTIVE_INVESTMENT IS NOT EXIST'
    let PPO = await this._process.createProcess('PPO')
    return PPO
  }
  get_PPO() {
    return this._process.getProcessByType('PPO')
  }
  //----------Profit_Sharing---------------------------
  check_Profit_Sharing(address) {
    let check_Profit_Sharing = this.get_Profit_SharingByAddress(address)
    if (!check_Profit_Sharing || check_Profit_Sharing !== 'PROFIT_SHARING') throw `PROFIT_SHARING IS NOT EXIST`
    return true
  }
  get_Profit_SharingByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Profit_Sharing(address_Active_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Active_Investment = this._process.getProcessByAddress(address_Active_Investment)
    if (!check_Active_Investment || check_Active_Investment.type !== 'ACTIVE_INVESTMENT')
      throw 'ACTIVE_INVESTMENT IS NOT EXIST'
    let Profit_Sharing = await this._process.createProcess('PROFIT_SHARING')
    return Profit_Sharing
  }
  get_Profit_Sharing() {
    return this._process.getProcessByType('PROFIT_SHARING')
  }
  //----------Patronage_Plus---------------------------
  check_Patronage_Plus(address) {
    let check_Patronage_Plus = this.get_Patronage_PlusByAddress(address)
    if (!check_Patronage_Plus || check_Patronage_Plus !== 'PATRONAGE_PLUS') throw `PATRONAGE_PLUS IS NOT EXIST`
    return true
  }
  get_Patronage_PlusByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Patronage_Plus(address_Active_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Active_Investment = this._process.getProcessByAddress(address_Active_Investment)
    if (!check_Active_Investment || check_Active_Investment.type !== 'ACTIVE_INVESTMENT')
      throw 'ACTIVE_INVESTMENT IS NOT EXIST'
    let Patronage_Plus = await this._process.createProcess('PATRONAGE_PLUS')
    return Patronage_Plus
  }
  get_Patronage_Plus() {
    return this._process.getProcessByType('PATRONAGE_PLUS')
  }

  // --------------------Transfer--------------------------- 
  checkProcess4(address) {
    this.check_Equity = this.get_EquityByAddress(address);
    this.check_PPO = this.get_PPOByAddress(address);
    this.check_Profit_Sharing = this.get_Profit_SharingByAddress(address);
    this.check_Patronage_Plus = this.get_Patronage_PlusByAddress(address);
    if (this.check_Equity.type == 'EQUITY') {
      return true;
    }
    else if (this.check_PPO.type == 'PPO') {
      return true;
    }
    else if (this.check_Profit_Sharing.type == 'PROFIT_SHARING') {
      return true;
    }
    else if (this.check_Patronage_Plus.type == 'PATRONAGE_PLUS') {
      return true;
    }
    else {
      throw `EQUITY_OR_ALL_OR_PPO_OR_PROFIT_SHARING_OR_PATRONAGE_PLUS IS NOT EXIST`;
    }
  }
  async Check_Transfer() {
    await this.checkProcess4(this.sender, 'EQUITY_OR_ALL_OR_PPO_OR_PROFIT_SHARING_OR_PATRONAGE_PLUS')
    let check4 = await this._process.createProcess('CHECK_TRANSFER')
    return check4
  }
  get_Check_Transfer() {
    return this._process.getProcessByType('CHECK_TRANSFER')
  }
  async Transfer(address_Check_Reinvest) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Reinvest = this._process.getProcessByAddress(address_Check_Reinvest)
    if (!check_Check_Reinvest || check_Check_Reinvest.type !== 'CHECK_REINVEST')
      throw 'CHECK_REINVEST IS NOT EXIST'
    let Transfer = await this._process.createProcess('TRANSFER')
    return Transfer
  }
  get_Transfer() {
    return this._process.getProcessByType('TRANSFER')
  }
  //----------Securities_Determination---------------------------
  async Securities_Determination(address_Transfer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Transfer = this._process.getProcessByAddress(address_Transfer)
    if (!check_Transfer || check_Transfer.type !== 'TRANSFER')
      throw 'TRANSFER IS NOT EXIST'
    let Securities_Determination = await this._process.createProcess('SECURITIES_DETERMINATION')
    return Securities_Determination
  }
  get_Securities_Determination() {
    return this._process.getProcessByType('SECURITIES_DETERMINATION')
  }
  //----------Securities_Indetermination---------------------------
  async Securities_Indetermination(address_Reinvest) {
    this._user.checkUser(this.sender, 'USER')
    let check_Reinvest = this._process.getProcessByAddress(address_Reinvest)
    if (!check_Reinvest || check_Reinvest.type !== 'REINVEST')
      throw 'REINVEST IS NOT EXIST'
    let Securities_Indetermination = await this._process.createProcess('SECURITIES_INDETERMINATION')
    this.setToAddress(Securities_Indetermination.address)
    return 'END'
  }
  //----------Securities_Exemptions---------------------------
  async Securities_Exemptions(address_Securities_Determination) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Determination = this._process.getProcessByAddress(address_Securities_Determination)
    if (!check_Securities_Determination || check_Securities_Determination.type !== 'SECURITIES_DETERMINATION')
      throw 'SECURITIES_DETERMINATION IS NOT EXIST'
    let Securities_Exemptions = await this._process.createProcess('SECURITIES_EXMPTIONS')
    return Securities_Exemptions
  }
  get_Securities_Exemptions() {
    return this._process.getProcessByType('SECURITIES_EXMPTIONS')
  }
  //----------Successful_Investment---------------------------
  async Successful_Investment(address_Securities_Exemptions) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Exemptions = this._process.getProcessByAddress(address_Securities_Exemptions)
    if (!check_Securities_Exemptions || check_Securities_Exemptions.type !== 'SECURITIES_EXMPTIONS')
      throw 'SECURITIES_EXMPTIONS IS NOT EXIST'
    let Successful_Investment = await this._process.createProcess('SUCCESSFUL_INVESTMENT')
    return Successful_Investment
  }
  get_Successful_Investment() {
    return this._process.getProcessByType('SUCCESSFUL_INVESTMENT')
  }
  //----------Successful_Investment---------------------------
  async Fail_Investment(address_Securities_Exemptions) {
    this._user.checkUser(this.sender, 'USER')
    let check_Securities_Exemptions = this._process.getProcessByAddress(address_Securities_Exemptions)
    if (!check_Securities_Exemptions || check_Securities_Exemptions.type !== 'SECURITIES_EXMPTIONS')
      throw 'SECURITIES_EXMPTIONS IS NOT EXIST'
    let Fail_Investment = await this._process.createProcess('FAIL_INVESTMENT')
    this.setToAddress(Fail_Investment.address)
    return 'END'
  }
  get_Fail_Investment() {
    return this._process.getProcessByType('FAIL_INVESTMENT')
  }
  //----------Reinvest---------------------------
  check_Reinvest(address) {
    let check_Reinvest = this.get_ReinvestByAddress(address)
    if (!check_Reinvest || check_Reinvest !== 'REINVEST') throw `REINVEST IS NOT EXIST`
    return true
  }
  get_ReinvestByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Reinvest(address_Successful_Investment) {
    this._user.checkUser(this.sender, 'USER')
    let check_Successful_Investment = this._process.getProcessByAddress(address_Successful_Investment)
    if (!check_Successful_Investment || check_Successful_Investment.type !== 'SUCCESSFUL_INVESTMENT')
      throw 'SUCCESSFUL_INVESTMENT IS NOT EXIST'
    let Reinvest = await this._process.createProcess('REINVEST')
    return Reinvest
  }
  get_Reinvest() {
    return this._process.getProcessByType('REINVEST')
  }
}
export default TokenMain;
