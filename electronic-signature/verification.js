import Contract from 'Contract'
class Verification extends Contract {
  async createVerification () {
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: 'DIGITALLY_SIGNED_DATA',
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  getVerificationByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  checkVerification (address) {
    let check = this.getVerificationByAddress(address)
    if (!check || check.type !== 'DIGITALLY_SIGNED_DATA') throw `DIGITALLY_SIGNED_DATA IS NOT EXIST`
    return true
  }
  getVerification () {
    let lists = []
    this.accounts.find(account => {
      if (account.type === 'DIGITALLY_SIGNED_DATA') lists.push(account)
    })
    return lists
  }
}
export default Verification
