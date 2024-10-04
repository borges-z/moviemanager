const axios = require('axios');
const { Client } = require('pg');

// Configurando o cliente do PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'moviemanager',
    password: '123',
    port: 5432,
});

// Função para buscar filme na API OMDb
async function fetchMovieFromOMDb(imdbID) {
    const OMDB_API_KEY = '2cc34c99'; // Substitua pela sua chave API do OMDb
    try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar filme do IMDb: ${error}`);
        return null;
    }
}

// Função para inserir filme no banco de dados
async function insertMovieToDatabase(movieData) {
    try {
        const query = `
            INSERT INTO filmes (titulo, ano, data_mod, genero_id, diretor)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [
            movieData.Title, // Título do filme
            parseInt(movieData.Year), // Ano do filme
            new Date().toISOString(), // Data de modificação
            null, // Substitua isso por um ID de gênero válido se necessário
            movieData.Director, // Diretor do filme
        ];

        const res = await client.query(query, values);
        console.log('Filme inserido com sucesso:', res.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir filme no banco de dados:', error);
    }
}

// Função principal que integra tudo
async function main() {
    // Conectando ao banco de dados
    await client.connect();

    const imdbIDs = [
        'tt0111161',
        'tt0068646',
        'tt0071562',
        'tt0468569',
        'tt0050083',
        'tt0108052',
        'tt0137523',
        'tt0120737',
        'tt0080684',
        'tt0133093',
        'tt0169547',
        'tt0110912',
        'tt0172495',
        'tt0084787',
        'tt0317248',
        'tt0073486',
        'tt0120815',
        'tt0114369',
        'tt0076759',
        'tt0038650',
        'tt0081398',
        'tt0047478',
        'tt0027977',
        'tt0211915',
        'tt0099685',
        'tt0047396',
        'tt0054215',
        'tt0139460',
        'tt0110413',
        'tt0457430',
        'tt0209144',
        'tt0095327',
        'tt0082158',
        'tt0082971',
        'tt0073128',
        'tt0110357',
        'tt0099685',
        'tt0180093',
        'tt0381681',
        'tt0075314',
        'tt0046438',
        'tt0055948',
        'tt0082971',
        'tt0062622',
        'tt0137523',
        'tt0081398',
        'tt0057012',
        'tt0060196',
        'tt0074900',
        'tt0029666',
        'tt0067992',
        'tt0117500',
        'tt0073010',
        'tt0075304',
        'tt0114369',
        'tt0086190',
        'tt0052357',
        'tt0110912',
        'tt0145487',
        'tt0033467',
        'tt0055630',
        'tt0042067',
        'tt0057012',
        'tt0018455',
        'tt0075116',
        'tt0101414',
        'tt0070040',
        'tt0034242',
        'tt0210218',
        'tt0145487',
        'tt0051566',
        'tt0050133',
        'tt0034583',
        'tt0050083',
        'tt0038777',
        'tt0072562',
        'tt0073486',
        'tt0051808',
        'tt0055647',
        'tt0080736',
        'tt0054790',
        'tt0075048',
        'tt0021803',
        'tt0045559',
        'tt0086230',
        'tt0055974',
        'tt0047002',
        'tt0070598',
        'tt0058453',
        'tt0033138',
        'tt0118615',
        'tt0050799',
        'tt0018455',
        'tt0056851',
        'tt0070992',
        'tt0051600',
        'tt0048956',
        'tt0057263',
        'tt0070040',
        'tt0081398',
        'tt0072562',
        'tt0082388',
        'tt0024216',
        'tt0052333',
        'tt0037083',
        'tt0039592',
        'tt0045156',
        'tt0070208',
        'tt0112378',
        'tt0073195',
        'tt0095780',
        'tt0057126',
        'tt0051892',
        'tt0069640',
        'tt0059070',
        'tt0066630',
        'tt0034047',
        'tt0035818',
        'tt0057300',
        'tt0046570',
        'tt0053821',
        'tt0075314',
        'tt0047475',
        'tt0014895',
        'tt0053013',
        'tt0040596',
        'tt0067977',
        'tt0068116',
        'tt0063300',
        'tt0082930',
        'tt0016687',
        'tt0048980',
        'tt0074776',
        'tt0041178',
        'tt0059646',
        'tt0068323',
        'tt0080426',
        'tt0027910',
        'tt0041466',
        'tt0045917',
        'tt0042242',
        'tt0027654',
        'tt0047556',
        'tt0081398',
        'tt0076488',
        'tt0038678',
        'tt0050758',
        'tt0013320',
        'tt0048234',
        'tt0075750',
        'tt0082273',
        'tt0044546',
        'tt0078891',
        'tt0056485',
        'tt0026505',
        'tt0054620',
        'tt0054641',
        'tt0062772',
        'tt0087920',
        'tt0046541',
        'tt0029968',
        'tt0060445',
        'tt0049004',
        'tt0073157',
        'tt0065915',
        'tt0016654',
        'tt0073571',
        'tt0023793',
        'tt0019660',
        'tt0052087',
        'tt0063624',
        'tt0058341',
        'tt0060040',
        'tt0072581',
        'tt0041847',
        'tt0051270',
        'tt0056288',
        'tt0050994',
        'tt0077314',
        'tt0024954',
        'tt0063831',
        'tt0031506',
        'tt0060911',
        'tt0038504',
        'tt0046630',
        'tt0077098',
        'tt0061765',
        'tt0021463',
        'tt0050541',
        'tt0041497',
        'tt0059822',
        'tt0073398',
        'tt0048961',
        'tt0065136',
        'tt0028132',
        'tt0062157',
        'tt0030683',
        'tt0059928',
        'tt0042015',
        'tt0046783',
        'tt0051436',
        'tt0056543',
        'tt0025166',
        'tt0037442',
        'tt0041970',
        'tt0042357',
        'tt0023620',
        'tt0050920',
        'tt0060998',
        'tt0050842',
        'tt0021786',
        'tt0063605',
        'tt0067375',
        'tt0072048',
        'tt0055865',
        'tt0045093',
        'tt0062614',
        'tt0037165',
        'tt0046935',
        'tt0071203',
        'tt0027202',
        'tt0028222',
        'tt0056535',
        'tt0071222',
        'tt0054826'
    ];
    

    for (const imdbID of imdbIDs) {
        const movieData = await fetchMovieFromOMDb(imdbID);
        if (movieData) {
            await insertMovieToDatabase(movieData);
        }
    }

    // Fechando a conexão com o banco de dados
    await client.end();
}

// Execute o script
main().catch((error) => {
    console.error(error);
    client.end();
});