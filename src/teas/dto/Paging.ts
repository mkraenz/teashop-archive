import { IsInt, IsOptional, IsUUID, Max, Min } from '@nestjs/class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({
  description:
    'For an explanation of Offset Pagination vs Cursor-based pagination, see https://www.prisma.io/docs/concepts/components/prisma-client/pagination',
})
export class Paging {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  @IsOptional()
  @IsInt()
  @Min(-100)
  @Max(100)
  take?: number = 20;

  @Field(() => String, {
    nullable: true,
    description: `Hint: Use skip: 1 to exclude the object at the cursor.
Hint: Use take: -4, skip: 1 to get the 4 objects before the cursor.`,
  })
  @IsOptional()
  @IsUUID()
  fromIdCursor?: string;

  static get default() {
    const paging = new Paging();
    paging.skip = 0;
    paging.take = 20;
    return paging;
  }
}
