// import IPizza from "../interfaces/Pizza";
// import prisma from "../lib/db";

// class Pizza {
//     async newPizza(pizza: Omit<IPizza, "id">): Promise<IPizza | false> {
//         try {
//             const data = pizza.size
//             const result = await prisma.pizza.create({
//                 data: {
//                     descricao: pizza.descricao,
//                     nome: pizza.nome,
//                     ingrediente: {
//                         createMany: {
//                             data: pizza.ingrediente
//                         }
//                     },
//                     pizza_tamanho: {
//                         createMany: {
//                             data
//                         }
//                     }
//                 },
//                 include: {
//                     ingrediente: {
//                         select: {
//                             id_ingrediente: true
//                         }
//                     },
//                     pizza_tamanho: true
//                 }
//             })

//             const response: IPizza = {
//                 id: result.id,
//                 descricao: result.descricao,
//                 nome: result.nome,
//                 ingrediente: result.ingrediente,
//                 size: result.pizza_tamanho.map((item) => { return { id_tamanho: item.id_tamanho, preco: item.preco } })
//             }

//             return response
//         } catch (error) {
//             return false
//         }
//     }
// }

// export default new Pizza()