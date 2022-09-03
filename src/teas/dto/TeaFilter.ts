import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class Filter {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  contains?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  in?: string[];
}

@InputType()
export class TeaFilter {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  ids?: string[];

  @Field(() => Filter, { nullable: true })
  @IsOptional()
  @IsNotEmptyObject()
  name?: Filter;

  @Field(() => Filter, { nullable: true })
  @IsOptional()
  @IsNotEmptyObject()
  tags?: Filter;
}
