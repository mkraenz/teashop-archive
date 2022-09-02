import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeasService } from './teas.service';
import { Tea } from './entities/tea.entity';
import { CreateTeaInput } from './dto/create-tea.input';
import { UpdateTeaInput } from './dto/update-tea.input';

@Resolver(() => Tea)
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Mutation(() => Tea)
  createTea(@Args('createTeaInput') createTeaInput: CreateTeaInput) {
    return this.teasService.create(createTeaInput);
  }

  @Query(() => [Tea], { name: 'teas' })
  findAll() {
    return this.teasService.findAll();
  }

  @Query(() => Tea, { name: 'tea' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teasService.findOne(id);
  }

  @Mutation(() => Tea)
  updateTea(@Args('updateTeaInput') updateTeaInput: UpdateTeaInput) {
    return this.teasService.update(updateTeaInput.id, updateTeaInput);
  }

  @Mutation(() => Tea)
  removeTea(@Args('id', { type: () => Int }) id: number) {
    return this.teasService.remove(id);
  }
}
