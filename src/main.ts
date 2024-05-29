import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";


// Primeiro agregado
let customer = new Customer("123", "John");
let address = new Address("Street 1", 1, "31110-000", "Belo Horizonte");
customer.addAddress(address);
customer.activate();


//Segundo agregado
const item1 = new OrderItem("1", "Item 1", 10, 2, "123456"); 
const item2 = new OrderItem("2", "Item 2", 20, 2, "789123");
const order = new Order("456", "123", [item1, item2]);