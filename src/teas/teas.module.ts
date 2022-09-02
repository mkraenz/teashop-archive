import { Module } from '@nestjs/common';
import { TeasResolver } from './teas.resolver';
import { TeasService } from './teas.service';

@Module({
  providers: [TeasResolver, TeasService],
})
export class TeasModule {}
