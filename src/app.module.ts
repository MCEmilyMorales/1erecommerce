import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig], // carga todo el archivo  de typeORMConfig de forma global
    }),
    TypeOrmModule.forRootAsync({
      // * forRootAsync carga variables de entorno antes de que lo ejecute
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => //* codigo asincrono por eso se usa useFactory
        configService.get('typeorm'),//* trae el typeorm, 
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
