import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Activity {
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
  currentParticipants: number;

  @Column()
  maxParticipants: number;

  @Column('simple-array')
  participantList: number[];
}