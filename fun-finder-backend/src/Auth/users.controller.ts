import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Req,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User, UserHobbies } from './AuthInterfaces/users.model';
import { parse } from 'cookie';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Events } from 'src/Events/EventInterfaces/events.model';

@Controller('/users')
export class UserController {
  private readonly googleOAuthClient: OAuth2Client;

  constructor(private readonly userService: UserService) {
    this.googleOAuthClient = new OAuth2Client(process.env.CLIENT_ID);
  }

  @Post('/register')
  async register(@Body() user: User): Promise<User> {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Użytkownik o tym adresie email już istnieje.');
    }

    return this.userService.createUser(user);
  }

  @Post('/login')
  async login(
    @Body() credentials: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: User; accessToken: string } | null> {
    try {
      const { email, password } = credentials;
      const result = await this.userService.loginUser(email, password);

      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
      });

      return result;
    } catch (error) {
      console.error('Błąd logowania:', error.message);
      throw new UnauthorizedException('Nieprawidłowy adres email lub hasło');
    }
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(HttpStatus.OK).json({ message: 'Pomyślnie wylogowano!' });
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Wystąpił błąd podczas wylogowywania' });
      console.log('Status:', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/verify-token')
  verifyToken(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    try {
      const isUserAuthenticated = !!jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY,
      );

      res.status(isUserAuthenticated ? 200 : 401).json({ isUserAuthenticated });
    } catch (error) {
      res.status(401).json({ isUserAuthenticated: false });
    }
  }

  @Get('/verify-google-token')
  async verifyGoogleToken(@Req() req: Request, @Res() res: Response) {
    const idToken = req.headers.authorization?.split(' ')[1];

    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      // Sprawdź, czy użytkownik o danym adresie e-mail już istnieje
      let user = await this.userService.findByEmail(payload.email);

      // Jeżeli użytkownik istnieje, zaktualizuj jego dane
      if (user) {
        user = await this.userService.updateGoogleUser(user, payload);
      } else {
        // Jeżeli użytkownik nie istnieje, utwórz nowego
        user = await this.userService.createGoogleUser(payload);
      }

      res.status(200).json({ isUserAuthenticated: true });
    } catch (error) {
      console.error('Błąd weryfikacji tokenu Google:', error);
      res.status(401).json({ isUserAuthenticated: false });
    }
  }

  @Post('/register-google')
  async registerGoogle(@Body() payload: any, @Res() res: Response) {
    try {
      const user = await this.userService.createGoogleUser(payload);

      res.status(201).json({ message: 'Google user registered successfully', user });
    } catch (error) {
      console.error('Błąd rejestracji użytkownika Google:', error);
      res.status(500).json({ message: 'Google user registration failed' });
    }
  }

  @Get('/user-data-email/:email')
  async getCurrentUserDataByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/user-data-id/:id')
  async getCurrentUserDataById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('/user-description/:email')
  async getCurrentUserDesc(@Param('email') email: string) {
    const description = await this.userService.getUserDescByEmail(email);
    return { description };
  }

  @Post('/update-user-description/:email')
  async updateCurrentUserDesc(@Param('email') email: string, @Body() body: { description: string }) {
    const updatedUser = await this.userService.updateUserDescByEmail(email, body.description);
    return updatedUser ? { message: 'Description updated successfully', user: updatedUser } : { message: 'User not found' };
  }

  @Get('/user-score/:email')
  async getCurrentUserScore(@Param('email') email: string) {
    const score = await this.userService.getUserScoreByEmail(email);
    return { score };
  }

  @Post('/update-user-score/:email')
  async updateUserScore(@Param('email') email: string, @Body() body: { score: number }) {
    const updatedUser = await this.userService.updateUserScoreByEmail(email, body.score);
    return updatedUser ? { message: 'Score updated successfully', user: updatedUser } : { message: 'User not found' };
  }

  @Get('/user-avatar/:email')
  async getCurrentUserAvatar(@Param('email') email: string) {
    const avatar = await this.userService.getUserAvatarByEmail(email);
    return { avatar };
  }

  @Post('/update-user-avatar/:email')
  async updateCurrentUserAvatar(@Param('email') email: string, @Body() body: { avatar: string }) {
    const updatedUser = await this.userService.updateUserAvatarByEmail(email, body.avatar);
    return updatedUser ? { message: 'Avatar updated successfully', user: updatedUser } : { message: 'User not found' };
  }

  @Get('/user-hobbies/:email')
  async getCurrentUserHobbies(@Param('email') email: string) {
    const hobbies = await this.userService.getUserHobbiesByEmail(email);
    return { hobbies };
  }

  @Get('/user-hobbies-names/:email')
  async getCurrentUserHobbiesNames(@Param('email') email: string) {
    const hobbiesNames = await this.userService.getUserHobbiesNamesByEmail(email);
    return { hobbiesNames };
  }


  @Post('/update-user-hobbies/:email')
  async updateCurrentUserHobbies(@Param('email') email: string, @Body() body: { hobbies: UserHobbies[], hobbiesName: UserHobbies[] }) {
    const updatedUser = await this.userService.updateUserHobbiesByEmail(email, body.hobbies, body.hobbiesName);
    return updatedUser ? { message: 'Hobbies updated successfully', user: updatedUser } : { message: 'User not found' };
  }

  @Get('/user-hobbiesById/:_id')
  async getCurrentUserHobbiesById(@Param('_id') _id: string) {
    const hobbies = await this.userService.getUserHobbiesById(_id);
    return { hobbies };
  }

  @Post('/update-user-hobbiesById/:_id')
  async updateCurrentUserHobbiesById(@Param('_id') _id: string, @Body() body: { hobbies: UserHobbies[] }) {
    const updatedUser = await this.userService.updateUserHobbiesById(_id, body.hobbies);
    return updatedUser ? { message: 'Hobbies updated successfully', user: updatedUser } : { message: 'User not found' };
  }

  @Get('/users-by-hobby/:hobby')
  async getUsersByHobby(@Param('hobby') hobby: string): Promise<User[]> {
    return this.userService.findUsersByHobby(hobby);
  }

  @Post('/add-event/:email')
  async addEventToUser(
    @Param('email') email: string,
    @Body() event: Events,
  ): Promise<User | null> {
    try {
      // Znajdź użytkownika
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('Użytkownik nie istnieje.');
      }
      console.log(event);
      // Dodaj wydarzenie do użytkownika
      user.events.push({
        event_id:  event.eventId,
        event_name: event.name,
        event_description: event.eventDescription,
        event_time_start: event.eventStart.toString(),
        event_time_end: event.eventEnd.toString(),
        event_location: event.location,
        event_photo: event.eventPhoto,
      });

      // Zapisz użytkownika
      return await this.userService.updateUserEventsByEmail(email, user.events);
    } catch (error) {
      console.error('Błąd dodawania wydarzenia do użytkownika:', error);
      return null;
    }
  }
}
