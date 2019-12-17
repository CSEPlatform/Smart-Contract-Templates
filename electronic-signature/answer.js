import Contract from 'Contract'
const types = ['EQUAL','DIFFERENT']
class Answer extends Contract {
  async createAnswer(type, LoginAddress) {
    console.log(type)
    if (!types.includes(types[type])) throw 'CREATE ANSWER FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: types[type],
      verification: VerificationAddress,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return { type: types[type], address }
  }
  checkAnswer(address, type) {
    let checkAnswer = this.getAnswerByAddress(address)
    if (!checkAnswer || checkAnswer.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getAnswerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getAnswerByType(type, VerificationAddress) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type && account.login === VerificationAddress) {
        lists.push(account)
      }
    })
    return lists
  }
}
export default Answer