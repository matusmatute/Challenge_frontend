import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  synopsis?: string;
  picture?: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5000/api/movies/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  // Filtrar las películas por título, género y autor
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (genreFilter ? movie.genre === genreFilter : true) &&
    (authorFilter ? movie.author === authorFilter : true)
  );

  // Obtener géneros y autores únicos para los selectores
  const uniqueGenres = Array.from(new Set(movies.map(movie => movie.genre)));
  const uniqueAuthors = Array.from(new Set(movies.map(movie => movie.author)));

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-center">Catálogo de Películas</h1>
      
      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          className="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtros por género y autor */}
      <div className="flex justify-center mb-8 space-x-4">
        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">Todos los Géneros</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        >
          <option value="">Todos los Autores</option>
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
        <div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={() => navigate('/create')}
          >
            Crear Pelicula
          </button>
        </div>
      </div>

      {/* Grilla de películas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="overflow-hidden bg-white rounded-lg shadow-lg">
            <img
              src={movie.picture || 'https://via.placeholder.com/400'}
              alt={movie.title}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold">{movie.title}</h3>
              <p className="mb-2 text-sm text-gray-600">Autor: {movie.author}</p>
              <p className="mb-2 text-sm text-gray-600">Género: {movie.genre}</p>
              <p className="text-sm text-gray-700">{movie.synopsis?.slice(0, 100)}...</p>
              <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
              onClick={() => navigate(`/${movie._id}`)}>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
