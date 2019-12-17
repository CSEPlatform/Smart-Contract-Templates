import Contract from 'Contract'
import Payment from 'Payment'
class TokenMain extends Contract {
  static viewFuncs = [ 'getTokenName']
  static authenticationFuncs = ['Transaction']
  static publicFuncs = [
    'getTokenName',
    'createAccount',
    'Transaction',
  ]
  static schemas = {
    name: {
      type: String,
      default: 'ECOMMERCE-ORDERS'
    },
    tokenName: {
      type: String,
      required: true
    },
    transaction: [{
      amount: {
        type: Number,
        default: 0
      },
      CustomerAddress: {
        type: String,
        required: true
      },
      timestamp: {
        type: Number,
        required: true
      }
    }]
  }
  constructor(data) {
    super(data)
    this._payment = new Payment(data)
  }
  getTokenName() {
    return this.tokenName;
  }
  async createAccount() {
    const address = await this.generateAddress();
    this.transaction;
    return address;
  }
  async Transaction(amount) {
    if (!amount) throw 'not have amount'
    const CustomerAddress = this.sender
    const rs = {
      amount: 0,
      CustomerAddress: CustomerAddress,
      timestamp: this.timestamp()
    }
    this.transaction.push(rs)
    return { CustomerAddress, amount }
  }
}
export default TokenMain