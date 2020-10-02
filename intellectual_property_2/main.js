import Contract from 'Contract'
import Process from './process'
import User from './user'
class TokenMain extends Contract {
  static viewFuncs = [
    'getAuthor',
    'getEditor',
    'getSection_Editor',
    'getReviewer',
    'getUsers',
    'get_Self_Archiving',
    'get_Topic_Selection',
    'get_LICT',
    'get_IJLICT',
    'get_Peer_Reviewing_Management',
    'get_Submission_Review',
    'get_Submission_Editing_AT',
    'get_Submission_Editing',
    'get_Copyediting_Proofreading',
    'get_Issue_Management'
  ]
  static authenticationFuncs = [
    'Self_Archiving',
    'Topic_Selection',
    'LICT',
    'IJLICT',
    'Peer_Reviewing_Management',
    'Submission_Review',
    'Submission_Editing_AT',
    'Submission_Editing',
    'Copyediting_Proofreading',
    'Issue_Management',
    'Pub'
  ]
  static publicFuncs = [
    'Author',
    'getAuthor',
    'Editor',
    'getEditor',
    'Section_Editor',
    'getSection_Editor',
    'Reviewer',
    'getReviewer',
    'Users',
    'getUsers',
    'Self_Archiving',
    'get_Self_Archiving',
    'Topic_Selection',
    'get_Topic_Selection',
    'LICT',
    'get_LICT',
    'IJLICT',
    'get_IJLICT',
    'Peer_Reviewing_Management',
    'get_Peer_Reviewing_Management',
    'Submission_Review',
    'get_Submission_Review',
    'Submission_Editing_AT',
    'get_Submission_Editing_AT',
    'Submission_Editing',
    'get_Submission_Editing',
    'Copyediting_Proofreading',
    'get_Copyediting_Proofreading',
    'Issue_Management',
    'get_Issue_Management',
    'Pub'

  ]
  static schemas = {
    name: {
      type: String,
      default: 'PRIVACY INTELLECTUAL PROPERTY'
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
  async Author() {
    let Author = await this._user.createUser('AUTHOR')
    return Author
  }
  getAuthor() {
    let Author = this._user.getUserByType('AUTHOR')
    return Author
  }
  async Editor() {
    let Author = await this._user.createUser('EDITOR')
    return Author
  }
  getEditor() {
    let Author = this._user.getUserByType('EDITOR')
    return Author
  }
  async Section_Editor() {
    let Section_Editor = await this._user.createUser('SECTION')
    return Section_Editor
  }
  getSection_Editor() {
    let Section_Editor = this._user.getUserByType('SECTION')
    return Section_Editor
  }
  //---------------------Self_Archiving------------------------------
  async Self_Archiving() {
    this._user.checkUser(this.sender, 'AUTHOR')
    let Self_Archiving = await this._process.createProcess('SELF_ARCHIVING')
    return Self_Archiving
  }
  get_Self_Archiving() {
    return this._process.getProcessByType('SELF_ARCHIVING')
  }
  // --------------------Topic_Selection--------------------------- 
  async Topic_Selection(address_Self_Archiving) {
    this._user.checkUser(this.sender, 'EDITOR')
    let check_Self_Archiving = this._process.getProcessByAddress(address_Self_Archiving)
    if (!check_Self_Archiving || check_Self_Archiving.type !== 'SELF_ARCHIVING')
      throw 'SELF_ARCHIVING IS NOT EXIST'
    let Topic_Selection = await this._process.createProcess('TOPIC_SELECTION')
    return Topic_Selection
  }
  get_Topic_Selection() {
    return this._process.getProcessByType('TOPIC_SELECTION')
  }
  // --------------------LICT--------------------------
  async LICT(address_Topic_Selection) {
    this._user.checkUser(this.sender, 'EDITOR')
    let check_Topic_Selection = this._process.getProcessByAddress(address_Topic_Selection)
    if (!check_Topic_Selection || check_Topic_Selection.type !== 'TOPIC_SELECTION')
      throw 'TOPIC_SELECTION IS NOT EXIST'
    let LICT = await this._process.createProcess('LICT')
    return LICT
  }
  get_LICT() {
    return this._process.getProcessByType('LICT')
  }
  // --------------------IJLICT--------------------------
  async IJLICT(address_LICT) {
    this._user.checkUser(this.sender, 'EDITOR')
    let check_LICT = this._process.getProcessByAddress(address_LICT)
    if (!check_LICT || check_LICT.type !== 'LICT')
      throw 'LICT IS NOT EXIST'
    let IJLICT = await this._process.createProcess('IJLICT')
    return IJLICT
  }
  get_IJLICT() {
    return this._process.getProcessByType('IJLICT')
  }
  // --------------------Peer_Reviewing_Management--------------------------
  async Peer_Reviewing_Management(address_IJLICT) {
    this._user.checkUser(this.sender, 'SECTION_EDITOR')
    let check_IJLICT = this._process.getProcessByAddress(address_IJLICT)
    if (!check_IJLICT || check_IJLICT.type !== 'IJLICT')
      throw 'IJLICT IS NOT EXIST'
    let Peer_Review_Management = await this._process.createProcess('PEER_REVIEW_MANAGEMENT')
    return Peer_Review_Management
  }
  get_Peer_Review_Management() {
    return this._process.getProcessByType('PEER_REVIEW_MANAGEMENT')
  }
  // --------------------Peer_Reviewing--------------------------
  async Peer_Reviewing(address_Peer_Review_Management) {
    this._user.checkUser(this.sender, 'REVIEWER')
    let check_Peer_Review_Management = this._process.getProcessByAddress(address_Peer_Review_Management)
    if (!check_Peer_Review_Management || check_Peer_Review_Management.type !== 'PEER_REVIEW_MANAGEMENT')
      throw 'PEER_REVIEW_MANAGEMENT IS NOT EXIST'
    let Peer_Reviewing = await this._process.createProcess('PEER_REVIEWING')
    return Peer_Reviewing
  }
  get_Peer_Reviewing() {
    return this._process.getProcessByType('PEER_REVIEWING')
  }
  // --------------------Submission_Review--------------------------
  async Submission_Review(address_Peer_Review_Management) {
    this._user.checkUser(this.sender, 'AUTHOR')
    let check_Peer_Review_Management = this._process.getProcessByAddress(address_Peer_Review_Management)
    if (!check_Peer_Review_Management || check_Peer_Review_Management.type !== 'PEER_REVIEW_MANAGEMENT')
      throw 'PEER_REVIEW_MANAGEMENT IS NOT EXIST'
    let Submission_Review = await this._process.createProcess('SUBMISSION_REVIEW')
    return Submission_Review
  }
  get_Submission_Review() {
    return this._process.getProcessByType('SUBMISSION_REVIEW')
  }
  // --------------------Submission_Editing_AT--------------------------
  async Submission_Editing_AT(address_Submission_Review) {
    this._user.checkUser(this.sender, 'AUTHOR')
    let check_Submission_Review = this._process.getProcessByAddress(address_Submission_Review)
    if (!check_Submission_Review || check_Submission_Review.type !== 'SUBMISSION_REVIEW')
      throw 'SUBMISSION_REVIEW IS NOT EXIST'
    let at = await this._process.createProcess('SUBMISSION_EDITING_AT')
    return at
  }
  get_Submission_Editing_AT() {
    return this._process.getProcessByType('SUBMISSION_EDITING_AT')
  }
  // --------------------Submission_Editing--------------------------
  async Submission_Editing(address_Submission_Editing_AT) {
    this._user.checkUser(this.sender, 'SECTION_EDITOR')
    let check_Submission_Editing_AT = this._process.getProcessByAddress(address_Submission_Editing_AT)
    if (!check_Submission_Editing_AT || check_Submission_Editing_AT.type !== 'SUBMISSION_REVIEW')
      throw 'SUBMISSION_REVIEW IS NOT EXIST'
    let Submission_Editing = await this._process.createProcess('SUBMISSION_EDITING')
    return Submission_Editing
  }
  get_Submission_Editing() {
    return this._process.getProcessByType('SUBMISSION_EDITING')
  }
  // --------------------Copyediting_Proofreading--------------------------
  async Copyediting_Proofreading(address_Submission_Editing) {
    this._user.checkUser(this.sender, 'USER')
    let check_Submission_Editing = this._process.getProcessByAddress(address_Submission_Editing)
    if (!check_Submission_Editing || check_Submission_Editing.type !== 'SUBMISSION_EDITING')
      throw 'SUBMISSION_EDITING IS NOT EXIST'
    let Copyediting_Proofreading = await this._process.createProcess('COPYEDITING_PROOFREADING')
    return Copyediting_Proofreading
  }
  get_Copyediting_Proofreading() {
    return this._process.getProcessByType('COPYEDITING_PROOFREADING')
  }
  // --------------------Issue_Management--------------------------
  async Issue_Management(address_Copyediting_Proofreading) {
    this._user.checkUser(this.sender, 'SECTION_EDITOR')
    let check_Copyediting_Proofreading = this._process.getProcessByAddress(address_Copyediting_Proofreading)
    if (!check_Copyediting_Proofreading || check_Copyediting_Proofreading.type !== 'COPYEDITING_PROOFREADING')
      throw 'COPYEDITING_PROOFREADING IS NOT EXIST'
    let Issue_Management = await this._process.createProcess('ISSUE_MANAGEMENT')
    return Issue_Management
  }
  get_Issue_Management() {
    return this._process.getProcessByType('ISSUE_MANAGEMENT')
  }
  // --------------------Pub--------------------------
  async Pub(address_Issue_Management) {
    this._user.checkUser(this.sender, 'USER')
    let check_Trade = this._process.getProcessByAddress(address_Issue_Management)
    if (!check_Trade || check_Trade.type !== 'TRADE')
      throw 'TRADE IS NOT EXIST'
    let Pub = await this._process.createProcess('IJLICT_PUBLICATION')
    this.setToAddress(Pub.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
