import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiResponse({ status: 200, description: '유저 정보' })
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

  @Patch('me')
  @ApiOperation({ summary: '프로필 수정 (닉네임, 이미지)' })
  @ApiResponse({ status: 200, description: '수정된 유저 정보' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  updateMe(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({ status: 200, description: '비밀번호 변경 성공' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패 (새 비밀번호 8자 미만)' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  @ApiResponse({ status: 409, description: '현재 비밀번호 불일치' })
  async changePassword(
    @CurrentUser() user: User,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.userService.changePassword(
      user.id,
      dto.currentPassword,
      dto.newPassword,
    );
    return { message: '비밀번호가 변경되었습니다' };
  }

  @Delete('me')
  @ApiOperation({ summary: '계정 삭제 (관련 일기/태그 전부 삭제)' })
  @ApiResponse({ status: 200, description: '계정 삭제 완료' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  async deleteMe(@CurrentUser() user: User) {
    await this.userService.delete(user.id);
    return { message: '계정이 삭제되었습니다' };
  }
}
