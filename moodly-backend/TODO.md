# Moodly 백엔드 개발 TODO 리스트

> NestJS + PostgreSQL + TypeORM + TypeScript  
> 패키지 매니저: npm  
> 대상: 백엔드 경험이 적은 프론트엔드 개발자  
> 각 항목에 "왜 하는지" + "어떤 파일을 만드는지" 포함  
> 작성일: 2026-04-20

---

## 📋 사용 가이드

- `[ ]` 미완료 / `[x]` 완료
- 🔴 P0(필수) · 🟡 P1(중요) · 🟢 P2(선택)
- 💡 = 개념 설명 (왜 이걸 하는지)
- 📄 = 만들어야 할 파일

---

## Phase 0. 백엔드 개념 이해 (코딩 전)

> 💡 코드를 치기 전에 NestJS의 핵심 구조를 이해하면 훨씬 수월합니다.

### 0.1 NestJS 핵심 개념

- [ ] 🔴 **Module**: 기능 단위 묶음. 프론트의 "페이지 폴더"와 비슷. 예: `AuthModule`, `EntryModule`
- [ ] 🔴 **Controller**: API 엔드포인트를 정의하는 곳. 프론트의 "라우트 핸들러"와 같음. `@Get()`, `@Post()` 데코레이터로 URL 매핑
- [ ] 🔴 **Service**: 실제 비즈니스 로직이 들어가는 곳. Controller가 Service를 호출. DB 조회, 계산 등을 여기서 함
- [ ] 🔴 **Entity**: DB 테이블과 1:1 매핑되는 TypeScript 클래스. TypeORM이 이걸 보고 테이블을 만듦
- [ ] 🔴 **DTO (Data Transfer Object)**: 요청/응답 데이터의 형태를 정의. 프론트의 "타입"과 비슷하지만 유효성 검증 기능 포함
- [ ] 🔴 **Guard**: 인증/권한 체크를 담당. "미들웨어"와 비슷. 로그인 안 한 유저를 막아줌
- [ ] 🔴 **Pipe**: 데이터 변환/검증. DTO에 적힌 규칙대로 요청 데이터를 자동 검증

### 0.2 폴더 구조 이해

```
src/
├── main.ts                    # 앱 시작점 (프론트의 index.tsx)
├── app.module.ts              # 루트 모듈 (모든 모듈을 여기서 조합)
├── common/                    # 공용 유틸, 가드, 필터
│   ├── guards/
│   ├── filters/
│   ├── decorators/
│   └── interceptors/
├── config/                    # 환경변수, DB 설정
├── auth/                      # 인증 모듈
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   ├── guards/
│   └── strategies/
├── user/                      # 유저 모듈
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.entity.ts
│   └── dto/
├── entry/                     # 일기 모듈
│   ├── entry.module.ts
│   ├── entry.controller.ts
│   ├── entry.service.ts
│   ├── entry.entity.ts
│   └── dto/
├── tag/                       # 태그 모듈
│   ├── tag.module.ts
│   ├── tag.service.ts
│   ├── tag.entity.ts
│   └── dto/
└── stats/                     # 통계 모듈
    ├── stats.module.ts
    ├── stats.controller.ts
    └── stats.service.ts
```

**예상 소요: 0.5일 (학습)**

---

## Phase 1. 프로젝트 초기화

### 1.1 NestJS CLI 설치 & 프로젝트 생성

- [ ] 🔴 NestJS CLI 설치
  ```bash
  npm install -g @nestjs/cli
  ```
- [ ] 🔴 프로젝트 생성
  ```bash
  nest new moodly-api --package-manager npm
  ```
  > 💡 이 명령어가 NestJS 프로젝트 뼈대를 자동 생성합니다.
  > `src/main.ts`, `app.module.ts`, `app.controller.ts`, `app.service.ts`가 만들어집니다.
- [x] 🔴 초기 불필요 파일 정리
  - [x] `app.controller.ts` 삭제 (루트 컨트롤러 불필요)
  - [x] `app.service.ts` 삭제
  - [x] `app.controller.spec.ts` 삭제
  - [x] `app.module.ts`에서 삭제한 파일 import 제거

### 1.2 핵심 패키지 설치

- [ ] 🔴 **DB 관련**
  ```bash
  npm install @nestjs/typeorm typeorm pg
  ```
  > 💡 `@nestjs/typeorm`은 NestJS-TypeORM 연결, `typeorm`은 ORM 본체, `pg`는 PostgreSQL 드라이버
- [x] 🔴 **인증 관련**
  ```bash
  npm install @nestjs/passport passport passport-local passport-jwt
  npm install @nestjs/jwt
  npm install bcrypt
  npm install -D @types/passport-local @types/passport-jwt @types/bcrypt
  ```
  > 💡 `passport`는 인증 미들웨어, `jwt`는 토큰 기반 인증, `bcrypt`는 비밀번호 해싱
- [x] 🔴 **유효성 검증**
  ```bash
  npm install class-validator class-transformer
  ```
  > 💡 DTO에서 `@IsEmail()`, `@MinLength(8)` 같은 데코레이터로 자동 검증
- [x] 🔴 **환경변수**
  ```bash
  npm install @nestjs/config
  ```
  > 💡 `.env` 파일의 변수를 안전하게 읽어오는 모듈
- [x] 🟡 **API 문서화**
  ```bash
  npm install @nestjs/swagger swagger-ui-express
  ```
  > 💡 API 문서를 자동 생성. 프론트 작업할 때 엄청 편함
- [x] 🟡 **CORS, 보안**
  ```bash
  npm install helmet
  npm install @nestjs/throttler
  ```
  > 💡 `helmet`은 보안 헤더, `throttler`는 API 요청 속도 제한 (무차별 공격 방지)

### 1.3 환경변수 설정

- [x] 🔴 📄 `.env` 파일 생성 (루트에)

  ```env
  # 서버
  PORT=3001
  NODE_ENV=development

  # 데이터베이스
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=your_password_here
  DB_DATABASE=moodly

  # JWT
  JWT_SECRET=your_super_secret_key_change_this_in_production
  JWT_EXPIRES_IN=7d

  # 프론트엔드 URL (CORS용)
  FRONTEND_URL=http://localhost:3000
  ```

  > 💡 `.env`는 비밀번호 등 민감 정보를 저장. **절대 Git에 올리면 안 됩니다.**

- [x] 🔴 📄 `.env.example` 생성 (빈 값으로, Git에 올라감)
- [x] 🔴 `.gitignore`에 `.env` 추가 확인

### 1.4 PostgreSQL 데이터베이스 준비

- [ ] 🔴 PostgreSQL 설치 (로컬) 또는 클라우드 DB 생성
  > 💡 로컬 설치 옵션:
  >
  > - Mac: `brew install postgresql@16` → `brew services start postgresql@16`
  > - Windows: [postgresql.org](https://www.postgresql.org/download/) 에서 설치
  > - 클라우드: Supabase, Neon, Railway (무료 티어)
- [ ] 🔴 데이터베이스 생성
  ```bash
  # 터미널에서
  psql -U postgres
  CREATE DATABASE moodly;
  \q
  ```
- [ ] 🔴 연결 확인 (`.env`의 정보와 일치하는지)

**예상 소요: 1일**

---

## Phase 2. 기본 설정 (Config, DB 연결, 보안)

### 2.1 환경변수 설정 모듈

- [ ] 🔴 📄 `src/config/database.config.ts`
  > 💡 TypeORM이 DB에 연결할 때 사용하는 설정을 한 곳에서 관리
  ```ts
  // TypeOrmModuleOptions를 반환하는 함수
  // .env에서 DB_HOST, DB_PORT 등을 읽어서 설정 객체 생성
  // synchronize: true → Entity를 보고 테이블 자동 생성 (개발용만!)
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'] → 모든 Entity 자동 탐지
  ```
- [ ] 🔴 `app.module.ts`에 ConfigModule, TypeOrmModule 등록
  ```ts
  // ConfigModule.forRoot({ isGlobal: true }) → 전역에서 환경변수 접근 가능
  // TypeOrmModule.forRootAsync({ useFactory: ... }) → DB 연결
  ```
- [ ] 🔴 서버 시작 시 DB 연결 확인
  ```bash
  npm run start:dev
  # 콘솔에 "TypeORM connected" 류 로그가 나오면 성공
  ```

### 2.2 전역 설정

- [ ] 🔴 📄 `src/main.ts` 수정
  ```ts
  // 1. ValidationPipe 전역 등록 → DTO 자동 검증 활성화
  //    app.useGlobalPipes(new ValidationPipe({
  //      whitelist: true,        → DTO에 정의 안 된 필드 자동 제거
  //      forbidNonWhitelisted: true, → 정의 안 된 필드가 오면 에러
  //      transform: true,        → 타입 자동 변환
  //    }))
  //
  // 2. CORS 설정
  //    app.enableCors({ origin: process.env.FRONTEND_URL })
  //
  // 3. Helmet 보안 헤더
  //    app.use(helmet())
  //
  // 4. API 접두사
  //    app.setGlobalPrefix('api') → 모든 URL이 /api/... 로 시작
  //
  // 5. Swagger 설정 (개발환경만)
  //    SwaggerModule.setup('api/docs', app, document)
  ```

### 2.3 공통 유틸

- [ ] 🔴 📄 `src/common/filters/http-exception.filter.ts`
  > 💡 에러 발생 시 프론트에 일관된 형태로 에러 응답을 보내줌
  ```ts
  // 모든 에러를 { statusCode, message, error, timestamp } 형태로 통일
  ```
- [ ] 🔴 📄 `src/common/interceptors/transform.interceptor.ts`
  > 💡 성공 응답을 일관된 형태로 감싸줌
  ```ts
  // 모든 성공 응답을 { data: ..., statusCode: 200 } 형태로 통일
  ```
- [ ] 🔴 📄 `src/common/decorators/current-user.decorator.ts`
  > 💡 컨트롤러에서 현재 로그인한 유저 정보를 쉽게 가져오는 커스텀 데코레이터
  ```ts
  // @CurrentUser() user: User → 현재 로그인한 유저 객체를 자동 주입
  ```

**예상 소요: 1일**

---

## Phase 3. Entity 설계 (DB 테이블 정의)

> 💡 Entity = DB 테이블의 TypeScript 버전.
> 이 클래스를 작성하면 TypeORM이 자동으로 테이블을 만들어줍니다.
> Prisma의 schema.prisma와 같은 역할입니다.

### 3.1 Emotion Enum 정의

- [ ] 🔴 📄 `src/common/enums/emotion.enum.ts`
  ```ts
  export enum Emotion {
    PROUD = 'PROUD',
    ANGRY = 'ANGRY',
    SAD = 'SAD',
    HAPPY = 'HAPPY',
    JOY = 'JOY',
    CALM = 'CALM',
    TIRED = 'TIRED',
    ANXIOUS = 'ANXIOUS',
    MEH = 'MEH',
    GLOOMY = 'GLOOMY',
  }
  ```

### 3.2 User Entity

- [ ] 🔴 📄 `src/user/user.entity.ts`
  ```ts
  // @Entity('users') → "users" 테이블 생성
  //
  // @PrimaryGeneratedColumn('uuid')
  // id: string                          → UUID 자동 생성 PK
  //
  // @Column({ unique: true })
  // email: string                       → 이메일 (중복 불가)
  //
  // @Column()
  // password: string                    → 해싱된 비밀번호
  //
  // @Column({ nullable: true })
  // name: string                        → 닉네임 (선택)
  //
  // @Column({ nullable: true })
  // image: string                       → 프로필 이미지 URL (선택)
  //
  // @CreateDateColumn()
  // createdAt: Date                     → 가입일 (자동)
  //
  // @UpdateDateColumn()
  // updatedAt: Date                     → 수정일 (자동)
  //
  // @OneToMany(() => Entry, entry => entry.user)
  // entries: Entry[]                    → 유저가 쓴 일기들 (1:N 관계)
  //
  // @OneToMany(() => Tag, tag => tag.user)
  // tags: Tag[]                         → 유저의 태그들 (1:N 관계)
  ```

### 3.3 Entry Entity (일기)

- [ ] 🔴 📄 `src/entry/entry.entity.ts`
  ```ts
  // @Entity('entries')
  //
  // @PrimaryGeneratedColumn('uuid')
  // id: string
  //
  // @Column({ type: 'date' })
  // date: string                        → 일기 날짜 (YYYY-MM-DD)
  //
  // @Column({ type: 'enum', enum: Emotion })
  // emotion: Emotion                    → 10종 감정 중 1개
  //
  // @Column({ type: 'varchar', length: 500, nullable: true })
  // memo: string | null                 → 메모 (최대 500자, 선택)
  //
  // @Column({ nullable: true })
  // weather: string | null              → 날씨 (선택)
  //
  // @ManyToOne(() => User, user => user.entries, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user: User                          → 작성자 (N:1 관계)
  //
  // @Column()
  // userId: string                      → 외래 키
  //
  // @ManyToMany(() => Tag, tag => tag.entries, { cascade: true })
  // @JoinTable({ name: 'entry_tags' })  → 중간 테이블 자동 생성
  // tags: Tag[]                         → 태그들 (N:M 관계)
  //
  // @CreateDateColumn()
  // createdAt: Date
  //
  // @UpdateDateColumn()
  // updatedAt: Date
  //
  // @Unique(['userId', 'date'])         → 같은 유저가 같은 날짜에 2개 작성 불가
  ```

### 3.4 Tag Entity

- [ ] 🔴 📄 `src/tag/tag.entity.ts`
  ```ts
  // @Entity('tags')
  //
  // @PrimaryGeneratedColumn('uuid')
  // id: string
  //
  // @Column()
  // name: string                        → 태그 이름 (#회사, #운동 등)
  //
  // @ManyToOne(() => User, user => user.tags, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user: User
  //
  // @Column()
  // userId: string
  //
  // @ManyToMany(() => Entry, entry => entry.tags)
  // entries: Entry[]                    → 이 태그가 달린 일기들
  //
  // @Unique(['userId', 'name'])         → 같은 유저가 동일 태그명 중복 생성 불가
  ```

### 3.5 DB 마이그레이션 (동기화 확인)

- [ ] 🔴 서버 시작해서 테이블 자동 생성 확인
  ```bash
  npm run start:dev
  # 콘솔에 "query: CREATE TABLE..." 로그가 나오면 성공
  ```
- [ ] 🔴 DB 클라이언트(DBeaver, pgAdmin, Postico 등)로 테이블 구조 확인
  - [ ] `users` 테이블 존재
  - [ ] `entries` 테이블 존재
  - [ ] `tags` 테이블 존재
  - [ ] `entry_tags` 중간 테이블 존재

**예상 소요: 1일**

---

## Phase 4. 인증 시스템 (Auth)

> 💡 인증은 "누구인지 확인"하는 시스템입니다.
> 이메일+비밀번호로 로그인하면 JWT 토큰을 발급하고,
> 이후 요청마다 토큰을 확인해서 본인인지 체크합니다.

### 4.1 Auth 모듈 생성

- [ ] 🔴 NestJS CLI로 모듈 자동 생성
  ```bash
  nest generate module auth
  nest generate controller auth
  nest generate service auth
  ```
  > 💡 이 명령어가 auth 폴더와 기본 파일을 만들어줍니다.

### 4.2 DTO 작성 (요청 데이터 형태 정의)

- [ ] 🔴 📄 `src/auth/dto/signup.dto.ts`
  ```ts
  // export class SignupDto {
  //   @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다' })
  //   email: string;
  //
  //   @IsString()
  //   @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다' })
  //   password: string;
  //
  //   @IsString()
  //   @MinLength(1, { message: '닉네임을 입력해주세요' })
  //   @MaxLength(20)
  //   name: string;
  // }
  ```
- [ ] 🔴 📄 `src/auth/dto/login.dto.ts`
  ```ts
  // export class LoginDto {
  //   @IsEmail()
  //   email: string;
  //
  //   @IsString()
  //   password: string;
  // }
  ```

### 4.3 User 모듈 & 서비스

- [ ] 🔴 모듈 생성
  ```bash
  nest generate module user
  nest generate service user
  ```
- [ ] 🔴 📄 `src/user/user.service.ts`
  ```ts
  // - findByEmail(email): 이메일로 유저 찾기
  // - findById(id): ID로 유저 찾기
  // - create(dto): 새 유저 생성 (비밀번호 해싱 포함)
  // - update(id, dto): 유저 정보 수정
  // - delete(id): 유저 삭제
  ```

### 4.4 Auth 서비스 (핵심 로직)

- [ ] 🔴 📄 `src/auth/auth.service.ts`
  ```ts
  // signup(dto):
  //   1. 이메일 중복 확인
  //   2. bcrypt.hash()로 비밀번호 해싱
  //   3. UserService.create()로 유저 저장
  //   4. JWT 토큰 생성 & 반환
  //
  // login(dto):
  //   1. 이메일로 유저 찾기
  //   2. bcrypt.compare()로 비밀번호 확인
  //   3. 일치하면 JWT 토큰 생성 & 반환
  //   4. 불일치하면 UnauthorizedException 던지기
  //
  // validateUser(payload):
  //   JWT 토큰의 payload에서 userId를 꺼내 유저 조회
  ```

### 4.5 JWT 전략 (토큰 검증)

- [ ] 🔴 📄 `src/auth/strategies/jwt.strategy.ts`
  > 💡 매 API 요청마다 Authorization 헤더의 JWT 토큰을 검증하는 로직
  ```ts
  // @Injectable()
  // export class JwtStrategy extends PassportStrategy(Strategy) {
  //   constructor() {
  //     super({
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: process.env.JWT_SECRET,
  //     });
  //   }
  //   async validate(payload: { sub: string }) {
  //     return this.userService.findById(payload.sub);
  //   }
  // }
  ```

### 4.6 Auth Guard (인증 보호)

- [ ] 🔴 📄 `src/auth/guards/jwt-auth.guard.ts`
  > 💡 이 Guard를 붙인 API는 로그인한 유저만 접근 가능
  ```ts
  // @Injectable()
  // export class JwtAuthGuard extends AuthGuard('jwt') {}
  ```
- [ ] 🟡 📄 `src/common/guards/optional-auth.guard.ts`
  > 💡 로그인 안 해도 되지만, 로그인했으면 유저 정보를 가져오는 Guard (선택적 인증)

### 4.7 Auth 컨트롤러 (API 엔드포인트)

- [ ] 🔴 📄 `src/auth/auth.controller.ts`
  ```ts
  // @Post('auth/signup')           → 회원가입
  // @Post('auth/login')            → 로그인
  // @Get('auth/me')                → 내 정보 조회 (토큰 필요)
  // @Post('auth/refresh')          → 토큰 갱신 (P2)
  ```

### 4.8 Auth 모듈 조립

- [ ] 🔴 📄 `src/auth/auth.module.ts`
  ```ts
  // imports: [
  //   UserModule,
  //   JwtModule.registerAsync({
  //     useFactory: (config) => ({
  //       secret: config.get('JWT_SECRET'),
  //       signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
  //     }),
  //   }),
  //   PassportModule,
  // ]
  // providers: [AuthService, JwtStrategy]
  // controllers: [AuthController]
  ```

### 4.9 인증 테스트

- [ ] 🔴 Swagger(`/api/docs`) 또는 REST 클라이언트(Postman, Thunder Client)로 테스트
  - [ ] `POST /api/auth/signup` → 유저 생성 확인
  - [ ] `POST /api/auth/login` → JWT 토큰 반환 확인
  - [ ] `GET /api/auth/me` + Authorization 헤더 → 유저 정보 반환 확인
  - [ ] `GET /api/auth/me` 토큰 없이 → 401 에러 확인

**예상 소요: 3~4일** (인증은 처음이면 시간이 좀 걸림)

---

## Phase 5. 일기 CRUD API

> 💡 CRUD = Create(생성), Read(조회), Update(수정), Delete(삭제)
> 앱의 핵심 기능입니다.

### 5.1 Entry 모듈 생성

- [ ] 🔴 CLI로 생성
  ```bash
  nest generate module entry
  nest generate controller entry
  nest generate service entry
  ```

### 5.2 DTO 작성

- [ ] 🔴 📄 `src/entry/dto/create-entry.dto.ts`
  ```ts
  // export class CreateEntryDto {
  //   @IsDateString({}, { message: '유효한 날짜 형식이 아닙니다' })
  //   date: string;                    → "2026-04-20"
  //
  //   @IsEnum(Emotion)
  //   emotion: Emotion;                → "CALM", "HAPPY" 등
  //
  //   @IsOptional()
  //   @IsString()
  //   @MaxLength(500, { message: '메모는 500자 이하여야 합니다' })
  //   memo?: string;
  //
  //   @IsOptional()
  //   @IsArray()
  //   @IsString({ each: true })
  //   tags?: string[];                 → ["회사", "운동"]
  //
  //   @IsOptional()
  //   @IsString()
  //   weather?: string;
  // }
  ```
- [ ] 🔴 📄 `src/entry/dto/update-entry.dto.ts`
  ```ts
  // PartialType(CreateEntryDto)를 상속
  // → 모든 필드가 선택(optional)이 됨
  ```
- [ ] 🔴 📄 `src/entry/dto/query-entries.dto.ts`
  ```ts
  // export class QueryEntriesDto {
  //   @IsOptional()
  //   @IsDateString()
  //   from?: string;                   → 조회 시작일
  //
  //   @IsOptional()
  //   @IsDateString()
  //   to?: string;                     → 조회 종료일
  // }
  ```

### 5.3 Entry 서비스

- [ ] 🔴 📄 `src/entry/entry.service.ts`
  ```ts
  // findAll(userId, query):
  //   1. userId로 필터 (본인 일기만)
  //   2. from/to가 있으면 날짜 범위 필터
  //   3. tags 관계 함께 로드 (relations: ['tags'])
  //   4. 최신순 정렬
  //
  // findOne(id, userId):
  //   1. id로 일기 조회
  //   2. userId 확인 (본인 일기가 아니면 403)
  //   3. tags 관계 함께 로드
  //
  // findByDate(userId, date):
  //   1. userId + date로 조회 (오늘 일기 확인용)
  //
  // create(userId, dto):
  //   1. 같은 날짜에 이미 일기가 있는지 확인 → 있으면 ConflictException
  //   2. tags 배열이 있으면 Tag 엔티티 찾거나 새로 생성
  //   3. Entry 엔티티 생성 & 저장
  //
  // update(id, userId, dto):
  //   1. 기존 일기 조회 (findOne)
  //   2. 권한 확인
  //   3. tags가 변경되었으면 기존 태그 해제 + 새 태그 연결
  //   4. 나머지 필드 업데이트
  //
  // delete(id, userId):
  //   1. 기존 일기 조회
  //   2. 권한 확인
  //   3. 삭제 (soft delete가 아닌 hard delete)
  ```

### 5.4 태그 처리 헬퍼

- [ ] 🔴 Tag 모듈 생성
  ```bash
  nest generate module tag
  nest generate service tag
  ```
- [ ] 🔴 📄 `src/tag/tag.service.ts`
  ```ts
  // findOrCreate(userId, tagNames: string[]):
  //   각 tagName에 대해:
  //   1. 해당 유저의 기존 태그 중 이름이 같은 거 찾기
  //   2. 없으면 새로 생성
  //   3. Tag 엔티티 배열 반환
  //
  // findByUser(userId):
  //   해당 유저의 모든 태그 조회 (사용 횟수순 정렬)
  ```

### 5.5 Entry 컨트롤러

- [ ] 🔴 📄 `src/entry/entry.controller.ts`
  ```ts
  // 모든 엔드포인트에 @UseGuards(JwtAuthGuard) 적용
  //
  // @Get('entries')
  //   → query: { from?, to? }
  //   → @CurrentUser() user에서 userId 추출
  //   → 기간별 일기 목록 반환
  //
  // @Get('entries/:id')
  //   → 단건 조회
  //
  // @Post('entries')
  //   → @Body() CreateEntryDto
  //   → 일기 생성
  //
  // @Patch('entries/:id')
  //   → @Body() UpdateEntryDto
  //   → 일기 수정
  //
  // @Delete('entries/:id')
  //   → 일기 삭제
  ```

### 5.6 태그 조회 API

- [ ] 🔴 Entry 컨트롤러 또는 별도 Tag 컨트롤러에 추가
  ```ts
  // @Get('tags')
  //   → 내 태그 목록 반환 (자동완성용)
  ```

### 5.7 CRUD 테스트

- [ ] 🔴 Swagger 또는 REST 클라이언트로 테스트
  - [ ] `POST /api/entries` → 일기 생성 (토큰 필요)
  - [ ] `GET /api/entries` → 일기 목록 조회
  - [ ] `GET /api/entries?from=2026-04-01&to=2026-04-30` → 기간 필터
  - [ ] `GET /api/entries/:id` → 단건 조회
  - [ ] `PATCH /api/entries/:id` → 수정
  - [ ] `DELETE /api/entries/:id` → 삭제
  - [ ] 다른 유저의 일기 접근 시 403 확인
  - [ ] 같은 날짜 중복 작성 시 409 확인
  - [ ] `GET /api/tags` → 태그 목록

**예상 소요: 3~4일**

---

## Phase 6. 통계 API

> 💡 프론트의 통계 대시보드에 데이터를 제공하는 API입니다.
> 복잡한 SQL 쿼리가 필요하지만, TypeORM의 QueryBuilder를 사용하면 됩니다.

### 6.1 Stats 모듈 생성

- [ ] 🟡 CLI로 생성
  ```bash
  nest generate module stats
  nest generate controller stats
  nest generate service stats
  ```

### 6.2 Stats 서비스

- [ ] 🟡 📄 `src/stats/stats.service.ts`
  ```ts
  // getSummary(userId, period: 'week' | 'month' | 'year'):
  //   1. 기간에 따라 시작일/종료일 계산
  //   2. 해당 기간의 일기 조회
  //   3. 통계 계산:
  //      - totalDays: 기록한 날 수
  //      - currentStreak: 현재 연속 기록일
  //      - longestStreak: 최장 연속 기록일
  //      - completionRate: 기간 대비 작성률 (%)
  //      - dominantEmotion: 가장 많은 감정
  //      - emotionDistribution: 감정별 횟수 & 비율
  //
  // getEmotionTrend(userId, from, to):
  //   1. 기간 내 일기를 날짜순으로 조회
  //   2. 각 날짜의 감정을 수치로 변환 (HAPPY=5, CALM=4, ... GLOOMY=1)
  //   3. 날짜별 [{date, emotionValue, emotion}] 배열 반환
  //
  // getTagStats(userId, period):
  //   1. 기간 내 태그별 사용 횟수 집계
  //   2. 각 태그의 우세 감정 계산
  //   3. 빈도순 정렬
  ```

### 6.3 스트릭 계산 로직

- [ ] 🟡 📄 `src/stats/helpers/streak.helper.ts`
  > 💡 연속 기록일 계산은 로직이 까다로우므로 별도 헬퍼로 분리
  ```ts
  // calculateStreak(dates: string[]): { current: number, longest: number }
  //   1. 날짜 배열을 정렬
  //   2. 오늘부터 역순으로 연속인 날 카운트 (current)
  //   3. 전체에서 가장 긴 연속 구간 찾기 (longest)
  ```

### 6.4 감정 수치 매핑

- [ ] 🟡 📄 `src/stats/helpers/emotion-value.helper.ts`
  ```ts
  // 감정 → 수치 매핑 (추이 차트용)
  // HAPPY: 5, JOY: 5, PROUD: 4, CALM: 4,
  // MEH: 3, TIRED: 2, ANXIOUS: 2,
  // SAD: 1, GLOOMY: 1, ANGRY: 1
  ```

### 6.5 Stats 컨트롤러

- [ ] 🟡 📄 `src/stats/stats.controller.ts`
  ```ts
  // @UseGuards(JwtAuthGuard) 전체 적용
  //
  // @Get('stats/summary')
  //   → query: { period: 'week' | 'month' | 'year' }
  //   → 감정 요약 통계 반환
  //
  // @Get('stats/trend')
  //   → query: { from, to }
  //   → 감정 추이 데이터 반환
  //
  // @Get('stats/tags')
  //   → query: { period }
  //   → 태그별 통계 반환
  ```

### 6.6 통계 테스트

- [ ] 🟡 테스트 데이터 여러 건 생성 후 통계 API 확인
  - [ ] `GET /api/stats/summary?period=month` → 요약 데이터
  - [ ] `GET /api/stats/trend?from=2026-04-01&to=2026-04-30` → 추이 데이터
  - [ ] `GET /api/stats/tags?period=month` → 태그 통계

**예상 소요: 2~3일**

---

## Phase 7. 유저 관리 API

### 7.1 User 컨트롤러

- [ ] 🟡 CLI로 생성
  ```bash
  nest generate controller user
  ```
- [ ] 🟡 📄 `src/user/user.controller.ts`
  ```ts
  // @UseGuards(JwtAuthGuard) 전체 적용
  //
  // @Get('users/me')
  //   → 내 프로필 조회
  //
  // @Patch('users/me')
  //   → 프로필 수정 (닉네임, 이미지)
  //
  // @Patch('users/me/password')
  //   → 비밀번호 변경
  //   → Body: { currentPassword, newPassword }
  //   → 현재 비밀번호 확인 후 변경
  //
  // @Delete('users/me')
  //   → 계정 삭제
  //   → 관련 일기, 태그 모두 CASCADE 삭제
  ```

### 7.2 DTO 작성

- [ ] 🟡 📄 `src/user/dto/update-user.dto.ts`
  ```ts
  // name?: string (1~20자)
  // image?: string (URL)
  ```
- [ ] 🟡 📄 `src/user/dto/change-password.dto.ts`
  ```ts
  // currentPassword: string
  // newPassword: string (8자 이상)
  ```

### 7.3 데이터 내보내기 (P2)

- [ ] 🟢 `GET /api/users/me/export`
  > 유저의 모든 일기를 CSV 형태로 반환
  > 프론트에서 파일 다운로드 처리

**예상 소요: 1일**

---

## Phase 8. 소셜 로그인 (OAuth)

> 💡 Google, Kakao 소셜 로그인. 난이도가 좀 있으므로
> 이메일/비밀번호 인증이 완성된 후에 추가하세요.

### 8.1 Google OAuth

- [ ] 🟡 Google Cloud Console에서 OAuth 2.0 클라이언트 생성
  - [ ] 승인된 리다이렉트 URI: `http://localhost:3001/api/auth/google/callback`
  - [ ] 클라이언트 ID, 시크릿을 `.env`에 추가
- [ ] 🟡 `npm install passport-google-oauth20 @types/passport-google-oauth20`
- [ ] 🟡 📄 `src/auth/strategies/google.strategy.ts`
- [ ] 🟡 📄 `src/auth/auth.controller.ts`에 Google 엔드포인트 추가
  ```ts
  // @Get('auth/google')           → Google 로그인 페이지로 리다이렉트
  // @Get('auth/google/callback')  → Google 콜백 → JWT 토큰 발급 → 프론트로 리다이렉트
  ```

### 8.2 Kakao OAuth

- [ ] 🟡 Kakao Developers에서 앱 생성
  - [ ] Redirect URI 등록
  - [ ] REST API 키를 `.env`에 추가
- [ ] 🟡 `npm install passport-kakao`
- [ ] 🟡 📄 `src/auth/strategies/kakao.strategy.ts`
- [ ] 🟡 Auth Controller에 Kakao 엔드포인트 추가

### 8.3 소셜 로그인 유저 처리

- [ ] 🟡 `AuthService.socialLogin(profile)`:
  ```ts
  // 1. 이메일로 기존 유저 찾기
  // 2. 있으면 → 기존 유저로 JWT 발급
  // 3. 없으면 → 새 유저 생성 (비밀번호 없이) → JWT 발급
  // 4. provider 필드로 가입 경로 구분 ('local' | 'google' | 'kakao')
  ```

**예상 소요: 2~3일**

---

## Phase 9. 보안 & 에러 처리

### 9.1 보안 강화

- [ ] 🔴 Rate Limiting (요청 속도 제한)
  ```ts
  // app.module.ts에 ThrottlerModule 등록
  // ThrottlerModule.forRoot({ ttl: 60, limit: 60 })
  // → 60초에 60번 이상 요청 시 차단
  //
  // 로그인 API는 더 엄격하게:
  // @Throttle(5, 60)  → 60초에 5번 (무차별 대입 방지)
  ```
- [ ] 🔴 비밀번호 해싱 확인
  - [ ] 회원가입 시 bcrypt.hash(password, 10) 사용
  - [ ] DB에 해싱된 비밀번호만 저장됨 확인
- [ ] 🔴 모든 쿼리에 userId 필터 확인
  > 💡 다른 유저의 데이터를 절대 못 보게. 빠뜨리면 큰 보안 사고.
- [ ] 🟡 HTTPS 설정 (배포 환경)
- [ ] 🟡 환경변수에 하드코딩된 시크릿 없는지 확인

### 9.2 에러 처리

- [ ] 🔴 HTTP Exception 정리
      | 상황 | 에러 코드 | 메시지 |
      |---|---|---|
      | 로그인 실패 | 401 Unauthorized | "이메일 또는 비밀번호가 올바르지 않습니다" |
      | 토큰 만료/유효하지 않음 | 401 Unauthorized | "인증이 필요합니다" |
      | 다른 유저의 일기 접근 | 403 Forbidden | "접근 권한이 없습니다" |
      | 존재하지 않는 일기 | 404 Not Found | "일기를 찾을 수 없습니다" |
      | 같은 날짜 일기 중복 | 409 Conflict | "해당 날짜에 이미 일기가 있습니다" |
      | 유효성 검증 실패 | 400 Bad Request | (자동 — class-validator가 처리) |
      | 서버 에러 | 500 Internal Server Error | "서버 오류가 발생했습니다" |
- [ ] 🔴 전역 예외 필터에서 일관된 에러 응답 형태 확인
  ```json
  {
    "statusCode": 404,
    "message": "일기를 찾을 수 없습니다",
    "error": "Not Found",
    "timestamp": "2026-04-20T12:00:00.000Z"
  }
  ```

### 9.3 로깅

- [ ] 🟡 NestJS 내장 Logger 활용
  - [ ] 각 서비스에 `private readonly logger = new Logger(EntryService.name)`
  - [ ] 중요 동작에 로그 추가 (일기 생성, 삭제, 로그인 실패 등)
- [ ] 🟢 Winston 또는 Pino로 로깅 고도화 (배포 후)

**예상 소요: 1~2일**

---

## Phase 10. API 문서화 (Swagger)

> 💡 Swagger는 API를 웹페이지에서 테스트할 수 있는 도구입니다.
> 프론트 작업할 때 "이 API는 어떤 데이터를 보내고 받는지" 바로 확인 가능.

### 10.1 Swagger 설정

- [ ] 🟡 📄 `src/main.ts`에 Swagger 설정 추가
  ```ts
  // const config = new DocumentBuilder()
  //   .setTitle('Moodly API')
  //   .setDescription('감정일기 웹 애플리케이션 API')
  //   .setVersion('1.0')
  //   .addBearerAuth()            → JWT 토큰 입력 UI
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document);
  ```

### 10.2 DTO에 Swagger 데코레이터 추가

- [ ] 🟡 각 DTO의 프로퍼티에 `@ApiProperty()` 데코레이터 추가
  ```ts
  // @ApiProperty({ example: 'user@email.com', description: '이메일 주소' })
  // email: string;
  ```
- [ ] 🟡 각 Controller 메서드에 `@ApiOperation()`, `@ApiResponse()` 추가

### 10.3 확인

- [ ] 🟡 `http://localhost:3001/api/docs` 접속 → API 문서 확인
- [ ] 🟡 Swagger UI에서 실제 API 호출 테스트

**예상 소요: 0.5~1일**

---

## Phase 11. 데이터 시딩 (테스트 데이터)

> 💡 프론트 개발할 때 빈 화면만 보면 불편합니다.
> 테스트용 데이터를 자동으로 넣는 스크립트를 만듭니다.

### 11.1 Seed 스크립트

- [ ] 🟡 📄 `src/database/seed.ts`
  ```ts
  // 1. 테스트 유저 생성 (test@moodly.com / password123)
  // 2. 최근 30일치 일기 생성 (감정 랜덤)
  // 3. 각 일기에 랜덤 태그 (회사, 운동, 가족, 친구, 수면 중 1~3개)
  // 4. 각 일기에 랜덤 메모
  ```
- [ ] 🟡 `package.json`에 seed 스크립트 추가
  ```json
  "scripts": {
    "seed": "ts-node src/database/seed.ts"
  }
  ```
- [ ] 🟡 `npm run seed` 실행 → DB에 데이터 확인

**예상 소요: 0.5일**

---

## Phase 12. 테스트

### 12.1 단위 테스트

- [ ] 🟡 `auth.service.spec.ts`
  - [ ] 회원가입 성공/이메일 중복 에러
  - [ ] 로그인 성공/비밀번호 불일치 에러
- [ ] 🟡 `entry.service.spec.ts`
  - [ ] CRUD 각 함수
  - [ ] 권한 체크 (다른 유저 접근 시 에러)
  - [ ] 날짜 중복 체크
- [ ] 🟡 `stats.service.spec.ts`
  - [ ] 스트릭 계산
  - [ ] 감정 분포 집계

### 12.2 E2E 테스트

- [ ] 🟢 NestJS 내장 E2E 테스트 (`test/app.e2e-spec.ts`)
  - [ ] 회원가입 → 로그인 → 일기 작성 → 조회 → 수정 → 삭제 전체 플로우

**예상 소요: 2~3일**

---

## Phase 13. 배포 준비

### 13.1 프로덕션 설정

- [ ] 🔴 `synchronize: false`로 변경 (프로덕션 DB 자동 변경 방지)
  > 💡 개발 중에는 Entity 변경 시 DB 자동 반영이 편하지만,
  > 프로덕션에서는 실수로 테이블이 날아갈 수 있어 반드시 꺼야 합니다.
- [ ] 🔴 TypeORM CLI 마이그레이션 셋업
  ```bash
  # 마이그레이션 생성
  npx typeorm migration:generate -d src/config/data-source.ts src/database/migrations/InitialSchema
  # 마이그레이션 실행
  npx typeorm migration:run -d src/config/data-source.ts
  ```
  > 💡 마이그레이션 = DB 변경 이력 관리. Git의 커밋과 비슷한 개념.
- [ ] 🔴 📄 `src/config/data-source.ts` (마이그레이션용 설정)
- [ ] 🔴 환경변수 프로덕션 값 준비 (DB URL, JWT_SECRET 등)
- [ ] 🔴 `.env.production` 또는 호스팅 플랫폼 환경변수 설정

### 13.2 배포 플랫폼 선택 & 설정

- [ ] 🔴 배포 대상 결정
  > 💡 추천 옵션:
  >
  > - **Railway** — 가장 쉬움. Git push로 자동 배포. PostgreSQL도 한 번에. 무료 티어 있음
  > - **Render** — Railway와 비슷. 무료 티어(느리지만 가능)
  > - **Fly.io** — Docker 기반. 약간 더 복잡하지만 성능 좋음
  > - **AWS EC2/ECS** — 가장 유연하지만 설정 복잡. 초보에겐 비추
- [ ] 🔴 📄 `Dockerfile` 작성 (컨테이너 배포 시)
  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  RUN npm run build
  CMD ["node", "dist/main"]
  ```
- [ ] 🔴 프로덕션 DB 생성 (Railway/Supabase/Neon 등)
- [ ] 🔴 배포 후 API 동작 확인

### 13.3 배포 후 체크리스트

- [ ] 🔴 모든 API 엔드포인트 동작 확인
- [ ] 🔴 CORS 설정 (프론트 도메인 허용)
- [ ] 🔴 HTTPS 동작 확인
- [ ] 🔴 에러 로깅 확인
- [ ] 🔴 DB 연결 안정성 확인
- [ ] 🔴 환경변수에 개발용 값 없는지 확인 (JWT_SECRET 등)

**예상 소요: 2~3일**

---

## Phase 14. 추가 기능 (출시 후)

- [ ] 🟢 푸시 알림 (Web Push)
  - [ ] `npm install web-push`
  - [ ] 푸시 구독 저장 API
  - [ ] 매일 저녁 9시 크론잡 → 알림 발송
- [ ] 🟢 이미지 업로드 (사진 첨부)
  - [ ] Supabase Storage 또는 AWS S3 연동
  - [ ] `POST /api/upload` 엔드포인트
- [ ] 🟢 AI 감정 분석 (메모 → 감정 추출)
- [ ] 🟢 Refresh Token 도입 (보안 강화)

---

## 📦 전체 패키지 설치 (한 번에)

```bash
# 프로덕션 의존성
npm install @nestjs/typeorm typeorm pg \
  @nestjs/passport passport passport-local passport-jwt \
  @nestjs/jwt bcrypt \
  class-validator class-transformer \
  @nestjs/config \
  @nestjs/swagger swagger-ui-express \
  helmet @nestjs/throttler

# 개발 의존성
npm install -D @types/passport-local @types/passport-jwt @types/bcrypt

# 소셜 로그인 (Phase 8에서)
npm install passport-google-oauth20 passport-kakao
npm install -D @types/passport-google-oauth20
```

---

## 🎯 Phase별 마일스톤

| Phase | 주요 산출물                  | 예상 소요              | 누적   |
| ----- | ---------------------------- | ---------------------- | ------ |
| 0     | 개념 학습                    | 0.5일                  | 0.5일  |
| 1     | 프로젝트 초기화 + DB 연결    | 1일                    | 1.5일  |
| 2     | 기본 설정 (CORS, Pipe, 필터) | 1일                    | 2.5일  |
| 3     | Entity 설계 (테이블 생성)    | 1일                    | 3.5일  |
| 4     | 인증 (회원가입/로그인/JWT)   | 3~4일                  | 7일    |
| 5     | 일기 CRUD API                | 3~4일                  | 11일   |
| 6     | 통계 API                     | 2~3일                  | 14일   |
| 7     | 유저 관리 API                | 1일                    | 15일   |
| 8     | 소셜 로그인 (Google/Kakao)   | 2~3일                  | 18일   |
| 9     | 보안 & 에러 처리             | 1~2일                  | 20일   |
| 10    | Swagger 문서화               | 0.5~1일                | 21일   |
| 11    | 데이터 시딩                  | 0.5일                  | 21.5일 |
| 12    | 테스트                       | 2~3일                  | 24일   |
| 13    | 배포                         | 2~3일                  | 27일   |
|       | **총 예상**                  | **약 25~30일 (5~6주)** |        |

---

## 📡 API 엔드포인트 전체 정리

| Method   | Path                        | 인증 | 설명                 |
| -------- | --------------------------- | ---- | -------------------- |
| `POST`   | `/api/auth/signup`          | ❌   | 회원가입             |
| `POST`   | `/api/auth/login`           | ❌   | 로그인 (JWT 반환)    |
| `GET`    | `/api/auth/me`              | ✅   | 내 정보 조회         |
| `GET`    | `/api/auth/google`          | ❌   | Google 로그인        |
| `GET`    | `/api/auth/google/callback` | ❌   | Google 콜백          |
| `GET`    | `/api/auth/kakao`           | ❌   | Kakao 로그인         |
| `GET`    | `/api/auth/kakao/callback`  | ❌   | Kakao 콜백           |
| `GET`    | `/api/users/me`             | ✅   | 프로필 조회          |
| `PATCH`  | `/api/users/me`             | ✅   | 프로필 수정          |
| `PATCH`  | `/api/users/me/password`    | ✅   | 비밀번호 변경        |
| `DELETE` | `/api/users/me`             | ✅   | 계정 삭제            |
| `GET`    | `/api/entries`              | ✅   | 일기 목록 (from, to) |
| `POST`   | `/api/entries`              | ✅   | 일기 생성            |
| `GET`    | `/api/entries/:id`          | ✅   | 일기 상세            |
| `PATCH`  | `/api/entries/:id`          | ✅   | 일기 수정            |
| `DELETE` | `/api/entries/:id`          | ✅   | 일기 삭제            |
| `GET`    | `/api/tags`                 | ✅   | 내 태그 목록         |
| `GET`    | `/api/stats/summary`        | ✅   | 감정 통계 요약       |
| `GET`    | `/api/stats/trend`          | ✅   | 감정 추이            |
| `GET`    | `/api/stats/tags`           | ✅   | 태그별 통계          |

---

## ⚠️ 자주 하는 실수 (초보자 주의)

- [ ] `.env` 파일을 Git에 올림 → **절대 안 됩니다.** `.gitignore` 확인
- [ ] `synchronize: true`를 프로덕션에서 사용 → **데이터 손실 위험.** 반드시 `false`
- [ ] 비밀번호를 해싱 없이 DB에 저장 → **bcrypt 사용 필수**
- [ ] userId 필터 없이 쿼리 → **다른 유저 데이터 노출.** 모든 쿼리에 userId 조건
- [ ] JWT_SECRET이 짧거나 추측 가능 → **최소 32자 랜덤 문자열**
- [ ] 에러 메시지에 서버 내부 정보 노출 → **"서버 오류"로 통일, 상세 정보는 로그에만**
- [ ] CORS를 `*`(모든 도메인 허용)로 설정 → **프론트 도메인만 허용**
- [ ] DB 연결 정보를 코드에 하드코딩 → **환경변수 사용**

---

## 💡 NestJS 유용 CLI 명령어

```bash
# 모듈 생성
nest generate module 모듈이름

# 컨트롤러 생성 (모듈 폴더 안에)
nest generate controller 모듈이름

# 서비스 생성
nest generate service 모듈이름

# 리소스 한 번에 생성 (모듈+컨트롤러+서비스+DTO 전부)
nest generate resource 모듈이름

# 개발 서버 실행 (핫리로드)
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start:prod
```

---

> 이 TODO는 살아있는 문서입니다.
> 막히는 부분이 있으면 해당 Phase의 코드를 구체적으로 요청하세요.
