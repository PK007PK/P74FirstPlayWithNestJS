import { ShopItemInterface } from 'src/interfaces/interfaces';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ShopItemDetails } from './shop-item.details.entity';
import { ShopSet } from './shop-set.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10000, default: '', nullable: true })
  description: string | null;

  @Column({ type: 'float', precision: 7, scale: 2 })
  price: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: 0 })
  boughtCount: number;

  @Column({ default: false })
  wasEverBought: boolean;

  @OneToOne((type) => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  /* Many to one / Subprodukt */
  @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  /*Produkt główny*/
  @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];

  @ManyToMany((type) => ShopSet, (entity) => entity.items)
  @JoinTable() //dodaję tabelę pośredniczącą
  sets: ShopSet[];

  @OneToOne((type) => ShopItem, (entity) => entity.mainShopItem)
  itemInBasket: ShopItem;
}
