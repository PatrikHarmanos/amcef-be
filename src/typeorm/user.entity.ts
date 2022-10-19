import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'username',
    unique: true,
  })
  username: string;

  @Column({
    name: 'email',
    default: '',
  })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 5;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  @Column({
    nullable: false,
    default: '',
    name: 'password',
  })
  password: string;
}
