import Customer from "../../domain/entity/customer"
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order_item"
import OrderService from "../../service/order.service"

describe("OrderService unit",()=>{
  it("should get total all orders",() =>{
    const orderItem1 = new OrderItem("1", "Item 1", 10, 1, "123456")
    const orderItem2 = new OrderItem("2", "Item 2", 20, 1, "456789")

    const order1 = new Order("1", "123", [orderItem1])
    const order2 = new Order("2", "123", [orderItem2])

    const total = OrderService.total([order1, order2])
    expect(total).toBe(30)

  })


  it("should place an order", () =>{
    const customer = new Customer("1", "John")
    const item1 = new OrderItem("1", "Item 1", 10, 1, "123456")
    const item2 = new OrderItem("2", "Item 2", 10, 1, "123456")

    
    const order = new OrderService().placeOrder(customer, [item1,item2])

    expect(customer.rewardPoints).toBe(2)
    expect(order.total()).toBe(20)
  })
})