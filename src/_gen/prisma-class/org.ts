import { User } from './user'
import { ApiProperty } from '@nestjs/swagger'

export class Org {
  @ApiProperty({ type: Number })
  id: number = undefined

  @ApiProperty({ type: String })
  url: string = undefined

  @ApiProperty({ type: String })
  name: string = undefined

  @ApiProperty({ isArray: true, type: () => User })
  users: User[] = undefined
}
