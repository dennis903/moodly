import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
import { SocialLoginDto } from '../auth/dto/social-login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(dto: SignupDto): Promise<User> {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('이미 사용 중인 이메일입니다');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
    });
    return this.userRepository.save(user);
  }

  async createSocialUser(dto: SocialLoginDto): Promise<User> {
    const user = this.userRepository.create({
      email: dto.email,
      name: dto.name ?? null,
      image: dto.image ?? null,
      provider: dto.provider,
      password: null,
    });
    return this.userRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.findById(id);
    if (!user || !user.password) {
      throw new NotFoundException('유저를 찾을 수 없습니다');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new ConflictException('현재 비밀번호가 올바르지 않습니다');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    await this.userRepository.remove(user);
  }
}
