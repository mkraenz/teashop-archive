import { Field, InputType, PickType } from '@nestjs/graphql';
import { AddressDto, UserDto } from './user.dto';

@InputType()
class UserAddressInput extends PickType(
  AddressDto,
  ['street', 'city', 'zip', 'country'],
  InputType,
) {}

@InputType()
export class CreateUserInput extends PickType(
  UserDto,
  ['email', 'firstname', 'lastname'],
  InputType,
) {
  @Field(() => UserAddressInput)
  address: UserAddressInput;
}
