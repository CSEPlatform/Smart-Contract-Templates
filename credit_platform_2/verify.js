import Contract from 'Contract'
const types = ['YES','NO']
class Verify extends Contract {
  async (type, messageAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      message: messageAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkVerify(address, type) {
    let checkVerify = this.getVerifyByAddress(address)
    if (!checkVerify || checkVerify.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getVerifyByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getVerifyByType (type, messageAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.message === messageAddress) {
        lists.push(account)
      }
    })
    return lists
  }
}
export default Verify