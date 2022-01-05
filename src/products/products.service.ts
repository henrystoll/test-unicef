import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  private readonly products = new Map<number, Product>()

  create(createProductDto: CreateProductDto) {
    const id = Math.max(...[...this.products.keys()], 0) + 1
    const product = new Product(id)
    Object.assign(product, createProductDto)
    this.products.set(id, product)
    return id
  }

  findAll() {
    return [...this.products.entries()]
  }

  findOne(id: number) {
    const exists = this.products.has(id)
    if (!exists) throw new NotFoundException()
    return this.products.get(id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    const product = this.findOne(id)
    const success = this.products.delete(id)
    if (!success) throw new BadRequestException()
    return product
  }
}
