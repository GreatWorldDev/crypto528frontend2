// @ts-nocheck
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Follow } from './follow.entity';
import { NFTFollow } from './nftfollow.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_name', nullable: false })
  public userName: string;

  @Column({ name: 'nickname', nullable: true, unique: true })
  public nickName: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public created: Date;

  @Column({ default: '' })
  public bio: string;

  @Column({ name: 'avatar_image', nullable: true })
  public avatarImage: string;

  @Column({ name: 'cover_image', nullable: true })
  public coverImage: string;

  @Column({ name: 'website_url', nullable: true })
  public websiteUrl: string;

  @Column({ name: 'discord_url', nullable: true })
  public discordUrl: string;

  @Column({ name: 'facebook_url', nullable: true })
  public facebookUrl: string;

  @Column({ name: 'instagram_url', nullable: true })
  public instagramUrl: string;

  @Column({ name: 'twitter_url', nullable: true })
  public twitterUrl: string;

  @Column({ name: 'verified', default: false })
  public verified: boolean;

  @Column({ name: 'referral_code', nullable: true })
  public referralCode: string;

  @OneToMany(() => Follow, f => f.user)
  followings: Follow[];

  @OneToMany(() => Follow, f => f.following)
  followers: Follow[];

  followingCount: number;

  followerCount: number;
}
