import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInterface } from '../interfaces/contact.interface';

@Entity()
export class Contact implements ContactInterface {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'first_name',
  })
  firstName: string;

  @Column({
    nullable: false,
    default: '',
    name: 'last_name',
  })
  lastName: string;

  @Column({
    nullable: false,
    default: '',
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  address: string;

  @Column({
    nullable: true,
    default: '',
  })
  note: string;
}
