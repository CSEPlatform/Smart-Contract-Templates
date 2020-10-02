import Contract from 'Contract'
class Grade extends Contract {
  async createGrade (type) {
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
  async addGrade (type) {
    let address = await this.createGrade(type)
    this.setToAddress(address)
    return { type: address }
  }
  getGradeByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getGradeByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Grade;