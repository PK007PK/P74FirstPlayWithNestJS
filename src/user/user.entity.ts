import { ItemInBasket } from 'src/basket/item-in-basket.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ width: 255 })
  email: string;

  @OneToMany(() => ItemInBasket, (entity) => entity.user)
  itemsInBasket: ItemInBasket[];
}
