import { prisma } from "../../lib/prisma"

// INFO: Get all orders from an authenticated user
export const getOrders = async (userId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            userId
        }
    })

    return orders
}

// INFO: Get order from an authenticated user by ID
export const getOrder = async (id: string, userId: string) => {
    const order = await prisma.order.findFirst({
        where: {
            id,
            userId
        }
    })

    return order
}

export const createOrderFromCart = async (userId: string) => {
    // 1. Obter os itens do carrinho com informações do produto
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true } // Inclua o produto para pegar o preço
    });

    // Verifique se o carrinho não está vazio
    if (cartItems.length === 0) {
        throw new Error("Carrinho vazio. Não é possível criar um pedido.");
    }

    // 2. Calcular o valor total da compra
    let totalAmount = 0;
    for (const item of cartItems) {
        // O `unit_price` está no modelo `Product` que foi incluído
        totalAmount += item.quantity * item.product.price;
    }

    // 3. Crie a transação para garantir que todas as operações sejam atômicas
    // Se uma falhar, todas são revertidas
    const transaction = await prisma.$transaction(async (prisma) => {
        // Cria a Order
        const newOrder = await prisma.order.create({
            data: {
                userId: userId,
                totalAmount: totalAmount,
                // Aqui você pode adicionar outros dados como `deliveryExpenses`, `addressId`, etc.,
                // que você pegaria de uma requisição ou de outros dados do usuário
                deliveryExpenses: 0,
                orderStatus: 'PENDING_CART',
                trackingCode: ''
                // Outros campos...
            },
        });

        // Mapeia os itens do carrinho para o formato de itens da ordem
        const orderItemsData = cartItems.map((item) => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
        }));

        // Cria todos os OrderItems de uma vez
        await prisma.orderItem.createMany({
            data: orderItemsData,
        });

        // Limpa o carrinho do usuário
        await prisma.cartItem.deleteMany({
            where: { userId: userId },
        });

        return newOrder;
    });

    return transaction;

}