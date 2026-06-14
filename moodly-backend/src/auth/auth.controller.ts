import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: 'JWT 토큰 + 유저 정보 반환' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패 (이메일 형식 오류, 비밀번호 8자 미만 등)' })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일' })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: 'JWT 토큰 + 유저 정보 반환' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패' })
  @ApiResponse({ status: 401, description: '이메일 또는 비밀번호가 올바르지 않음' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('social-login')
  @ApiOperation({ summary: 'Auth.js 소셜 로그인 연동 (서버 내부용)' })
  @ApiResponse({ status: 201, description: 'JWT 토큰 반환 (신규/기존 유저 모두)' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패' })
  socialLogin(@Body() dto: SocialLoginDto) {
    return this.authService.socialLogin(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({ status: 200, description: '현재 로그인한 유저 정보' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  me(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      provider: user.provider,
      createdAt: user.createdAt,
    };
  }
}
