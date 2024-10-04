import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
    try {
        // Aguarde a resolução da Promise e extraia os dados corretamente
        const { id, genre } = await request.json(); // extraindo id e gênero diretamente do corpo da requisição

        // Verifica se o id e o gênero foram fornecidos
        if (!id || !genre) {
            return new Response(JSON.stringify({ message: 'O ID e o gênero são obrigatórios.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Verifica se o gênero existe no banco de dados
        const generoExistente = await prisma.generos.findUnique({
            where: { id: Number(id) }, // Converte o id para número, se necessário
        });

        if (!generoExistente) {
            return new Response(JSON.stringify({ message: 'Gênero não encontrado.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Atualiza o gênero no banco de dados
        const generoAtualizado = await prisma.generos.update({
            where: { id: Number(id) },
            data: { name: genre }, // Atualiza com o novo nome do gênero
        });

        return new Response(JSON.stringify({ resultado: "OK", generoAtualizado }), {
            status: 200, // Indica que a alteração foi bem-sucedida
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao atualizar gênero:', error);
        return new Response(JSON.stringify({ message: 'Erro ao atualizar gênero.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
