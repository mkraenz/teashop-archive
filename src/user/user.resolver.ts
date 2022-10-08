import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto as User } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.update(input.id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
