import OrderItem from "../../domain/checkout/entity/order_item"

describe('OrderItem unit',() =>{
  it("should  throw error when id is empty",() => {
    expect(()=>{
      let orderItem = new OrderItem("", "Item 1", 10, 2, "123456")
    })
  })

  it("should  throw error when name is empty",() =>{
    expect(() =>{
      let orderItem = new OrderItem("123", "", 10, 2, "123456")
    })
  })

  it("should  throw error when price is less than zero",()=>{
    expect(() =>{
      let orderItem = new OrderItem("123", "Item 1", -1, 2, "123456")
    })
  })

  it("should throw error if the item quantity is greater than 0", () => {
    expect(()=>{
      const item1 = new OrderItem("1", "Item 1", 10, 0, "123456");
    }).toThrowError("Quantity must be greater than 0");

  })

  it("should throw error when product id is empty",() =>{
    expect(()=>{
      const item = new OrderItem("22", "Item 1", 10, 2, "");
    })
  })
    
})