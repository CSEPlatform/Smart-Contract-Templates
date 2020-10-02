import Contract from 'Contract'
import Student from './student'
import Grade from './grade'
class TokenMain extends Contract {
  static viewFuncs = [
    'getStudent',
    'get_Pre_Nursery',
    'get_Nursery',
    'get_Kingdergarten_1st_Year',
    'get_Kingdergarten_2nd_Year',
    'get_Primary_1',
    'get_Primary_2',
    'get_Primary_3',
    'get_Primary_4',
    'get_Primary_5',
    'get_Primary_6',
    'get_Secondary_1',
    'get_Secondary_2',
    'get_Secondary_3_for_2_years',
    'get_Secondary_4_for_2_years',
    'get_Secondary_3_for_3_years',
    'get_Secondary_4_for_3_years',
    'get_Junior_College',
    'get_Pre_University',
    'get_Polytechnic',
    'get_Institute_of_Technical_Ed'

  ]
  static authenticationFuncs = [
    'Pre_Nursery',
    'Nursery',
    'Kingdergarten_1st_Year',
    'Kingdergarten_2nd_Year',
    'Primary_1',
    'Primary_2',
    'Primary_3',
    'Primary_4',
    'Primary_5',
    'Primary_6',
    'Secondary_1',
    'Secondary_2',
    'Secondary_3_for_2_years',
    'Secondary_4_for_2_years',
    'Secondary_3_for_3_years',
    'Secondary_4_for_3_years',
    'Secondary_5_for_3_years',
    'Secondary_4_for_2_years_or_Secondary_5_for_3_years',
    'Junior_College',
    're_University',
    'Polytechnic',
    'Polytechnic_of_Institute_of_Technical_Ed',
    'Institute_of_Technical_Ed',
    'create_University',
    'University'
  ]
  static publicFuncs = [
    'createStudent',
    'getStudent',
    'create_Pre_Nursery',
    'get_Pre_Nursery',
    'Pre_Nursery',
    'create_Nursery',
    'get_Nursery',
    'Nursery',
    'create_Kingdergarten_1st_Year',
    'get_Kingdergarten_1st_Year',
    'Kingdergarten_1st_Year',
    'create_Kingdergarten_2nd_Year',
    'get_Kingdergarten_2nd_Year',
    'Kingdergarten_2nd_Year',
    'create_Primary_1',
    'get_Primary_1',
    'Primary_1',
    'create_Primary_2',
    'get_Primary_2',
    'Primary_2',
    'create_Primary_3',
    'get_Primary_3',
    'Primary_3',
    'create_Primary_4',
    'get_Primary_4',
    'Primary_4',
    'create_Primary_5',
    'get_Primary_5',
    'Primary_5',
    'create_Primary_6',
    'get_Primary_6',
    'Primary_6',
    'create_Secondary_1',
    'get_Secondary_1',
    'Secondary_1',
    'create_Secondary_2',
    'get_Secondary_2',
    'Secondary_2',
    'create_Secondary_3_for_2_years',
    'get_Secondary_3_for_2_years',
    'Secondary_3_for_2_years',
    'create_Secondary_4_for_2_years',
    'get_Secondary_4_for_2_years',
    'Secondary_4_for_2_years',
    'create_Secondary_3_for_3_years',
    'get_Secondary_3_for_3_years',
    'Secondary_3_for_3_years',
    'create_Secondary_4_for_3_years',
    'get_Secondary_4_for_3_years',
    'Secondary_4_for_3_years',
    'create_Secondary_5_for_3_years',
    'get_Secondary_5_for_3_years',
    'Secondary_5_for_3_years',
    'Secondary_4_for_2_years_or_Secondary_5_for_3_years',
    'create_Junior_College',
    'get_Junior_College',
    'Junior_College',
    'create_Pre_University',
    'get_Pre_University',
    'Pre_University',
    'create_Polytechnic',
    'get_Polytechnic',
    'Polytechnic',
    'create_Institute_of_Technical_Ed',
    'get_Institute_of_Technical_Ed',
    'create_Polytechnic_of_Institute_of_Technical_Ed',
    'get_Polytechnic_of_Institute_of_Technical_Ed',
    'Polytechnic_of_Institute_of_Technical_Ed',
    'create_University',
    'University'

  ]
  static schemas = {
    name: {
      type: String,
      default: 'SINGAPORE_EDUCATION'
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
    this._student = new Student(data)
    this._grade = new Grade(data)
  }
  //---------------------STUDENT------------------------------

  async createStudent() {
    let student = await this._student.createStudent('STUDENT')
    return student

  }
  getStudent() {
    let student = this._student.getStudentByType('STUDENT')
    return student
  }


  // --------------------Pre_Nursery--------------------------- 

  async create_Pre_Nursery() {

    let pre_N = await this._grade.createGrade('PRE_NURSERY')
    return pre_N
  }

  async Pre_Nursery(address_Pre_Nursery) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Pre_Nursery = this._grade.getGradeByAddress(address_Pre_Nursery)
    if (!check_Pre_Nursery || check_Pre_Nursery.type !== 'PRE_NURSERY')
      throw 'PRE_NURSERY IS NOT EXIST'
    let addPreNursery = await this._grade.addGrade('PRE_NURSERY')
    this.setToAddress(addPreNursery.address)
    return 'SUCCESS'

  }

  get_Pre_Nursery() {
    return this._grade.getGradeByType('PRE_NURSERY')
  }
  // --------------------Nursery--------------------------
  async create_Nursery() {
    let Nursery = await this._grade.createGrade('NURSERY')
    return Nursery

  }
  async Nursery(address_Pre_Nursery) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Pre_Nursery = this._grade.getGradeByAddress(address_Pre_Nursery)
    if (!check_Pre_Nursery || check_Pre_Nursery.type !== 'PRE_NURSERY')
      throw 'PRE_NURSERY IS NOT EXIST'
    let addNursery = await this._grade.addGrade('NURSERY')
    this.setToAddress(addNursery.address)
    return 'SUCCESS'

  }

  get_Nursery() {
    return this._grade.getGradeByType('NURSERY')
  }
  // --------------------Kingdergarten_1st_Year---------------------------
  async create_Kingdergarten_1st_Year() {
    let Kingdergarten_1st = await this._grade.createGrade('KINGDERGARTEN_1ST_YEAR')
    return Kingdergarten_1st

  }

  async Kingdergarten_1st_Year(address_Nursery) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Nursery = this._grade.getGradeByAddress(address_Nursery)
    if (!check_Nursery || check_Nursery.type !== 'NURSERY')
      throw 'NURSERY IS NOT EXIST'
    let Kingdergarten_1st_Year = await this._grade.addGrade('KINGDERGARTEN_1ST_YEAR')
    this.setToAddress(Kingdergarten_1st_Year.address)
    return 'SUCCESS'

  }
  get_Kingdergarten_1st_Year() {
    return this._grade.getGradeByType('KINGDERGARTEN_1ST_YEAR')
  }

  // --------------------Kingdergarten_2nd_Year---------------------------
  async create_Kingdergarten_2nd_Year() {
    let Kingdergarten_2nd = await this._grade.createGrade('KINGDERGARTEN_2ND_YEAR')
    return Kingdergarten_2nd

  }
  async Kingdergarten_2nd_Year(address_Kingdergarten_1st_Year) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Nursery = this._grade.getGradeByAddress(address_Kingdergarten_1st_Year)
    if (!check_Nursery || check_Nursery.type !== 'KINGDERGARTEN_1ST_YEAR')
      throw 'KINGDERGARTEN_1ST_YEAR IS NOT EXIST'
    let Kingdergarten_2nd_Year = await this._grade.addGrade('KINGDERGARTEN_2ND_YEAR')
    this.setToAddress(Kingdergarten_2nd_Year.address)
    return 'SUCCESS'


  }
  get_Kingdergarten_2nd_Year() {
    return this._grade.getGradeByType('KINGDERGARTEN_2ND_YEAR')
  }
  // --------------------Primary_1---------------------------
  async create_Primary_1() {
    let Pri1 = await this._grade.createGrade('PRIMARY_1')
    return Pri1

  }

  async Primary_1(address_Kingdergarten_2nd_Year) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Kingdergarten_2nd_Year = this._grade.getGradeByAddress(address_Kingdergarten_2nd_Year)
    if (!check_Kingdergarten_2nd_Year || check_Kingdergarten_2nd_Year.type !== 'KINGDERGARTEN_2ND_YEAR')
      throw 'KINGDERGARTEN_2ND_YEAR IS NOT EXIST'
    let Primary_1 = await this._grade.addGrade('PRIMARY_1')
    this.setToAddress(Primary_1.address)
    return 'SUCCESS'

  }
  get_Primary_1() {
    return this._grade.getGradeByType('PRIMARY_1')
  }

  // --------------------Primary_2 ---------------------------
  async create_Primary_2() {
    let Pri2 = await this._grade.createGrade('PRIMARY_2')
    return Pri2

  }
  async Primary_2(address_Primary_1) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_1 = this._grade.getGradeByAddress(address_Primary_1)
    if (!check_Primary_1 || check_Primary_1.type !== 'PRIMARY_1')
      throw 'PRIMARY_1 IS NOT EXIST'
    let Primary_2 = await this._grade.addGrade('PRIMARY_2')
    this.setToAddress(Primary_2.address)
    return 'SUCCESS'

  }
  get_Primary_2() {
    return this._grade.getGradeByType('PRIMARY_2')
  }

  // --------------------Primary_3 ---------------------------
  async create_Primary_3() {
    let Pri3 = await this._grade.createGrade('PRIMARY_3')
    return Pri3

  }
  async Primary_3(address_Primary_2) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_2 = this._grade.getGradeByAddress(address_Primary_2)
    if (!check_Primary_2 || check_Primary_2.type !== 'PRIMARY_2')
      throw 'PRIMARY_2 IS NOT EXIST'
    let Primary_3 = await this._grade.addGrade('PRIMARY_3')
    this.setToAddress(Primary_3.address)
    return 'SUCCESS'

  }
  get_Primary_3() {
    return this._grade.getGradeByType('PRIMARY_3')
  }
  // --------------------Primary_4 ---------------------------
  async create_Primary_4() {
    let Pri4 = await this._grade.createGrade('PRIMARY_4')
    return Pri4

  }
  async Primary_4(address_Primary_3) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_3 = this._grade.getGradeByAddress(address_Primary_3)
    if (!check_Primary_3 || check_Primary_3.type !== 'PRIMARY_3')
      throw 'PRIMARY_3 IS NOT EXIST'
    let Primary_4 = await this._grade.addGrade('PRIMARY_4')
    this.setToAddress(Primary_4.address)
    return 'SUCCESS'

  }
  get_Primary_4() {
    return this._grade.getGradeByType('PRIMARY_4')
  }// --------------------Primary_5 ---------------------------
  async create_Primary_5() {
    let Pri5 = await this._grade.createGrade('PRIMARY_5')
    return Pri5

  }
  async Primary_5(address_Primary_4) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_4 = this._grade.getGradeByAddress(address_Primary_4)
    if (!check_Primary_4 || check_Primary_4.type !== 'PRIMARY_4')
      throw 'PRIMARY_4 IS NOT EXIST'
    let Primary_5 = await this._grade.addGrade('PRIMARY_5')
    this.setToAddress(Primary_5.address)
    return 'SUCCESS'

  }
  get_Primary_5() {
    return this._grade.getGradeByType('PRIMARY_5')
  }
  // --------------------Primary_6 ---------------------------
  async create_Primary_6() {
    let Pri6 = await this._grade.createGrade('PRIMARY_6')
    return Pri6

  }
  async Primary_6(address_Primary_5) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_5 = this._grade.getGradeByAddress(address_Primary_5)
    if (!check_Primary_5 || check_Primary_5.type !== 'PRIMARY_5')
      throw 'PRIMARY_5 IS NOT EXIST'
    let Primary_6 = await this._grade.addGrade('PRIMARY_6')
    this.setToAddress(Primary_6.address)
    return 'SUCCESS'

  }
  get_Primary_6() {
    return this._grade.getGradeByType('PRIMARY_6')
  }

  // --------------------Secondary_1 --------------------------
  async create_Secondary_1() {
    let nd1 = await this._grade.createGrade('SECONDARY_1')
    return nd1

  }
  async Secondary_1(address_Primary_6) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Primary_6 = this._grade.getGradeByAddress(address_Primary_6)
    if (!check_Primary_6 || check_Primary_6.type !== 'PRIMARY_6')
      throw 'PRIMARY_6 IS NOT EXIST'
    let Secondary_1 = await this._grade.addGrade('SECONDARY_1')
    this.setToAddress(Secondary_1.address)
    return 'SUCCESS'

  }
  get_Secondary_1() {
    return this._grade.getGradeByType('SECONDARY_1')
  }
  // --------------------Secondary_2 ---------------------------
  async create_Secondary_2() {
    let nd2 = await this._grade.createGrade('SECONDARY_2')
    return nd2

  }
  async Secondary_2(address_Secondary_1) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_1 = this._grade.getGradeByAddress(address_Secondary_1)
    if (!check_Secondary_1 || check_Secondary_1.type !== 'SECONDARY_1')
      throw 'SECONDARY_1 IS NOT EXIST'
    let Secondary_2 = await this._grade.addGrade('SECONDARY_2')
    this.setToAddress(Secondary_2.address)
    return 'SUCCESS'

  }
  get_Secondary_2() {
    return this._grade.getGradeByType('SECONDARY_2')
  }
  // --------------------Secondary_3_for_2_years ---------------------------
  async create_Secondary_3_for_2_years() {
    let nd3o2 = await this._grade.createGrade('SECONDARY_3_FOR_2_YEARS')
    return nd3o2

  }
  async Secondary_3_for_2_years(address_Secondary_2) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_2 = this._grade.getGradeByAddress(address_Secondary_2)
    if (!check_Secondary_2 || check_Secondary_2.type !== 'SECONDARY_2')
      throw 'SECONDARY_2 IS NOT EXIST'
    let Secondary_3_for_2_years = await this._grade.addGrade('SECONDARY_3_FOR_2_YEARS')
    this.setToAddress(Secondary_3_for_2_years.address)
    return 'SUCCESS'

  }
  get_Secondary_3_for_2_years() {
    return this._grade.getGradeByType('SECONDARY_3_FOR_2_YEARS')
  }
  // --------------------Secondary_4_for_2_years ---------------------------
  async create_Secondary_4_for_2_years() {
    let nd4o2 = await this._grade.createGrade('SECONDARY_4_FOR_2_YEARS')
    return nd4o2
  }
  async Secondary_4_for_2_years(address_Secondary_3_for_2_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_3_for_2_years = this._grade.getGradeByAddress(address_Secondary_3_for_2_years)
    if (!check_Secondary_3_for_2_years || check_Secondary_3_for_2_years.type !== 'SECONDARY_3_FOR_2_YEARS')
      throw 'SECONDARY_3_FOR_2_YEARS IS NOT EXIST'
    let Secondary_4_for_2_years = await this._grade.addGrade('SECONDARY_4_FOR_2_YEARS')
    this.setToAddress(Secondary_4_for_2_years.address)
    return 'SUCCESS'

  }
  get_Secondary_4_for_2_years() {
    return this._grade.getGradeByType('SECONDARY_4_FOR_2_YEARS')
  }
  // --------------------Secondary_3_for_3_years ---------------------------
  async create_Secondary_3_for_3_years() {
    let nd3o3 = await this._grade.createGrade('SECONDARY_3_FOR_3_YEARS')
    return nd3o3
  }
  async Secondary_3_for_3_years(address_Secondary_2) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_2 = this._grade.getGradeByAddress(address_Secondary_2)
    if (!check_Secondary_2 || check_Secondary_2.type !== 'SECONDARY_2')
      throw 'SECONDARY_2 IS NOT EXIST'
    let Secondary_3_for_3_years = await this._grade.addGrade('SECONDARY_3_FOR_3_YEARS')
    this.setToAddress(Secondary_3_for_3_years.address)
    return 'SUCCESS'


  }
  get_Secondary_3_for_3_years() {
    return this._grade.getGradeByType('SECONDARY_3_FOR_3_YEARS')
  }
  // --------------------Secondary_4_for_3_years ---------------------------
  async create_Secondary_4_for_3_years() {
    let nd4o3 = await this._grade.createGrade('SECONDARY_4_FOR_3_YEARS')
    return nd4o3
  }
  async Secondary_4_for_3_years(address_Secondary_3_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_3_for_3_years = this._grade.getGradeByAddress(address_Secondary_3_for_3_years)
    if (!check_Secondary_3_for_3_years || check_Secondary_3_for_3_years.type !== 'SECONDARY_3_FOR_3_YEARS')
      throw 'SECONDARY_3_FOR_3_YEARS IS NOT EXIST'
    let Secondary_4_for_3_years = await this._grade.addGrade('SECONDARY_4_FOR_3_YEARS')
    this.setToAddress(Secondary_4_for_3_years.address)
    return 'SUCCESS'

  }
  get_Secondary_4_for_3_years() {
    return this._grade.getGradeByType('SECONDARY_4_FOR_3_YEARS')
  }
  // --------------------Secondary_5_for_3_years ---------------------------
  async create_Secondary_5_for_3_years() {
    let nd5o3 = await this._grade.createGrade('SECONDARY_5_FOR_3_YEARS')
    return nd5o3
  }
  get_Secondary_5_for_3_years() {
    return this._grade.getGradeByType('SECONDARY_5_FOR_3_YEARS')
  }
  async Secondary_5_for_3_years(address_Secondary_4_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Secondary_4_for_3_years = this._grade.getGradeByAddress(address_Secondary_4_for_3_years)
    if (!check_Secondary_4_for_3_years || check_Secondary_4_for_3_years.type !== 'SECONDARY_4_FOR_3_YEARS')
      throw 'SECONDARY_4_FOR_3_YEARS IS NOT EXIST'
    let Secondary_5_for_3_years = await this._grade.addGrade('SECONDARY_5_FOR_3_YEARS')
    this.setToAddress(Secondary_5_for_3_years.address)
    return 'SUCCESS'

  }

  // --------------------Secondary_4_for_2_years_or_Secondary_5_for_3_years ---------------------------
  checkGrade(address) {
    this._grade.checkGrade = this._grade.getGradeByAddress(address);

    if (this._grade.checkGrade.type == 'SECONDARY_4_FOR_2_YEARS') {
      return true;
    }
    else if (this._grade.checkGrade.type == 'SECONDARY_5_FOR_3_YEARS') {
      return true;
    }
    else {
      throw `SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS_OF_CHECK_GRADE IS NOT EXIST`;

    }

  }

  async Secondary_4_for_2_years_or_Secondary_5_for_3_years() {
    await this.checkGrade(this.sender, 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS_OF_CHECK_GRADE')
    let Secondary_5_for_3_years_or_Secondary_4_for_2_years = await this._grade.createGrade('SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS')
    return Secondary_5_for_3_years_or_Secondary_4_for_2_years
  }


  // --------------------Polytechnic ---------------------------
  async create_Polytechnic() {
    let Poly = await this._grade.createGrade('POLYTECHNIC')
    return Poly
  }
  async Polytechnic(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_secondary = this._grade.getGradeByAddress(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years)
    if (!check_secondary || check_secondary.type !== 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS')
      throw 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS IS NOT EXIST'
    let Polytechnic = await this._grade.addGrade('POLYTECHNIC')
    this.setToAddress(Polytechnic.address)
    return 'SUCCESS'
  }


  get_Polytechnic() {
    return this._grade.getGradeByType('POLYTECHNIC')
  }
  // --------------------Institute_of_Technical_Ed ---------------------------
  async create_Institute_of_Technical_Ed() {
    let Institute_of_Technical = await this._grade.addGrade('INSTITUTE_OF_TECHNICAL_ED')
    return Institute_of_Technical
  }
  async Institute_of_Technical_Ed(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_secondary = this._grade.getGradeByAddress(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years)
    if (!check_secondary || check_secondary.type !== 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS')
      throw 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS IS NOT EXIST'
    let Institute_of_Technical_Ed = await this._grade.addGrade('INSTITUTE_OF_TECHNICAL_ED')
    this.setToAddress(Institute_of_Technical_Ed.address)
    return 'SUCCESS'
  }


  get_Institute_of_Technical_Ed() {
    return this._grade.getGradeByType('INSTITUTE_OF_TECHNICAL_ED')
  }
  // --------------------Polytechnic_of_Institute_of_Technical_Ed ---------------------------
  async create_Polytechnic_of_Institute_of_Technical_Ed() {
    let Institute = await this._grade.createGrade('POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED')
    return Institute
  }
  async Polytechnic_of_Institute_of_Technical_Ed(address_Institute_of_Technical_Ed) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_Ins = this._grade.getGradeByAddress(address_Institute_of_Technical_Ed)
    if (!check_Ins || check_Ins.type !== 'INSTITUTE_OF_TECHNICAL_ED')
      throw 'INSTITUTE_OF_TECHNICAL_ED IS NOT EXIST'
    let Polytechnic_of_Institute_of_Technical_Ed = await this._grade.addGrade('POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED')
    this.setToAddress(Polytechnic_of_Institute_of_Technical_Ed.address)
    return 'SUCCESS'
  }


  get_Polytechnic_of_Institute_of_Technical_Ed() {
    return this._grade.getGradeByType('POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED')
  }
  // --------------------Pre_University---------------------------
  async create_Pre_University() {
    let pre = await this._grade.createGrade('PRE_UNIVERSITY')
    return pre
  }
  async Pre_University(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_secondary = this._grade.getGradeByAddress(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years)
    if (!check_secondary || check_secondary.type !== 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS')
      throw 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS IS NOT EXIST'
    let Pre_University = await this._grade.addGrade('PRE_UNIVERSITY')
    this.setToAddress(Pre_University.address)
    return 'SUCCESS'
  }


  get_Pre_University() {
    return this._grade.getGradeByType('PRE_UNIVERSITY')
  }

  // --------------------Junior_College---------------------------
  async create_Junior_College() {
    let junior = await this._grade.createGrade('JUNIOR_COLLEGE')
    return junior
  }
  async Junior_College(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let check_secondary = this._grade.getGradeByAddress(address_Secondary_4_for_2_years_or_Secondary_5_for_3_years)
    if (!check_secondary || check_secondary.type !== 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS')
      throw 'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS IS NOT EXIST'
    let Junior_College = await this._grade.addGrade('JUNIOR_COLLEGE')
    this.setToAddress(Junior_College.address)
    return 'SUCCESS'
  }
  get_Junior_College() {
    return this._grade.getGradeByType('JUNIOR_COLLEGE')
  }
  // --------------------University---------------------------
  checkUniversity(address) {

    this._grade.checkGrade = this._grade.getGradeByAddress(address);

    if (this._grade.checkGrade.type == 'POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED') {
      return true;
    }
    else if (this._grade.checkGrade.type == 'JUNIOR_COLLEGE') {
      return true;
    }
    else if (this._grade.checkGrade.type == 'PRE_UNIVERSITY') {
      return true;
    }
    else if (this._grade.checkGrade.type == 'POLYTECHNIC') {
      return true;
    }
    else {
      throw `POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED_OR_JUNIOR_COLLEGE_PRE_UNIVERSITY_OR_POLYTECHNIC IS NOT EXIST`;

    }

  }

  async create_University() {
    await this.checkUniversity(this.sender, 'POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED_OR_JUNIOR_COLLEGE_PRE_UNIVERSITY_OR_POLYTECHNIC')
    let create_Uni = await this._grade.createGrade('UNIVERSITY')
    return create_Uni
  }

  async University(address_Condition) {
    this._student.checkStudent(this.sender, 'STUDENT')
    let checkUniversity = this._grade.getGradeByAddress(address_Condition)
    if (!checkUniversity || checkUniversity.type !== 'UNIVERSITY')
      throw 'UNIVERSITY IS NOT EXIST'
    let University = await this._grade.addGrade('UNIVERSITY')
    this.setToAddress(University.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
