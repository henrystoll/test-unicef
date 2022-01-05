import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User as UserModel } from '@prisma/client'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() userData: { orgId: number; email: string; name?: string },
  ): Promise<UserModel> {
    const { orgId, email, name } = userData
    return this.usersService.createUser({
      org: {
        connect: { id: orgId },
      },
      email,
      name,
    })
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({})
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) })
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto)
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id)
  // }
}
