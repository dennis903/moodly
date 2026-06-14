import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email });
  }

  async signup(dto: SignupDto) {
    const user = await this.userService.create(dto);
    const token = this.generateToken(user.id, user.email);
    return {
      access_token: token,
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }
    const token = this.generateToken(user.id, user.email);
    return {
      access_token: token,
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
    };
  }

  /**
   * Auth.js(NextAuth)에서 소셜 로그인 성공 후 호출하는 엔드포인트용 메서드.
   * 이미 가입된 유저면 조회, 없으면 자동 생성 후 JWT 발급.
   */
  async socialLogin(dto: SocialLoginDto) {
    let user = await this.userService.findByEmail(dto.email);
    let isNewUser = false;

    if (!user) {
      user = await this.userService.createSocialUser(dto);
      isNewUser = true;
    }

    const token = this.generateToken(user.id, user.email);
    return {
      access_token: token,
      isNewUser,             // 프론트에서 온보딩 여부 판단에 사용
      needsOnboarding: !user.name, // 닉네임 없으면 온보딩 필요
      user: { id: user.id, email: user.email, name: user.name, image: user.image },
    };
  }
}
