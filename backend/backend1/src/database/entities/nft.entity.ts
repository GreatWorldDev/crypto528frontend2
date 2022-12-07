// @ts-nocheck
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Auction } from './auction.entity';
import { Bid } from './bid.entity';
import { NFTFollow } from './nftfollow.entity';
import { Trait } from './trait.entity';
import { User } from './user.entity';

@Entity('nfts')
export class NFT {
  @PrimaryColumn({ name: 'id' })
  public tokenId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id', nullable: false })
  public creator: User;

  @ManyToOne(() => User, u => u.id)
  @JoinColumn({ name: 'owner_id', nullable: false })
  public owner: User;

  @Column({ name: 'currency_type', nullable: false })
  public currencyType: string;

  @Column({ name: 'title', nullable: false })
  public title: string;

  @Column({ name: 'description', default: '' })
  public description: string;

  @Column({ name: 'image', nullable: false })
  public image: string;

  @Column({ name: 'price', type: 'float', default: 0.0 })
  public price: number;

  @Column({ name: 'is_sale', default: 0 })
  public isSale: number;

  @Column({ name: 'token_uri', nullable: false })
  public tokenURI: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public time: Date;

  @Column({ name: 'follower_count', default: 0 })
  public followerCount: number;

  @OneToOne(() => Auction, a => a.token)
  public auctionInfo: Auction | null;

  @OneToMany(() => Bid, b => b.token)
  public bidHistory: Bid[] | undefined;

  @OneToMany(() => Bid, b => b.token)
  public totalHistory: Bid[] | undefined;

  @OneToMany(() => NFTFollow, f => f.token)
  public followers: User[] | undefined;

  @OneToMany(() => Trait, t => t.id)
  public traits: Trait[] | undefined;
}
