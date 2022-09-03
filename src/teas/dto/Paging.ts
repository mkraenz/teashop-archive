import { IsInt, IsOptional, Max, Min } from '@nestjs/class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Paging {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number = 20;
}
