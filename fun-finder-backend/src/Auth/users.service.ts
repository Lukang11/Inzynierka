import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './AuthInterfaces/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: User): Promise<User> {
    if (!user.email || !user.fname || !user.lname) {
      throw new Error('Wszystkie pola są wymagane.');
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user = { ...user, password: hashedPassword } as User;
    }

    const createdUser = await this.UserModel.create(user);
    return createdUser.toObject() as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.UserModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User | null> {
    return this.UserModel.findById(userId).exec();
  }

  async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ user: User; accessToken: string } | null> {
    const user = await this.findByEmail(email);

    if (user && (await this.comparePassword(password, user.password))) {
      const payload = { sub: user._id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { user, accessToken };
    }

    throw new UnauthorizedException('Nieprawidłowy adres email lub hasło');
  }

  async createGoogleUser(payload: any): Promise<User> {
    const { email, given_name, family_name } = payload;
    const newUser = new this.UserModel({
      email,
      fname: given_name,
      lname: family_name,
    });

    const newUserObject = newUser.toObject() as User;
    return this.createUser(newUserObject);
  }

  async updateGoogleUser(user: User, payload: any): Promise<User> {
    user.email = payload.email;
    user.fname = payload.given_name;
    user.lname = payload.family_name;

    return user.save();
  }
}
