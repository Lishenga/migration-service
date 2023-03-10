import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mongo2DbmoduleModule } from 'src/mongo-2-dbmodule/mongo-2-dbmodule.module';
import { MongoDbmoduleModule } from 'src/mongo-dbmodule/mongo-dbmodule.module';
import { MigrationController } from './controllers/migration.controller';
import { AssignedItems } from './entities/postgres/assignedItems';
import { CodeHistory } from './entities/postgres/codehistory.entity';
import { OtpGenerator } from './entities/postgres/otpgenerator.entity';
import { OtpSystem } from './entities/postgres/otpsystem.entity';
import { ProductBatch } from './entities/postgres/productbatch.entity';
import { ProductItem } from './entities/postgres/productitem.entity';
import { DataMigrationService } from './services/migration.service';

@Module({
  imports: [
    MongoDbmoduleModule,
    Mongo2DbmoduleModule,
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: 'https://elastic-prod.omnivoltaic.com/',
      }),
    }),
    TypeOrmModule.forFeature(
      [
        OtpGenerator,
        ProductItem,
        OtpSystem,
        CodeHistory,
        ProductBatch,
        AssignedItems,
      ],
      'postgres',
    ),
  ],
  providers: [DataMigrationService],
  controllers: [MigrationController],
})
export class PostgresModuleModule {}
