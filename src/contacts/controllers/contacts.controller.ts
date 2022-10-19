import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dto/contacts.dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getContacts() {
    return this.contactService.getAllContacts();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  deleteContactById(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContactById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contact: CreateContactDto,
  ) {
    return this.contactService.updateContact(id, contact);
  }
}
