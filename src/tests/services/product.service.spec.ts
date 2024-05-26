import Product from "../../entity/product"
import ProductService from "../../service/product.service"

describe("ProductService unit",()=>{
  it("Shound change price of all products",()=>{
    const product1 = new Product("1", "Product 1", 10)
    const product2 = new Product("2", "Product 2", 35)
    const products = [product1, product2]

    ProductService.increasePrice(products,50)

    expect(product1.price).toBe(15)
    expect(product2.price).toBe(52.5)
    
  })
})