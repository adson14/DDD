import { BelongsTo, Column,ForeignKey,HasMany,Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModelSequelize from "./customer.model";
import OrderItemModelSequelize from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModelSequelize extends Model{

  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModelSequelize)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModelSequelize)
  declare customer: CustomerModelSequelize;

  @HasMany(() => OrderItemModelSequelize)
  declare items: OrderItemModelSequelize[]

  @Column({ allowNull: false })
  declare total: number;

}