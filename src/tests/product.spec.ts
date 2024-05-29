import Product from "../domain/entity/product";

describe("Product unit test", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  })

  it("should throw error when price is less than zero", () => {
    expect(() => {
      let product = new Product("123", "Ads", -1);
    }).toThrowError("Price must be greater than zero");
  })

  it("should change name", () => {
    let product = new Product("123", "Ads", 20);
    product.changeName("Product 1");
    expect(product.name).toBe("Product 1");
  })


  it("should add description", () => {
    let product = new Product("123", "Ads", 20);
    product.addDescription("This is a description of the product");
    expect(product.description).toBe("This is a description of the product");
  })

  it("should change description", () => {
    let product = new Product("123", "Ads", 20);
    product.addDescription("This is a description of the product");
    product.changeDescription("This is a description of the product 2");
    expect(product.description).toBe("This is a description of the product 2");
  })

  it("should change price", () => {
    let product = new Product("123", "Ads", 20);
    product.changePrice(30);
    expect(product.price).toBe(30);
  })

  
})