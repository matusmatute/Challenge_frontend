import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  synopsis?: string;
  picture?: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>(); // Extrae el ID de la URL
  const [movie, setMovie] = useState<Movie | null>(null); // Estado para guardar la película
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const navigate = useNavigate();

  const deleteMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la pelicula');
      }
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Función para obtener los detalles de la película
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la película');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };



    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>No se encontró la película.</p>;
  }

  return (
    <div className="flex flex-wrap max-w-2xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{movie.title}</h1>
      <img
        src={movie.picture || 'https://via.placeholder.com/400'}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="w-full text-lg md:w-1/2 ">
        <p><strong>Autor:</strong> {movie.author}</p>
        <p><strong>Género:</strong> {movie.genre}</p>
        {movie.synopsis && <p><strong>Sinopsis:</strong> {movie.synopsis}</p>}
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => { navigate(`/edit/${movie._id}`) }}>Editar información</button>
        <button onClick={() => navigate('/')} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Volver
        </button>
        <button onClick={ () => deleteMovie()} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Eliminar</button>
      </div>
    </div>
  );
};

export default MovieDetail;
