import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Iot_Device',
    'get_Iot_Gateway',
    'get_Wed_server',
    'get_Sensor_data',
    'get_Sensor_data_or_Iot_Device',
    'get_Format_data_as_JSON',
    'get_CSE30_key',
    'get_CSE30_key_or_Iot_Device',
    'get_Encypt_Endcode',
    'get_Connect_to_Gateway',
    'get_Send_POST',
    'get_POST_w_or_Encrypted_payload',
    'get_Receive_POST_extract_payload',
    'get_Receive_POST_extract_payload_or_Error_Report',
    'get_Initiates_SSL_connections_w_or_server',
    'get_Connect',
    'get_Disconnect',
    'get_Error_Report',
    'get_Connected',
    'get_Transmit_Data_to_Server_HTTPS',
    'get_HTTPS_POST',
    'get_HTTPS_POST_received',
    'get_Encrypted_Data',
    'get_Encrypted_Data_or_HTTPS_POST_received',
    'get_Extract_Encrypted_Data_Object',
    'get_CSE30_key_or_Extract_Encrypted_Data_Object',
    'get_Decrypt_Data',
    'get_Sensor_data_or_Decrypt_Data',
    'get_Has_content',
    'get_Parse_JSON',
    'get_Send_to_Database',
    'get_Database',
    'get_Send_to_Database_or_Database',
    'Display_Output'
  ]
  static authenticationFuncs = [
    'Sensor_data',
    'Sensor_data_or_Iot_Device',
    'Format_data_as_JSON',
    'CSE30_key',
    'CSE30_key_or_Iot_Device',
    'Encypt_Endcode',
    'Connect_to_Gateway',
    'Send_POST',
    'POST_w_or_Encrypted_payload',
    'Receive_POST_extract_payload',
    'Receive_POST_extract_payload_or_Error_Report',
    'Initiates_SSL_connections_w_or_server',
    'Connect',
    'Disconnect',
    'Error_Report',
    'Connected',
    'Transmit_Data_to_Server_HTTPS',
    'HTTPS_POST',
    'HTTPS_POST_received',
    'Encrypted_Data',
    'Encrypted_Data_or_HTTPS_POST_received',
    'Extract_Encrypted_Data_Object',
    'CSE30_key_or_Extract_Encrypted_Data_Object',
    'Decrypt_Data',
    'Sensor_data_or_Decrypt_Data',
    'Has_not_content',
    'Has_content',
    'Parse_JSON',
    'Send_to_Database',
    'Database',
    'Send_to_Database_or_Database',
    'Display_Output'
  ]
  static publicFuncs = [
    'Iot_Device',
    'get-Iot_Device',
    'Iot_Gateway',
    'get_Iot_Gateway',
    'Wed_server',
    'get_Wed_server',
    'Sensor_data',
    'get_Sensor_data',
    'Sensor_data_or_Iot_Device',
    'get_Sensor_data_or_Iot_Device',
    'Format_data_as_JSON',
    'get_Format_data_as_JSON',
    'CSE30_key',
    'get_CSE30_key',
    'CSE30_key_or_Iot_Device',
    'get_CSE30_key_or_Iot_Device',
    'Encypt_Endcode',
    'get_Encypt_Endcode',
    'Connect_to_Gateway',
    'get_Connect_to_Gateway',
    'Send_POST',
    'get_Send_POST',
    'POST_w_or_Encrypted_payload',
    'get_POST_w_or_Encrypted_payload',
    'Receive_POST_extract_payload',
    'get_Receive_POST_extract_payload',
    'Receive_POST_extract_payload_or_Error_Report',
    'get_Receive_POST_extract_payload_or_Error_Report',
    'Initiates_SSL_connections_w_or_server',
    'get_Initiates_SSL_connections_w_or_server',
    'Connect',
    'get_Connect',
    'Disconnect',
    'get_Disconnect',
    'Error_Report',
    'get_Error_Report',
    'Connected',
    'get_Connected',
    'Transmit_Data_to_Server_HTTPS',
    'get_Transmit_Data_to_Server_HTTPS',
    'HTTPS_POST',
    'get_HTTPS_POST',
    'HTTPS_POST_received',
    'get_HTTPS_POST_received',
    'Encrypted_Data',
    'get_Encrypted_Data',
    'Encrypted_Data_or_HTTPS_POST_received',
    'get_Encrypted_Data_or_HTTPS_POST_received',
    'Extract_Encrypted_Data_Object',
    'get_Extract_Encrypted_Data_Object',
    'CSE30_key_or_Extract_Encrypted_Data_Object',
    'get_CSE30_key_or_Extract_Encrypted_Data_Object',
    'Decrypt_Data',
    'get_Decrypt_Data',
    'Sensor_data_or_Decrypt_Data',
    'get_Sensor_data_or_Decrypt_Data',
    'Has_not_content',
    'Has_content',
    'get_Has_content',
    'Parse_JSON',
    'get_Parse_JSON',
    'Send_to_Database',
    'get_Send_to_Database',
    'Database',
    'get_Database',
    'Send_to_Database_or_Database',
    'get_Send_to_Database_or_Database',
    'Display_Output'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'IOT-SECURITY'
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
  async Iot_Device() {
    let Iot_Device = await this._user.createUser('IOT_DEVICE')
    return Iot_Device
  }
  get_Iot_Device() {
    let Iot_Device = this._user.getUserByType('IOT_DEVICE')
    return Iot_Device
  }
  async Iot_Gateway() {
    let Iot_Gateway = await this._user.createUser('IOT_GATEWAY')
    return Iot_Gateway
  }
  get_Iot_Gateway() {
    let Iot_Gateway = this._user.getUserByType('IOT_GATEWAY')
    return Iot_Gateway
  }
  async Wed_server() {
    let Wed_server = await this._user.createUser('WEB_SERVER')
    return Wed_server
  }
  get_Wed_server() {
    let Wed_server = this._user.getUserByType('WEB_SERVER')
    return Wed_server
  }
  // --------------------Sensor_data---------------------------
  check_Sensor_data(address) {
    let check_Sensor_data = this.get_Sensor_dataByAddress(address)
    if (!check_Sensor_data || check_Sensor_data.type !== 'SENSOR_DATA') throw `SENSOR_DATA IS NOT EXIST`
    return true
  }
  get_Sensor_dataByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async  Sensor_data() {
    this.checkUser1(this.sender, 'WEB_SERVER_OR_IOT_DEVICE')
    let Sensor_data = await this._act.createAct('SENSOR_DATA')
    return Sensor_data
  }
  get_Sensor_data() {
    return this._act.getActByType('SENSOR_DATA')
  }
  // --------------------Format_data_as_JSON---------------------------
  checkAct(address) {
    this.check_Sensor_data = this.get_Sensor_dataByAddress(address);
    this._user.checkUser = this._user.getUserByAddress(address);

    if (this.check_Sensor_data.type == 'SENSOR_DATA') {
      return true;
    }
    else if (this._user.checkUser.type == 'IOT_DEVICE') {
      return true;
    }
    else {
      throw `SENSOR_DATA_OR_IOT_DEVICE_FOR_CHECK NOT EXIST`;
    }
  }

  async  Sensor_data_or_Iot_Device() {
    this.checkAct(this.sender, 'SENSOR_DATA_OR_IOT_DEVICE_FOR_CHECK')
    let act = await this._act.createAct('SENSOR_DATA_OR_IOT_DEVICE')
    return act
  }
  get_Sensor_data_or_Iot_DeviceN() {
    return this._act.getActByType('SENSOR_DATA_OR_IOT_DEVICE')
  }
  async  Format_data_as_JSON(address_Sensor_data_or_Iot_Device) {
    this._user.checkUser(this.sender, 'IOT_DEVICE')
    let check_Sensor_data_or_Iot_Device = this._act.getActByAddress(address_Sensor_data_or_Iot_Device)
    if (!check_Sensor_data_or_Iot_Device || check_Sensor_data_or_Iot_Device.type !== 'SENSOR_DATA_OR_IOT_DEVICE')
      throw 'SENSOR_DATA_OR_IOT_DEVICE IS NOT EXIST'
    let Format_data_as_JSON = await this._act.createAct('FORMAT_DATA_AS_JSON')
    return Format_data_as_JSON
  }
  get_Format_data_as_JSON() {
    return this._act.getActByType('FORMAT_DATA_AS_JSON')
  }  // --------------------Sensor_data---------------------------
  checkUser1(address) {

    this._user.checkUser = this._user.getUserByAddress(address);

    if (this._user.checkUser.type == 'WEB_SERVER') {
      return true;
    }
    else if (this._user.checkUser.type == 'IOT_DEVICE') {
      return true;
    }
    else {
      throw `WEB_SERVER_OR_IOT_DEVICE NOT EXIST`;
    }
  }
  check_CSE30_key(address) {
    let check_CSE30_key = this.get_CSE30_keyByAddress(address)
    if (!check_CSE30_key || check_CSE30_key.type !== 'CSE30_key') throw `CSE30_key IS NOT EXIST`
    return true
  }
  get_CSE30_keyByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  CSE30_key() {
    this.checkUser1(this.sender, 'WEB_SERVER_OR_IOT_DEVICE')
    let Sensor_data = await this._act.createAct('CSE30_KEY')
    return Sensor_data
  }
  get_CSE30_key() {
    return this._act.getActByType('CSE30_KEY')
  }
  // --------------------Encypt_Endcode---------------------------
  checkAct1(address) {
    this.check_CSE30_key = this.get_CSE30_keyByAddress(address);
    this._user.checkUser = this._user.getUserByAddress(address);

    if (this.check_CSE30_key.type == 'CSE30_KEY') {
      return true;
    }
    else if (this._user.checkUser.type == 'IOT_DEVICE') {
      return true;
    }
    else {
      throw `CSE30_KEY_OR_IOT_DEVICE_FOR_CHECK NOT EXIST`;
    }
  }
  async  CSE30_key_or_Iot_Device() {
    this.checkAct1(this.sender, 'CSE30_KEY_OR_IOT_DEVICE_FOR_CHECK')
    let act = await this._act.createAct('CSE30_KEY_OR_IOT_DEVICE')
    return act
  }
  get_CSE30_key_or_Iot_Device() {
    return this._act.getActByType('CSE30_KEY_OR_IOT_DEVICE')
  }
  async  Encypt_Endcode(address_CSE30_key_or_Iot_Device) {
    this._user.checkUser(this.sender, 'IOT_DEVICE')
    let check_CSE30_key_or_Iot_Device = this._act.getActByAddress(address_CSE30_key_or_Iot_Device)
    if (!check_CSE30_key_or_Iot_Device || check_CSE30_key_or_Iot_Device.type !== 'CSE30_KEY_OR_IOT_DEVICE')
      throw 'CSE30_KEY_OR_IOT_DEVICE IS NOT EXIST'
    let Encypt_Endcode = await this._act.createAct('ENCYPT_ENDCODE')
    return Encypt_Endcode
  }
  get_Encypt_Endcode() {
    return this._act.getActByType('ENCYPT_ENDCODE')
  }
  // --------------------Connect_to_Gateway---------------------------
  async  Connect_to_Gateway(address_Encypt_Endcode) {
    this._user.checkUser(this.sender, 'IOT_DEVICE')
    let check_Encypt_Endcode = this._act.getActByAddress(address_Encypt_Endcode)
    if (!check_Encypt_Endcode || check_Encypt_Endcode.type !== 'ENCYPT_ENDCODE')
      throw 'ENCYPT_ENDCODE IS NOT EXIST'
    let Connect_to_Gateway = await this._act.createAct('CONNECT_TO_GATEWAY')
    return Connect_to_Gateway
  }
  get_Connect_to_Gateway() {
    return this._act.getActByType('CONNECT_TO_GATEWAY')
  }
  // --------------------Send_POST---------------------------
  async  Send_POST(address_Encypt_Endcode) {
    this._user.checkUser(this.sender, 'IOT_DEVICE')
    let check_Connect_to_Gateway = this._act.getActByAddress(address_Encypt_Endcode)
    if (!check_Connect_to_Gateway || check_Connect_to_Gateway.type !== 'CONNECT_TO_GATEWAY')
      throw 'CONNECT_TO_GATEWAY IS NOT EXIST'
    let Send_POST = await this._act.createAct('SEND_POST')
    return Send_POST
  }
  get_Send_POST() {
    return this._act.getActByType('SEND_POST')
  }
  // --------------------POST_w_or_Encrypted_payload---------------------------
  checkUser2(address) {

    this._user.checkUser = this._user.getUserByAddress(address);

    if (this._user.checkUser.type == 'IOT_GATEWAY') {
      return true;
    }
    else if (this._user.checkUser.type == 'IOT_DEVICE') {
      return true;
    }
    else {
      throw `IOT_GATEWAY_OR_IOT_DEVICE NOT EXIST`;
    }
  }
  async  POST_w_or_Encrypted_payload() {
    this.checkUser2(this.sender, 'IOT_GATEWAY_OR_IOT_DEVICE')
    let POST_w_or_Encrypted_payload = await this._act.createAct('POST_W_OR_ENCRYPTED_PAYLOAD')
    return POST_w_or_Encrypted_payload
  }
  get_POST_w_or_Encrypted_payload() {
    return this._act.getActByType('POST_W_OR_ENCRYPTED_PAYLOAD')
  }
  // --------------------Initiates_SSL_connections_w_or_server---------------------------
  check_Receive_POST_extract_payload(address) {
    let check_Receive_POST_extract_payload = this.get_Receive_POST_extract_payloadByAddress(address)
    if (!check_Receive_POST_extract_payload || check_Receive_POST_extract_payload.type !== 'RECEIVE_POST_EXTRACT_PAYLOAD') throw `RECEIVE_POST_EXTRACT_PAYLOAD IS NOT EXIST`
    return true
  }
  get_Receive_POST_extract_payloadByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Receive_POST_extract_payload(address_check_POST_w_or_Encrypted_payload) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_POST_w_or_Encrypted_payload = this._act.getActByAddress(address_check_POST_w_or_Encrypted_payload)
    if (!check_POST_w_or_Encrypted_payload || check_POST_w_or_Encrypted_payload.type !== 'POST_W_OR_ENCRYPTED_PAYLOAD')
      throw 'POST_W_OR_ENCRYPTED_PAYLOAD IS NOT EXIST'
    let Receive_POST_extract_payload = await this._act.createAct('RECEIVE_POST_EXTRACT_PAYLOAD')
    return Receive_POST_extract_payload
  }
  get_Receive_POST_extract_payload() {
    return this._act.getActByType('RECEIVE_POST_EXTRACT_PAYLOAD')
  }
  // --------------------Initiates_SSL_connections_w_or_server---------------------------  
  checkAct2(address) {
    this.check_Receive_POST_extract_payload = this.get_Receive_POST_extract_payloadByAddress(address);
    this.check_Error_Report = this._user.get_Error_ReportAddress(address);
    if (this.check_Receive_POST_extract_payload.type == 'RECEIVE_POST_EXTRACT_PAYLOAD') {
      return true;
    }
    else if (this.check_Error_Report.type == 'ERROR_REPORT') {
      return true;
    }
    else {
      throw `RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT_FOR_CHECK NOT EXIST`;
    }
  }
  async  Receive_POST_extract_payload_or_Error_Report() {
    this.checkAct2(this.sender, 'RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT_FOR_CHECK')
    let ACT2 = await this._act.createAct('RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT')
    return ACT2
  }
  get_Receive_POST_extract_payload_or_Error_Report() {
    return this._act.getActByType('RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT')
  }
  async Initiates_SSL_connections_w_or_server(address_Need_to_reorganise) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let Check_Receive_POST_extract_payload_or_Error_Report = this._act.getActByAddress(address_Need_to_reorganise)
    if (!Check_Receive_POST_extract_payload_or_Error_Report || Check_Receive_POST_extract_payload_or_Error_Report.type !== 'RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT')
      throw 'RECEIVE_POST_EXTRACT_PAYLOAD_OR_ERROR_REPORT IS NOT EXIST'
    let Initiates_SSL = await this._act.createAct('INITIATES_SSL_CONNECTIONS_W_OR_SERVER')
    return Initiates_SSL
  }
  get_Initiates_SSL_connections_w_or_server() {
    return this._act.getActByType('INITIATES_SSL_CONNECTIONS_W_OR_SERVER')
  }
  // --------------------Connect--------------------------- 
  async Connect(address_Initiates_SSL_connections_w_or_server) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_Initiates_SSL_connections_w_or_server = this._act.getActByAddress(address_Initiates_SSL_connections_w_or_server)
    if (!check_Initiates_SSL_connections_w_or_server || check_Initiates_SSL_connections_w_or_server.type !== 'INITIATES_SSL_CONNECTIONS_W_OR_SERVER')
      throw 'INITIATES_SSL_CONNECTIONS_W_OR_SERVER IS NOT EXIST'
    let Connect = await this._act.createAct('CONNECT')
    return Connect
  }
  get_Connect() {
    return this._act.getActByType('CONNECT')
  }
  // --------------------Connected--------------------------- 
  async Connected(address_Connect) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_Initiates_SSL_connections_w_or_server = this._act.getActByAddress(address_Connect)
    if (!check_Initiates_SSL_connections_w_or_server || check_Initiates_SSL_connections_w_or_server.type !== 'CONNECT')
      throw 'CONNECT IS NOT EXIST'
    let Connected = await this._act.createAct('CONNECTED')
    return Connected
  }
  get_Connected() {
    return this._act.getActByType('CONNECTED')
  }
  // --------------------Disconnect--------------------------- 
  async Disconnect(address_Connect) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_Initiates_SSL_connections_w_or_server = this._act.getActByAddress(address_Connect)
    if (!check_Initiates_SSL_connections_w_or_server || check_Initiates_SSL_connections_w_or_server.type !== 'CONNECT')
      throw 'CONNECT IS NOT EXIST'
    let Disconnect = await this._act.createAct('DISCONNECT')
    return Disconnect
  }
  get_Disconnect() {
    return this._act.getActByType('DISCONNECT')
  }
  // --------------------Disconnect--------------------------- 
  check_Error_Report(address) {
    let check_Error_Report = this.get_Error_ReportByAddress(address)
    if (!check_Error_Report || check_Error_Report.type !== 'ERROR_REPORT') throw `ERROR_REPORT IS NOT EXIST`
    return true
  }
  get_Error_ReporttByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Error_Report(address_Disconnect) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_Disconnect = this._act.getActByAddress(address_Disconnect)
    if (!check_Disconnect || check_Disconnect.type !== 'DISCONNECT')
      throw 'DISCONNECT IS NOT EXIST'
    let Error_Report = await this._act.createAct('ERROR_REPORT')
    return Error_Report
  }
  get_Error_Report() {
    return this._act.getActByType('ERROR_REPORT')
  }
  // --------------------Transmit_Data_to_Server_HTTPS--------------------------- 
  async Transmit_Data_to_Serve_HTTPS(address_Disconnect) {
    this._user.checkUser(this.sender, 'IOT_GATEWAY')
    let check_Connected = this._act.getActByAddress(address_Disconnect)
    if (!check_Connected || check_Connected.type !== 'CONNECTED')
      throw 'DISCONNECT IS NOT EXIST'
    let Transmit_Data_to_Serve_HTTPS = await this._act.createAct('TRANSMIT_DATA_TO_SERVER_HTTPS')
    return Transmit_Data_to_Serve_HTTPS
  }
  get_Transmit_Data_to_Serve_HTTPS() {
    return this._act.getActByType('TRANSMIT_DATA_TO_SERVER_HTTPS')
  }
  // --------------------HTTPS_POST--------------------------- 
  async HTTPS_POST(address_Transmit_Data_to_Serve_HTTPS) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Transmit_Data_to_Serve_HTTPS = this._act.getActByAddress(address_Transmit_Data_to_Serve_HTTPS)
    if (!check_Transmit_Data_to_Serve_HTTPS || check_Transmit_Data_to_Serve_HTTPS.type !== 'TRANSMIT_DATA_TO_SERVER_HTTPS')
      throw 'TRANSMIT_DATA_TO_SERVER_HTTPS IS NOT EXIST'
    let HTTPS_POST = await this._act.createAct('HTTPS_POST')
    return HTTPS_POST
  }
  get_HTTPS_POST() {
    return this._act.getActByType('HTTPS_POST')
  }
  // --------------------HTTPS_POST_received--------------------------- 
  check_HTTPS_POST_received(address) {
    let check_HTTPS_POST_received = this.get_HTTPS_POST_receivedByAddress(address)
    if (!check_HTTPS_POST_received || check_HTTPS_POST_received.type !== 'HTTPS_POST_RECEIVED') throw `HTTPS_POST_RECEIVED IS NOT EXIST`
    return true
  }
  get_HTTPS_POST_receivedByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async HTTPS_POST_received(address_Transmit_Data_to_Serve_HTTPS) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_HTTPS_POST = this._act.getActByAddress(address_Transmit_Data_to_Serve_HTTPS)
    if (!check_HTTPS_POST || check_HTTPS_POST.type !== 'HTTPS_POST')
      throw 'HTTPS_POST IS NOT EXIST'
    let HTTPS_POST_received = await this._act.createAct('HTTPS_POST_RECEIVED')
    return HTTPS_POST_received
  }
  get_HTTPS_POST_received() {
    return this._act.getActByType('HTTPS_POST_RECEIVED')
  }
  // --------------------Encrypted_Data--------------------------- 
  check_Encrypted_Data(address) {
    let check_Encrypted_Data = this.get_Encrypted_DataByAddress(address)
    if (!check_Encrypted_Data || check_Encrypted_Data.type !== 'ENCRYPTED_DATA') throw `ENCRYPTED_DATA IS NOT EXIST`
    return true
  }
  get_Encrypted_DataByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Encrypted_Data(address_Transmit_Data_to_Serve_HTTPS) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let Encrypted_Data = await this._act.createAct('ENCRYPTED_DATA')
    return Encrypted_Data
  }
  get_Encrypted_Data() {
    return this._act.getActByType('ENCRYPTED_DATA')
  }
  // --------------------Extract_Encrypted_Data_Object---------------------------  
  checkAct3(address) {
    this.check_Encrypted_Data = this.get_Encrypted_DataByAddress(address);
    this.check_HTTPS_POST_received = this.get_HTTPS_POST_receivedAddress(address);
    if (this.check_Encrypted_Data.type == 'ENCRYPTED_DATA') {
      return true;
    }
    else if (this.check_HTTPS_POST_received.type == 'HTTPS_POST_RECEIVED') {
      return true;
    }
    else {
      throw `ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED_FOR_CHECK NOT EXIST`;
    }
  }
  async  Decrypt_Data_or_HTTPS_POST_received() {
    this.checkAct3(this.sender, 'ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED_FOR_CHECK')
    let ACT3 = await this._act.createAct('ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED')
    return ACT3
  }
  get_Decrypt_Data_or_HTTPS_POST_received() {
    return this._act.getActByType('ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED')
  }
  check_Extract_Encrypted_Data_Object(address) {
    let check_Extract_Encrypted_Data_Object = this.get_Decrypt_DataByAddress(address)
    if (!check_Extract_Encrypted_Data_Object || check_Extract_Encrypted_Data_Object.type !== 'EXTRACT_ENCRYPTED_DATA_OBJECT') throw `EXTRACT_ENCRYPTED_DATA_OBJECT IS NOT EXIST`
    return true
  }
  get_Extract_Encrypted_Data_ObjectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Extract_Encrypted_Data_Object(address_Decrypt_Data_or_HTTPS_POST_received) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let Check_Decrypt_Data_or_HTTPS_POST_received = this._act.getActByAddress(address_Decrypt_Data_or_HTTPS_POST_received)
    if (!Check_Decrypt_Data_or_HTTPS_POST_received || Check_Decrypt_Data_or_HTTPS_POST_received.type !== 'ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED')
      throw 'ENCRYPTED_DATA_OR_HTTPS_POST_RECEIVED IS NOT EXIST'
    let Extract_Encrypted_Data_Object = await this._act.createAct('EXTRACT_ENCRYPTED_DATA_OBJECT')
    return Extract_Encrypted_Data_Object
  }
  get_Extract_Encrypted_Data_Object() {
    return this._act.getActByType('EXTRACT_ENCRYPTED_DATA_OBJECT')
  }
  // --------------------Decrypt_Data--------------------------- 
  checkAct4(address) {
    this.check_CSE30_key = this.get_CSE30_keyByAddress(address);
    this.check_Extract_Encrypted_Data_Object = this.get_Extract_Encrypted_Data_ObjectByAddress(address);
    if (this.check_CSE30_key.type == 'CSE30_KEY') {
      return true;
    }
    else if (this.check_Extract_Encrypted_Data_Object.type == 'EXTRACT_ENCRYPTED_DATA_OBJECT') {
      return true;
    }
    else {
      throw `CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT_FOR_CHECK NOT EXIST`;
    }
  }
  async  CSE30_key_or_Extract_Encrypted_Data_Object() {
    this.checkAct4(this.sender, 'CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT_FOR_CHECK')
    let ACT4 = await this._act.createAct('CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT')
    return ACT4
  }
  get_CSE30_key_or_Extract_Encrypted_Data_Object() {
    return this._act.getActByType('CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT')
  }
  async Decrypt_Data(address_Transmit_Data_to_Serve_HTTPS) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_CSE30_key_or_Extract_Encrypted_Data_Object = this._act.getActByAddress(address_Transmit_Data_to_Serve_HTTPS)
    if (!check_CSE30_key_or_Extract_Encrypted_Data_Object || check_CSE30_key_or_Extract_Encrypted_Data_Object.type !== 'CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT')
      throw 'CSE30_KEY_OR_EXTRACT_ENCRYPTED_DATA_OBJECT IS NOT EXIST'
    let Decrypt_Data = await this._act.createAct('DECRYPT_DATA')
    return Decrypt_Data
  }
  get_Decrypt_Data() {
    return this._act.getActByType('DECRYPT_DATA')
  }
  // --------------------Has_not_content---------------------------
  checkAct5(address) {
    this.check_Sensor_data = this.get_Sensor_dataByAddress(address);
    this.check_Decrypt_Data = this.get_Decrypt_DataByAddress(address);
    if (this.check_Sensor_data.type == 'SENSOR_DATA') {
      return true;
    }
    else if (this.check_Decrypt_Data.type == 'DECRYPT_DATA') {
      return true;
    }
    else {
      throw `SENSOR_DATA_OR_DECRYPT_DATA_FOR_CHECK NOT EXIST`;
    }
  }
  async  Sensor_data_or_Decrypt_Data() {
    this.checkAct5(this.sender, 'SENSOR_DATA_OR_DECRYPT_DATA_FOR_CHECK')
    let ACT5 = await this._act.createAct('SENSOR_DATA_OR_DECRYPT_DATA')
    return ACT5
  }
  get_Sensor_data_or_Decrypt_Data() {
    return this._act.getActByType('HAS_CONTENT')
  }
  async Has_not_content(address_Sensor_data_or_Decrypt_Data) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Sensor_data_or_Decrypt_Data = this._act.getActByAddress(address_Sensor_data_or_Decrypt_Data)
    if (!check_Sensor_data_or_Decrypt_Data || check_Sensor_data_or_Decrypt_Data.type !== 'SENSOR_DATA_OR_DECRYPT_DATANSOR_DATA')
      throw 'SENSOR_DATA_OR_DECRYPT_DATA IS NOT EXIST'
    let Has_not_content = await this._act.createAct('HAS_NOT_CONTENT')
    this.setToAddress(Has_not_content.address)
    return END
  }
  // --------------------Has_not_content---------------------------
  async Has_content(address_Sensor_data_or_Decrypt_Data) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Sensor_data_or_Decrypt_Data = this._act.getActByAddress(address_Sensor_data_or_Decrypt_Data)
    if (!check_Sensor_data_or_Decrypt_Data || check_Sensor_data_or_Decrypt_Data.type !== 'SENSOR_DATA_OR_DECRYPT_DATANSOR_DATA')
      throw 'SENSOR_DATA_OR_DECRYPT_DATA IS NOT EXIST'
    let Has_content = await this._act.createAct('HAS_CONTENT')
    return Has_content
  }
  get_Has_content() {
    return this._act.getActByType('HAS_CONTENT')
  }
  // --------------------Parse_JSON---------------------------
  async Parse_JSON(address_Has_content) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Has_content = this._act.getActByAddress(address_Has_content)
    if (!check_Has_content || check_Has_content.type !== 'HAS_CONTENT')
      throw 'HAS_CONTENT IS NOT EXIST'
    let Parse_JSON = await this._act.createAct('PARSE_JSON')
    return Parse_JSON
  }
  get_Parse_JSON() {
    return this._act.getActByType('PARSE_JSON')
  }
  // --------------------Send_to_Database---------------------------
  async Send_to_Database(address_Parse_JSON) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Parse_JSON = this._act.getActByAddress(address_Parse_JSON)
    if (!check_Parse_JSON || check_Parse_JSON.type !== 'PARSE_JSON')
      throw 'PARSE_JSON IS NOT EXIST'
    let Send_to_Database = await this._act.createAct('SEND_TO_DATABASE')
    return Send_to_Database
  }
  get_Send_to_Database() {
    return this._act.getActByType('SEND_TO_DATABASE')
  }
  // --------------------Send_to_DDatabaseatabase---------------------------
  async Database(address_Parse_JSON) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Send_to_Database = this._act.getActByAddress(address_Parse_JSON)
    if (!check_Send_to_Database || check_Send_to_Database.type !== 'SEND_TO_DATABASE')
      throw 'SEND_TO_DATABASE IS NOT EXIST'
    let Database = await this._act.createAct('DATABASE')
    return Database
  }
  get_Database() {
    return this._act.getActByType('DATABASE')
  }
  // --------------------Has_not_content---------------------------
  checkAct6(address) {
    this.check_Send_to_Database = this.get_Send_to_DatabaseByAddress(address);
    this.check_Database = this.get_DatabaseByAddress(address);
    if (this.check_Send_to_Database.type == 'SEND_TO_DATABASE') {
      return true;
    }
    else if (this.check_Database.type == 'DATABASE') {
      return true;
    }
    else {
      throw `SEND_TO_DATABASE_OR_DATABASE_FOR_CHECK' NOT EXIST`;
    }
  }
  async  Send_to_Database_or_Database() {
    this.checkAct6(this.sender, 'SEND_TO_DATABASE_OR_DATABASE_FOR_CHECK')
    let ACT5 = await this._act.createAct('SEND_TO_DATABASE_OR_DATABASE')
    return ACT5
  }
  get_Send_to_Database_or_Database() {
    return this._act.getActByType('HAS_CONTENT')
  }
  async Display_Output(address_Send_to_Database_or_Database) {
    this._user.checkUser(this.sender, 'WEB_SERVER')
    let check_Send_to_Database_or_Database = this._act.getActByAddress(address_Send_to_Database_or_Database)
    if (!check_Send_to_Database_or_Database || check_Send_to_Database_or_Database.type !== 'SEND_TO_DATABASE_OR_DATABASE')
      throw 'SEND_TO_DATABASE_OR_DATABASE IS NOT EXIST'
    let Display_Output = await this._act.createAct('DISPLAY_OUTPUT')
    this.setToAddress(Display_Output.address)
    return SUCCESS
  }
}
export default TokenMain;
