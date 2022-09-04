import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CognitoAuthGuard } from './auth/cognito-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<{ NODE_ENV: string }, true>) => {
        const isProduction = config.get('NODE_ENV') === 'production';
        const autoSchemaFile = !isProduction
          ? join(process.cwd(), 'src', 'schema.gql')
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
  providers: [
    AuthModule,
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: false,
        stopAtFirstError: true,
        validatorPackage: require('@nestjs/class-validator'),
      }),
    },
    {
      provide: APP_GUARD,
      useClass: CognitoAuthGuard,
    },
  ],
})
export class AppModule {}
