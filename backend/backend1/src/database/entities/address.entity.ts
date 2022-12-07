// @ts-nocheck
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'wallet_address', unique: true })
  public walletAddress: string;
}
