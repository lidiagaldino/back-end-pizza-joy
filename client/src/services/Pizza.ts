import IPizza from "../interfaces/Pizza";
import prisma from "../lib/db";

class Pizza {
    async getPizzas(pizza: Omit<IPizza, "id">) {

    }
}

export default new Pizza()