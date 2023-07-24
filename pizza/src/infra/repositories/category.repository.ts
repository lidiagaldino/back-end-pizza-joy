import { ifError } from "assert";
import { FindByIdOutput } from "../../application/model/category.model";
import { CreateCategoryRepository } from "../../application/repositories/category/create-category.repository";
import { DeleteCategoryRepository } from "../../application/repositories/category/delete-category.repository";
import { FindCategoryByIdRepository } from "../../application/repositories/category/find-category-by-id.repository";
import { GetAllCategoriesRepository } from "../../application/repositories/category/get-all-categories.repository";
import { UpdateCategoryRepository } from "../../application/repositories/category/update-category.repository";
import { CategoryProps } from "../../domain/entities/category.entity";
import { CreateCategoryInput } from "../../domain/usecases/category/create-category.usecase";
import { GetAllCategoriesOutput } from "../../domain/usecases/category/get-all-categories.usecase";
import { UpdateCategoryInput } from "../../domain/usecases/category/update-category.usecase";
import prisma from "../db/prisma";

export class CategoryRepository implements
    FindCategoryByIdRepository,
    CreateCategoryRepository,
    GetAllCategoriesRepository,
    UpdateCategoryRepository,
    DeleteCategoryRepository {

    async delete(id: number): Promise<boolean> {
        await prisma.catergory.delete({
            where: { id }
        })

        return true
    }

    async update(category: UpdateCategoryInput, id: number): Promise<CategoryProps> {
        const result = await prisma.catergory.update({
            where: { id },
            data: category
        })

        return result
    }

    async show(): Promise<GetAllCategoriesOutput> {
        const result = await prisma.catergory.findMany()
        return result
    }

    async create(category: CreateCategoryInput): Promise<CategoryProps> {
        const result = await prisma.catergory.create({
            data: category
        })

        return result
    }

    async find(id: number): Promise<FindByIdOutput> {
        const result = await prisma.catergory.findUnique({
            where: { id }
        })

        return result
    }

}