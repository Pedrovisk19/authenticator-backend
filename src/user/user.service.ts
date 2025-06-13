/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}
  private lastId = 1;
  private users: User[] = [
    {
      id: 1,
      name: "JohnDoe",
      email: "pedro@gmail.com",
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      primeiroAcesso: true, 
    },
  ];

  // Encontra todos os usuários
  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  // Encontra um usuário
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return user;
    throw new Error(`User not found`);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user;
    throw new Error(`User not found`);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      primeiroAcesso: false, 
    }

   return await this.userRepository.save(user);
    // return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.findIndex((user) => user.id === id);
    

    if (!user) throw new Error(`User not found`);

    const usuarioAtualizado = this.users[user];

    this.users[user] = {
      ...usuarioAtualizado,
      ...updateUserDto,
    };
  }

  async delete(userId: number) {

   return await this.userRepository.delete(userId);
    // return newUser;
  }
}
