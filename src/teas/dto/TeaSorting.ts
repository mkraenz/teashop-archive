import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Tea } from '@prisma/client';

export enum SortingDirection {
  ascending = 'asc',
  descending = 'desc',
}

function SortableField() {
  return function (target: any, key: string) {
    Field(() => SortingDirection, { nullable: true })(target, key);
    IsEnum(SortingDirection)(target, key);
  };
}

type TeaSortingType = {
  [P in keyof Pick<
    Tea,
    'id' | 'bestAtTemperature' | 'price' | 'name' | 'description' | 'createdAt'
  >]?: SortingDirection;
};

@InputType()
export class TeaSorting implements TeaSortingType {
  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  id?: SortingDirection;

  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  name?: SortingDirection;

  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  price?: SortingDirection;

  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  bestAtTemperature?: SortingDirection;

  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  description?: SortingDirection;

  @Field(() => SortingDirection, { nullable: true })
  @IsOptional()
  @IsEnum(SortingDirection)
  createdAt?: SortingDirection;
}

type Exact<T, I> = T extends I
  ? Exclude<keyof T, keyof I> extends never
    ? T
    : never
  : never;
type A = Exact<TeaSorting, TeaSortingType>;

type EnsureNoAccessProperties = Exact<TeaSorting, TeaSortingType> extends never
  ? false
  : true;
/** if this errors, you have properties in the class that are not in the Exact interface.
 * Remove all access properties from the class and this error should disappear.
 * Why is this important? Because the Sorting class (and thus the graphql schema Sorting type) must only allow properties that actually exist on the Tea database object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ensureNoAccessProperties: EnsureNoAccessProperties = true;

registerEnumType(SortingDirection, {
  name: 'SortingDirection',
});
