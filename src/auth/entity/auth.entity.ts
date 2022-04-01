import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
