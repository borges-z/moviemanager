'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
    genre: yup.string().required('O gênero é obrigatório').min(3, 'O gênero deve ter pelo menos 3 caracteres'),
});

export default function GenreForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
    });

    const onSubmit = (data) => {
        console.log('Gênero cadastrado:', data);
        // mesma coisa, joga para o banco de dados :)
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