import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ShopItem extends BaseEntity implements ShopItem {
  @PrimaryGeneratedColumn()
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
}
