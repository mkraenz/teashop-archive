import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tea } from '@prisma/client';
import { last } from 'lodash';
import { TeaDto } from './tea.dto';

export interface PaginatedResult<T> {
  data: T[];
  cursor?: string;
  totalCount: number;
}

@ObjectType('PaginatedTeas')
export class PaginatedTeas implements PaginatedResult<TeaDto> {
  @Field(() => [TeaDto])
  data: TeaDto[];

  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalCountFiltered: number;

  static fromPrisma(
    teas: Tea[],
    totalCount: number,
    totalCountFiltered: number,
  ) {
    const result = new PaginatedTeas();
    result.data = teas.map(TeaDto.fromPrisma);
    result.totalCount = totalCount;
    result.totalCountFiltered = totalCountFiltered;
    result.cursor = last(teas)?.id;
    return result;
  }
}
