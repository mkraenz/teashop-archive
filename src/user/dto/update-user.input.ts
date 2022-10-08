import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { UserDto } from './user.dto';

@InputType()
export class UpdateUserInput extends IntersectionType(
  PartialType(CreateUserInput),
  PickType(UserDto, ['id']),
) {}
