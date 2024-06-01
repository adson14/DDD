import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface copy";
import OrderItemModel from "../models/order-item.model";
import OrderModel from "../models/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    },
    {
      include: [{ model: OrderItemModel}]
    }
    );
  }

  async update(entity: Order): Promise<void> {
    try{
      await OrderModel.update({
        customer_id: entity.customerId,
        total: entity.total()
      },
      {
        where: {
          id: entity.id
        },
        
      });

      await OrderItemModel.destroy({
        where: { order_id: entity.id }
      });

      const items = entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id
      }));

      await OrderItemModel.bulkCreate(items);

    } catch(error) {
      console.log(error);
      throw new Error("Cannot update order",)
    }
    
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({ where: { id: id }, include: ["items"] });


      const orderItems: OrderItem[] = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id));
      const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
      console.log(order)
      return order
    } catch(error) {
      throw new Error("Cannot find order",)
    }
  }


  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });
    return orderModels.map(orderModel => {
      const orderItems: OrderItem[] = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id));
      const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
      return order
    });
  }
  
}