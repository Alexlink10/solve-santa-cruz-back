import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Orders from './Orders';

@Entity('order_photos')
class OrderPhotos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Orders, order => order.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}

export default OrderPhotos;
