import {
  IsEmail,
  IsString,
  Length,
  ValidateNested,
} from '@nestjs/class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}
@ObjectType()
export class AddressDto implements Address {
  @Field()
  @Length(1, 255)
  @IsString()
  street: string;

  @Field()
  @Length(1, 255)
  @IsString()
  city: string;

  @Field()
  @Length(3, 255)
  @IsString()
  zip: string;

  @Field()
  @Length(3, 255)
  @IsString()
  country: string;
}

@ObjectType()
export class UserDto {
  // TODO use JWT sub instead
  @Field()
  @IsString()
  id: string;

  @Field()
  @Length(3, 255)
  @IsString()
  firstname: string;

  @Field()
  @Length(3, 255)
  @IsString()
  lastname: string;

  @Field()
  @Length(3, 255)
  @IsEmail()
  email: string;

  // TODO switch to addresses: AddressDto[] instead
  @ValidateNested()
  @Type(() => AddressDto)
  @Field(() => AddressDto)
  address: AddressDto;
}
