import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import ProductModel from "../models/product.model";

describe("ProductRepository unit", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      description: null,
      price: 10,
    });

  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      description: null,
      price: 10,
    });
    product.addDescription("This is a description");
    await productRepository.update(product);
    const productModel2 = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel2.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      description: "This is a description",
      price: 10,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 10", 10);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    const foundProduct = await productRepository.find("123");
    expect(productModel.toJSON()).toStrictEqual({
     id: foundProduct.id,
     name: foundProduct.name,
     description: null,
     price: foundProduct.price
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const product2 = new Product("321", "Product 2", 10);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];
    expect(products).toEqual(foundProducts);
  });
})