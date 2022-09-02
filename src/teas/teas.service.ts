import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeasService {
  constructor(private prisma: PrismaService) {}

  create(createTeaInput: Prisma.TeaCreateInput) {
    return this.prisma.tea.create({ data: createTeaInput });
  }

  findAll() {
    return this.prisma.tea.findMany({ where: {} });
  }

  findOne(id: string) {
    return this.prisma.tea.findFirst({ where: { id } });
  }

  update(params: {
    where: Prisma.TeaWhereUniqueInput;
    data: Prisma.TeaUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.tea.update({ where, data });
  }

  remove(id: string) {
    return this.prisma.tea.delete({ where: { id } });
  }
}
