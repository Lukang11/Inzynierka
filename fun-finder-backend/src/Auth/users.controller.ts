import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './AuthInterfaces/users.model';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async register(@Body() user: User): Promise<User> {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Użytkownik o tym adresie email już istnieje.');
    }

    return this.userService.createUser(user);
  }
}