import Contract from 'Contract'
import User from './user'
import Stage from './stage'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Wholesaler',
    'get_Retailer',
    'get_Customer',
    'get_Manufacturer',
    'get_Place_PO_on_Manufacturer',
    'get_Create_WO',
    'get_Manufacturer_Goods',
    'get_Blockchain_Token_for_Finished_Good',
    'get_Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'get_Receive_PO_and_verify_Tag',
    'get_Place_PO_on_wholesaler',
    'get_Sales_Order_Generated_for_Ratailer',
    'get_Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'get_Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'get_PO_Receipt_on_Verification_of_Token',
    'get_Purchase_Product_from_Retailer',
    'get_Product_sold_to_customer',
    'get_Ships_Goods_to_Customer',
    

  ]
  static authenticationFuncs = [
   
    'Place_PO_on_Manufacturer',
    'Create_WO',
    'Manufacturer_Goods',
    'Blockchain_Token_for_Finished_Good',
    'Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'Receive_PO_and_verify_Tag',
    'Place_PO_on_wholesaler',
    'Sales_Order_Generated_for_Ratailer',
    'Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'PO_Receipt_on_Verification_of_Token',
    'Purchase_Product_from_Retailer',
    'Product_sold_to_customer',
    'Ships_Goods_to_Customer',
    'Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token',
    'Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag',
    'Receipt_and_Verify_the_Product_and_track_history_using_Token'

  ]
  static publicFuncs = [



    'create_Wholesaler',
    'get_Wholesaler',
    'create_Retailer',
    'get_Retailer',
    'create_Customer',
    'get_Customer',
    'create_Manufacturer',
    'get_Manufacturer',
    'Place_PO_on_Manufacturer',
    'get_Place_PO_on_Manufacturer',
    'Create_WO',
    'get_Create_WO',
    'Manufacturer_Goods',
    'get_Manufacturer_Goods',
    'Blockchain_Token_for_Finished_Good',
    'get_Blockchain_Token_for_Finished_Good',
    'Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'get_Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'Receive_PO_and_verify_Tag',
    'get_Receive_PO_and_verify_Tag',
    'Place_PO_on_wholesaler',
    'get_Place_PO_on_wholesaler',
    'Sales_Order_Generated_for_Retailer',
    'get_Sales_Order_Generated_for_Retailer',
    'Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag',
    'Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'get_Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'get_Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'PO_Receipt_on_Verification_of_Token',
    'get_PO_Receipt_on_Verification_of_Token',
    'Purchase_Product_from_Retailer',
    'get_Purchase_Product_from_Retailer',
    'Product_sold_to_customer',
    'get_Product_sold_to_customer',
    'Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token',
    'Ships_Goods_to_Customer',
    'get_Ships_Goods_to_Customer',
    'Receipt_and_Verify_the_Product_and_track_history_using_Token'


  ]
  static schemas = {
    name: {
      type: String,
      default: 'ANTI_COUNTERFEIT_SOLUTION'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._user = new User(data)
    this._stage = new Stage(data)
  }
  //---------------------USER------------------------------
  async create_Wholesaler() {
    let Wholesaler = await this._user.createUser('WHOLESALER')
    return Wholesaler
  }
  get_Wholesaler() {
    let Wholesaler = this._user.getUserByType('WHOLESALER')
    return Wholesaler
  }
  async create_Retailer() {
    let Retailer = await this._user.createUser('RETAILER')
    return Retailer
  }
  get_Retailer() {
    let Retailer = this._user.getUserByType('RETAILER')
    return Retailer
  }

  async create_Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  get_Customer() {
    let Customer = this._user.getUserByType('CUSTOMER')
    return Customer
  }
  async create_Manufacturer() {
    let Manufacturer = await this._user.createUser('MANUFACTURER')
    return Manufacturer
  }
  get_Manufacturer() {
    let Manufacturer = this._user.getUserByType('MANUFACTURER')
    return Manufacturer
  }



  // --------------------Place_PO_on_Manufacturer---------------------------
 

  async Place_PO_on_Manufacturer() {
    await this._user.checkUser(this.sender, 'WHOLESALER')
    let good = await this._stage.createStage('PLACE_PO_ON_MANUFACTURER')
    return good
  }
  get_Place_PO_on_Manufacturer() {
    return this._stage.getStageByType('PLACE_PO_ON_MANUFACTURER')
  }

  // --------------------Create_WO---------------------------


  async Create_WO(address_Place_PO_on_Manufacturer) {
    this._user.checkUser(this.sender, 'MANUFACTURER')
    let check_Place_PO_on_Manufacturer = this._stage.getStageByAddress(address_Place_PO_on_Manufacturer)
    if (!check_Place_PO_on_Manufacturer || check_Place_PO_on_Manufacturer.type !== 'PLACE_PO_ON_MANUFACTURER')
      throw 'PLACE_PO_ON_MANUFACTURER IS NOT EXIST'
    let Create_WO = await this._stage.createStage('CREATE_WO')
    return Create_WO

  }

  get_Create_WO() {
    return this._stage.getStageByType('CREATE_WO')
  }


  // --------------------Manufacturer_Goods---------------------------


  async Manufacturer_Goods(address_Create_WO) {
    this._user.checkUser(this.sender, 'MANUFACTURER')
    let check_Create_WO = this._stage.getStageByAddress(address_Create_WO)
    if (!check_Create_WO || check_Create_WO.type !== 'CREATE_WO')
      throw 'CREATE_WO IS NOT EXIST'
    let Manufacturer_Goods = await this._stage.createStage('MANUFACTURER_GOODS')
    return Manufacturer_Goods

  }
  get_Manufacturer_Goods() {
    return this._stage.getStageByType('MANUFACTURER_GOODS')
  }

  // --------------------Blockchain_Token_for_Finished_Good---------------------------

  async Blockchain_Token_for_Finished_Good(address_Manufacturer_Goods) {
    this._user.checkUser(this.sender, 'MANUFACTURER')
    let check_Manufacturer_Goods = this._stage.getStageByAddress(address_Manufacturer_Goods)
    if (!check_Manufacturer_Goods || check_Manufacturer_Goods.type !== 'MANUFACTURER_GOODS')
      throw 'MANUFACTURER_GOODS IS NOT EXIST'
    let Blockchain_Token_for_Finished_Good = await this._stage.createStage('BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
    return Blockchain_Token_for_Finished_Good

  }

  get_Blockchain_Token_for_Finished_Good() {
    return this._stage.getStageByType('BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
  }

  // --------------------Order_Fulfillment_ship_the_goods_with_Generated_Token---------------------------



  async Order_Fulfillment_ship_the_goods_with_Generated_Token(address_Blockchain_Token_for_Finished_Good) {
    this._user.checkUser(this.sender, 'MANUFACTURER')
    let check_Blockchain_Token_for_Finished_Good = this._stage.getStageByAddress(address_Blockchain_Token_for_Finished_Good)
    if (!check_Blockchain_Token_for_Finished_Good || check_Blockchain_Token_for_Finished_Good.type !== 'BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
      throw 'BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD IS NOT EXIST'
    let Order_Fulfillment_ship_the_goods_with_Generated_Token = await this._stage.createStage('ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
    return Order_Fulfillment_ship_the_goods_with_Generated_Token

  }

  get_Order_Fulfillment_ship_the_goods_with_Generated_Token() {
    return this._stage.getStageByType('ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
  }
  // --------------------Receive_PO_and_verify_Tag---------------------------
  check_Receive_PO_and_verify_Tag(address) {
    let check_Receive_PO_and_verify_Tag = this.get_Receive_PO_and_verify_TagByAddress(address)
    if (!check_Receive_PO_and_verify_Tag || check_Receive_PO_and_verify_Tag.type !== 'RECEIVE_PO_AND_VERIFY_TAG') throw `RECEIVE_PO_AND_VERIFY_TAG IS NOT EXIST`
    return true
  }
  get_Receive_PO_and_verify_TagByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Receive_PO_and_verify_Tag(address_Order_Fulfillment_ship_the_goods_with_Generated_Token) {
    this._user.checkUser(this.sender, 'WHOLESALER')
    let check_Order_Fulfillment_ship_the_goods_with_Generated_Token = this._stage.getStageByAddress(address_Order_Fulfillment_ship_the_goods_with_Generated_Token)
    if (!check_Order_Fulfillment_ship_the_goods_with_Generated_Token || check_Order_Fulfillment_ship_the_goods_with_Generated_Token.type !== 'ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
      throw 'ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN IS NOT EXIST'
    let Receive_PO_and_verify_Tag = await this._stage.createStage('RECEIVE_PO_AND_VERIFY_TAG')
    return Receive_PO_and_verify_Tag

  }

  get_Receive_PO_and_verify_Tag() {
    return this._stage.getStageByType('RECEIVE_PO_AND_VERIFY_TAG')
  }

  // --------------------Place_PO_on_wholesaler---------------------------
 
  async Place_PO_on_wholesaler() {
    await this._user.checkUser(this.sender, 'RETAILER')
    let Place_PO_on_wholesaler = await this._stage.createStage('PLACE_PO_ON_WHOLESALER')
    return Place_PO_on_wholesaler
  }

  get_Place_PO_on_wholesaler() {
    return this._stage.getStageByType('PLACE_PO_ON_WHOLESALER')
  }


  // --------------------Sales_Order_Generated_for_Ratailer---------------------------
  check_Sales_Order_Generated_for_Retailer(address) {
    let check_Sales_Order_Generated_for_Retailer = this.get_Sales_Order_Generated_for_RetailerByAddress(address)
    if (!check_Sales_Order_Generated_for_Retailer || check_Sales_Order_Generated_for_Retailer.type !== 'SALES_ORDER_GENERATED_FOR_RETAILER') throw `SALES_ORDER_GENERATED_FOR_RETAILER IS NOT EXIST`
    return true
  }
  get_Sales_Order_Generated_for_RetailerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Sales_Order_Generated_for_Retailer(address_check_Place_PO_on_wholesaler) {
    this._user.checkUser(this.sender, 'WHOLESALER')
    let check_Place_PO_on_wholesaler = this._stage.getStageByAddress(address_check_Place_PO_on_wholesaler)
    if (!check_Place_PO_on_wholesaler || check_Place_PO_on_wholesaler.type !== 'PLACE_PO_ON_WHOLESALER')
      throw 'PLACE_PO_ON_WHOLESALER IS NOT EXIST'
    let Sales_Order_Generated_for_Retailer = await this._stage.createStage('SALES_ORDER_GENERATED_FOR_RETAILER')
    return Sales_Order_Generated_for_Retailer

  }

  get_Sales_Order_Generated_for_Retailer() {
    return this._stage.getStageByType('SALES_ORDER_GENERATED_FOR_RETAILER')
  }
  // --------------------Fulfillment_of_Sales_Order_Shipment_to_Retailer---------------------------
 
   checkSale(address) {
    this.check_Sales_Order_Generated_for_Retailer = this.get_Sales_Order_Generated_for_RetailerByAddress(address);
    this.check_Receive_PO_and_verify_Tag = this.get_Receive_PO_and_verify_TagByAddress(address);

    if (this.check_Sales_Order_Generated_for_Retailer.type == 'SALES_ORDER_GENERATED_FOR_RETAILER') {
      return true;
    }
    else if (this.check_Receive_PO_and_verify_Tag.type == 'RECEIVE_PO_AND_VERIFY_TAG') {
      return true;
    }
    else {
      throw `SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG_OF_SALE IS NOT EXIST`;

    }

  }
  async Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag() {
    await this.checkSale(this.sender, 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG_OF_SALE')
    let Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag = await this._stage.createStage('SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG')
    return Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag
  }

  async Fulfillment_of_Sales_Order_Shipment_to_Retailer(address_Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag) {
    this._user.checkUser(this.sender, 'WHOLESALER')
    let checkSales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag = this._stage.getStageByAddress(address_Sales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag)
    if (!checkSales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag || checkSales_Order_Generated_for_Retailer_or_check_Receive_PO_and_verify_Tag.type !== 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG')
      throw 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG IS NOT EXIST'
    let Fulfillment_of_Sales_Order_Shipment_to_Retailer = await this._stage.createStage('FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
    return Fulfillment_of_Sales_Order_Shipment_to_Retailer
  }

  get_Fulfillment_of_Sales_Order_Shipment_to_Retailer() {
    return this._stage.getStageByType('FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
  }

  // --------------------Change_of_ownership_and_tranfer_for_Token_to_Retailer---------------------------

  async Change_of_ownership_and_tranfer_for_Token_to_Retailer(address_Fulfillment_of_Sales_Order_Shipment_to_Retailer) {
    this._user.checkUser(this.sender, 'WHOLESALER')
    let checkFulfillment_of_Sales_Order_Shipment_to_Retailer = this._stage.getStageByAddress(address_Fulfillment_of_Sales_Order_Shipment_to_Retailer)
    if (!checkFulfillment_of_Sales_Order_Shipment_to_Retailer || checkFulfillment_of_Sales_Order_Shipment_to_Retailer.type !== 'FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
      throw 'FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER IS NOT EXIST'
    let Change_of_ownership_and_tranfer_for_Token_to_Retailer = await this._stage.createStage('CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
    return Change_of_ownership_and_tranfer_for_Token_to_Retailer
  }

  get_Change_of_ownership_and_tranfer_for_Token_to_Retailer() {
    return this._stage.getStageByType('CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
  }

  // --------------------PO_Receipt_on_Verification_of_Token---------------------------
  check_PO_Receipt_on_Verification_of_Token(address) {
    let check_PO_Receipt_on_Verification_of_Token = this.get_PO_Receipt_on_Verification_of_TokenByAddress(address)
    if (!check_PO_Receipt_on_Verification_of_Token || check_PO_Receipt_on_Verification_of_Token.type !== 'PO_RECEIPT_ON_VERIFICATION_OF_TOKEN') throw `PO_RECEIPT_ON_VERIFICATION_OF_TOKEN IS NOT EXIST`
    return true
  }
  get_PO_Receipt_on_Verification_of_TokenByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async PO_Receipt_on_Verification_of_Token(address_Change_of_ownership_and_tranfer_for_Token_to_Retailer) {
    this._user.checkUser(this.sender, 'RETAILER')
    let checkChange_of_ownership_and_tranfer_for_Token_to_Retailer = this._stage.getStageByAddress(address_Change_of_ownership_and_tranfer_for_Token_to_Retailer)
    if (!checkChange_of_ownership_and_tranfer_for_Token_to_Retailer || checkChange_of_ownership_and_tranfer_for_Token_to_Retailer.type !== 'CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
      throw 'CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER IS NOT EXIST'
    let PO_Receipt_on_Verification_of_Token = await this._stage.createStage('PO_RECEIPT_ON_VERIFICATION_OF_TOKEN')
    return PO_Receipt_on_Verification_of_Token

  }

  get_PO_Receipt_on_Verification_of_Token() {
    return this._stage.getStageByType('PO_RECEIPT_ON_VERIFICATION_OF_TOKEN')
  }
  // --------------------Purchase_Product_from_Retailer---------------------------
 
  async Purchase_Product_from_Retailer() {
    await this._user.checkUser(this.sender, 'CUSTOMER')
    let Purchase_Product_from_Retailer = await this._stage.createStage('PURCHASE_PRODUCT_FROM_RETAILER')
    return Purchase_Product_from_Retailer
  }

  get_Purchase_Product_from_Retailer() {
    return this._stage.getStageByType('PURCHASE_PRODUCT_FROM_RETAILER')
  }
  // --------------------Product_sold_to_customer---------------------------
  check_Product_sold_to_customer(address) {
    let check_Product_sold_to_customer = this.get_Product_sold_to_customerByAddress(address)
    if (!check_Product_sold_to_customer || check_Product_sold_to_customer.type !== 'PRODUCT_SOLD_TO_CUSTOMER') throw `PRODUCT_SOLD_TO_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Product_sold_to_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Product_sold_to_customer(address_Purchase_Product_from_Retailer) {
    this._user.checkUser(this.sender, 'RETAILER')
    let checkPurchase_Product_from_Retailer = this._stage.getStageByAddress(address_Purchase_Product_from_Retailer)
    if (!checkPurchase_Product_from_Retailer || checkPurchase_Product_from_Retailer.type !== 'PURCHASE_PRODUCT_FROM_RETAILER')
      throw 'PURCHASE_PRODUCT_FROM_RETAILER IS NOT EXIST'
    let Product_sold_to_customer = await this._stage.createStage('PRODUCT_SOLD_TO_CUSTOMER')
    return Product_sold_to_customer

  }

  get_Product_sold_to_customer() {
    return this._stage.getStageByType('PRODUCT_SOLD_TO_CUSTOMER')
  }
  // --------------------Ships_Goods_to_Customer---------------------------
 
  checkShip(address) {
    this.check_Product_sold_to_customer = this.get_Product_sold_to_customerByAddress(address);
    this.check_PO_Receipt_on_Verification_of_Token = this.get_PO_Receipt_on_Verification_of_TokenByAddress(address);

    if (this.check_Product_sold_to_customer.type == 'PRODUCT_SOLD_TO_CUSTOMER') {
      return true;
    }
    else if (this.check_PO_Receipt_on_Verification_of_Token.type == 'PO_RECEIPT_ON_VERIFICATION_OF_TOKEN') {
      return true;
    }
    else {
      throw `PRODUCT_SOLD_TO_CUSTOMER_OR_PO_RECEIPT_ON_VERIFICATION_OF_TOKEN_OF_SHIP IS NOT EXIST`;
    }

  }
  async Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token() {
    await this.checkShip(this.sender, 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG_OF_SALE_OF_SHIP')
    let Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token = await this._stage.createStage('SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG')
    return Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token
  }
  async Ships_Goods_to_Customer(address_Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token) {
    this._user.checkUser(this.sender, 'RETAILER')
    let checkProduct_sold_to_customer_or_PO_Receipt_on_Verification_of_Token = this._stage.getStageByAddress(address_Product_sold_to_customer_or_PO_Receipt_on_Verification_of_Token)
    if (!checkProduct_sold_to_customer_or_PO_Receipt_on_Verification_of_Token || checkProduct_sold_to_customer_or_PO_Receipt_on_Verification_of_Token.type !== 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG')
      throw 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG IS NOT EXIST'
    let Ships_Goods_to_Customer = await this._stage.createStage('SHIPS_GOODS_TO_CUSTOMER')
    return Ships_Goods_to_Customer
  }

  get_Ships_Goods_to_Customer() {
    return this._stage.getStageByType('SHIPS_GOODS_TO_CUSTOMER')
  }

  // --------------------Receipt_and_Verify_the_Product_and_track_history_using_Token---------------------------
 
  async Receipt_and_Verify_the_Product_and_track_history_using_Token(address_Ships_Goods_to_Customer) {
    this._user.checkUser(this.sender, 'CUSTOMER')
    let checkShips_Goods_to_Customer = this._stage.getStageByAddress(address_Ships_Goods_to_Customer)
    if (!checkShips_Goods_to_Customer || checkShips_Goods_to_Customer.type !== 'SHIPS_GOODS_TO_CUSTOMER')
      throw 'SHIPS_GOODS_TO_CUSTOMER IS NOT EXIST'
    let Receipt_and_Verify_the_Product_and_track_history_using_Token = await this._stage.createStage('RECEIPT_AND_VERIFY_THE_PRODUCT_AND_TRACK_HISTORY')
    this.setToAddress(Receipt_and_Verify_the_Product_and_track_history_using_Token.address)
    return 'SUCCESS'

  }




}
export default TokenMain;
