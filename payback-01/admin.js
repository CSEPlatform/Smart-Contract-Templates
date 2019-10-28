import Contract from 'Contract'
class Admin extends Contract {
  async createAdmin () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'ADMIN',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getAdminByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkAdmin(address) {
    let check = this.getAdminByAddress(address)
    if (!check || check.type !== 'ADMIN') throw `ADMIN IS NOT EXIST`
    return true
  }
  getAdmin () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'ADMIN') lists.push(account)
    })
    return lists
  }
}
export default Admin
