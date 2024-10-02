import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        // Aguarde a resolução da Promise e extraia o objeto corretamente
        const { genre } = await request.json(); // extraindo a chave genre diretamente

        // Verifica se o gênero foi fornecido
        if (!genre) {
            return new Response(JSON.stringify({ message: 'O gênero é obrigatório.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Insere o novo gênero no banco de dados
        const novoGenero = await prisma.generos.create({
            data: {
                name: genre, // usa a chave correta que corresponde ao modelo no banco
            },
        });

        return new Response(JSON.stringify({ resultado: "OK", novoGenero }), {
            status: 201, // Indica que a criação foi bem-sucedida
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao inserir gênero:', error);
        return new Response(JSON.stringify({ message: 'Erro ao inserir gênero.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}