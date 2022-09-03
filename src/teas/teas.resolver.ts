import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeaInput } from './dto/create-tea.input';
import { TeaDto } from './dto/tea.dto';
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

  @Query(() => [TeaDto], { name: 'teas' })
  async findAll() {
    const teas = await this.teasService.findAll();
    return teas.map(TeaDto.fromPrisma);
  }

  @Query(() => TeaDto, { name: 'tea' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const tea = await this.teasService.findOne(id);
    if (!tea) return new NotFoundException();
    return TeaDto.fromPrisma(tea);
  }

  @Mutation(() => TeaDto, { description: 'Partially update the tea' })
  async updateTea(@Args('input') input: UpdateTeaInput) {
    // TODO handle errors
    const updatedTea = await this.teasService.update({
      where: { id: input.id },
      data: input.toPrisma(),
    });
    return TeaDto.fromPrisma(updatedTea);
  }

  @Mutation(() => Boolean)
  async removeTea(@Args('id', { type: () => ID }) id: string) {
    // TODO handle errors
    await this.teasService.remove(id);
    return true;
  }
}
