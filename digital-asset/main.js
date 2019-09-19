import Contract from 'Contract'
import Act from './act'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Selection_Via_Collection_Development_Policy',
    'get_Physical_Original',
    'get_Digital_Original',
    'get_Copyright',
    'get_Copyright_Legislation',
    'get_Copyright_fair_Use_Police',
    'get_Metadata_Creation',
    'get_Create_Metadata_Catalogue_record_for_Creation_Dublin_core',
    'get_Digitise_create_Archival_Master_file',
    'get_Create_Metadata_Catalogue_record_for_MARC',
    'get_Import_best_file_available_as_Archival_master',
    'get_Optimise_and_create_web_and_orther_derivatives',
    'get_Digital_Asset_Management',
    'get_Link_web_images_to_Metadata',
    'get_Create_Metadata_Catalogue_record_for_Dublin_core',
  ]
  static authenticationFuncs = [
    'Physical_Original',
    'Digital_Original',
    'Copyright_Legislation',
    'Create_Metadata_Catalogue_record_for_Dublin_core',
    'Digitise_create_Archival_Master_file',
    'Create_Metadata_Catalogue_record_for_MARC',
    'Import_best_file_available_as_Archival_master',
    'Optimise_and_create_web_and_orther_derivatives',
    'Digital_Asset_Management',
    'Secure_storage_of_Master_backup_procedures',
    'Link_web_images_to_Metadata',
    'Access_via_web_catalogue'
  ]
  static publicFuncs = [
    'Selection_Via_Collection_Development_Policy',
    'get_Selection_Via_Collection_Development_Policy',
    'Physical_Original',
    'get_Physical_Original',
    'Digital_Original',
    'get_Digital_Original',
    'Copyright',
    'get_Copyright',
    'Copyright_Legislation',
    'get_Copyright_Legislation',
    'Copyright_fair_Use_Police',
    'get_Copyright_fair_Use_Police',
    'Metadata_Creation',
    'get_Metadata_Creation',
    'Create_Metadata_Catalogue_record_for_Dublin_core',
    'get_Create_Metadata_Catalogue_record_for_Dublin_core',
    'Digitise_create_Archival_Master_file',
    'get_Digitise_create_Archival_Master_file',
    'Create_Metadata_Catalogue_record_for_MARC',
    'get_Create_Metadata_Catalogue_record_for_MARC',
    'Import_best_file_available_as_Archival_master',
    'get_Import_best_file_available_as_Archival_master',
    'Optimise_and_create_web_and_orther_derivatives',
    'get_Optimise_and_create_web_and_orther_derivatives',
    'Digital_Asset_Management',
    'get_Digital_Asset_Management',
    'Secure_storage_of_Master_backup_procedures',
    'Link_web_images_to_Metadata',
    'get_Link_web_images_to_Metadata',
    'Access_via_web_catalogue'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'DIGITAL-ASSET'
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
  //---------------------Process------------------------------
  async Selection_Via_Collection_Development_Policy() {
    let Selection = await this._act.createAct('SELECTION_VIA_COLLECTION_DEVELOPMENT_POLICY')
    return Selection
  }
  get_Selection_Via_Collection_Development_Policy() {
    let Selection = this._act.getActByType('SELECTION_VIA_COLLECTION_DEVELOPMENT_POLICY')
    return Selection
  }
  async Copyright() {
    let Copyright = await this._act.createAct('COPYRIGHT')
    return Copyright
  }
  get_Copyright() {
    let Copyright = this._act.getActByType('COPYRIGHT')
    return Copyright
  }
  async Metadata_Creation() {
    let Metadata_Creation = await this._act.createAct('METADATA_CREATION')
    return Metadata_Creation
  }
  get_Metadata_Creation() {
    let Metadata_Creation = this._act.getActByType('METADATA_CREATION')
    return Metadata_Creation
  }
  //----------Physical_Original---------------------------
  check_Physical_Original(address) {
    let check_Physical_Original = this.get_Physical_OriginalByAddress(address)
    if (!check_Physical_Original || check_Physical_Original.type !== 'PHYSICAL_ORIGINAL') throw `PHYSICAL_ORIGINAL IS NOT EXIST`
    return true
  }
  get_Physical_OriginalByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Physical_Original() {
    await this._act.checkAct(this.sender, 'SELECTION_VIA_COLLECTION_DEVELOPMENT_POLICY')
    let Physical_Original = await this._process.createProcess('PHYSICAL_ORIGINAL')
    return Physical_Original
  }
  get_Physical_Original() {
    return this._process.getProcessByType('PHYSICAL_ORIGINAL')
  }
  // --------------------Digital_Original---------------------------
  check_Digital_Original(address) {
    let check_Digital_Original = this.get_Digital_OriginalByAddress(address)
    if (!check_Digital_Original || check_Digital_Original.type !== 'DIGITAL_ORIGINAL') throw `DIGITAL_ORIGINAL IS NOT EXIST`
    return true
  }
  get_Digital_OriginalByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Digital_Original() {
    await this._act.checkAct(this.sender, 'SELECTION_VIA_COLLECTION_DEVELOPMENT_POLICY')
    let Digital_Original = await this._process.createProcess('DIGITAL_ORIGINAL')
    return Digital_Original
  }
  get_Digital_Original() {
    return this._process.getProcessByType('DIGITAL_ORIGINAL')
  }
  // --------------------Copyright_Legislation---------------------------
  checkAct(address) {
    this.check_Physical_Original = this.get_Physical_OriginalByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.check_Physical_Original.type == 'PHYSICAL_ORIGINAL') {
      return true;
    }
    else if (this._act.checkAct.type == 'COPYRIGHT') {
      return true;
    }
    else {
      throw `PHYSICAL_ORIGINAL_OR_COPYRIGHT IS NOT EXIST`;
    }
  }
  check_Copyright_Legislation(address) {
    let check_Copyright_Legislation = this.get_Copyright_LegislationByAddress(address)
    if (!check_Copyright_Legislation || check_Copyright_Legislation.type !== 'COPYRIGHT_LEGISLATION') throw `COPYRIGHT_LEGISLATION IS NOT EXIST`
    return true
  }
  get_Copyright_LegislationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Copyright_Legislation() {
    await this.checkAct(this.sender, 'PHYSICAL_ORIGINAL_OR_COPYRIGHT')
    let Copyright_Legislation = await this._process.createProcess('COPYRIGHT_LEGISLATION')
    return Copyright_Legislation
  }
  get_Copyright_Legislation() {
    return this._process.getProcessByType('COPYRIGHT_LEGISLATION')
  }
  // --------------------Copyright_fair_Use_Police---------------------------
  checkAct1(address) {
    this.check_Digital_Original = this.get_Digital_OriginalByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.check_Digital_Original.type == 'DIGITAL_ORIGINAL') {
      return true;
    }
    else if (this._act.checkAct.type == 'COPYRIGHT') {
      return true;
    }
    else {
      throw `DIGITAL_ORIGINAL_OR_COPYRIGHT IS NOT EXIST`;
    }
  }
  check_Copyright_fair_Use_Police(address) {
    let check_Copyright_fair_Use_Police = this.get_Copyright_fair_Use_PoliceByAddress(address)
    if (!check_Copyright_fair_Use_Police || check_Copyright_fair_Use_Police.type !== 'COPYRIGHT_FAIR_USE_POLICE') throw `COPYRIGHT_FAIR_USE_POLICE IS NOT EXIST`
    return true
  }
  get_Copyright_fair_Use_PoliceByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Copyright_fair_Use_Police() {
    await this.checkAct1(this.sender, 'DIGITAL_ORIGINAL_OR_COPYRIGHT')
    let Copyright_fair_Use_Police = await this._process.createProcess('COPYRIGHT_FAIR_USE_POLICE')
    return Copyright_fair_Use_Police
  }
  get_Copyright_fair_Use_Police() {
    return this._process.getProcessByType('COPYRIGHT_FAIR_USE_POLICE')
  }
  // --------------------Create_Metadata_Catalogue_record_for_Dublin_core---------------------------
  checkAct2(address) {
    this.check_Copyright_Legislation = this.get_Copyright_LegislationByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.check_Copyright_Legislation.type == 'COPYRIGHT_LEGISLATION') {
      return true;
    }
    else if (this._act.checkAct.type == 'METADATA_CREATION') {
      return true;
    }
    else {
      throw `COPYRIGHT_LEGISLATION_OR_METADATA_CREATION IS NOT EXIST`;
    }
  }
  check_Dublin_core(address) {
    let check_Dublin_core = this.get_Dublin_coreByAddress(address)
    if (!check_Dublin_core || check_Dublin_core.type !== 'CREATE_METADATA_CATALOGUE_RECORD_FOR_DUBLIN_CORE') throw `CREATE_METADATA_CATALOGUE_RECORD_FOR_DUBLIN_CORE IS NOT EXIST`
    return true
  }
  get_Dublin_coreByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_Metadata_Catalogue_record_for_Dublin_core() {
    await this.checkAct2(this.sender, 'COPYRIGHT_LEGISLATION_OR_METADATA_CREATION')
    let Dublin_core = await this._process.createProcess('CREATE_METADATA_CATALOGUE_RECORD_FOR_DUBLIN_CORE')
    return Dublin_core
  }
  get_Create_Metadata_Catalogue_record_for_Dublin_core() {
    return this._process.getProcessByType('CREATE_METADATA_CATALOGUE_RECORD_FOR_DUBLIN_CORE')
  }
  // --------------------Create_Metadata_Catalogue_record_for_MARC---------------------------
  checkAct3(address) {
    this.check_Copyright_fair_Use_Police = this.get_Copyright_fair_Use_PoliceByAddress(address);
    this._act.checkAct = this._act.getActByAddress(address);
    if (this.check_Copyright_Legislation.type == 'COPYRIGHT_FAIR_USE_POLICE') {
      return true;
    }
    else if (this._act.checkAct.type == 'METADATA_CREATION') {
      return true;
    }
    else {
      throw `COPYRIGHT_FAIR_USE_POLICE_OR_METADATA_CREATION IS NOT EXIST`;
    }
  }
  check_MARC(address) {
    let check_MARC = this.get_MARCByAddress(address)
    if (!check_MARC || check_MARC.type !== 'CREATE_METADATA_CATALOGUE_RECORD_FOR_MARC') throw `CREATE_METADATA_CATALOGUE_RECORD_FOR_MARC IS NOT EXIST`
    return true
  }
  get_MARCByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Create_Metadata_Catalogue_record_for_MARC() {
    await this.checkAct3(this.sender, 'COPYRIGHT_FAIR_USE_POLICE_OR_METADATA_CREATION')
    let MARC = await this._process.createProcess('CREATE_METADATA_CATALOGUE_RECORD_FOR_MARC')
    return MARC
  }
  get_Create_Metadata_Catalogue_record_for_MARC() {
    return this._process.getProcessByType('CREATE_METADATA_CATALOGUE_RECORD_FOR_MARC')
  }
  // --------------------Digitise_create_Archival_Master_file---------------------------
  check_Digitise_create_Archival_Master_file(address) {
    let check_Digitise_create_Archival_Master_file = this.get_Digitise_create_Archival_Master_fileByAddress(address)
    if (!check_Digitise_create_Archival_Master_file || check_Digitise_create_Archival_Master_file.type !== 'DIGITISE_CREATE_ARCHIVAL_MASTER_FILE') throw `DIGITISE_CREATE_ARCHIVAL_MASTER_FILE IS NOT EXIST`
    return true
  }
  get_Digitise_create_Archival_Master_fileByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Digitise_create_Archival_Master_file() {
    await this.check_Dublin_core(this.sender, 'CREATE_METADATA_CATALOGUE_RECORD_FOR_DUBLIN_CORE ')
    let Archival_Master = await this._process.createProcess('DIGITISE_CREATE_ARCHIVAL_MASTER_FILE')
    return Archival_Master
  }
  get_Digitise_create_Archival_Master_file() {
    return this._process.getProcessByType('DIGITISE_CREATE_ARCHIVAL_MASTER_FILE')
  }
  // --------------------Import_best_file_available_as_Archival_master---------------------------
  check_Import_best_file_available_as_Archival_master(address) {
    let check_Import_best_file_available_as_Archival_master = this.get_Import_best_file_available_as_Archival_masterByAddress(address)
    if (!check_Import_best_file_available_as_Archival_master || check_Import_best_file_available_as_Archival_master.type !== 'IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER') throw `IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER IS NOT EXIST`
    return true
  }
  get_Import_best_file_available_as_Archival_masterByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Import_best_file_available_as_Archival_master() {
    await this.check_MARC(this.sender, 'CREATE_METADATA_CATALOGUE_RECORD_FOR_MARC')
    let Import = await this._process.createProcess('IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER')
    return Import
  }
  get_Import_best_file_available_as_Archival_master() {
    return this._process.getProcessByType('IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER')
  }
  // --------------------Optimise_and_create_web_and_orther_derivatives---------------------------
  checkACT1(address) {
    this.check_Import_best_file_available_as_Archival_master = this.get_Import_best_file_available_as_Archival_masterByAddress(address);
    this.check_Digitise_create_Archival_Master_file = this.get_Digitise_create_Archival_Master_fileByAddress(address);
    if (this.check_Import_best_file_available_as_Archival_master.type == 'IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER') {
      return true;
    }
    else if (this.check_Digitise_create_Archival_Master_file.type == 'DIGITISE_CREATE_ARCHIVAL_MASTER_FILE') {
      return true;
    }
    else {
      throw `IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER_OR_DIGITISE_CREATE_ARCHIVAL_MASTER_FILE IS NOT EXIST`;
    }
  }
  check_Optimise_and_create_web_and_orther_derivatives(address) {
    let check_Optimise_and_create_web_and_orther_derivatives = this.get_Optimise_and_create_web_and_orther_derivativesByAddress(address)
    if (!check_Optimise_and_create_web_and_orther_derivatives || check_Optimise_and_create_web_and_orther_derivatives.type !== 'OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES') throw `OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES IS NOT EXIST`
    return true
  }
  get_Optimise_and_create_web_and_orther_derivativesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Optimise_and_create_web_and_orther_derivatives() {
    await this.checkACT1(this.sender, 'IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER_OR_DIGITISE_CREATE_ARCHIVAL_MASTER_FILE')
    let Optimise = await this._process.createProcess('OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES')
    return Optimise
  }
  get_Optimise_and_create_web_and_orther_derivatives() {
    return this._process.getProcessByType('OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES')
  }
  // --------------------Digital_Asset_Management---------------------------
  check_Digital_Asset_Management(address) {
    let check_Digital_Asset_Management = this.get_Digital_Asset_ManagementByAddress(address)
    if (!check_Digital_Asset_Management || check_Digital_Asset_Management.type !== 'IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER') throw `IMPORT_BEST_FILE_AVAILABLE_AS_ARCHIVAL_MASTER IS NOT EXIST`
    return true
  }
  get_Digital_Asset_ManagementByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Digital_Asset_Management() {
    await this.check_Optimise_and_create_web_and_orther_derivatives(this.sender, 'OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES')
    let Digital_Asset_Management = await this._process.createProcess('DIGITAL_ASSET_MANAGE')
    return Digital_Asset_Management
  }
  get_Digital_Asset_Management() {
    return this._process.getProcessByType('DIGITAL_ASSET_MANAGE')
  }
  // --------------------Secure_storage_of_Master_backup_procedures---------------------------
  check_Secure_storage_of_Master_backup_procedures(address) {
    let check_Secure_storage_of_Master_backup_procedures = this.get_Secure_storage_of_Master_backup_proceduresByAddress(address)
    if (!check_Secure_storage_of_Master_backup_procedures || check_Secure_storage_of_Master_backup_procedures.type !== 'SECURE_STORAGE_OF_MASTER_BACKUP_PROCEDURES') throw `SECURE_STORAGE_OF_MASTER_BACKUP_PROCEDURES IS NOT EXIST`
    return true
  }
  get_Secure_storage_of_Master_backup_proceduresByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Secure_storage_of_Master_backup_procedures() {
    await this.check_Digital_Asset_Management(this.sender, 'DIGITAL_ASSET_MANAGE')
    let Secure_storage = await this._process.createProcess('SECURE_STORAGE_OF_MASTER_BACKUP_PROCEDURES')
    this.setToAddress(Secure_storage.address)
    return { Secure_storage }
  }
  // --------------------Link_web_images_to_Metadata---------------------------
  check_Link_web_images_to_Metadata(address) {
    let check_Link_web_images_to_Metadata = this.get_Link_web_images_to_MetadataByAddress(address)
    if (!check_Link_web_images_to_Metadata || check_Link_web_images_to_Metadata.type !== 'LINK_WEB_IMAGES_TO_METADATA') throw `LINK_WEB_IMAGES_TO_METADATA IS NOT EXIST`
    return true
  }
  get_Link_web_images_to_MetadataByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Link_web_images_to_Metadata() {
    await this.check_Optimise_and_create_web_and_orther_derivatives(this.sender, 'OPTIMISE_AND_CREATE_WEB_AND_ORTHER_DERIVATIVES')
    let link = await this._process.createProcess('LINK_WEB_IMAGES_TO_METADATA')
    return link
  }
  get_Link_web_images_to_Metadata() {
    return this._process.getProcessByType('LINK_WEB_IMAGES_TO_METADATA')
  }
  // --------------------Access_via_web_catalogue---------------------------
  check_Access_via_web_catalogue(address) {
    let check_Link_web_images_to_Metadata = this.get_Access_via_web_catalogueByAddress(address)
    if (!check_Link_web_images_to_Metadata || check_Link_web_images_to_Metadata.type !== 'LINK_WEB_IMAGES_TO_METADATA') throw `LINK_WEB_IMAGES_TO_METADATA IS NOT EXIST`
    return true
  }
  get_Link_web_images_to_MetadataByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Access_via_web_catalogue() {
    await this.check_Link_web_images_to_Metadata(this.sender, 'LINK_WEB_IMAGES_TO_METADATA')
    let access = await this._process.createProcess('ACCESS_VIA_WEB_CATALOGUE')
    this.setToAddress(access.address)
    return { access }
  }
}
export default TokenMain;
