import Contract from 'Contract'
const types = ['INPUT_SEND_WALLET','END']
class Input extends Contract {
  async createInput (type, AdminAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE INPUT FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      Admin: AdminAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkInput (address, type) {
    let checkInput = this.getInputByAddress(address)
    if (!checkInput || checkInput.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getInputByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getInputByType (type, AdminAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.process === AdminAddress) {
        lists.push(account)
      }
    })
    return lists
  }
}
export default Input