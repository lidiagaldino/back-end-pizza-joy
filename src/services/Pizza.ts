import IPizza from "../interfaces/Pizza";
import prisma from "../lib/db";

class Pizza {
    async newPizza(pizza: Omit<IPizza, "id">) {
        try {

        } catch (error) {
            return false
        }
    }
}

export default new Pizza()