import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Propose',
    'get_Pre_vote_timed_out',
    'get_Pre_vote_invalid',
    'get_Pre_vote_valid',
    'get_Check_Wait_for_pre_votes',
    'get_Wait_for_pre_votes',
    'get_Pre_commit_timed_out',
    'get_Pre_commit_invalid',
    'get_Pre_commit_valid',
    'get_Check_Wait_for_Pre_commits',
    'get_Wait_for_Pre_commits',
    'get_Commit_timed_out',
    'get_Commit_invalid',
    'get_Commit_valid'
  ]
  static authenticationFuncs = [
    'Propose',
    'Pre_vote_timed_out',
    'Pre_vote_invalid',
    'Pre_vote_valid',
    'Check_Wait_for_pre_votes',
    'Wait_for_pre_votes',
    'Pre_commit_timed_out',
    'Pre_commit_invalid',
    'Pre_commit_valid',
    'Check_Wait_for_Pre_commits',
    'Wait_for_Pre_commits',
    'Commit_timed_out',
    'Commit_invalid',
    'Commit_valid'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Propose',
    'get_Propose',
    'Pre_vote_timed_out',
    'get_Pre_vote_timed_out',
    'Pre_vote_invalid', 
    'get_Pre_vote_invalid',
    'Pre_vote_valid',
    'get_Pre_vote_valid',
    'Check_Wait_for_pre_votes',
    'get_Check_Wait_for_pre_votes',
    'Wait_for_pre_votes',
    'get_Wait_for_pre_votes',
    'Pre_commit_timed_out',
    'get_Pre_commit_timed_out',
    'Pre_commit_invalid',
    'get_Pre_commit_invalid',
    'Pre_commit_valid',
    'get_Pre_commit_valid',
    'Check_Wait_for_Pre_commits',
    'get_Check_Wait_for_Pre_commits',
    'Wait_for_Pre_commits',
    'get_Wait_for_Pre_commits',
    'Commit_timed_out',
    'get_Commit_timed_out',
    'Commit_invalid',
    'get_Commit_invalid',
    'Commit_valid',
    'get_Commit_valid',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ANTI-CONTERFEIT-04'
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
  // --------------------Propose---------------------------
  async Propose() {
    await this._user.checkUser(this.sender, 'USER')
    let Propose = await this._process.createProcess('PROPOSE')
    return Propose
  }
  get_Propose() {
    return this._process.getProcessByType('PROPOSE')
  }
  // --------------------Pre_vote_timed_out--------------------------- 
  async Pre_vote_timed_out(address_Propose) {
    this._user.checkUser(this.sender, 'USER')
    let check_Propose = this._process.getProcessByAddress(address_Propose)
    if (!check_Propose || check_Propose.type !== 'PROPOSE')
      throw 'PROPOSE IS NOT EXIST'
    let Pre_vote_timed_out = await this._process.createProcess('PRE_VOTE_TIMED_OUT')
    return Pre_vote_timed_out
  }
  get_Pre_vote_timed_out() {
    return this._process.getProcessByType('PRE_VOTE_TIMED_OUT')
  }
  // --------------------Pre_vote_invalid--------------------------- 
  async Pre_vote_invalid(address_Propose) {
    this._user.checkUser(this.sender, 'USER')
    let check_Propose = this._process.getProcessByAddress(address_Propose)
    if (!check_Propose || check_Propose.type !== 'PROPOSE')
      throw 'PROPOSE IS NOT EXIST'
    let Pre_vote_invalid = await this._process.createProcess('PRE_VOTE_INVALID')
    return Pre_vote_invalid
  }
  get_Pre_vote_invalid() {
    return this._process.getProcessByType('PRE_VOTE_INVALID')
  }
  // --------------------Pre_vote_valid--------------------------- 
  async Pre_vote_valid(address_Propose) {
    this._user.checkUser(this.sender, 'USER')
    let check_Propose = this._process.getProcessByAddress(address_Propose)
    if (!check_Propose || check_Propose.type !== 'PROPOSE')
      throw 'PROPOSE IS NOT EXIST'
    let Pre_vote_valid = await this._process.createProcess('PRE_VOTE_VALID')
    return Pre_vote_valid
  }
  get_Pre_vote_valid() {
    return this._process.getProcessByType('PRE_VOTE_VALID')
  }
  // --------------------Wait_for_pre_votes--------------------------- 
  checkProcess1(address) {
    this.check_Pre_vote_timed_out = this.get_Pre_vote_timed_outByAddress(address);
    this.check_Pre_vote_invalid = this.get_Pre_vote_invalidByAddress(address);
    this.check_Pre_vote_valid = this.get_Pre_vote_validByAddress(address);
    if (this.check_Pre_vote_timed_out.type == 'PRE_VOTE_TIMED_OUT') {
      return true;
    }
    else if (this.check_Pre_vote_invalid.type == 'PRE_VOTE_INVALID') {
      return true;
    }
    else if (this.check_Pre_vote_valid.type == 'PRE_VOTE_VALID') {
      return true;
    }
    else {
      throw `PRE_VOTE_TIMED_OUT_OR_PRE_VOTE_INVALID_ORVALID IS NOT EXIST`;
    }
  }
  async Check_Wait_for_pre_votes() {
    await this.checkProcess1(this.sender, 'PRE_VOTE_TIMED_OUT_OR_PRE_VOTE_INVALID_ORVALID')
    let check = await this._process.createProcess('CHECK_WAIT_FOR_PRE_VOTES')
    return check
  }
  get_Check_Wait_for_pre_votes() {
    return this._process.getProcessByType('DEPOSIT_PROCESS')
  }
  async Wait_for_pre_votes(address_Check_Wait_for_pre_votes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Wait_for_pre_votes = this._process.getProcessByAddress(address_Check_Wait_for_pre_votes)
    if (!check_Check_Wait_for_pre_votes || check_Check_Wait_for_pre_votes.type !== 'CHECK_WAIT_FOR_PRE_VOTES')
      throw 'CHECK_WAIT_FOR_PRE_VOTES IS NOT EXIST'
    let Wait_for_pre_votes = await this._process.createProcess('WAIT_FOR_PRE_VOTES')
    return Wait_for_pre_votes
  }
  get_Wait_for_pre_votes() {
    return this._process.getProcessByType('WAIT_FOR_PRE_VOTES')
  }
  // --------------------Pre_commit_timed_out--------------------------- 
  async Pre_commit_timed_out(address_Wait_for_pre_votes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_pre_votes = this._process.getProcessByAddress(address_Wait_for_pre_votes)
    if (!check_Wait_for_pre_votes || check_Wait_for_pre_votes.type !== 'WAIT_FOR_PRE_VOTES')
      throw 'WAIT_FOR_PRE_VOTES IS NOT EXIST'
    let Pre_commit_timed_out = await this._process.createProcess('PRE_COMMIT_TIMED_OUT')
    return Pre_commit_timed_out
  }
  get_Pre_commit_timed_out() {
    return this._process.getProcessByType('PRE_COMMIT_TIMED_OUT')
  }
  // --------------------Pre_commit_invalid--------------------------- 
  async Pre_commit_invalid(address_Wait_for_pre_votes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_pre_votes = this._process.getProcessByAddress(address_Wait_for_pre_votes)
    if (!check_Wait_for_pre_votes || check_Wait_for_pre_votes.type !== 'WAIT_FOR_PRE_VOTES')
      throw 'WAIT_FOR_PRE_VOTES IS NOT EXIST'
    let Pre_commit_invalid = await this._process.createProcess('PRE_COMMIT_INVALID')
    return Pre_commit_invalid
  }
  get_Pre_commit_invalid() {
    return this._process.getProcessByType('PRE_COMMIT_INVALID')
  }
  // --------------------Pre_commit_invalid--------------------------- 
  async Pre_commit_valid(address_Wait_for_pre_votes) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_pre_votes = this._process.getProcessByAddress(address_Wait_for_pre_votes)
    if (!check_Wait_for_pre_votes || check_Wait_for_pre_votes.type !== 'WAIT_FOR_PRE_VOTES')
      throw 'WAIT_FOR_PRE_VOTES IS NOT EXIST'
    let Pre_commit_valid = await this._process.createProcess('PRE_COMMIT_VALID')
    return Pre_commit_valid
  }
  get_Pre_commit_valid() {
    return this._process.getProcessByType('PRE_COMMIT_VALID')
  }
  // --------------------Wait_for_pre_votes--------------------------- 
  checkProcess2(address) {
    this.check_Pre_commit_timed_out = this.get_Pre_commit_timed_outByAddress(address);
    this.check_Pre_commit_invalid = this.get_Pre_commit_invalidByAddress(address);
    this.check_Pre_commit_valid = this.get_Pre_commit_validByAddress(address);
    if (this.check_Pre_commit_timed_out.type == 'PRE_COMMIT_TIMED_OUT') {
      return true;
    }
    else if (this.check_Pre_commit_invalid.type == 'PRE_COMMIT_INVALID') {
      return true;
    }
    else if (this.check_Pre_commit_valid.type == 'PRE_COMMIT_VALID') {
      return true;
    }
    else {
      throw `PRE_COMMIT_TIMED_OUT_OR_PRE_COMMIT_INVALID_OR_PRE_COMMIT_VALID IS NOT EXIST`;
    }
  }
  async Check_Wait_for_Pre_commits() {
    await this.checkProcess2(this.sender, 'PRE_COMMIT_TIMED_OUT_OR_PRE_COMMIT_INVALID_OR_PRE_COMMIT_VALID')
    let check = await this._process.createProcess('CHECK_WAIT_FOR_PRE_COMMITS')
    return check
  }
  get_Check_Wait_for_Pre_commits() {
    return this._process.getProcessByType('DEPOSIT_PROCESS')
  }
  async Wait_for_Pre_commits(address_Check_Wait_for_Pre_commits) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Wait_for_Pre_commits = this._process.getProcessByAddress(address_Check_Wait_for_Pre_commits)
    if (!check_Check_Wait_for_Pre_commits || check_Check_Wait_for_Pre_commits.type !== 'CHECK_WAIT_FOR_PRE_COMMITS')
      throw 'CHECK_WAIT_FOR_PRE_COMMITS IS NOT EXIST'
    let Wait_for_Pre_commits = await this._process.createProcess('WAIT_FOR_PRE_COMMITS')
    return Wait_for_Pre_commits
  }
  get_Wait_for_Pre_commits() {
    return this._process.getProcessByType('WAIT_FOR_PRE_COMMITS')
  }
  // --------------------Commit_timed_out--------------------------- 
  async Commit_timed_out(address_Wait_for_Pre_commits) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_Pre_commits = this._process.getProcessByAddress(address_Wait_for_Pre_commits)
    if (!check_Wait_for_Pre_commits || check_Wait_for_Pre_commits.type !== 'WAIT_FOR_PRE_COMMITS')
      throw 'WAIT_FOR_PRE_COMMITS IS NOT EXIST'
    let Commit_timed_out = await this._process.createProcess('COMMIT_TIMED_OUT')
    return Commit_timed_out
  }
  get_Commit_timed_out() {
    return this._process.getProcessByType('COMMIT_TIMED_OUT')
  }
  // --------------------Commit_invalid--------------------------- 
  async Commit_invalid(address_Wait_for_Pre_commits) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_Pre_commits = this._process.getProcessByAddress(address_Wait_for_Pre_commits)
    if (!check_Wait_for_Pre_commits || check_Wait_for_Pre_commits.type !== 'WAIT_FOR_PRE_COMMITS')
      throw 'WAIT_FOR_PRE_COMMITS IS NOT EXIST'
    let Commit_invalid = await this._process.createProcess('COMMIT_INVALID')
    return Commit_invalid
  }
  get_Commit_invalid() {
    return this._process.getProcessByType('COMMIT_INVALID')
  }
  // --------------------Commit_valid--------------------------- 
  async Commit_valid(address_Wait_for_Pre_commits) {
    this._user.checkUser(this.sender, 'USER')
    let check_Wait_for_Pre_commits = this._process.getProcessByAddress(address_Wait_for_Pre_commits)
    if (!check_Wait_for_Pre_commits || check_Wait_for_Pre_commits.type !== 'WAIT_FOR_PRE_COMMITS')
      throw 'WAIT_FOR_PRE_COMMITS IS NOT EXIST'
    let Commit_valid = await this._process.createProcess('COMMIT_VALID')
    return Commit_valid
  }
  get_Commit_valid() {
    return this._process.getProcessByType('COMMIT_VALID')
  }
}
export default TokenMain;
