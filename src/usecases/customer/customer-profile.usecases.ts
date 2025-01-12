import { prisma } from "../../lib/prisma";

export const getCustomerProfile = async (customerId: string) => {

    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
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

export const updateCustomerProfile = async (customerId: string, data) => {

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
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

export const getCustomerOrders = async (customerId: string) => {

    const verifiedCustomerId = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    const orders = await prisma.order.findMany({
      where: {
        customerId: verifiedCustomerId?.id,
      },
    });
    if (!orders || orders.length === 0) {
      throw new Error("Nenhum pedido encontrado para esse cliente");
    }
    return orders;

};
