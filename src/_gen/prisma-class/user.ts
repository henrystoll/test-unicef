import { Org } from './org'
import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty({ type: Number })
  id: number = undefined

  @ApiProperty({ type: String })
  email: string = undefined

  @ApiProperty({ type: String })
  name?: string = undefined

  @ApiProperty({ type: () => Org })
  org: Org = undefined

  @ApiProperty({ type: Number })
  orgId: number = undefined
}
