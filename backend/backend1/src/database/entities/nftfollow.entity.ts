// @ts-nocheck
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { NFT } from './nft.entity';
import { User } from './user.entity';

@Entity('nft_follows')
export class NFTFollow {
  @OneToOne(() => NFT, t => t.id, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_id' })
  public token: NFT;

  @OneToOne(() => User, u => u.id, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public time: Date;
}
