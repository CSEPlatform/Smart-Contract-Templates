import Contract from 'Contract'
class Act extends Contract {
  async createAct (type) {
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
  async addAct (type) {
    let address = await this.createAct(type)
    this.setToAddress(address)
    return { type: address }
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