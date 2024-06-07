import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../models/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

  async create(product: Product): Promise<void> {
    try{
      await ProductModel.create({
        id: product.id,
        name: product.name,
        price: product.price
      })
    } catch(error) {
      throw new Error("Cannot create product",)
    }
  }

  async update(product: Product): Promise<void> {
    try {
      await ProductModel.update(
        {
          name: product.name,
          description: product.description,
          price: product.price
        },
        {
          where: {
            id: product.id
          }
        }
      )
    } catch(error) {
      throw new Error("Cannot update product",)
    }
  }

  async find(productId: string): Promise<Product> {
    try{
      const productModel = await ProductModel.findOne({ where: { id: productId } })
      const product =  new Product(productModel.id, productModel.name, productModel.price)
      return product
    } catch(error) {
      throw new Error("Cannot find product",)
    }
  }

  async findAll(): Promise<Product[]> {
    try{
      const productModels = await ProductModel.findAll()
      return productModels.map((productModel) => 
         new Product(productModel.id, productModel.name, productModel.price)
      )
    } catch(error) {
      throw new Error("Cannot find products",)
    }
  }
}