import { CreateTeaInput } from './create-tea.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeaInput extends PartialType(CreateTeaInput) {
  @Field(() => Int)
  id: number;
}
