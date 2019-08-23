import Contract from 'Contract'
import Act from './act'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Donation',
    'get_Passive_Investment',
    'get_Active_Investment',
  ]
  static authenticationFuncs = [
    'Intrinsic_Value',
    'Pre_purchase',
    'Patronage',
    'Equity',
    'PPO',
    'Profit_Sharing',
    'Patronage_Plus'
  ]
  static publicFuncs = [
    'Orther',
    'Donation',
    'get_Donation',
    'Passive_Investment',
    'get_Passive_Investment',
    'Active_Investment',
    'get_Active_Investment',
    'Intrinsic_Value',
    'Pre_purchase',
    'Patronage',
    'Equity',
    'PPO',
    'Profit_Sharing',
    'Patronage_Plus'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'CROWFUNDINGS-MODEL-01'
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
    this._act = new Act(data)
    this._process = new Process(data)
  }
  //---------------------act------------------------------
  async Orther() {
    let Orther = await this._act.createAct('ORTHER')
    this.setToAddress(Orther.address)
    return 'SUCCESS'
  }
  async Donation() {
    let Donation = await this._act.createAct('DONATION')
    return Donation
  }
  get_Donation() {
    let Donation = this._act.getActByType('DONATION')
    return Donation
  }
  async Passive_Investment() {
    let Passive_Investment = await this._act.createAct('PASSIVE_INVESTMENT')
    return Passive_Investment
  }
  get_Passive_Investment() {
    let Passive_Investment = this._act.getActByType('PASSIVE_INVESTMENT')
    return Passive_Investment
  }
  async Active_Investment() {
    let Active_Investment = await this._act.createAct('ACTIVE_INVESTMENT')
    return Active_Investment
  }
  get_Active_Investment() {
    let Active_Investment = this._act.getActByType('ACTIVE_INVESTMENT')
    return Active_Investment
  }
  //----------Intrinsic_Value---------------------------
  async Intrinsic_Value() {
    this._act.checkAct(this.sender, 'DONATION')
    let Intrinsic_Value = await this._process.createProcess('INTRINSIC_VALUE ')
    this.setToAddress(Intrinsic_Value.address)
    return 'SUCCESS'
  }
  //----------Equity---------------------------
  async Equity() {
    this._act.checkAct(this.sender, 'ACTIVE_INVESTMENT')
    let Equity = await this._process.createProcess('EQUITY ')
    this.setToAddress(Equity.address)
    return 'SUCCESS'
  }
  //----------Pre_purchase---------------------------
  async Pre_purchase() {
    this._act.checkAct(this.sender, 'PASSIVE_INVESTMENT')
    let Pre_purchase = await this._process.createProcess('PRE_PURCHASE')
    this.setToAddress(Pre_purchase.address)
    return 'SUCCESS'
  }
  //----------Patronage---------------------------
  async Patronage() {
    this._act.checkAct(this.sender, 'PASSIVE_INVESTMENT')
    let Patronage = await this._process.createProcess('PATRONAGE')
    this.setToAddress(Patronage.address)
    return 'SUCCESS'
  }
  //----------Equity---------------------------
  async Equity() {
    this._act.checkAct(this.sender, 'ACTIVE_INVESTMENT')
    let Equity = await this._process.createProcess('EQUITY ')
    this.setToAddress(Equity.address)
    return 'SUCCESS'
  }
  //----------PPO---------------------------
  async PPO() {
    this._act.checkAct(this.sender, 'ACTIVE_INVESTMENT')
    let PPO = await this._process.createProcess('PPO ')
    this.setToAddress(PPO.address)
    return 'SUCCESS'
  }
  //----------Profit_Sharing---------------------------
  async Profit_Sharing() {
    this._act.checkAct(this.sender, 'ACTIVE_INVESTMENT')
    let Profit_Sharing = await this._process.createProcess('PROFIT_SHARING ')
    this.setToAddress(Profit_Sharing.address)
    return 'SUCCESS'
  }
  //----------Patronage_Plus---------------------------
  async Patronage_Plus() {
    this._act.checkAct(this.sender, 'ACTIVE_INVESTMENT')
    let Patronage_Plus = await this._process.createProcess('PATRONAGE_PLUS')
    this.setToAddress(Patronage_Plus.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
