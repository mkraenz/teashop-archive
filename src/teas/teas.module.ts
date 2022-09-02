import { Module } from '@nestjs/common';
import { TeasService } from './teas.service';
import { TeasResolver } from './teas.resolver';

@Module({
  providers: [TeasResolver, TeasService]
})
export class TeasModule {}
