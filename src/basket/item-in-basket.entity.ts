import { ShopItemInterface } from 'src/interfaces/interfaces';
import { ShopItem } from 'src/shop/shop-item.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemInBasket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => ShopItem, (entity) => entity.itemInBasket)
  @JoinColumn()
  shopItem: ShopItem;

  @ManyToOne(() => User, (entity) => entity.itemsInBasket)
  @JoinColumn()
  user: User;
}
