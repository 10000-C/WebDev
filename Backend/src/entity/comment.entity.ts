import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column()
  username: string;

  @Column()
  aid: number;

  @Column()
  time: string;

  @Column()
  content: string;
}