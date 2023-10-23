import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    if (user) {
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    }

    return null; // Handle authentication failure as needed
  }
}
