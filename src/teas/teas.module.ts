import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TeasResolver } from './teas.resolver';
import { TeasService } from './teas.service';

@Module({
  imports: [PrismaModule],
  providers: [TeasResolver, TeasService],
})
export class TeasModule {}
