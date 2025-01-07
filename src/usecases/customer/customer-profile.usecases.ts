import { prisma } from "../../lib/prisma";

export const getCustomerProfile = async (customerId: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }
    return customer;
  } catch (error) {
    throw new Error(`Erro ao buscar perfil: ${error.message}`);
  }
};

export const updateCustomerProfile = async (customerId: string, data) => {
  try {
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
  } catch (error) {
    throw new Error(`Erro ao realizar operação: ${error.message}`);
  }
};

export const getCustomerOrders = async (customerId: string) => {
  try {
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
  } catch (error) {
    throw new Error(`Erro ao buscar pedidos desse cliente: ${error.message}`);
  }
};
