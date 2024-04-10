import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { RespUser, User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<RespUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email.toLowerCase() });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);

    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    const responseUser = await this.responseUser(createUserData);

    return responseUser;
  }

  public async login(userData: LoginUserDto): Promise<RespUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email.toLowerCase() });

    if (!findUser) throw new HttpException(409, 'Authentication error. Check entered data');

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(409, 'Authentication error. Check entered data');

    const responseUser = await this.responseUser(findUser);

    return responseUser;
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const { email, password } = userData;

    const findUser: User = await this.users.findOne({
      email: email.toLowerCase(),
      password: password,
    });

    if (!findUser) throw new HttpException(409, `This email ${email} was not found`);

    const SignOutedUser = await this.users.findByIdAndUpdate(findUser._id, { token: null }, { new: true });

    return SignOutedUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public async responseUser(user: User): Promise<RespUser> {
    const tokenData = this.createToken(user);
    const { token, name, role } = await this.users.findByIdAndUpdate(user._id, { token: tokenData.token }, { new: true });
    const cookie = this.createCookie(tokenData);

    const response = {
      cookie,
      user: {
        token,
        name,
        role,
      },
    };

    return response;
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
