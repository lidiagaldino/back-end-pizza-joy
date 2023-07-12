import IDeliveryman from "../interfaces/Deliveryman";
import IOrder from "../interfaces/Order";
import IRide from "../interfaces/Ride";
import prisma from "../lib/db";

class Ride {
    async newRide(ride: IOrder, queue: IDeliveryman[]): Promise<IRide | false> {
        try {
            console.log(ride.client_id);
            const result = await prisma.ride.create({
                data: {
                    external_id: ride.id,
                    lat: ride.location.lat,
                    lng: ride.location.lng,
                    client_id: ride.client_id,
                    Queue: {
                        createMany: {
                            data: queue.map(item => {
                                return { deliveryman_id: item.id, distance: item.distance }
                            })
                        }
                    }
                }
            })
            console.log(result);

            return result
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async acceptRide(id: number, deliveryman_id: number): Promise<IRide | false> {
        try {
            const result = await prisma.ride.update({
                where: { id },
                data: { deliveryman_id }
            })

            return result
        } catch (error) {
            return false
        }
    }

    async denyRide(ride_id: number, deliveryman_id: number): Promise<boolean> {
        try {
            await prisma.queue.deleteMany({
                where: { ride_id, deliveryman_id }
            })

            return true
        } catch (error) {
            return false
        }
    }

    async finishRide(id: number): Promise<IRide | false> {
        try {
            const result = await prisma.ride.update({
                where: {
                    external_id: id
                },
                data: { finished_at: new Date() }
            })

            await prisma.queue.deleteMany({
                where: { ride_id: id }
            })

            return result

        } catch (error) {
            console.log(error);
            return false
        }
    }

    async findPendingRides(): Promise<IRide[] | false> {
        const result = await prisma.ride.findMany({
            where: {
                deliveryman_id: null
            }
        })

        return result.length > 0 ? result : false
    }
}

export default new Ride()