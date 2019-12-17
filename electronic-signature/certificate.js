import Contract from 'Contract'
const types = ['CERTIFICATE']
class Certificate extends Contract {
  async createCertificate (type) {
    if (!types.includes(type)) throw 'CREATE CERTIFICATE FAIL'
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
  checkCertificate (address, type) {
    let checkCertificate = this.getCertificateByAddress(address)
    if (!checkCertificate || checkCertificate.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getCertificateByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getCertificateByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Certificate;