// postgres/postgres.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Distributor } from '../entities/distributor.entity';
import { Person } from '../entities/person.entity';

@Injectable()
export class Mongo2DBService {
  constructor(
    @InjectRepository(Person, 'mongodb-2')
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Distributor, 'mongodb-2')
    private readonly distributorRepository: Repository<Distributor>,
  ) {}

  async findDistributorEmail(_id: ObjectID) {
    const distributor = await this.distributorRepository.findOneBy({
      _id,
    });
    const person = await this.personRepository.findOneBy({
      _id: distributor.orgContactPerson,
    });

    return person.contact.email;
  }
}
