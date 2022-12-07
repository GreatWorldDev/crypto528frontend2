// @ts-nocheck
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NFT } from './nft.entity';

@Entity('traits')
export class Trait {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public key: string;

  @Column({ nullable: false })
  public value: string;

  @ManyToOne(() => NFT, n => n.tokenId)
  @JoinColumn({ name: 'token_id', nullable: false })
  public token: NFT;
}
