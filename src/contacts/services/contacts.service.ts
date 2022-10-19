import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dto/contacts.dtos';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  getAllContacts() {
    return this.contactRepository.find();
  }

  deleteContactById(id: number) {
    return this.contactRepository.delete({ id });
  }

  async updateContact(id: number, contact: CreateContactDto) {
    return await this.contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set(contact)
      .where('id =:id', { id })
      .execute();
  }
}
