import Contract from 'Contract'
const types = [
  'PRE_NURSERY',
  'NURSERY',
  'KINGDERGARTEN_1ST_YEAR',
  'KINGDERGARTEN_2ND_YEAR',
  'PRIMARY_1',
  'PRIMARY_2',
  'PRIMARY_3',
  'PRIMARY_4',
  'PRIMARY_5',
  'PRIMARY_6',
  'SECONDARY_1',
  'SECONDARY_2',
  'SECONDARY_3_FOR_2_YEARS',
  'SECONDARY_4_FOR_2_YEARS',
  'SECONDARY_3_FOR_3_YEARS',
  'SECONDARY_4_FOR_3_YEARS',
  'SECONDARY_5_FOR_3_YEARS',
  'SECONDARY_4_FOR_2_YEARS_OR_SECONDARY_5_FOR_3_YEARS',
  'POLYTECHNIC',
  'INSTITUTE_OF_TECHNICAL_ED',
  'PRE_UNIVERSITY',
  'POLYTECHNIC_OF_INSTITUTE_OF_TECHNICAL_ED',
  'JUNIOR_COLLEGE',
  'UNIVERSITY']
class Grade extends Contract {
  async createGrade(type) {
    if (!types.includes(type)) throw 'CREATE GRADE FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: type,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  checkGrade(address, type) {
    let checkGrade = this.getGradeByAddress(address)
    if (!checkGrade || checkGrade.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  async addGrade(type) {
    let address = await this.createGrade(type)
    this.setToAddress(address)
    return { type: address }
  }
  getGradeByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getGradeByType(type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Grade;