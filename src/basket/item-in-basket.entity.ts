import { ShopItem } from 'src/shop/shop-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { addProductDto } from './dto/add-product.dto';

@Entity()
export class ItemInBasket extends BaseEntity implements addProductDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  count: number;

  @OneToOne(() => ShopItem, (entity) => entity.itemInBasket)
  @JoinColumn()
  shopItem: ShopItem;
}
