import Contract from 'Contract'
class Login extends Contract {
  async createLogin () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'LOGIN',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getLoginByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkLogin (address) {
    let check = this.getLoginByAddress(address)
    if (!check || check.type !== 'LOGIN') throw `LOGIN IS NOT EXIST`
    return true
  }
  getLogin () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'LOGIN') lists.push(account)
    })
    return lists
  }
}
export default Login
