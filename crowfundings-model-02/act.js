import Contract from 'Contract'
const types = ['PAYOUT_MODES']
class Act extends Contract {
  async createAct (type) {
    if (!types.includes(type)) throw 'CREATE ACT FAIL'
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
  checkAct(address, type) {
    let checkAct= this.getActByAddress(address)
    if (!checkAct || checkAct.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getActByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getActByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Act;