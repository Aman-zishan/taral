import { Module } from '@nestjs/common';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { EventModule } from '@modules/events';
import { StorageModule } from '@modules/storage';
import { LoggerModule } from 'nestjs-pino';
import { EntitiesModule } from './modules/entity/entity.module';
import { CompaniesModule } from './modules/company/company.module';
import { FinancialsModule } from './modules/financial/financials.module';
import { MailConfigService } from './modules/mail/mail-config.service';
import { ForgotModule } from './modules/forgot/forgot.module';
import { MailModule } from './modules/mail/mail.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import authConfig from './config/auth.config';
import { FilesModule } from './modules/files/files.module';
import { RatingsModule } from './modules/rating/ratings.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { SuppliersModule } from './modules/supplier/supplier.module';
import { BuyersModule } from './modules/buyer/buyers.module';
import { TransactionsModule } from './modules/transaction/transaction.module';
import { GoodsAndServicesModule } from './modules/service/service.module';
import { ContractsModule } from './modules/contract/contracts.module';
import { JobsModule } from './jobs/jobs.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: configService.get('app.fallbackLanguage'),
    //     parserOptions: {
    //       path: path.join(
    //         configService.get('app.workingDirectory'),
    //         'src',
    //         'i18n',
    //         'translations',
    //       ),
    //     },
    //   }),
    //   parser: I18nJsonParser,
    //   inject: [ConfigService],
    // }),
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem');
      },
      inject: [ConfigService],
    }),
    // UsersModule,
    // AuthModule,
    // ForgotModule,
    // MailModule,
    HomeModule,
    EventModule,
    StorageModule,
    LoggerModule,
    EntitiesModule,
    CompaniesModule,
    FinancialsModule,
    FilesModule,
    RatingsModule,
    SectorsModule,
    SuppliersModule,
    BuyersModule,
    TransactionsModule,
    GoodsAndServicesModule,
    ContractsModule,
    JobsModule
  ],
})
export class AppModule {}
