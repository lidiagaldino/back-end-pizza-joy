import { CreateInput, CreateOutput } from "../../application/model/order.model";
import { CreateOrderRepository } from "../../application/repositories/create-order.repository";
import { FindOrderByClientRepository } from "../../application/repositories/find-order-by-client.repository";
import { FindOrderByIdRepository } from "../../application/repositories/find-order-by-id.repository";
import { UpdateOrderSstatusRepository } from "../../application/repositories/update-order-status.repository";
import { GetOrderByIdOutput } from "../../domain/usecases/get-order-by-id.usecase";
import { FindOrderByClientOutput } from "../../domain/usecases/get-orders-by-client.usecase";
import { UpdateOrderStatusInput, UpdateOrderStatusOutput } from "../../domain/usecases/update-order-status.usecase";
import prisma from "../lib/db";

export class OrderRepository implements
    CreateOrderRepository,
    FindOrderByClientRepository,
    UpdateOrderSstatusRepository,
    FindOrderByIdRepository {

    async find(id: number): Promise<GetOrderByIdOutput> {
        const result = await prisma.order.findUnique({
            where: { id }
        })

        return { ...result, created_at: result.created_at.toString(), finished_at: result.finished_at ? result.finished_at.toString() : null }
    }

    async create(order: CreateInput): Promise<CreateOutput> {
        const result = await prisma.order.create({
            data: {
                client_id: order.client_id,
                intent_payment_id: order.intent_payment_id,
                location: { create: order.location },
                order_status: { connect: { id: 1 } },
                payment: {
                    create: {
                        status: true
                    }
                },
                ProductOrder: {
                    createMany: {
                        data: order.product.map(item => {
                            return { product_id: item.id, product_size_id: item.size_id, quantity: item.quantity }
                        })
                    }
                },

            },
            include: {
                location: true,
                ProductOrder: true
            }
        })

        console.log(result);

        return {
            id: result.id,
            client_id: result.client_id,
            product: result.ProductOrder.map(item => { return { id: item.id, quantity: item.quantity, size_id: item.product_size_id } }),
            intent_payment_id: result.intent_payment_id,
            deliveryman_id: result.deliveryman_id,
            created_at: result.created_at.toString(),
            finished_at: result.finished_at ? result.finished_at.toString() : null,
            location: result.location,
            order_status_id: result.order_status_id
        }
    }

    async findByClient(id: number): Promise<FindOrderByClientOutput> {
        const result = await prisma.order.findMany({
            where: { client_id: id },
            include: {
                location: true,
                ProductOrder: true
            }
        })

        return result.map(item => {
            return {
                id: item.id,
                client_id: item.client_id,
                created_at: item.created_at.toString(),
                finished_at: item.finished_at ? item.finished_at.toString() : null,
                intent_payment_id: item.intent_payment_id,
                location: item.location,
                order_status_id: item.order_status_id,
                deliveryman_id: item.deliveryman_id,
                product: item.ProductOrder.map(prod => {
                    return { id: prod.id, size_id: prod.product_size_id, quantity: prod.quantity }
                })
            }
        })
    }

    async updateStatus(data: UpdateOrderStatusInput): Promise<UpdateOrderStatusOutput> {
        const result = await prisma.order.update({
            where: { id: data.order_id },
            data: { order_status_id: data.status_id }
        })

        return { ...result, created_at: result.created_at.toString(), finished_at: result.finished_at ? result.finished_at.toString() : null }
    }
}