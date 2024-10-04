import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const OMDB_API_KEY = '2cc34c99'; // Substitua pela sua chave API do OMDb

// Função para buscar filme na API OMDb
async function fetchMovieFromOMDb(imdbID) {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar filme do IMDb: ${error}`);
        return null;
    }
}

// Função para inserir filme no banco de dados
async function insertMovieToDatabase(movieData) {
    try {
        const novoFilme = await prisma.filme.create({
            data: {
                titulo: movieData.Title,
                anoLancamento: parseInt(movieData.Year),
                genero: movieData.Genre,
                imdbRating: parseFloat(movieData.imdbRating),
            },
        });
        console.log('Filme inserido com sucesso:', novoFilme);
    } catch (error) {
        console.error('Erro ao inserir filme no banco de dados:', error);
    }
}

// Função principal que integra tudo
async function main() {
    const imdbIDs = ['tt0111161', 'tt0468569', 'tt1375666']; // IDs de filmes do IMDb (substitua pelos IDs desejados)

    for (const imdbID of imdbIDs) {
        const movieData = await fetchMovieFromOMDb(imdbID);
        if (movieData) {
            await insertMovieToDatabase(movieData);
        }
    }

    // Feche o Prisma Client
    await prisma.$disconnect();
}

// Execute o script
main().catch((error) => {
    console.error(error);
    prisma.$disconnect();
});