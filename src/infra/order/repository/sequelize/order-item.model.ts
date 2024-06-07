import { BelongsTo, Column,ForeignKey,Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModelSequelize from "../../../product/repository/sequelize/product.model";
import OrderModelSequelize from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false
})
export default class OrderItemModelSequelize extends Model{

  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModelSequelize)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModelSequelize)
  declare product: ProductModelSequelize;


  @ForeignKey(() => OrderModelSequelize)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => OrderModelSequelize)
  declare order: OrderModelSequelize;


  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

}