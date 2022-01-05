import { IsString, IsNotEmpty } from 'class-validator'
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  purchasingGroup: string
  @IsString()
  @IsNotEmpty()
  materialGroup: string
  @IsString()
  @IsNotEmpty()
  materialNumber: string
  @IsString()
  @IsNotEmpty()
  quantityUnit: string
}
