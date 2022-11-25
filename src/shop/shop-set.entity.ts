import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Entity()
export class ShopSet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  setId: string;

  @Column({ length: 100 }) //nazwa max 100 znaków
  name: string;

  @ManyToMany((type) => ShopItem, (entity) => entity.sets)
  items: ShopItem[];
}
