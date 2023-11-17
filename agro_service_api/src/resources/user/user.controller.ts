import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessUserDto } from './dto/access-user.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('/access')
  access(@Body() accessUserDto: AccessUserDto) {
    return this.userService.access(accessUserDto);
  }

  @Get('/auth')
  async getUser(@Req() req, @Res() res) {
    return await this.userService.getUserLogged(req, res);
  }

  @Post('/check-email')
  async checkEmail(@Body() checkEmail: CheckEmailDto) {
    return await this.userService.checkEmail(checkEmail);
  }

  @Get('/logout')
  async logout(@Req() req, @Res() res) {
    return await this.userService.logout(req, res);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: null) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
