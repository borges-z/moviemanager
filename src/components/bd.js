import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function main() {
    try {
        const generos = await prisma.genre.findMany();
        console.log(generos);
        return generos; // Retorna os dados para serem utilizados
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        throw error;
    }
}