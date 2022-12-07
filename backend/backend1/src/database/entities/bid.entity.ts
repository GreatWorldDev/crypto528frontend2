// @ts-nocheck
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { Auction } from './auction.entity';
import { NFT } from './nft.entity';
import { User } from './user.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Auction, a => a.id)
  @JoinColumn({ name: 'auction_id' })
  public auction: Auction;

  @ManyToOne(() => NFT, t => t.tokenId)
  @JoinColumn({ name: 'token_id' })
  public token: NFT;

  @ManyToOne(() => Address, d => d.id)
  @JoinColumn({ name: 'address_id' })
  public address: Address;

  @ManyToOne(() => User, u => u.id)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public time: Date;

  @Column({ type: 'float', default: 0.0 })
  public price: number;

  @Column({ name: 'transaction', nullable: true })
  public transaction: string;
}
