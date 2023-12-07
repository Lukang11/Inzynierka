import { Controller, Post, Body, Get, Param, Res, Req, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './AuthInterfaces/users.model';
import { parse } from 'cookie';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

@Controller('/users')
export class UserController {
  private readonly googleOAuthClient: OAuth2Client;

  constructor(private readonly userService: UserService) {
    this.googleOAuthClient = new OAuth2Client(process.env.CLIENT_ID);
   }

  @Post("/register")
  async register(@Body() user: User): Promise<User> {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Użytkownik o tym adresie email już istnieje.');
    }

    return this.userService.createUser(user);
  }

  @Post("/login")
  async login(@Body() credentials: { email: string, password: string }): Promise<{ user: User; accessToken: string } | null> {
    try {
      const { email, password } = credentials;
      const result = await this.userService.loginUser(email, password);
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Wystąpił błąd podczas wylogowywania' });
      console.log('Status:', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  @Get('/verify-token')
  verifyToken(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers.authorization?.split(' ')[1];
  
    try {
      const isUserAuthenticated = !!jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  
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
}