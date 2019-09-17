import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Need_a_Database',
    'get_Do_need_a_Database',
    'get_It_do_not_require_shared_write_access',
    'get_It_require_shared_write_access',
    'get_Write_known_and_trusted',
    'get_Do_not_write_known_and_trusted',
    'get_I_want_or_I_need_to_use_a_trusted_3rd_party',
    'get_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party',
    'get_Are_Writer_s_interests_unified',
    'get_Writer_s_interests_unified',
    'get_Do_not_writer_s_interests_unified',
    'get_check_Do_not_need_blockchain',
    'get_I_need_to_contraol_functionality',
    'get_I_do_not_need_to_contraol_functionality',
    'get_I_want_transations_tobe_private',
    'get_I_want_transations_tobe_public',
    'get_check_Consensus_determined_from_in_intra_firm',
    'get_Consensus_determined_from_in_intra_firm',
    'get_check_Consensus_determined_from_in_inter_firm',
    'get_Consensus_determined_from_in_inter_firm',
  ]
  static authenticationFuncs = [
    'Need_a_Database',
    'Do_need_a_Database',
    'It_do_not_require_shared_write_access',
    'It_require_shared_write_access',
    'Write_known_and_trusted',
    'Do_not_write_known_and_trusted',
    'I_want_or_I_need_to_use_a_trusted_3rd_party',
    'I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party',
    'Are_Writer_s_interests_unified',
    'Writer_s_interests_unified',
    'Do_not_writer_s_interests_unified',
    'check_Do_not_need_blockchain',
    'Do_not_use_blockchain',
    'I_need_to_contraol_functionality',
    'I_do_not_need_to_contraol_functionality',
    'I_want_transations_tobe_private',
    'I_want_transations_tobe_public',
    'check_Consensus_determined_from_in_intra_firm',
    'Consensus_determined_from_in_intra_firm',
    'Use_a_private_blockchain',
    'check_Consensus_determined_from_in_inter_firm',
    'Consensus_determined_from_in_inter_firm',
    'Use_a_hybrid_blockchain'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Need_a_Database',
    'get_Need_a_Database',
    'Do_need_a_Database',
    'get_Do_need_a_Database',
    'It_do_not_require_shared_write_access',
    'get_It_do_not_require_shared_write_access',
    'It_require_shared_write_access',
    'get_It_require_shared_write_access',
    'Write_known_and_trusted',
    'get_Write_known_and_trusted',
    'Do_not_write_known_and_trusted',
    'get_Do_not_write_known_and_trusted',
    'I_want_or_I_need_to_use_a_trusted_3rd_party',
    'get_I_want_or_I_need_to_use_a_trusted_3rd_party',
    'I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party',
    'get_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party',
    'Are_Writer_s_interests_unified',
    'get_Are_Writer_s_interests_unified',
    'Writer_s_interests_unified',
    'get_Writer_s_interests_unified',
    'Do_not_writer_s_interests_unified',
    'get_Do_not_writer_s_interests_unified',
    'check_Do_not_need_blockchain',
    'get_check_Do_not_need_blockchain',
    'Do_not_use_blockchain',
    'I_need_to_control_functionality',
    'get_I_need_to_control_functionality',
    'I_do_not_need_to_control_functionality',
    'get_I_do_not_need_to_control_functionality',
    'I_want_transations_tobe_private',
    'get_I_want_transations_tobe_private',
    'I_want_transations_tobe_public',
    'get_I_want_transations_tobe_public',
    'check_Consensus_determined_from_in_intra_firm',
    'get_check_Consensus_determined_from_in_intra_firm',
    'Consensus_determined_from_in_intra_firm',
    'get_Consensus_determined_from_in_intra_firm',
    'Use_a_private_blockchain',
    'check_Consensus_determined_from_in_inter_firm',
    'get_check_Consensus_determined_from_in_inter_firm',
    'Consensus_determined_from_in_inter_firm',
    'get_Consensus_determined_from_in_inter_firm',
    'Use_a_hybrid_blockchain'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'DATABASE-INFOMATION'
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
    this._act = new Act(data)
  }
  //---------------------User------------------------------
  async User() {
    let user = await this._user.createUser('USER')
    return user
  }
  get_User() {
    let Iot_Device = this._user.getUserByType('IOT_DEVICE')
    return Iot_Device
  }
  //---------------------------------------Do_not_need_a_Database------------------------------
  check_Do_not_need_a_Database(address) {
    let check_Do_not_need_a_Database = this.get_Do_not_need_a_DatabaseByAddress(address)
    if (!check_Do_not_need_a_Database || check_Do_not_need_a_Database.type !== 'DO_NOT_NEED_A_DATABASE')
      throw `DO_NOT_NEED_A_DATABASE IS NOT EXIST`
    return true
  }
  get_Do_not_need_a_DatabaseByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Do_not_need_a_Database() {
    this._user.checkUser(this.sender, 'USER')
    let Do_not_need_a_Database = await this._act.createAct('DO_NOT_NEED_A_DATABASE')
    return Do_not_need_a_Database
  }
  get_Do_not_need_a_Database() {
    return this._act.getActByType('DO_NOT_NEED_A_DATABASE')
  }
  //----Need_a_Database------------------------------
  async  Need_a_Database() {
    this._user.checkUser(this.sender, 'USER')
    let Need_a_Database = await this._act.createAct('NEED_A_DATABASE')
    return Need_a_Database
  }
  get_Need_a_Database() {
    return this._act.getActByType('NEED_A_DATABASE')
  }
  //--------------------It_do_not_require_shared_write_access------------------------------
  check_It_do_not_require_shared_write_access(address) {
    let check_It_do_not_require_shared_write_access = this.get_It_do_not_require_shared_write_accessByAddress(address)
    if (!check_It_do_not_require_shared_write_access || check_It_do_not_require_shared_write_access.type !== 'IT_DO_NOT_REQUIRE_SHARED_WRITE_ACCESS')
      throw `IT_DO_NOT_REQUIRE_SHARED_WRITE_ACCESS IS NOT EXIST`
    return true
  }
  get_It_do_not_require_shared_write_accessByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  It_do_not_require_shared_write_access(address_Need_a_Database) {
    this._user.checkUser(this.sender, 'USER')
    let check_Need_a_Database = this._act.getActByAddress(address_Need_a_Database)
    if (!check_Need_a_Database || check_Need_a_Database.type !== 'NEED_A_DATABASE')
      throw 'NEED_A_DATABASE IS NOT EXIST'
    let It_do_not_require_shared_write_access = await this._act.createAct('IT_DO_NOT_REQUIRE_SHARED_WRITE_ACCESS')
    return It_do_not_require_shared_write_access
  }
  get_It_do_not_require_shared_write_access() {
    return this._act.getActByType('IT_DO_NOT_REQUIRE_SHARED_WRITE_ACCESS')
  }
  //--------------------It_require_shared_write_access------------------------------
  async  It_require_shared_write_access(address_Need_a_Database) {
    this._user.checkUser(this.sender, 'USER')
    let check_Need_a_Database = this._act.getActByAddress(address_Need_a_Database)
    if (!check_Need_a_Database || check_Need_a_Database.type !== 'NEED_A_DATABASE')
      throw 'NEED_A_DATABASE IS NOT EXIST'
    let It_require_shared_write_access = await this._act.createAct('IT_REQUIRE_SHARED_WRITE_ACCESS  ')
    return It_require_shared_write_access
  }
  get_It_require_shared_write_access() {
    return this._act.getActByType('IT_REQUIRE_SHARED_WRITE_ACCESS')
  }
  //--------------------Write_known_and_trusted------------------------------
  check_Write_known_and_trusted(address) {
    let check_Write_known_and_trusted = this.get_Write_known_and_trustedByAddress(address)
    if (!check_Write_known_and_trusted || check_Write_known_and_trusted.type !== 'WRITE_KNOWN_AND_TRUSTED')
      throw `WRITE_KNOWN_AND_TRUSTED IS NOT EXIST`
    return true
  }
  get_Write_known_and_trustedByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Write_known_and_trusted(address_It_require_shared_write_access) {
    this._user.checkUser(this.sender, 'USER')
    let check_It_require_shared_write_access = this._act.getActByAddress(address_It_require_shared_write_access)
    if (!check_It_require_shared_write_access || check_It_require_shared_write_access.type !== 'IT_REQUIRE_SHARED_WRITE_ACCESS')
      throw 'IT_REQUIRE_SHARED_WRITE IS NOT EXIST'
    let Write_known_and_trusted = await this._act.createAct('IT_REQUIRE_SHARED_WRITE_ACCESS')
    return Write_known_and_trusted
  }
  get_Write_known_and_trusted() {
    return this._act.getActByType('WRITE_KNOWN_AND_TRUSTED')
  }
  //--------------------Do_not_write_known_and_trusted------------------------------
  check_Do_not_write_known_and_trusted(address) {
    let check_Do_not_write_known_and_trusted = this.get_Do_not_write_known_and_trustedByAddress(address)
    if (!check_Do_not_write_known_and_trusted || check_Do_not_write_known_and_trusted.type !== 'DO_NOT_WRITE_KNOWN_AND_TRUSTED')
      throw `DO_NOT_WRITE_KNOWN_AND_TRUSTED IS NOT EXIST`
    return true
  }
  get_Do_not_write_known_and_trustedByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Do_not_write_known_and_trusted(address_It_require_shared_write_access) {
    this._user.checkUser(this.sender, 'USER')
    let check_It_require_shared_write_access = this._act.getActByAddress(address_It_require_shared_write_access)
    if (!check_It_require_shared_write_access || check_It_require_shared_write_access.type !== 'IT_REQUIRE_SHARED_WRITE_ACCESS')
      throw 'IT_REQUIRE_SHARED_WRITE_ACCESS IS NOT EXIST'
    let Do_not_write_known_and_trusted = await this._act.createAct('DO_NOT_WRITE_KNOWN_AND_TRUSTED')
    return Do_not_write_known_and_trusted
  }
  get_Do_not_write_known_and_trusted() {
    return this._act.getActByType('DO_NOT_WRITE_KNOWN_AND_TRUSTED')
  }
  //--------------------I_want_or_I_need_to_use_a_trusted_3rd_party------------------------------
  check_I_want_or_I_need_to_use_a_trusted_3rd_party(address) {
    let check_I_want_or_I_need_to_use_a_trusted_3rd_party = this.get_I_want_or_I_need_to_use_a_trusted_3rd_partyByAddress(address)
    if (!check_I_want_or_I_need_to_use_a_trusted_3rd_party || check_I_want_or_I_need_to_use_a_trusted_3rd_party.type !== 'I_WANT_OR_I_NEED_TO_USE_A_TRUST_3RD_PARTY')
      throw `I_WANT_OR_I_NEED_TO_USE_A_TRUST_3RD_PARTY IS NOT EXIST`
    return true
  }
  get_I_want_or_I_need_to_use_a_trusted_3rd_partyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  I_want_or_I_need_to_use_a_trusted_3rd_party(address_It_require_shared_write_access) {
    this._user.checkUser(this.sender, 'USER')
    let check_It_require_shared_write_access = this._act.getActByAddress(address_It_require_shared_write_access)
    if (!check_It_require_shared_write_access || check_It_require_shared_write_access.type !== 'IT_REQUIRE_SHARED_WRITE_ACCESS')
      throw 'IT_REQUIRE_SHARED_WRITE_ACCESS IS NOT EXIST'
    let I_want_or_i_need_to_use_a_trusted_3rd_party = await this._act.createAct('I_WANT_OR_I_NEED_TO_USE_A_TRUST_3RD_PARTY')
    return I_want_or_i_need_to_use_a_trusted_3rd_party
  }
  get_I_want_or_I_need_to_use_a_trusted_3rd_party() {
    return this._act.getActByType('DO_NOT_WRITE_KNOWN_AND_TRUSTED')
  }
  //--------------------I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party------------------------------
  async  I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party(address_It_require_shared_write_access) {
    this._user.checkUser(this.sender, 'USER')
    let check_It_require_shared_write_access = this._act.getActByAddress(address_It_require_shared_write_access)
    if (!check_It_require_shared_write_access || check_It_require_shared_write_access.type !== 'IT_REQUIRE_SHARED_WRITE_ACCESS')
      throw 'IT_REQUIRE_SHARED_WRITE_ACCESS IS NOT EXIST'
    let I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party = await this._act.createAct('I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY')
    return I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party
  }
  get_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party() {
    return this._act.getActByType('I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY')
  }
  // --------------------Writer_s_interests_unified---------------------------
  checkAct(address) {
    this.check_Write_known_and_trusted = this.get_Write_known_and_trustedByAddress(address);
    this.check_Do_not_write_known_and_trusted = this.get_Do_not_write_known_and_trustedDByAddress(address);
    if (this.check_Write_known_and_trusted.type == 'WRITE_KNOWN_AND_TRUSTED') {
      return true;
    }
    else if (this.check_Do_not_write_known_and_trusted.type == 'DO_NOT_WRITE_KNOWN_AND_TRUSTED') {
      return true;
    }
    else {
      throw `ARE_WRITERS_KNOWN_AND_TRUSTED_FOR_CHECK NOT EXIST`;
    }
  }
  async  Are_Writer_s_interests_unified() {
    this.checkAct(this.sender, 'ARE_WRITERS_KNOWN_AND_TRUSTED_FOR_CHECK')
    let check_Act = await this._act.createAct('ARE_WRITERS_KNOWN_AND_TRUSTED')
    return check_Act
  }
  get_Are_Writer_s_interests_unified() {
    return this._act.getActByType('ARE_WRITERS_KNOWN_AND_TRUSTED')
  }
  check_Writer_s_interests_unified(address) {
    let check_Writer_s_interests_unified = this.get_Writer_s_interests_unifiedByAddress(address)
    if (!check_Writer_s_interests_unified || check_Writer_s_interests_unified.type !== 'WRITER_S_INTERESTS_UNIFIED')
      throw `WRITER_S_INTERESTS_UNIFIED IS NOT EXIST`
    return true
  }
  get_Writer_s_interests_unifiedByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Writer_s_interests_unified(address_Are_Writer_s_interests_unified) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Act = this._act.getActByAddress(address_Are_Writer_s_interests_unified)
    if (!check_check_Act || check_check_Act.type !== 'ARE_WRITERS_KNOWN_AND_TRUSTED')
      throw 'ARE_WRITERS_KNOWN_AND_TRUSTED IS NOT EXIST'
    let Writer_s_interests_unified = await this._act.createAct('WRITER_S_INTERESTS_UNIFIED')
    return Writer_s_interests_unified
  }
  get_Writer_s_interests_unified() {
    return this._act.getActByType('WRITER_S_INTERESTS_UNIFIED')
  }
  // --------------------Do_not_need_blockchain---------------------------
  checkAct2(address) {
    this.check_Do_not_need_a_Database = this.get_Do_not_need_a_Database(address);
    this.check_It_do_not_require_shared_write_access = this.get_It_do_not_require_shared_write_access(address);
    this.check_I_want_or_I_need_to_use_a_trusted_3rd_party = this.get_I_want_or_I_need_to_use_a_trusted_3rd_party(address);
    this.check_Writer_s_interests_unified = this.get_Writer_s_interests_unifiedByAddress(address);
    if (this.check_Do_not_need_a_Database == 'DO_NOT_NEED_A_DATABASE') {
      return true;
    }
    else if (this.check_It_do_not_require_shared_write_access.type == 'IT_DO_NOT_REQUIRE_SHARED_WRITE_ACCESS') {
      return true;
    }
    else if (this.check_I_want_or_I_need_to_use_a_trusted_3rd_party.type == 'I_WANT_OR_I_NEED_TO_USE_A_TRUST_3RD_PARTY') {
      return true;
    }
    else if (this.check_Writer_s_interests_unified.type == 'WRITER_S_INTERESTS_UNIFIED') {
      return true;
    }
    else {
      throw `CHECK_DO_NOT_USE_BLOCKCHAIN_FOR_CHECK NOT EXIST`;
    }
  }
  async  check_Do_not_need_blockchain() {
    this.checkAct2(this.sender, 'CHECK_DO_NOT_USE_BLOCKCHAIN_FOR_CHECK')
    let check_Act2 = await this._act.createAct('CHECK_DO_NOT_USE_BLOCKCHAIN')
    return check_Act2
  }
  get_check_Do_not_need_blockchain() {
    return this._act.getActByType('CHECK_DO_NOT_USE_BLOCKCHAIN')
  }
  async  Do_not_need_blockchain(address_check_Do_not_need_blockchain) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Act = this._act.getActByAddress(address_check_Do_not_need_blockchain)
    if (!check_check_Act || check_check_Act.type !== 'ARE_WRITERS_KNOWN_AND_TRUSTED')
      throw 'ARE_WRITERS_KNOWN_AND_TRUSTED IS NOT EXIST'
    let Do_not_need_blockchain = await this._act.createAct('DO_NOT_USE_BLOCKCHAIN')
    return Do_not_need_blockchain
  }
  get_Do_not_need_blockchain() {
    return this._act.getActByType('DO_NOT_USE_BLOCKCHAIN')
  }
  //--------------------I_need_to_control_functionality------------------------------
  check_I_need_to_control_functionality(address) {
    let check_I_need_to_control_functionality = this.get_I_need_to_control_functionalityByAddress(address)
    if (!check_I_need_to_control_functionality || check_I_need_to_control_functionality.type !== 'I_NEED_TO_CONTROL_FUNCTIONALITY')
      throw `I_NEED_TO_CONTROL_FUNCTIONALITY IS NOT EXIST`
    return true
  }
  get_I_need_to_control_functionalityByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  I_need_to_control_functionality(address_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party) {
    this._user.checkUser(this.sender, 'USER')
    let check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party = this._act.getActByAddress(address_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party)
    if (!check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party || check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party.type !== 'I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY')
      throw 'I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY IS NOT EXIST'
    let I_need_to_control_functionality = await this._act.createAct('I_NEED_TO_CONTROL_FUNCTIONALITY')
    return I_need_to_control_functionality
  }
  get_I_need_to_control_functionality() {
    return this._act.getActByType('I_NEED_TO_CONTROL_FUNCTIONALITY')
  }
  //--------------------I_do_not_need_to_control_functionality------------------------------
  async  I_do_not_need_to_control_functionality(address_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party) {
    this._user.checkUser(this.sender, 'USER')
    let check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party = this._act.getActByAddress(address_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party)
    if (!check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party || check_I_do_not_want_or_I_do_not_need_to_use_a_trusted_3rd_party.type !== 'I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY')
      throw 'I_DO_NOT_WANT_OR_I_DO_NOT_NEED_TO_USE_A_TRUST_3RD_PARTY IS NOT EXIST'
    let I_do_not_need_to_control_functionality = await this._act.createAct('I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY')
    return I_do_not_need_to_control_functionality
  }
  get_I_do_not_need_to_control_functionality() {
    return this._act.getActByType('I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY')
  }
  //--------------------I_want_transations_tobe_public------------------------------
  async  I_want_transations_tobe_public(address_I_do_not_need_to_control_functionality) {
    this._user.checkUser(this.sender, 'USER')
    let check_I_do_not_need_to_control_functionality = this._act.getActByAddress(address_I_do_not_need_to_control_functionality)
    if (!check_I_do_not_need_to_control_functionality || check_I_do_not_need_to_control_functionality.type !== 'I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY')
      throw 'I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY IS NOT EXIST'
    let I_want_transations_tobe_public = await this._act.createAct('I_WANT_TRANSACTIONS_TOBE_PUBLIC')
    return I_want_transations_tobe_public
  }
  get_I_want_transations_tobe_public() {
    return this._act.getActByType('I_WANT_TRANSACTIONS_TOBE_PUBLIC')
  }
  //--------------------I_want_transations_tobe_private------------------------------
  check_I_want_transations_tobe_private(address) {
    let check_I_want_transations_tobe_private = this.get_I_want_transations_tobe_privateByAddress(address)
    if (!check_I_want_transations_tobe_private || check_I_want_transations_tobe_private.type !== 'I_WANT_TRANSACTIONS_TOBE_PRIVATE')
      throw `I_WANT_TRANSACTIONS_TOBE_PRIVATE IS NOT EXIST`
    return true
  }
  get_I_want_transations_tobe_privateByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  I_want_transations_tobe_private(address_I_do_not_need_to_control_functionality) {
    this._user.checkUser(this.sender, 'USER')
    let check_I_do_not_need_to_control_functionality = this._act.getActByAddress(address_I_do_not_need_to_control_functionality)
    if (!check_I_do_not_need_to_control_functionality || check_I_do_not_need_to_control_functionality.type !== 'I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY')
      throw 'I_DO_NOT_NEED_TO_CONTROL_FUNCTIONALITY IS NOT EXIST'
    let I_want_transations_tobe_private = await this._act.createAct('I_WANT_TRANSACTIONS_TOBE_PRIVATE')
    return I_want_transations_tobe_private
  }
  get_I_want_transations_tobe_private() {
    return this._act.getActByType('I_WANT_TRANSACTIONS_TOBE_PRIVATE')
  }
  //--------------------Use_a_public_blockchain------------------------------
  async  Use_a_public_blockchain(address_I_want_transations_tobe_private) {
    this._user.checkUser(this.sender, 'USER')
    let check_I_want_transations_tobe_private = this._act.getActByAddress(address_I_want_transations_tobe_private)
    if (!check_I_want_transations_tobe_private || check_I_want_transations_tobe_private.type !== 'I_WANT_TRANSACTIONS_TOBE_PRIVATE')
      throw 'I_WANT_TRANSACTIONS_TOBE_PRIVATE IS NOT EXIST'
    let Use_a_public_blockchain = await this._act.createAct('USE_A_PUBLIC_BLOCKCHAIN')
    this.setToAddress(Use_a_public_blockchain.address)
    return { Use_a_public_blockchain }
  }
  //--------------------Consensus_determined_from_in_intra_firm------------------------------
  checkAct3(address) {
    this.check_I_want_transations_tobe_private = this.get_I_want_transations_tobe_privateByAddress(address);
    this.check_I_need_to_control_functionality = this.get_I_need_to_control_functionalityByAddress(address);

    if (this.check_I_want_transations_tobe_private == 'I_WANT_TRANSACTIONS_TOBE_PRIVATE') {
      return true;
    }
    else if (this.check_It_do_not_require_shared_write_access.type == 'I_NEED_TO_CONTROL_FUNCTIONALITY') {
      return true;
    }
    else {
      throw `CHECK_CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM`;
    }
  }
  async  check_Consensus_determined_from_in_intra_firm() {
    this.checkAct3(this.sender, 'CHECK_CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM')
    let check_Act3 = await this._act.createAct('CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM_FOR_CHECK')
    return check_Act3
  }
  get_check_Consensus_determined_from_in_intra_firm() {
    return this._act.getActByType('CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM_FOR_CHECK')
  }
  async  Consensus_determined_from_in_intra_firm(address_check_Consensus_determined_from_in_intra_firm) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Consensus_determined_from_in_intra_firm = this._act.getActByAddress(address_check_Consensus_determined_from_in_intra_firm)
    if (!check_check_Consensus_determined_from_in_intra_firm || check_check_Consensus_determined_from_in_intra_firm.type !== 'CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM_FOR_CHECK')
      throw 'CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM_FOR_CHECK IS NOT EXIST'
    let Consensus_determined_from_in_intra_firm = await this._act.createAct('CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM')
    return Consensus_determined_from_in_intra_firm
  }
  get_Consensus_determined_from_in_intra_firm() {
    return this._act.getActByType('CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM')
  }
  //--------------------Use_a_private_blockchain------------------------------
  async  Use_a_private_blockchain(address_Consensus_determined_from_in_intra_firm) {
    this._user.checkUser(this.sender, 'USER')
    let check_Consensus_determined_from_in_intra_firm = this._act.getActByAddress(address_Consensus_determined_from_in_intra_firm)
    if (!check_Consensus_determined_from_in_intra_firm || check_Consensus_determined_from_in_intra_firm.type !== 'CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM')
      throw 'CONSENSUS_DETERMINED_FROM_IN_INTRA_FIRM IS NOT EXIST'
    let Use_a_private_blockchain = await this._act.createAct('USE_A_PRIVATE_BLOCKCHAIN')
    this.setToAddress(Use_a_private_blockchain.address)
    return { Use_a_private_blockchain }
  }
  //--------------------Consensus_determined_from_in_inter_firm------------------------------
  checkAct4(address) {
    this.check_I_want_transations_tobe_private = this.get_I_want_transations_tobe_privateByAddress(address);
    this.check_I_need_to_control_functionality = this.get_I_need_to_control_functionalityByAddress(address);

    if (this.check_I_want_transations_tobe_private == 'I_WANT_TRANSACTIONS_TOBE_PRIVATE') {
      return true;
    }
    else if (this.check_It_do_not_require_shared_write_access.type == 'I_NEED_TO_CONTROL_FUNCTIONALITY') {
      return true;
    }
    else {
      throw `CHECK_CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM`;
    }
  }
  async  check_Consensus_determined_from_in_inter_firm() {
    this.checkAct3(this.sender, 'CHECK_CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM')
    let check_Act3 = await this._act.createAct('CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM_FOR_CHECK')
    return check_Act3
  }
  get_check_Consensus_determined_from_in_inter_firm() {
    return this._act.getActByType('CONSENSUS_DETERMINED_FROM_INTER_FIRM_FOR_CHECK')
  }
  async  Consensus_determined_from_in_inter_firm(address_check_Consensus_determined_from_in_inter_firm) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Consensus_determined_from_in_inter_firm = this._act.getActByAddress(address_check_Consensus_determined_from_in_inter_firm)
    if (!check_check_Consensus_determined_from_in_inter_firm || check_check_Consensus_determined_from_in_inter_firm.type !== 'CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM_FOR_CHECK')
      throw 'CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM_FOR_CHECK IS NOT EXIST'
    let Consensus_determined_from_in_inter_firm = await this._act.createAct('CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM')
    return Consensus_determined_from_in_inter_firm
  }
  get_Consensus_determined_from_in_inter_firm() {
    return this._act.getActByType('CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM')
  }
  //--------------------Use_a_hybrid_blockchain------------------------------
  async  Use_a_hybrid_blockchain(address_Consensus_determined_from_in_inter_firm) {
    this._user.checkUser(this.sender, 'USER')
    let check_Consensus_determined_from_in_inter_firm = this._act.getActByAddress(address_Consensus_determined_from_in_inter_firm)
    if (!check_Consensus_determined_from_in_inter_firm || check_Consensus_determined_from_in_inter_firm.type !== 'CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM')
      throw 'CONSENSUS_DETERMINED_FROM_IN_INTER_FIRM IS NOT EXIST'
    let Use_a_hybrid_blockchain = await this._act.createAct('USE_A_HYBRID_BLOCKCHAIN')
    this.setToAddress(Use_a_hybrid_blockchain.address)
    return { Use_a_hybrid_blockchain }
  }
}
export default TokenMain;
