import Address from "../entity/address";
import Customer from "../entity/customer";

describe("customer unit", () => {
  it("should throw error id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("ID is required");
  })

  it("should throw error name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  })

  it("should change name", () => {
    const customer = new Customer("123", "Joao");
    expect(customer.name).toBe("Joao");
  })

  it("should activate customer", () => {
    const customer = new Customer("1234", "Fulano");
    const address = new Address("Street 1", 1, "12345-678", "Belo Horizonte");
    customer.addAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  })

  it("should thwrow error address is required", () => {
    expect(() => {
      let customer = new Customer("123", "Gil");
      customer.activate();
    }).toThrowError("Address is required");
  })


  it("should deactivate customer", () => {
    const customer = new Customer("1234", "Fulano");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  })

  it("should add reward points",()=>{
    const customer = new Customer("1234", "Fulano");
    expect(customer.rewardPoints).toBe(0);
    customer.addPints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addPints(15);
    expect(customer.rewardPoints).toBe(25);
  })

});