// @ts-nocheck
import { Column, Entity, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bid } from './bid.entity';
import { NFT } from './nft.entity';
import { User } from './user.entity';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => NFT, t => t.tokenId, { nullable: false })
  @JoinColumn({ name: 'token_id' })
  public token: NFT;

  @ManyToOne(() => User, u => u.id, { nullable: false, unique: false })
  @JoinColumn({ name: 'creator_id' })
  public auctionCreator: User;

  @ManyToOne(() => User, u => u.id, { nullable: true, unique: false })
  @JoinColumn({ name: 'last_bidder_id' })
  public lastBidder: User;

  @Column('timestamp', { name: 'start_time', nullable: false })
  public auctionStartTime: Date;

  @Column({ name: 'length', default: 0 })
  public auctionLength: number;

  @Column({ name: 'current_price', type: 'float', default: 0.0 })
  public currentPrice: number;

  @Column({ default: 'ALIVE' }) // ALIVE | CANCEL | DEAD
  public status: string;

  @OneToMany(() => Bid, b => b.id, { nullable: true })
  public bids: Bid[];
}
