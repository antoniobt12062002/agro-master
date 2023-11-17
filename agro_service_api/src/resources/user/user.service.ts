import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AccessUserDto } from './dto/access-user.dto';
import { Request, Response } from 'express';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createToken(userId?: string) {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
      expiresIn: '7d',
    });
  }

  createRefreshToken(userId?: string) {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, {
      expiresIn: '20d',
    });
  }

  async registerUser(data: CreateUserDto) {
    console.log(data);
    try {
      if (!(data.email || data.password)) {
        throw new HttpException(
          'Erro falta de parâmetros!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const emailExists = await this.userRepository.findOneBy({
        email: data.email,
      });

      if (emailExists) {
        throw new HttpException(
          'Esse email de usuário já existe!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (data.password.length < 6) {
        throw new HttpException(
          'Erro a senha deve conter 6 ou mais caracteres!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordEncrypt = await bcrypt.hash(data.password, 10);
      if (!passwordEncrypt) {
        throw new HttpException(
          'Encrypt error!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      data.password = passwordEncrypt;

      const usercreate = await this.userRepository.save(data);

      return usercreate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async access(data: AccessUserDto) {
    try {
      if (!(data.email || data.password)) {
        throw new HttpException(
          'Erro faltas de parâmetros!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userRepository.findOneBy({ email: data.email });

      if (!user) {
        throw new HttpException(
          'Email de usuário incorreto!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordConfirm = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!passwordConfirm) {
        throw new HttpException(
          'Email de usuário ou senha incorretos!',
          HttpStatus.BAD_REQUEST,
        );
      }

      // tokens
      const accessToken = this.createToken(user.id);
      const refreshToken = this.createRefreshToken(user.id);

      return {
        access: accessToken,
        refresh: refreshToken,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserLogged(req: Request, res: Response) {
    try {
      const request: any = req;

      const user = await this.userRepository.findOne({
        where: { id: request.user.id },
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkEmail(data: CheckEmailDto) {
    if (!data.email) {
      throw new HttpException('Falta de parâmetros!', HttpStatus.FORBIDDEN);
    }

    const email = data.email;

    const check = await this.userRepository.findOne({ where: { email } });

    if (!check) {
      throw new HttpException(
        'Email não encontrado ou sem vínculo!',
        HttpStatus.FORBIDDEN,
      );
    }

    return Object(check.email);
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('refresh', { path: '/access/user/refresh' });

      res.json();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: null) {
    return `This action updates a #${id} ${updateUserDto ?? undefined} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
