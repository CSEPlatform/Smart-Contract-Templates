import Contract from 'Contract'
import Act from './act'
import Process from './process'
class TokenMain extends Contract {
  static authenticationFuncs = [
    'All_or_Nothing',
    'All_or_More',
    'Holding',
    'Club_Menbership',
  ]
  static publicFuncs = [
    'Payou_Modes',
    'All_or_Nothing',
    'All_or_More',
    'Holding',
    'Club_Menbership',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'MODEL_CROWFUNDINGS-MODEL-02'
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
  async Payou_Modes() {
    let Payou_Modes = await this._act.createAct('PAYOUT_MODES')
    return Payou_Modes
  }
  get_Payou_Modes() {
    let Payou_Modes = this._act.getActByType('PAYOUT_MODES')
    return Payou_Modes
  }
  //----------All_or_Nothing---------------------------
  async All_or_Nothing() {
    this._act.checkAct(this.sender, 'PAYOUT_MODES')
    let All_or_Nothing = await this._process.createProcess('ALL_OR_NOTHING ')
    this.setToAddress(All_or_Nothing.address)
    return { All_or_Nothing }
  }
  //----------All_or_More---------------------------
  async All_or_More() {
    this._act.checkAct(this.sender, 'PAYOUT_MODES')
    let All_or_More = await this._process.createProcess('ALL_OR_MORE ')
    this.setToAddress(All_or_More.address)
    return { All_or_More }
  }
  //----------Holding---------------------------
  async Holding() {
    this._act.checkAct(this.sender, 'PAYOUT_MODES')
    let Holding = await this._process.createProcess('HOLDING ')
    this.setToAddress(Holding.address)
    return { Holding }
  }
  //----------Club_Menbership---------------------------
  async Club_Menbership() {
    this._act.checkAct(this.sender, 'PAYOUT_MODES')
    let Club_Menbership = await this._process.createProcess('CLUB_MENBERSHIP ')
    this.setToAddress(Club_Menbership.address)
    return { Club_Menbership }
  }
}
export default TokenMain;
