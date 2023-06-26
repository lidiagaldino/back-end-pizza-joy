import IProduct from "../interfaces/Product";
import { requests } from "../lib/axios";

class Product {
    async getProductData(id: number[]): Promise<IProduct[] | false> {
        console.log(id);
        const result = await requests.get(`http://localhost:3002/pizza/size?pizza_size_id=[${id}]`)
        return result.status == 200 ? result.data : false
    }
}

export default new Product()