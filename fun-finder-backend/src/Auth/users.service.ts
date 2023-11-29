import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './AuthInterfaces/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    if (!user.email || !user.password || !user.fname || !user.lname) {
      throw new Error('Wszystkie pola są wymagane.');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = { ...user, password: hashedPassword };

    const createdUser = new this.UserModel(userWithHashedPassword);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.UserModel.findOne({ email }).exec();
  }
}