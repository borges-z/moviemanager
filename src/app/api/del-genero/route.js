import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request) {
    try {
        // Obtém o id do gênero a ser deletado do request
        const { id } = await request.json();

        // Verifica se o id foi fornecido
        if (!id) {
            return new Response(JSON.stringify({ message: 'O ID do gênero é obrigatório.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Verifica se o gênero existe antes de deletar
        const generoExistente = await prisma.generos.findUnique({
            where: {
                id: Number(id), // Converte o id para número se necessário
            },
        });

        if (!generoExistente) {
            return new Response(JSON.stringify({ message: 'Gênero não encontrado.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Deleta o gênero do banco de dados
        await prisma.generos.delete({
            where: {
                id: Number(id),
            },
        });

        return new Response(JSON.stringify({ message: 'Gênero deletado com sucesso.' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao deletar gênero:', error);
        return new Response(JSON.stringify({ message: 'Erro ao deletar gênero.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
