import Contract from 'Contract'
import Student from './student'
import Grade from './grade'
class TokenMain extends Contract {
  static viewFuncs = [
    'getStudent',
    'getPre_school',
    'getkingdergarten',
    'get_1st_Grade',
    'get_2nd_Grade',
    'get_3rd_Grade',
    'get_4th_Grade',
    'get_5th_Grade',
    'get_6th_Grade',
    'get_7th_Grade',
    'get_8th_Grade',
    'get_9th_Grade',
    'get_10th_Grade',
    'get_11th_Grade',
    'get_12th_Grade'
  ]
  static authenticationFuncs = [
    'createPre_school',
    'createKingdergarten',
    'create_1st_Grade',
    'create_2nd_Grade',
    'create_3rd_Grade',
    'create_4th_Grade',
    'create_5th_Grade',
    'create_6th_Grade',
    'create_7th_Grade',
    'create_8th_Grade',
    'create_9th_Grade',
    'create_10th_Grade',
    'create_11th_Grade',
    'create_12th_Grade',
    'createCollege'
  ]
  static publicFuncs = [
    'createStudent',
    'getStudent',
    'createPre_school',
    'getPre_school',
    'createKingdergarten',
    'getkingdergarten',
    'create_1st_Grade',
    'get_1st_Grade',
    'create_2nd_Grade',
    'get_2nd_Grade',
    'create_3rd_Grade',
    'get_3rd_Grade',
    'create_4th_Grade',
    'get_4th_Grade',
    'create_5th_Grade',
    'get_5th_Grade',
    'create_6th_Grade',
    'get_6th_Grade',
    'create_7th_Grade',
    'get_7th_Grade',
    'create_8th_Grade',
    'get_8th_Grade',
    'create_9th_Grade',
    'get_9th_Grade',
    'create_10th_Grade',
    'get_10th_Grade',
    'create_11th_Grade',
    'get_11th_Grade',
    'create_12th_Grade',
    'get_12th_Grade',
    'createCollege'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'AMERICAN_EDUCATION'
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
  // --------------------PRE_SCHOOL--------------------------- 
  checkPre_school(address) {
    let checkPre_school = this.getPre_schoolByAddress(address)
    if (!checkPre_school || checkPre_school.type !== 'PRE_SCHOOL') throw `PRE_SCHOOL IS NOT EXIST`
    return true
  }
  getPre_schoolByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createPre_school() {
    await this._student.checkStudent(this.sender, 'STUDENT')
    let pre_school = await this._grade.createGrade('PRE_SCHOOL')
    return pre_school
  }
  getPre_school() {
    return this._grade.getGradeByType('PRE_SCHOOL')
  }
  // --------------------KINGDERGARTEN-------------------------- 
  checkKingdergarten(address) {
    let checkKingdergarten = this.getKingdergartenByAddress(address)
    if (!checkKingdergarten || checkKingdergarten.type !== 'KINGDERGARTEN') throw `KINGDERGARTEN IS NOT EXIST`
    return true
  }
  getKingdergartenByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async createKingdergarten() {
    await this.checkPre_school(this.sender, 'PRE_SCHOOL')
    let kingdergarten = await this._grade.createGrade('KINGDERGARTEN')
    return kingdergarten
  }
  getkingdergarten() {
    return this._grade.getGradeByType('KINGDERGARTEN')
  }
  // --------------------1ST_GRADE---------------------------
  check1st_Grade(address) {
    let check1st_Grade = this.get1st_GradeByAddress(address)
    if (!check1st_Grade || check1st_Grade.type !== '1ST_GRADE') throw `1ST_GRADE IS NOT EXIST`
    return true
  }
  get1st_GradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_1st_Grade() {
    await this.checkKingdergarten(this.sender, 'KINGDERGARTEN')
    let st1_grade = await this._grade.createGrade('1ST_GRADE')
    return st1_grade
  }
  get_1st_Grade() {
    return this._grade.getGradeByType('1ST_GRADE')
  }
  // --------------------2ND_GRADE---------------------------
  check2nd_Grade(address) {
    let check2nd_Grade = this.get2ndGradeByAddress(address)
    if (!check2nd_Grade || check2nd_Grade.type !== '2ND_GRADE') throw `2ND_GRADE IS NOT EXIST`
    return true
  }
  get2ndGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_2nd_Grade() {
    await this.check1st_Grade(this.sender, '1ST_GRADE')
    let nd2_grade = await this._grade.createGrade('2ND_GRADE')
    return nd2_grade
  }
  get_2nd_Grade() {
    return this._grade.getGradeByType('2ND_GRADE')
  }
  // --------------------3RD_GRADE---------------------------
  check3rd_Grade(address) {
    let check3rd_Grade = this.get3rd_GradeByAddress(address)
    if (!check3rd_Grade || check3rd_Grade.type !== '3RD_GRADE') throw `3RD_GRADE IS NOT EXIST`
    return true
  }
  get3rd_GradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_3rd_Grade() {
    await this.check2nd_Grade(this.sender, '2ND_GRADE')
    let rd3_grade = await this._grade.createGrade('3RD_GRADE')
    return rd3_grade
  }
  get_3rd_Grade() {
    return this._grade.getGradeByType('3RD_GRADE')
  }
  // --------------------4TH_GRADE ---------------------------
  check4thGrade(address) {
    let check4thGrade = this.get4thGradeByAddress(address)
    if (!check4thGrade || check4thGrade.type !== '4TH_GRADE') throw `4TH_GRADE IS NOT EXIST`
    return true
  }
  get4thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_4th_Grade() {
    await this.check3rd_Grade(this.sender, '3RD_GRADE')
    let th4_grade = await this._grade.createGrade('4TH_GRADE')
    return th4_grade
  }
  get_4th_Grade() {
    return this._grade.getGradeByType('4TH_GRADE')
  }
  // --------------------5TH_GRADE ---------------------------
  check5thGrade(address) {
    let check5thGrade = this.get5thGradeByAddress(address)
    if (!check5thGrade || check5thGrade.type !== '5TH_GRADE') throw `5TH_GRADE IS NOT EXIST`
    return true
  }
  get5thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_5th_Grade() {
    await this.check4thGrade(this.sender, '4TH_GRADE')
    let th5_grade = await this._grade.createGrade('5TH_GRADE')
    return th5_grade
  }
  get_5th_Grade() {
    return this._grade.getGradeByType('5TH_GRADE')
  }
  // --------------------6TH_GRADE ---------------------------
  check6thGrade(address) {
    let check6thGrade = this.get6thGradeByAddress(address)
    if (!check6thGrade || check6thGrade.type !== '6TH_GRADE') throw `6TH_GRADE IS NOT EXIST`
    return true
  }
  get6thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_6th_Grade() {
    await this.check5thGrade(this.sender, '5TH_GRADE')
    let th6_grade = await this._grade.createGrade('6TH_GRADE')
    return th6_grade
  }
  get_6th_Grade() {
    return this._grade.getGradeByType('6TH_GRADE')
  }
  // --------------------7TH_GRADE ---------------------------
  check7thGrade(address) {
    let check7thGrade = this.get7thGradeByAddress(address)
    if (!check7thGrade || check7thGrade.type !== '7TH_GRADE') throw `7TH_GRADE IS NOT EXIST`
    return true
  }
  get7thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_7th_Grade() {
    await this.check6thGrade(this.sender, '6TH_GRADE')
    let th7_grade = await this._grade.createGrade('7TH_GRADE')
    return th7_grade
  }
  get_7th_Grade() {
    return this._grade.getGradeByType('7TH_GRADE')
  }
  // --------------------8TH_GRADE ---------------------------
  check8thGrade(address) {
    let check8thGrade = this.get8thGradeByAddress(address)
    if (!check8thGrade || check8thGrade.type !== '8TH_GRADE') throw `8TH_GRADE IS NOT EXIST`
    return true
  }
  get8thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_8th_Grade() {
    await this.check7thGrade(this.sender, '7TH_GRADE')
    let th8_grade = await this._grade.createGrade('8TH_GRADE')
    return th8_grade
  }
  get_8th_Grade() {
    return this._grade.getGradeByType('8TH_GRADE')
  }
  // --------------------9TH_GRADE ---------------------------
  check9thGrade(address) {
    let check9thGrade = this.get9thGradeByAddress(address)
    if (!check9thGrade || check9thGrade.type !== '9TH_GRADE') throw `9TH_GRADE IS NOT EXIST`
    return true
  }
  get9thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_9th_Grade() {
    await this.check8thGrade(this.sender, '8TH_GRADE')
    let th9_grade = await this._grade.createGrade('9TH_GRADE')
    return th9_grade
  }
  get_9th_Grade() {
    return this._grade.getGradeByType('9TH_GRADE')
  }
  // --------------------10TH_GRADE ---------------------------
  check10thGrade(address) {
    let check10thGrade = this.get10thGradeByAddress(address)
    if (!check10thGrade || check10thGrade.type !== '10TH_GRADE') throw `10TH_GRADE IS NOT EXIST`
    return true
  }
  get10thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_10th_Grade() {
    await this.check9thGrade(this.sender, '9TH_GRADE')
    let th10_grade = await this._grade.createGrade('10TH_GRADE')
    return th10_grade
  }
  get_10th_Grade() {
    return this._grade.getGradeByType('10TH_GRADE')
  }
  // --------------------11TH_GRADE ---------------------------
  check11thGrade(address) {
    let check11thGrade = this.get11thGradeByAddress(address)
    if (!check11thGrade || check11thGrade.type !== '11TH_GRADE') throw `11TH_GRADE IS NOT EXIST`
    return true
  }
  get11thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_11th_Grade() {
    await this.check10thGrade(this.sender, '10TH_GRADE')
    let th11_grade = await this._grade.createGrade('11TH_GRADE')
    return th11_grade
  }
  get_11th_Grade() {
    return this._grade.getGradeByType('11TH_GRADE')
  }
  // --------------------12TH_GRADE ---------------------------
  check12thGrade(address) {
    let check12thGrade = this.get12thGradeByAddress(address)
    if (!check12thGrade || check12thGrade.type !== '12TH_GRADE') throw `12TH_GRADE IS NOT EXIST`
    return true
  }
  get12thGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_12th_Grade() {
    await this.check11thGrade(this.sender, '11TH_GRADE')
    let th12_grade = await this._grade.createGrade('12TH_GRADE')
    return th12_grade
  }
  get_12th_Grade() {
    return this._grade.getGradeByType('12TH_GRADE')
  }
  // --------------------COLLEGE---------------------------
  async createCollege() {
    let check12thGrade = this._grade.getGradeByAddress(this.sender)
    if (!check12thGrade || check12thGrade.type !== '12TH_GRADE') throw '12TH_GRADE IS NOT EXIST'
    let college = await this._grade.createGrade('COLLEGE')
    this.setToAddress(college.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
