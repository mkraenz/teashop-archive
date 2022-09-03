import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeaInput } from './dto/create-tea.input';
import { PaginatedTeas } from './dto/PaginatedResult';
import { Paging } from './dto/Paging';
import { TeaDto } from './dto/tea.dto';
import { TeaFilter } from './dto/TeaFilter';
import { TeaSorting } from './dto/TeaSorting';
import { UpdateTeaInput } from './dto/update-tea.input';
import { TeasService } from './teas.service';

@Resolver(() => TeaDto)
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Mutation(() => TeaDto)
  async createTea(@Args('input') input: CreateTeaInput) {
    // TODO handle errors
    const createdTea = await this.teasService.create(input);
    return TeaDto.fromPrisma(createdTea);
  }

  @Query(() => PaginatedTeas, { name: 'teas' })
  async findAll(
    @Args('paging', { type: () => Paging, nullable: true })
    paging: Paging = Paging.default,
    @Args('filter', { type: () => TeaFilter, nullable: true })
    filter?: TeaFilter,
    @Args('sorting', { type: () => TeaSorting, nullable: true })
    sorting?: TeaSorting,
  ) {
    const [teas, totalCount, totalCountFiltered] =
      await this.teasService.findAll({
        skip: paging.skip,
        take: paging.take,
        ...(paging?.fromIdCursor && { cursor: { id: paging.fromIdCursor } }),
        where: {
          name: {
            contains: filter?.name?.contains,
            mode: 'insensitive',
            in: filter?.name?.in,
          },
          tags: {
            contains: filter?.tags?.contains,
            mode: 'insensitive',
            in: filter?.tags?.in,
          },
        },
        orderBy: {
          name: sorting?.name,
          createdAt: sorting?.createdAt,
          id: sorting?.id,
          description: sorting?.description,
          price: sorting?.price,
          bestAtTemperature: sorting?.bestAtTemperature,
        },
      });
    return PaginatedTeas.fromPrisma(teas, totalCount, totalCountFiltered);
  }

  @Query(() => TeaDto, { name: 'tea' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const tea = await this.teasService.findOne(id);
    if (!tea) return new NotFoundException();
    return TeaDto.fromPrisma(tea);
  }

  @Mutation(() => TeaDto, { description: 'Partially update the tea' })
  async updateTea(@Args('input') input: UpdateTeaInput) {
    const tea = await this.teasService.findOne(input.id);
    if (!tea) return new NotFoundException();

    const updatedTea = await this.teasService.update({
      where: { id: input.id },
      data: input.toPrisma(),
    });
    return TeaDto.fromPrisma(updatedTea);
  }

  @Mutation(() => Boolean)
  async removeTea(@Args('id', { type: () => ID }) id: string) {
    const tea = await this.teasService.findOne(id);
    if (!tea) return new NotFoundException();

    await this.teasService.remove(id);
    return true;
  }
}
