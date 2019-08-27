import Contract from 'Contract'
class Tax extends Contract {
  async createTax (type) {
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
  async addTax (type) {
    let address = await this.createTax(type)
    this.setToAddress(address)
    return { type: address }
  }
  getTaxByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getTaxByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Tax;