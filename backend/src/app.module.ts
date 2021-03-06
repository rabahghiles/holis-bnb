import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './modules/locations/Location.module';
import { CategoryModule } from './modules/categories/Category.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LocationModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
