import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...input,
        address: input.address as unknown as Prisma.JsonObject,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  update(id: string, input: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...input,
        // TODO only include when input.address is defined
        address: JSON.stringify(input.address),
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
