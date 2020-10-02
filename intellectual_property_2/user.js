import Contract from 'Contract'
const types = ['AUTHOR','EDITOR','SECTION_EDITOR','REVIEWR','USER']
class User extends Contract {
  async createUser (type) {
    if (!types.includes(type)) throw 'CREATE USER FAIL'
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
  checkUser (address, type) {
    let checkUser = this.getUserByAddress(address)
    if (!checkUser || checkUser.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getUserByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getUserByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default User;