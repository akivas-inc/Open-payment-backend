import { Module } from '@nestjs/common';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './helpers/helper.module';

@Module({
  imports: [
    HelperModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, './i18n/'),
        watch: true
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
