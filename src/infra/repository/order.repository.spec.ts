import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../models/customer.models";
import OrderItemModel from "../models/order-item.model";
import ProductModel from "../models/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepository from "./order.repository";
import Order from "../../domain/checkout/entity/order";
import OrderModel from "../models/order.model";

describe("OrderRepository unit", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel,OrderItemModel,ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, 2,product.id);

    const order = new Order("123", customer.id, [orderItem]);


    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ]
    });
  });

  it ("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, 2,product.id);

    const order = new Order("123", customer.id, [orderItem]); 
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ]
    });
    
    const product2 = new Product("321", "Product 2", 15);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, 1,product2.id);
    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
    expect(orderModel2.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          order_id: "123",
          price: orderItem.price,
          product_id: "123",
          quantity: orderItem.quantity,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          order_id: "123",
          price: orderItem2.price,
          product_id: "321",
          quantity: orderItem2.quantity,
        }
      ]
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.addAddress(address);
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem = new OrderItem("1", product.name, product.price, 2,product.id);
    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: 20,
      items:  [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: 10,
          quantity: 2,
          order_id: "123",
          product_id: "123"
        }
      ]
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.addAddress(address);
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem = new OrderItem("1", product.name, product.price, 2,product.id);
    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const product2 = new Product("321", "Product 2", 15);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, 1,product2.id);
    const order2 = new Order("321", customer.id, [orderItem2]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    const orders = [order, order2];
    expect(orders).toEqual(foundOrders);
  });

})