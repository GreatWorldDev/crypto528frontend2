// @ts-nocheck
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follow {
  @ManyToOne(() => User, u => u.id, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => User, u => u.id, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'following_id' })
  public following: User;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public created: Date;
}
