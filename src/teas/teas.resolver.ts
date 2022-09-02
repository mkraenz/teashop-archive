import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeaInput } from './dto/create-tea.input';
import { TeaDto } from './dto/tea.dto';
import { UpdateTeaInput } from './dto/update-tea.input';
import { TeasService } from './teas.service';

@Resolver(() => TeaDto)
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Mutation(() => TeaDto)
  createTea(@Args('createTeaInput') createTeaInput: CreateTeaInput) {
    return this.teasService.create(createTeaInput);
  }

  @Query(() => [TeaDto], { name: 'teas' })
  findAll() {
    return this.teasService.findAll();
  }

  @Query(() => TeaDto, { name: 'tea' })
  findOne(@Args('id') id: string) {
    return this.teasService.findOne(id);
  }

  @Mutation(() => TeaDto)
  updateTea(@Args('updateTeaInput') updateTeaInput: UpdateTeaInput) {
    return this.teasService.update(updateTeaInput.id, updateTeaInput);
  }

  @Mutation(() => TeaDto)
  removeTea(@Args('id') id: string) {
    return this.teasService.remove(id);
  }
}
