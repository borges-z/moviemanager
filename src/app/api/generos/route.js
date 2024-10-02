import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const generos = await prisma.generos.findMany();
        return new Response(JSON.stringify(generos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        return new Response('Erro ao buscar gêneros', { status: 500 });
    }
}