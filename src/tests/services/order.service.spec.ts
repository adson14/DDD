import Order from "../../entity/order"
import OrderItem from "../../entity/order_item"
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
})