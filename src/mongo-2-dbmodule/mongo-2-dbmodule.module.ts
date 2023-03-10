import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distributor } from 'src/mongo-2-dbmodule/entities/distributor.entity';
import { Person } from './entities/person.entity';
import { Mongo2DBService } from './services/mongodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor, Person], 'mongodb-2')],
  providers: [Mongo2DBService],
  exports: [Mongo2DBService],
})
export class Mongo2DbmoduleModule {}
