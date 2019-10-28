import Contract from 'Contract'
class Place_Order extends Contract {
  async createPlace_Order () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'PLACE_ORDER',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getPlace_OrderByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkPlace_Order (address) {
    let check = this.getPlace_OrderByAddress(address)
    if (!check || check.type !== 'PLACE_ORDER') throw `PLACE_ORDER IS NOT EXIST`
    return true
  }
  getPlace_Order () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'PLACE_ORDER') lists.push(account)
    })
    return lists
  }
}
export default Place_Order
