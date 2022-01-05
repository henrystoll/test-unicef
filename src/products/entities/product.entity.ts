export class Product {
  id: number
  purchasingGroup: string
  materialGroup: string
  /**
   * Material Number from VISION MM
   * @example SL1234
   */
  materialNumber: string
  quantityUnit: string

  constructor(id: number) {
    this.id = id
  }
}
