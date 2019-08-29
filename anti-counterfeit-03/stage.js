import Contract from 'Contract'
class Stage extends Contract {
  async createStage (type) {
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
  async addStage (type) {
    let address = await this.createStage(type)
    this.setToAddress(address)
    return { type: address }
  }
  getStageByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getStageByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Stage;