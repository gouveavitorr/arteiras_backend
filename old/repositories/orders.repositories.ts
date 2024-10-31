import { prisma } from "../lib/prisma";
import {
  Order,
  OrderCreate,
  OrderUpdate,
  OrderRepository,
} from "../interfaces/orders.interfaces";

export class OrdersRepositoryPrisma implements OrderRepository {
  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany();
    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findFirst({
      where: { id },
    });
    return order;
  }

  async create(data: OrderCreate): Promise<Order> {
    const order = await prisma.order.create({
        data: {
            totalAmount: data.totalAmount,
            deliveryExpenses: data.deliveryExpenses,
            orderStatus: data.orderStatus,
            trackingCode: data.trackingCode,
            customerId: data.customerId,           

        }
    })
    return order;
  }

  async update(id: string, data: OrderUpdate): Promise<Order | null> {
    const { totalAmount, deliveryExpenses, orderStatus, trackingCode }

  async delete(id: string): Promise<void> {
    const order = await prisma.order.delete({
      where: { id },
    });
  }
}
