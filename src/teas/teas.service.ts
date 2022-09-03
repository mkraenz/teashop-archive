import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeasService {
  constructor(private prisma: PrismaService) {}

  create(createTeaInput: Prisma.TeaCreateInput) {
    return this.prisma.tea.create({ data: createTeaInput });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TeaWhereUniqueInput;
    where?: Prisma.TeaWhereInput;
    orderBy?: Prisma.TeaOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const [totalCount, totalCountFiltered, teas] =
      await this.prisma.$transaction([
        this.prisma.tea.count(),
        this.prisma.tea.count({ where }),
        this.prisma.tea.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        }),
      ]);
    return [teas, totalCount, totalCountFiltered] as const;
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
