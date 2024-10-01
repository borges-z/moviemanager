"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    title: yup.string()
      .required('Titulo é necessário')
      .min(3, 'titulo deve ter pelo menos 3 caracteres')
      .max(100, 'Titulo não deve ultrapas mais que 100 caracteres'),
    
    year: yup.number()
      .required('Ano é obrigatório')
      .min(1888, 'Apenas para filmes que começarem em 1888')
      .max(new Date().getFullYear(), `O filme não pode ser do futuro`),
    
    director: yup.string()
      .required('Diretor é obrigatório')
      .min(2, 'O nome do diretor deve ter pelo menos 2 caracteres, não vale apelidos :)')
      .max(50, 'O nome não pode ultrapassar 50 caracteres, nome e sobrenome basta.'),
    
    genre: yup.string()
       .required('Genero é obrigatório')
       .min(2, 'Genero precisa ter mais que 2 caracteres')
       .max(50, 'Genero não pode ultrapasar mais que 50 caracteres.'),
  });
  
  const genres = ['Ação',];

  export default function MovieForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema), 
    });
  
    const onSubmit = (data) => {
      console.log('Form Data:', data);
      // Ricardo, isso da para jogar para o postgres dps  
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Título do filme</label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={`mt-1 p-2 w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter movie title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
  
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">Ano de lançamento</label>
          <input
            id="year"
            type="number"
            {...register('year')}
            className={`mt-1 p-2 w-full border ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter movie year"
          />
          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
        </div>
  
        <div className="mb-4">
          <label htmlFor="director" className="block text-sm font-medium">Diretor</label>
          <input
            id="director"
            type="text"
            {...register('director')}
            className={`mt-1 p-2 w-full border ${errors.director ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter director's name"
          />
          {errors.director && <p className="text-red-500 text-sm mt-1">{errors.director.message}</p>}
        </div>
  
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium">Genero</label>
          <select
            id="genre"
            {...register('genre')}
            className={`mt-1 p-2 w-full border ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione o genero</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    );
  }