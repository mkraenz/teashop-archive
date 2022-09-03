/* eslint-disable @typescript-eslint/no-inferrable-types -- code-first graphql schema generation needs the explicit type annotation even for inferred types */
import {
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from '@nestjs/class-validator';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Tea } from '@prisma/client';

@ObjectType('Tea')
export class TeaDto {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { description: 'English name of the tea' })
  @IsString()
  @Length(3, 200)
  name: string;

  @Field(() => Float, { description: 'Price in USD' })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Field(() => Int, { description: 'Ideal brewing temperature' })
  @IsNumber({ maxDecimalPlaces: 1 })
  bestAtTemperature: number;

  @Field(() => String, {
    description: 'freetext tags for searchability',
  })
  @IsString()
  tags: string;

  @Field(() => String)
  currency: string = 'EUR';

  @Field(() => String)
  @IsUrl()
  imageUrl: string;

  // TODO rating should probably be a derived value from ratings, with aggregated value duplicated to the tea entity
  @Field(() => Int)
  rating: number = 5;

  // TODO ratingCount should probably be a derived value from ratings
  @Field(() => Int)
  ratingCount: number = 8;

  @Field(() => String)
  @IsString()
  @Length(5)
  description: string;

  /** Do not use this directly. Only use the Tea,from* factory methods.
   * This is only public to work with PickType etc. */
  constructor(data: {
    id: string;
    name: string;
    description: string;
    price: number;
    bestAtTemperature: number;
    tags: string;
    imageUrl: string;
    createdAt: Date;
  }) {
    // GraphQL already handles that we do not accidentally expose too much data.
    Object.assign(this, data);
  }

  public static fromPrisma(dbObject: Tea) {
    return new TeaDto(dbObject);
  }
}
