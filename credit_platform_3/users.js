import Contract from 'Contract'
const types = ['STUDENT', 'UNIVERSITY','SYSTEM']
class Users extends Contract {
  async createUsers(type, ProcessAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE USER FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      process: ProcessAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkUser(address, type) {
    let checkUser = this.getUserByAddress(address)
    if (!checkUser || checkUser.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getUserByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getUsersByType(type, ProcessAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.process === ProcessAddress) {
        lists.push(account)
      }
    })
    return lists
  }
}
export default Users