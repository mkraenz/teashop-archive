import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<{ NODE_ENV: string }, true>) => {
        const isProduction = config.get('NODE_ENV') === 'production';
        const autoSchemaFile = !isProduction
          ? join(__dirname, 'schema.gql')
          : undefined;
        const typePaths = isProduction
          ? [join(__dirname, 'schema.gql')]
          : undefined;
        return {
          sortSchema: true,
          autoSchemaFile,
          typePaths,
        };
      },
      inject: [ConfigService],
    }),
    TeasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
