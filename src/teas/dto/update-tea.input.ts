import { IsOptional, IsString } from '@nestjs/class-validator';
import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateTeaInput } from './create-tea.input';
import { TeaDto } from './tea.dto';

@InputType()
export class UpdateTeaInput extends IntersectionType(
  PartialType(CreateTeaInput),
  PickType(TeaDto, ['id']),
) {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
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
