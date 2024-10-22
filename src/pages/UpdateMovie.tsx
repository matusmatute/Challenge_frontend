import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Componente para editar una película existente
 *
 * Utiliza el hook de estado useState para almacenar los valores de los campos
 * del formulario. Luego, utiliza el hook de navegación useNavigate para
 * redirigir al usuario a la página principal después de editar la película.
 *
 * @returns {JSX.Element}
 */
const EditMovie = () => {
  const { id } = useParams<{ id: string }>(); // Extrae el ID de la URL
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`);
      const data = await response.json();

      // Establecer los valores de los campos con los datos de la película
      setTitle(data.title);
      setAuthor(data.author);
      setGenre(data.genre);
      setSynopsis(data.synopsis || "");
      setPicture(data.picture || "");
    };

    fetchMovie();
  }, [id]);

  /**
   * Función para manejar el envío del formulario
   *
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * Crea un objeto con los datos de la película
     *
     * @type {Object}
     */
    const movie = { title, author, genre, synopsis, picture };

    console.log(movie);
    /**
     * Envía una petición PUT a la API para actualizar la película
     *
     * @param {string} url
     * @param {Object} options
     */
    const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    const data = await response.json();
    const movieId = data._id;
    /**
     * Redirige al usuario a los detalles de la película
     */
    navigate("/" + movieId);
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-center">Editar Película</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="genre">Género</label>
          <input
            type="text"
            id="genre"
            placeholder="Género"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="synopsis">Sinopsis</label>
          <textarea
            id="synopsis"
            placeholder="Sinopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="picture">URL de la imagen</label>
          <input
            type="text"
            id="picture"
            placeholder="URL de la imagen"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div >
       <div className="flex items-center justify-between"> 
        <button 
          type="submit" 
          className="w-full p-3 font-semibold text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
        <button onClick={() => navigate(-1)} className="w-full p-3 font-semibold text-white transition duration-200 bg-red-500 rounded hover:bg-red-600">
          Cancelar
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
