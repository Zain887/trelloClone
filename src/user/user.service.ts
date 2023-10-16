import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { authCredentialsDto } from './dto/authCredentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

  ) { }

  async signup(authCredentialsDto: authCredentialsDto) {
    const { firstName, lastName, email, password } = authCredentialsDto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      return { message: 'User already exists. Please log in.' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserEntity();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }


  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {

    return await this.userRepository.findOne({ where: { id } });
  }



  async findOrThrowError(id: string): Promise<UserEntity> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: authCredentialsDto) {
    const existingUser = await this.findOrThrowError(id);
    this.userRepository.merge(existingUser, updateUserDto);
    const updatedUser = await this.userRepository.save(existingUser);
    return updatedUser
  }

  async remove(id: string) {
    await this.findOrThrowError(id);
    return await this.userRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

}
