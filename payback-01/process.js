import Contract from 'Contract'
class Process extends Contract {
  async createProcess (type) {
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
  async addProcess (type) {
    let address = await this.createProcess(type)
    this.setToAddress(address)
    return { type: address }
  }
  checkProcess(address, type) {
    let checkProcess = this.getProcessByAddress(address)
    if (!checkProcess || checkProcess.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getProcessByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getProcessByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Process;