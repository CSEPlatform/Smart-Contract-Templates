import Contract from 'Contract'
const types = ['STUDENT']
class Student extends Contract {
  async createStudent (type) {
    if (!types.includes(type)) throw 'CREATE STUDENT FAIL'
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
  checkStudent (address, type) {
    let checkStudent = this.getStudentByAddress(address)
    if (!checkStudent || checkStudent.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getStudentByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getStudentByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Student;