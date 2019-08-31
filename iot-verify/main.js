import Contract from 'Contract'
import User from './user'
import Act from './act'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer',
    'get_check_Sense_Magnetic_Contact_position',
    'get_Sense_Magnetic_Contact_position',
    'get_Connected',
    'get_DisConnect',
    'get_Read_a_Door_Unlooking_Password',
    'get_Verify_01',
    'get_Unlook_the_Door',
    'get_Read_the_Door_looking_Password',
    'get_Verify_02',
    'get_Look_the_Door',
    'get_Not_verify_01',
    'Nget_ot_verify_02',
    'get_Check_Logic_Condition_of_Enable_Pin_forc_check',
    'get_check_Display_Wrong_Password',
    'get_Display_Wrong_Password',
    'get_check_Turn_on_LED',
    'get_Turn_on_LED',
    'get_Turn_on_Buzzer',
    'get_Sent_SMS_to_Owner_s_Mobile_Phone',
    'get_Check_Logic_Condition_of_Enable_Pin',
    'get_High',
    'get_Low',
    'get_Turn_on_Buzzer_and_LED'
  ]
  static authenticationFuncs = [
    'Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer',
    'check_Sense_Magnetic_Contact_position',
    'Sense_Magnetic_Contact_position',
    'Connected',
    'DisConnect',
    'Read_a_Door_Unlooking_Password',
    'Verify_01',
    'Unlook_the_Door',
    'Read_the_Door_looking_Password',
    'Verify_02',
    'Look_the_Door',
    'Not_verify_01',
    'Not_verify_02',
    'Check_Logic_Condition_of_Enable_Pin_forc_check',
    'check_Display_Wrong_Password',
    'Display_Wrong_Password',
    'check_Turn_on_LED',
    'Turn_on_LED',
    'Turn_on_Buzzer',
    'Sent_SMS_to_Owner_s_Mobile_Phone',
    'Check_Logic_Condition_of_Enable_Pin',
    'High',
    'Low',
    'Turn_on_Buzzer_and_LED'
  ]
  static publicFuncs = [
    'User',
    'get_User',
    'Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer',
    'get-Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer',
    'check_Sense_Magnetic_Contact_position',
    'get_check_Sense_Magnetic_Contact_position',
    'Sense_Magnetic_Contact_position',
    'get_Sense_Magnetic_Contact_position',
    'Connected',
    'get_Connected',
    'DisConnect',
    'get_DisConnect',
    'Read_a_Door_Unlooking_Password',
    'get_Read_a_Door_Unlooking_Password',
    'Verify_01',
    'get_Verify_01',
    'Unlook_the_Door',
    'get_Unlook_the_Door',
    'Read_the_Door_looking_Password',
    'get_Read_the_Door_looking_Password',
    'Verify_02',
    'get_Verify_02',
    'Look_the_Door',
    'get_Look_the_Door',
    'Not_verify_01',
    'get_Not_verify_01',
    'Not_verify_02',
    'get_Not_verify_02',
    'Check_Logic_Condition_of_Enable_Pin_forc_check',
    'get_Check_Logic_Condition_of_Enable_Pin_forc_check',
    'check_Display_Wrong_Password',
    'get_check_Display_Wrong_Password',
    'Display_Wrong_Password',
    'get_Display_Wrong_Password',
    'check_Turn_on_LED',
    'get_check_Turn_on_LED',
    'Turn_on_LED',
    'get_Turn_on_LED',
    'Turn_on_Buzzer',
    'get_Turn_on_Buzzer',
    'Sent_SMS_to_Owner_s_Mobile_Phone',
    'get_Sent_SMS_to_Owner_s_Mobile_Phone',
    'Check_Logic_Condition_of_Enable_Pin',
    'get_Check_Logic_Condition_of_Enable_Pin',
    'High',
    'get_High',
    'Low',
    'get_Low',
    'Turn_on_Buzzer_and_LED',
    'get_Turn_on_Buzzer_and_LED'

  ]
  static schemas = {
    name: {
      type: String,
      default: 'IOT-VERIFY'
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
  get_USer() {
    let Iot_Device = this._user.getUserByType('IOT_DEVICE')
    return Iot_Device
  }
  //----Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer------------------------------
  check_Initialize_Magnetic_Contact(address) {
    let check_Initialize_Magnetic_Contact = this.get_Initialize_Magnetic_ContactByAddress(address)
    if (!check_Initialize_Magnetic_Contact || check_Initialize_Magnetic_Contact.type !== 'INITIALIZE_MAGNETIC_CONTACT_BLUTOOTH_DEVICE_GSM_MODULE_LCD_DISPLAY_KEYPAD_SERVO_MOTOR_AND_BUZZER')
      throw `INITIALIZE_MAGNETIC_CONTACT_BLUTOOTH_DEVICE_GSM_MODULE_LCD_DISPLAY_KEYPAD_SERVO_MOTOR_AND_BUZZER IS NOT EXIST`
    return true
  }
  get_Initialize_Magnetic_ContactByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer() {
    this._user.checkUser(this.sender, 'USER')
    let Initialize_Magnetic_Contact = await this._act.createAct('INITIALIZE_MAGNETIC_CONTACT_BLUTOOTH_DEVICE_GSM_MODULE_LCD_DISPLAY_KEYPAD_SERVO_MOTOR_AND_BUZZER')
    return Initialize_Magnetic_Contact
  }
  get_Initialize_Magnetic_Contact_Bluetooth_Device_GSM_Module_LCD_Diplay_Keypad_Servo_Motor_and_Buzzer() {
    return this._act.getActByType('INITIALIZE_MAGNETIC_CONTACT_BLUTOOTH_DEVICE_GSM_MODULE_LCD_DISPLAY_KEYPAD_SERVO_MOTOR_AND_BUZZER')
  }
  // --------------------Sense_Magnetic_Contact_position---------------------------
  checkAct(address) {
    this.check_Initialize_Magnetic_Contact = this.get_Initialize_Magnetic_ContactByAddress(address);
    this.check_Turn_on_Buzzer_and_LED = this.get_Turn_on_Buzzer_and_LEDByAddress(address);
    this.check_Look_the_Door = this.get_Look_the_DooByAddress(address);
    if (this.check_Initialize_Magnetic_Contact.type == 'INITIALIZE_MAGNETIC_CONTACT_BLUTOOTH_DEVICE_GSM_MODULE_LCD_DISPLAY_KEYPAD_SERVO_MOTOR_AND_BUZZER') {
      return true;
    }
    else if (this.check_Turn_on_Buzzer_and_LED.type == 'TURN_ON_BUZZER_AND_LED') {
      return true;
    }
    else if (this.check_Look_the_Door.type == 'LOOK_THE_DOOR') {
      return true;
    }
    else {
      throw `INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR_FOR_CHECK NOT EXIST`;
    }
  }
  async  check_Sense_Magnetic_Contact_position() {
    this.checkAct(this.sender, 'INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR_FOR_CHECK')
    let check_Act = await this._act.createAct('INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR')
    return check_Act
  }
  get_check_Sense_Magnetic_Contact_position() {
    return this._act.getActByType('INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR')
  }
  async  Sense_Magnetic_Contact_position(address_check_Act) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Act = this._act.getActByAddress(address_check_Act)
    if (!check_check_Act || check_check_Act.type !== 'INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR')
      throw 'INITIALIZE_MAGNETIC_CONTACT_OR_TURN_ON_BUZZER_AND_LED_LOOK_THE_DOOR IS NOT EXIST'
    let Sense_Magnetic_Contact_position = await this._act.createAct('SENSE_MAGNETIC_CONTACT_POSITION')
    return Sense_Magnetic_Contact_position
  }
  get_Sense_Magnetic_Contact_position() {
    return this._act.getActByType('SENSE_MAGNETIC_CONTACT_POSITION')
  }
  // --------------------DisConnect---------------------------
  check_DisConnect(address) {
    let check_DisConnect = this.get_DisConnectByAddress(address)
    if (!check_DisConnect || check_DisConnect.type !== 'DISCONNECTED') throw `DISCONNECTED IS NOT EXIST`
    return true
  }
  get_DisConnectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  DisConnect(address_Sense_Magnetic_Contact_position) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sense_Magnetic_Contact_position = this._act.getActByAddress(address_Sense_Magnetic_Contact_position)
    if (!check_Sense_Magnetic_Contact_position || check_Sense_Magnetic_Contact_position.type !== 'SENSE_MAGNETIC_CONTACT_POSITION')
      throw 'SENSE_MAGNETIC_CONTACT_POSITION IS NOT EXIST'
    let DisConnect = await this._act.createAct('DISCONNECTED')
    return DisConnect
  }
  get_DisConnected() {
    return this._act.getActByType('DISCONNECTED')
  }
  // --------------------Connected---------------------------
  async  Connected(address_Sense_Magnetic_Contact_position) {
    this._user.checkUser(this.sender, 'USER')
    let check_Sense_Magnetic_Contact_position = this._act.getActByAddress(address_Sense_Magnetic_Contact_position)
    if (!check_Sense_Magnetic_Contact_position || check_Sense_Magnetic_Contact_position.type !== 'SENSE_MAGNETIC_CONTACT_POSITION')
      throw 'SENSE_MAGNETIC_CONTACT_POSITION IS NOT EXIST'
    let Connected = await this._act.createAct('CONNECTED')
    return Connected
  }
  get_Connected() {
    return this._act.getActByType('CONNECTED')
  }
  // --------------------Read_a_Door_Unlooking_Password---------------------------
  async  Read_a_Door_Unlooking_Password(address_Connected) {
    this._user.checkUser(this.sender, 'USER')
    let check_Connected = this._act.getActByAddress(address_Connected)
    if (!check_Connected || check_Connected.type !== 'CONNECTED')
      throw 'CONNECTED IS NOT EXIST'
    let Read_a_Door_Unlooking_Password = await this._act.createAct('READ_A_DOOR_UNLOOOKING_PASSWORD')
    return Read_a_Door_Unlooking_Password
  }
  get_Read_a_Door_Unlooking_Password() {
    return this._act.getActByType('READ_A_DOOR_UNLOOOKING_PASSWORD')
  }
  // --------------------Not_verify_01---------------------------
  check_Not_verify_01(address) {
    let check_Not_verify_01 = this.get_Not_verify_01ByAddress(address)
    if (!check_Not_verify_01 || check_Not_verify_01.type !== 'NO_VERIFY_01') throw `NO_VERIFY_01 IS NOT EXIST`
    return true
  }
  get_Not_verify_01ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Not_verify_01(address_Read_a_Door_Unlooking_Password) {
    this._user.checkUser(this.sender, 'USER')
    let check_Read_a_Door_Unlooking_Password = this._act.getActByAddress(address_Read_a_Door_Unlooking_Password)
    if (!check_Read_a_Door_Unlooking_Password || check_Read_a_Door_Unlooking_Password.type !== 'READ_A_DOOR_UNLOOOKING_PASSWORD')
      throw 'READ_A_DOOR_UNLOOOKING_PASSWORD IS NOT EXIST'
    let Not_verify_01 = await this._act.createAct('NO_VERIFY_01')
    return Not_verify_01
  }
  get_Not_verify_01() {
    return this._act.getActByType('NO_VERIFY_01')
  }
  // --------------------Verify_01---------------------------
  async  Verify_01(address_Read_a_Door_Unlooking_Password) {
    this._user.checkUser(this.sender, 'USER')
    let check_Read_a_Door_Unlooking_Password = this._act.getActByAddress(address_Read_a_Door_Unlooking_Password)
    if (!check_Read_a_Door_Unlooking_Password || check_Read_a_Door_Unlooking_Password.type !== 'READ_A_DOOR_UNLOOOKING_PASSWORD')
      throw 'READ_A_DOOR_UNLOOOKING_PASSWORD IS NOT EXIST'
    let Verify_01 = await this._act.createAct('VERIFY_01')
    return Verify_01
  }
  get_Verify_01() {
    return this._act.getActByType('VERIFY_01')
  }
  // --------------------Look_the_Door---------------------------
  async  Look_the_Door(address_Verify_01) {
    this._user.checkUser(this.sender, 'USER')
    let check_Verify_01 = this._act.getActByAddress(address_Verify_01)
    if (!check_Verify_01 || check_Verify_01.type !== 'VERIFY_01')
      throw 'VERIFY_01 IS NOT EXIST'
    let Look_the_Door = await this._act.createAct('LOOK_THE_DOOR')
    return Look_the_Door
  }
  get_Look_the_Door() {
    return this._act.getActByType('LOOK_THE_DOOR')
  }
  // --------------------Read_the_Door_looking_Password---------------------------
  async  Read_the_Door_looking_Password(address_Look_the_Door) {
    this._user.checkUser(this.sender, 'USER')
    let check_Look_the_Door = this._act.getActByAddress(address_Look_the_Door)
    if (!check_Look_the_Door || check_Look_the_Door.type !== 'LOOK_THE_DOOR')
      throw 'LOOK_THE_DOOR IS NOT EXIST'
    let Read_the_Door_looking_Password = await this._act.createAct('READ_A_DOOR_LOOKING_PASSWORD')
    return Read_the_Door_looking_Password
  }
  get_Read_the_Door_looking_Password() {
    return this._act.getActByType('READ_A_DOOR_LOOKING_PASSWORD')
  }
  // --------------------Verify_02---------------------------
  async  Verify_02(address_Read_a_Door_looking_Password) {
    this._user.checkUser(this.sender, 'USER')
    let check_Read_a_Door_looking_Password = this._act.getActByAddress(address_Read_a_Door_looking_Password)
    if (!check_Read_a_Door_looking_Password || check_Read_a_Door_looking_Password.type !== 'READ_A_DOOR_LOOOKING_PASSWORD')
      throw 'READ_A_DOOR_LOOOKING_PASSWORD IS NOT EXIST'
    let Verify_02 = await this._act.createAct('VERIFY_02')
    return Verify_02
  }
  get_Verify_02() {
    return this._act.getActByType('VERIFY_02')
  }
  // --------------------Look_the_Door---------------------------
  get_Look_the_DoorByAddress(address) {
    let get_Look_the_DoorByAddress = this.get_Look_the_DoorByAddress(address)
    if (!get_Look_the_DoorByAddress || get_Look_the_DoorByAddress.type !== 'LOOK_THE_DOOR') throw `LOOK_THE_DOOR IS NOT EXIST`
    return true
  }
  get_Look_the_DoorByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Look_the_Door(address_Verify_02) {
    this._user.checkUser(this.sender, 'USER')
    let check_Verify_02 = this._act.getActByAddress(address_Verify_02)
    if (!check_Verify_02 || check_Verify_02.type !== 'VERIFY_02')
      throw 'VERIFY_02 IS NOT EXIST'
    let Look_the_Door = await this._act.createAct('LOOK_THE_DOOR')
    return Look_the_Door
  }
  get_Look_the_Door() {
    return this._act.getActByType('LOOK_THE_DOOR')
  }
  // --------------------Not_verify_02---------------------------
  check_Not_verify_02(address) {
    let check_Not_verify_02 = this.get_Not_verify_02ByAddress(address)
    if (!check_Not_verify_02 || check_Not_verify_02.type !== 'NOT_VERIFY_02') throw `NOT_VERIFY_02 IS NOT EXIST`
    return true
  }
  get_Not_verify_02ByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Not_verify_02(address_Read_a_Door_looking_Password) {
    this._user.checkUser(this.sender, 'USER')
    let check_Read_a_Door_looking_Password = this._act.getActByAddress(address_Read_a_Door_looking_Password)
    if (!check_Read_a_Door_looking_Password || check_Read_a_Door_looking_Password.type !== 'READ_A_DOOR_LOOOKING_PASSWORD')
      throw 'READ_A_DOOR_LOOOKING_PASSWORD IS NOT EXIST'
    let Not_verify_02 = await this._act.createAct('NOT_VERIFY_02')
    return Not_verify_02
  }
  get_Not_verify_02() {
    return this._act.getActByType('NOT_VERIFY_02')
  }
  // --------------------Display_Wrong_Password---------------------------
  checkAct2(address) {
    this.check_Not_verify_01 = this.get_Not_verify_01ByAddress(address);
    this.check_Not_verify_02 = this.get_Not_verify_02ByAddress(address);
    if (this.check_Not_verify_01.type == 'NOT_VERIFY_01') {
      return true;
    }
    else if (this.check_Not_verify_02.type == 'NOT_VERIFY_02') {
      return true;
    }
    else {
      throw `NOT_VERIFY_01_OR_NOT_VERIFY_02_FOR_CHECK NOT EXIST`;
    }
  }
  async  check_Display_Wrong_Password() {
    this.checkAct2(this.sender, 'NOT_VERIFY_01_OR_NOT_VERIFY_02_FOR_CHECK')
    let check = await this._act.createAct('NOT_VERIFY_01_OR_NOT_VERIFY_02')
    return check
  }
  get_check_Display_Wrong_Password() {
    return this._act.getActByType('NOT_VERIFY_01_OR_NOT_VERIFY_02')
  }
  checkDisplay_Wrong_Password(address) {
    let checkDisplay_Wrong_Password = this.getDisplay_Wrong_PasswordByAddress(address)
    if (!checkDisplay_Wrong_Password || checkDisplay_Wrong_Password.type !== 'DISPLAY_WRONG_PASSWORD') throw `DISPLAY_WRONG_PASSWORD IS NOT EXIST`
    return true
  }
  getDisplay_Wrong_PasswordByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Display_Wrong_Password(address_check_Display_Wrong_Password) {
    this._user.checkUser(this.sender, 'USER')
    let check_Display_Wrong_Password = this._act.getActByAddress(address_check_Display_Wrong_Password)
    if (!check_Display_Wrong_Password || check_Display_Wrong_Password.type !== 'NOT_VERIFY_01_OR_NOT_VERIFY_02')
      throw 'NOT_VERIFY_01_OR_NOT_VERIFY_02 IS NOT EXIST'
    let Display_Wrong_Password = await this._act.createAct('DISPLAY_WRONG_PASSWORD')
    return Display_Wrong_Password
  }
  get_Display_Wrong_Password() {
    return this._act.getActByType('DISPLAY_WRONG_PASSWORD')
  }
  // --------------------Turn_on_LED---------------------------
  checkAct3(address) {
    this.check_DisConnect = this.get_DisConnectByAddress(address);
    this.checkDisplay_Wrong_Password = this.getDisplay_Wrong_PasswordByAddress(address);
    if (this.check_DisConnect.type == 'DISCONNECTED') {
      return true;
    }
    else if (this.checkDisplay_Wrong_Password.type == 'DISPLAY_WRONG_PASSWORD') {
      return true;
    }
    else {
      throw `DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD_FOR_CHECK NOT EXIST`;
    }
  }
  async  check_Turn_on_LED() {
    this.checkAct3(this.sender, 'DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD_FOR_CHECK')
    let check = await this._act.createAct('DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD')
    return check
  }
  get_check_Turn_on_LED() {
    return this._act.getActByType('DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD')
  }
  async  Turn_on_LED(address_check_Turn_on_LED) {
    this._user.checkUser(this.sender, 'USER')
    let check_check_Turn_on_LED = this._act.getActByAddress(address_check_Turn_on_LED)
    if (!check_check_Turn_on_LED || check_check_Turn_on_LED.type !== 'DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD')
      throw 'DISCONNECTED_OR_DISPLAY_WRONG_PASSWORD IS NOT EXIST'
    let Turn_on_LED = await this._act.createAct('TURN_ON_LEB')
    return Turn_on_LED
  }
  get_Turn_on_LED() {
    return this._act.getActByType('TURN_ON_LEB')
  }
  // --------------------Turn_on_Buzzer---------------------------
  async  Turn_on_Buzzer(address_Turn_on_LED) {
    this._user.checkUser(this.sender, 'USER')
    let check_Turn_on_LED = this._act.getActByAddress(address_Turn_on_LED)
    if (!check_Turn_on_LED || check_Turn_on_LED.type !== 'TURN_ON_LEB')
      throw 'TURN_ON_LEB IS NOT EXIST'
    let Turn_on_Buzzer = await this._act.createAct('TURN_ON_BUZZER')
    return Turn_on_Buzzer
  }
  get_Turn_on_Buzzer() {
    return this._act.getActByType('TURN_ON_BUZZER')
  }
  // --------------------Sent_SMS_to_Owner_s_Mobile_Phone---------------------------
  check_Sent_SMS_to_Owner_s_Mobile_Phone(address) {
    let check_Not_verify_02 = this.get_Sent_SMS_to_Owner_s_Mobile_PhoneByAddress(address)
    if (!check_Not_verify_02 || check_Not_verify_02.type !== 'NOT_VERIFY_02') throw `NOT_VERIFY_02 IS NOT EXIST`
    return true
  }
  get_Sent_SMS_to_Owner_s_Mobile_PhoneByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Sent_SMS_to_Owner_s_Mobile_Phone(address_Turn_on_Buzzer) {
    this._user.checkUser(this.sender, 'USER')
    let check_Turn_on_Buzzer = this._act.getActByAddress(address_Turn_on_Buzzer)
    if (!check_Turn_on_Buzzer || check_Turn_on_Buzzer.type !== 'TURN_ON_BUZZER')
      throw 'TURN_ON_BUZZER IS NOT EXIST'
    let Sent_SMS_to_Owner_s_Mobile_Phone = await this._act.createAct('SENT_SMS_TO_OWNER_S_MOBILE_PHONE')
    return Sent_SMS_to_Owner_s_Mobile_Phone
  }
  get_Sent_SMS_to_Owner_s_Mobile_Phone() {
    return this._act.getActByType('SENT_SMS_TO_OWNER_S_MOBILE_PHONE')
  }
  // --------------------Check_Logic_Condition_of_Enable_Pin---------------------------
  checkAct4(address) {
    this.check_Sent_SMS_to_Owner_s_Mobile_Phone = this.get_Sent_SMS_to_Owner_s_Mobile_PhoneByAddress(address);
    this.check_Low = this.get_LowByAddress(address);
    if (this.Check_Low.type == 'LOW') {
      return true;
    }
    else if (this.check_Sent_SMS_to_Owner_s_Mobile_Phone.type == 'SENT_SMS_TO_OWNER_S_MOBILE_PHONE') {
      return true;
    }
    else {
      throw `SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW_FOR_CHECK NOT EXIST`;
    }
  }
  async  Check_Logic_Condition_of_Enable_Pin_forc_check() {
    this.checkAct4(this.sender, 'SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW_FOR_CHECK')
    let check = await this._act.createAct('SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW')
    return check
  }
  get_Check_Logic_Condition_of_Enable_Pin_forc_check() {
    return this._act.getActByType('SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW')
  }
  async  Check_Logic_Condition_of_Enable_Pin(address_check_Turn_on_LED) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Logic_Condition_of_Enable_Pin_forc_check = this._act.getActByAddress(address_check_Turn_on_LED)
    if (!check_Check_Logic_Condition_of_Enable_Pin_forc_check || check_Check_Logic_Condition_of_Enable_Pin_forc_check.type !== 'SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW')
      throw 'SENT_SMS_TO_OWNER_S_MOBILE_PHONE_OR_LOW IS NOT EXIST'
    let Check_Logic_Condition_of_Enable_Pin = await this._act.createAct('CHECK_LOGIC_CONDITION_OF_ENABLE_PIN')
    return Check_Logic_Condition_of_Enable_Pin
  }
  get_Check_Logic_Condition_of_Enable_Pin() {
    return this._act.getActByType('CHECK_LOGIC_CONDITION_OF_ENABLE_PIN')
  }
  // --------------------High---------------------------
  async  High(address_Check_Logic_Condition_of_Enable_Pin) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Logic_Condition_of_Enable_Pin = this._act.getActByAddress(address_Check_Logic_Condition_of_Enable_Pin)
    if (!check_Check_Logic_Condition_of_Enable_Pin || check_Check_Logic_Condition_of_Enable_Pin.type !== 'CHECK_LOGIC_CONDITION_OF_ENABLE_PIN')
      throw 'CHECK_LOGIC_CONDITION_OF_ENABLE_PIN IS NOT EXIST'
    let High = await this._act.createAct('HIGH')
    return High
  }
  get_High() {
    return this._act.getActByType('HIGH')
  }
  // --------------------Low---------------------------
  check_Low(address) {
    let check_Low = this.get_LowByAddress(address)
    if (!check_Low || check_Low.type !== 'LOW') throw `LOW IS NOT EXIST`
    return true
  }
  get_LowByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Low(address_Check_Logic_Condition_of_Enable_Pin) {
    this._user.checkUser(this.sender, 'USER')
    let check_Check_Logic_Condition_of_Enable_Pin = this._act.getActByAddress(address_Check_Logic_Condition_of_Enable_Pin)
    if (!check_Check_Logic_Condition_of_Enable_Pin || check_Check_Logic_Condition_of_Enable_Pin.type !== 'CHECK_LOGIC_CONDITION_OF_ENABLE_PIN')
      throw 'CHECK_LOGIC_CONDITION_OF_ENABLE_PIN IS NOT EXIST'
    let Low = await this._act.createAct('LOW')
    return Low
  }
  get_Low() {
    return this._act.getActByType('LOW')
  }
  // --------------------Turn_on_Buzzer_and_LED---------------------------
  check_Turn_on_Buzzer_and_LED(address) {
    let check_Turn_on_Buzzer_and_LED = this.get_Turn_on_Buzzer_and_LEDByAddress(address)
    if (!check_Turn_on_Buzzer_and_LED || check_Turn_on_Buzzer_and_LED.type !== 'TURN_ON_BUZZER_AND_LED') throw `TURN_ON_BUZZER_AND_LED IS NOT EXIST`
    return true
  }
  get_Turn_on_Buzzer_and_LEDByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async  Turn_on_Buzzer_and_LED(address_Turn_on_Buzzer) {
    this._user.checkUser(this.sender, 'USER')
    let check_High = this._act.getActByAddress(address_Turn_on_Buzzer)
    if (!check_High || check_High.type !== 'HIGH')
      throw 'HIGH IS NOT EXIST'
    let Turn_on_Buzzer_and_LED = await this._act.createAct('TURN_ON_BUZZER_AND_LED')
    return Turn_on_Buzzer_and_LED
  }
  get_Turn_on_Buzzer_and_LED() {
    return this._act.getActByType('TURN_ON_BUZZER_AND_LED')
  }
}
export default TokenMain;
