import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @Column()
  rating: number;
}