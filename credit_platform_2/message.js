import Contract from 'Contract'
class Admin extends Contract {
  async Message() {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'MESSAGE',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getMessageByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkMessage(address) {
    let check = this.getMessageByAddress(address)
    if (!check || check.type !== 'MESSAGE') throw `MESSAGE IS NOT EXIST`
    return true
  }
  getMessage () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'MESSAGE') lists.push(account)
    })
    return lists
  }
}
export default Message
