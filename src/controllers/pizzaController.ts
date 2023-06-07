import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
export class PizzaRequisitions {
  async handlePostPizza(request: Request, response: Response) {
    try {
      const { nome, preco, tamanho, preco_tamanho, descricao } = request.body;

      const tamanhoPizza = await prismaClient.tamanho.findUnique({
        where: {
          nome_tamanho: tamanho,
        },
      });

      if (tamanhoPizza) {
        const pizza = await prismaClient.pizza.create({
          data: {
            nome,
            preco: preco + preco_tamanho,
            descricao,
          },
          include: {
            pizza_tamanho: {
              select: {
                tamanho: true,
              },
            },
          },
        });

        if (pizza) {
          const pizzaTamanhoExist = await prismaClient.pizza_tamanho.create({
            include: {
              pizza: true,
              tamanho: true,
            },
            data: {
              id_pizza: pizza.id,
              id_tamanho: tamanhoPizza.id,
            },
          });

          if (pizzaTamanhoExist) {
            return response.json({
              id: pizzaTamanhoExist.id_pizza,
              nome: pizzaTamanhoExist.pizza.nome,
              preco: pizzaTamanhoExist.pizza.preco,
              descricao: pizzaTamanhoExist.pizza.descricao,
              pizza_tamanho: pizzaTamanhoExist.tamanho,
            });
          }
        }
      }
      const pizza = await prismaClient.pizza.create({
        data: {
          nome,
          preco: preco + preco_tamanho,
          descricao,
          pizza_tamanho: {
            create: {
              tamanho: {
                create: {
                  nome_tamanho: tamanho,
                  preco_tamanho: preco_tamanho,
                },
              },
            },
          },
        },
        include: {
          pizza_tamanho: {
            select: {
              tamanho: true,
            },
          },
        },
      });

      if (pizza) {
        return response.json(pizza);
      }
    } catch (error) {
      response.json(error);
    }
  }
  async handleGetAllPizzas(request: Request, response: Response) {
    try {
      const pizzas = await prismaClient.pizza.findMany({
        include: {
          ingrediente: {
            include: {
              ingrediente: true,
            },
          },
          pizza_tamanho: {
            select: {
              tamanho: true,
            },
          },
        },
      });

      if (pizzas) {
        return response.json(pizzas);
      }
    } catch (error) {
      return response.json(error);
    }
  }
}
