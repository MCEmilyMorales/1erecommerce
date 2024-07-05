import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [FileUploadService, CloudinaryConfig, CloudinaryRepository],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
