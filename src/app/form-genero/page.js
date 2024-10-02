'use client';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';


const schema = yup.object().shape({
    genre: yup.string().required('O gênero é obrigatório').min(3, 'O gênero deve ter pelo menos 3 caracteres'),
});

export function GenreList() {

        // Fazer a requisição à API para buscar os gêneros
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/generos'); // Faz a requisição para a API route
                const data = await response.json(); // Transforma a resposta em JSON
                console.log(data); // Atualiza o estado com os dados
            } catch (error) {
                console.error('Erro ao buscar gêneros:', error);
            }
        };

        fetchGenres();
}
export function GenrePost(dados) {

    // Fazer a requisição à API para buscar os gêneros
    const fetchGenres = async (dados) => {
        try {
            const response = await fetch('/api/add-genero', {
                method: 'POST', // O método HTTP que você deseja usar
                headers: {
                    'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(dados) // Converte o objeto JavaScript em uma string JSON
            }); // Faz a requisição para a API route
            console.log(dados); // Atualiza o estado com os dados
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
        }
    };

    fetchGenres(dados);
}

export default function GenreForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
    });

    const onSubmit = (data) => {
        console.log('Gênero cadastrado:', data);
        GenrePost(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
                    Gênero:
                </label>
                <input
                    {...register('genre')}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.genre ? 'border-red-500' : ''}`}
                    id="genre"
                    type="text"
                    placeholder="Digite o gênero"
                />
                {errors.genre && <p className="text-red-500 text-xs italic">{errors.genre.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cadastrar Gênero
            </button>
        </form>
    );
}