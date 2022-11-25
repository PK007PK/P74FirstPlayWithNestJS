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
export class ShopItem extends BaseEntity implements ShopItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 }) //nazwa max 100 znaków
  name: string;

  @Column({ length: 10000, default: '', nullable: true }) //opis max 1000 znaków
  description: string | null;
  //   @Column({ type: 'decimal', precision: 10, scale: 2 }) //cena max 10 znaków, 2 po przecinku

  @Column({ type: 'float', precision: 6, scale: 2 }) //cena max 10 znaków, 2 po przecinku
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
}
