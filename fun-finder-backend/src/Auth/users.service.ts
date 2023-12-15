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
      user = { ...user, password: hashedPassword, description: "Not yet set", score: 0 } as User;
    }

    const createdUser = await this.UserModel.create(user);
    return createdUser.toObject() as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.UserModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User | null> {
    return this.UserModel.findOne({ _id: userId }).exec();
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
      const payload = { _id: user._id, email: user.email, fname: user.fname, lname: user.lname };
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

  async getUserDescByEmail(email: string): Promise<string | null> {
    const user = await this.UserModel.findOne({ email }).exec();
    return user ? user.description : null;
  }

  async updateUserDescByEmail(email: string, newDescription: string): Promise<User | null> {
    const user = await this.UserModel.findOneAndUpdate(
      { email },
      { $set: { description: newDescription } },
      { new: true },
    ).exec();

    return user;
  }

  async getUserScoreByEmail(email: string): Promise<number | null> {
    const user = await this.UserModel.findOne({ email }).exec();
    return user ? user.score : null;
  }

  async updateUserScoreByEmail(email: string, newScore: number): Promise<User | null> {
    const user = await this.UserModel.findOneAndUpdate(
      { email },
      { $set: { score: newScore } },
      { new: true },
    ).exec();

    return user || null;
  }
}
