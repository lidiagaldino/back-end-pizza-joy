import IDeliveryman from "../interfaces/Deliveryman";
import ILocation from "../interfaces/Location";
import prisma from "../lib/db";
import bcryptjs from 'bcryptjs'

class Deliveryman {
    async newDeliveryman(deliveryman: Omit<IDeliveryman, 'id'>): Promise<IDeliveryman | false> {
        try {
            const result = await prisma.deliveryman.create({
                data: {
                    email: deliveryman.email,
                    lat: deliveryman.lat,
                    lng: deliveryman.lng,
                    name: deliveryman.name,
                    password: bcryptjs.hashSync(deliveryman.password, 8),
                    isOnline: true
                }
            })

            result.password = ""

            return result
        } catch (error) {
            return false
        }
    }

    async updateLocation(location: ILocation, id: number): Promise<ILocation | false> {
        try {
            const result = await prisma.deliveryman.update({
                where: { id },
                data: { lat: location.lat, lng: location.lng }
            })

            return { lat: result.lat, lng: result.lng }
        } catch (error) {
            return false
        }
    }

    async findNearestDeliveryman(location: ILocation): Promise<IDeliveryman[] | false> {
        try {
            const sql = `SELECT id, name, lat, lng
                FROM tbl_deliveryman
                    WHERE ST_DISTANCE_SPHERE(POINT(${location.lng}, ${location.lat}), POINT(lng, lat)) <= 10000 AND isOnline = true
                ORDER BY ST_DISTANCE_SPHERE(POINT(${location.lng}, ${location.lat}), POINT(lng, lat)) LIMIT 10;`

            const result: IDeliveryman[] = await prisma.$queryRawUnsafe(sql)
            console.log(sql);

            return result.length > 0 ? result : false
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async findByEmail(email: string): Promise<IDeliveryman | false> {
        const result = await prisma.deliveryman.findFirst({
            where: { email }
        })

        return result ? result : false
    }
}

export default new Deliveryman()