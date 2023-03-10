import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/mongo/make/item.entity';
import { ItemBatch } from './entities/mongo/make/itemBatch.entity';
import { ItemFirmware } from './entities/mongo/make/itemFirmware.entity';
import { ItemSKU } from './entities/mongo/make/itemSKU.entity';
import { ItemStock } from './entities/mongo/make/itemStock.entity';
import { BulkCodeEvent } from './entities/mongo/manage/bulkCodeEvent';
import { CodeEvent } from './entities/mongo/manage/codeEvent.entity';
import { CodeGenerator } from './entities/mongo/manage/codeGen.entity';
import { CodeSystem } from './entities/mongo/manage/codeSystem.entity';
import { ItemFleet } from './entities/mongo/manage/itemFleet.entity';
import { Avatar } from './entities/mongo/track/avatar.entity';
import {
  GATT,
  Attribute,
} from './entities/mongo/track/generic-attribute-profile.entity';
import { MongoDBService } from './service/mongodb.service';

@Module({
  imports: [
    // forwardRef(() => PostgresModuleModule),
    TypeOrmModule.forFeature(
      [
        Item,
        ItemBatch,
        ItemFirmware,
        ItemSKU,
        CodeEvent,
        CodeGenerator,
        ItemStock,
        GATT,
        // Shipment,
        ItemFleet,
        Attribute,
        CodeSystem,
        Avatar,
        BulkCodeEvent,
      ],
      'mongodb',
    ),
  ],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDbmoduleModule {}
