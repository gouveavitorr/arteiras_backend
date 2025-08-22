import { app } from "../../server";

import { Address, orderStatus, PaymentMethod, Product, Store, User } from "@prisma/client"
import { FastifyError } from "fastify"
import { statusCodes } from "../../utils/types"

export interface OrderItemCreateRequest {
    quantity: number,
    product: Product,
}

export interface OrderCreateRequest {
    totalAmount: number, // NOTE: Calculate it in the client side?
    deliveryExpenses: number,
    orderStatus: orderStatus,
    trackingCode: string,
    // userId: String,
    // addressId: String,
    // paymentMethodId: String,
    user: User,
    address: Address | null,
    paymentMethod: PaymentMethod | null,
    orderItems: OrderItemCreateRequest[],
    stores: Store[],
}

// INFO: Get all orders from an authenticated user
export const getOrders = async (userId: string) => {
    const orders = await app.prisma.order.findMany({
        where: {
            userId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders
}

// INFO: Get order from an authenticated user by ID
export const getOrder = async (id: string, userId: string) => {
    const order = await app.prisma.order.findFirst({
        where: {
            id,
            userId
        }
    })

    return order
}

// INFO: Checkout user cart items to an order
export const checkout = async (userId: string, addressId?: string, paymentMethodId?: string) => {
    const response = await app.prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            addresses: addressId ? {
                where: {
                    id: addressId
                }
            } : false,
            paymentMethods: paymentMethodId ? {
                where: {
                    id: paymentMethodId
                }
            } : false,
            cartItems: {
                include: {
                    product: {
                        include: {
                            store: true, // WARN: ?
                        }
                    }
                },
            },
        },
    })

    if (!response) {
        const err = new Error("User not found!") as FastifyError
        err.statusCode = statusCodes.notFound
        throw err
    }

    const { cartItems, addresses, paymentMethods, ...user } = response

    if (cartItems.length <= 0) {
        const err = new Error("Cart is empty") as FastifyError
        err.statusCode = statusCodes.badRequest
        throw err
    }

    const newOrder = {
        totalAmount: 0, // items qty or price
        deliveryExpenses: 0,
        orderStatus: "PENDING",
        user: user,
        stores: [] as Store[],
        orderItems: [] as OrderItemCreateRequest[],
        address: addresses ? addresses[0] : null,
        paymentMethod: paymentMethods ? paymentMethods[0] : null
    } as OrderCreateRequest

    // TODO: Tracking service || get code and delivery expenses

    // NOTE: Parse cart items to order items, calc total amount and add stores
    cartItems.forEach(item => {
        const { product, quantity } = item

        if (!newOrder.stores.includes(product.store))
            newOrder.stores.push(product.store)

        newOrder.totalAmount += product.price * quantity

        const { store, ...parsedProduct } = product

        const orderItem = {
            quantity,
            product: parsedProduct,
        } as OrderItemCreateRequest

        newOrder.orderItems.push(orderItem)
    })

    // FIX: Check how to make nested create in Prisma
    const createdOrder = await app.prisma.order.create({
        data: {
            totalAmount: newOrder.totalAmount,
            deliveryExpenses: newOrder.deliveryExpenses,
            orderStatus: newOrder.orderStatus,
            trackingCode: newOrder.trackingCode || "temp", // FIX: temp tracking code
            user: {
                connect: {
                    email: newOrder.user.email
                }
            },
            address: newOrder.address ? {
                connect: {
                    id: newOrder.address.id
                }
            } : undefined,
            paymentMethod: newOrder.paymentMethod ? {
                connect: {
                    id: newOrder.paymentMethod.id
                }
            } : undefined,
            stores: {
                connect: newOrder.stores.map(store => {
                    return {
                        name: store.name
                    }
                })
            },
            orderItems: {
                create: newOrder.orderItems.map(order => {
                    return {
                        quantity: order.quantity,
                        productId: order.product.id
                    }
                }),
            },
        }
    })

    // NOTE: Delete parsed cart items or use a flag to set it as purchased
    // app.prisma.cartItem.deleteMany({
    //     where: {
    //         id: {
    //             in: cartItems.map(item =>
    //                 item.id
    //             )
    //         }
    //     }
    // })

    return createdOrder
}

// INFO: Cancel order from an authenticated user by ID
export const cancelOrder = async (id: string, userId: string) => {
    const order = await app.prisma.order.update({
        data: {
            orderStatus: "CANCELLED"
        },
        where: {
            id,
            userId
        }
    })

    return order
}
