import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateTeaInput } from './create-tea.input';

@InputType()
export class UpdateTeaInput extends PartialType(CreateTeaInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  tags?: string;

  toPrisma(): Prisma.TeaUpdateInput {
    return {
      bestAtTemperature: this.bestAtTemperature,
      description: this.description,
      name: this.name,
      tags: this.tags,
      imageUrl: this.imageUrl,
      price: this.price,
    };
  }
}
