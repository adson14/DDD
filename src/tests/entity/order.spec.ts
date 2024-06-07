import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";

describe("Order unit", () => {

  it("should throw error when id is empty", () => {
    expect(() =>{
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  })

  it("should throw error when customer is empty", () => {
    expect(() =>{
      let order = new Order("456", "", []);
    }).toThrowError("CustomerId is required");
  })

  it("should throw error when item is empty", () => {
    expect(() =>{
      let order = new Order("456", "josa", []);
    }).toThrowError("Item cannot be empty");
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10, 2, "123456");
    const item2 = new OrderItem("2", "Item 2", 5, 1, "789123");
    const order = new Order("123", "123", [item1, item2]);
    const total = order.total();
    expect(total).toBe(25);

  })

})