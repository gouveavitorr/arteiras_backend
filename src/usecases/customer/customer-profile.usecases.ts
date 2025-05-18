import { prisma } from "../../lib/prisma";

export const getCustomerProfile = async (userId: string) => {

    const customer = await prisma.customer.findFirst({
      where: {
        id: userId,
      },
      include: {
        addresses: true,
        paymentMethods: true,
      }
    });
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }
    return customer

};

export const updateCustomerProfile = async (userId: string, data) => {

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId,
      },
    });
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }
    const updatedCustomer = await prisma.customer.update({
      where: { id: userId },
      data: {
        cpf: data?.cpf || customer.cpf,
        phoneNumber: data?.phoneNumber || customer.phoneNumber,
      },
    });
    if (!updatedCustomer) {
      throw new Error("Falha ao atualizar cliente");
    }
    return updatedCustomer;

};

export const getCustomerOrders = async (userId: string) => {

    const verifieduserId = await prisma.customer.findUnique({
      where: {
        id: userId,
      },
    });
    const orders = await prisma.order.findMany({
      where: {
        userId: verifieduserId?.id,
      },
    });
    if (!orders || orders.length === 0) {
      throw new Error("Nenhum pedido encontrado para esse cliente");
    }
    return orders;

};
