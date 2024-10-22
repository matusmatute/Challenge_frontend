import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver as Resolver } from "@hookform/resolvers/yup";
import {  useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  genre: yup.string().required(),
  synopsis: yup.string().required(),
  picture: yup.string().url().required(),
});

type Movie = {
  title: string;
  author: string;
  genre: string;
  synopsis: string;
  picture: string;
};

export default function CreateMovie() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Movie>({
    resolver: Resolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    fetch("http://localhost:5000/api/movies/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const id = data._id;
      navigate(`/${id}`);
    })
    .catch((error) => {
      console.error(error);
    });

    
    
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-center">
        Crear Nueva Película
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border 
                      border-gray-300 
                      text-gray-900 text-sm rounded-lg  
                      focus:ring-blue-500 
                      focus:border-blue-500 
                      block w-full p-2.5"
            {...register("title")}
          />
        </div>
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <div>
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("author")}
          />
        </div>
        {errors.author && (
          <p className="text-red-500">{errors.author.message}</p>
        )}
        <div>
          <label
            htmlFor="genre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("genre")}
          />
        </div>
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
        <div>
          <label
            htmlFor="synopsis"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Synopsis
          </label>
          <textarea
            id="synopsis"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("synopsis")}
          />
        </div>
        {errors.synopsis && (
          <p className="text-red-500">{errors.synopsis.message}</p>
        )}
        <div>
          <label
            htmlFor="picture"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Picture
          </label>
          <input
            type="text"
            id="picture"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("picture")}
          />
        </div>
        {errors.picture && (
          <p className="text-red-500">{errors.picture.message}</p>
        )}
        <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
        >
          Create
        </button>
        <button
            onClick ={() => navigate("/")}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Cancel
        </button>
        </div>
       
      </form>
    </div>
  );
}
