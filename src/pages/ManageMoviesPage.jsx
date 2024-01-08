import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminProtection from "../components/AdminProtection";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { axiosDelete } from "../lib/axiosDelete";
import toast from "react-hot-toast";
import { axiosPost } from "../lib/axios.Post";
import { axiosPut } from "../lib/axiosPut";

const ManageMoviesPage = () => {
  const [newMovieData, setNewMovieData] = useState({
    title: "",
    poster: "",
    genre: "",
    year: "",
    rating: "",
    plot: "",
  });
  const [addNewMovieModal, setAddNewMovieModal] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [shouldDeleteConfirmationApear, setShouldDeleteConfirmationApear] =
    useState(null);
  const [shouldUpdateModalOpen, setShouldUpdateModalOpen] = useState({
    status: false,
    movie: {},
  });
  const auth = useSelector((state) => state.auth.userAndToken);
  const navigate = useNavigate();

  const { data: movies, isLoading, error } = useFetch("/api/movies");

  useEffect(() => {
    if (movies.length > 0) {
      setAllMovies(movies);
    }
  }, [movies]);

  if (auth?.user?.role !== "admin") {
    return <AdminProtection />;
  }

  const handleDelete = async () => {
    const data = await axiosDelete(
      `/api/movies/${shouldDeleteConfirmationApear}`,
      auth?.token
    );

    if (data) {
      toast.success("Movie deleted successfully");
      setAllMovies(
        allMovies.filter((mv) => mv._id !== shouldDeleteConfirmationApear)
      );
    }
  };

  const handleAddMovie = () => {
    setAddNewMovieModal(true);
  };

  const handleNewMovieSubmit = async (e) => {
    e.preventDefault();

    const modifiedData = {
      title: newMovieData.title,
      posters: [newMovieData.poster],
      genre: newMovieData.genre,
      year: newMovieData.year,
      rating: newMovieData.rating,
      plot: newMovieData.plot,
    };

    const data = await axiosPost("/api/movies", modifiedData, auth?.token);

    if (data) {
      toast.success("New movie added!");
      setAllMovies([data, ...allMovies]);
      setAddNewMovieModal(false);
    }
  };

  const handleUpdate = (movie) => {
    setShouldUpdateModalOpen({
      status: true,
      movie,
    });
  };

  const handleUpdatedMovieSubmit = async (e) => {
    e.preventDefault();

    const modifiedData = {
      title: shouldUpdateModalOpen.movie.title,
      posters: shouldUpdateModalOpen.movie.posters,
      genre: shouldUpdateModalOpen.movie.genre,
      year: shouldUpdateModalOpen.movie.year,
      rating: shouldUpdateModalOpen.movie.rating,
      plot: shouldUpdateModalOpen.movie.plot,
    };

    const data = await axiosPut(
      `/api/movies/${shouldUpdateModalOpen.movie._id}`,
      modifiedData,
      auth?.token
    );

    if (data) {
      toast.success(" Movie Updated!");
      setAllMovies([
        data,
        ...allMovies.filter((mv) => mv._id !== shouldUpdateModalOpen.movie._id),
      ]);

      setShouldUpdateModalOpen({
        status: false,
        movie: {},
      });
    }
  };

  return (
    <>
      <div className="mt-20 py-20 wrapper">
        <div className="flex items-center gap-5">
          <button className="btn" onClick={() => navigate(-1)}>
            Go back
          </button>
          <button onClick={handleAddMovie} className="btn">
            Add a New Movie
          </button>
        </div>
        <h2 className="text-3xl mt-5">Manage Movies</h2>

        {isLoading && (
          <div className="mt-5 min-h-screen flex justify-center">
            <Loading isLoading={isLoading} />
          </div>
        )}

        {error && (
          <div className="mt-5 min-h-screen flex justify-center">
            <Error error={error} />
          </div>
        )}

        {allMovies && (
          <table className="mt-5 min-h-screen w-full">
            <thead>
              <tr className="border-b border-gray-600 text-left">
                <th>S/L</th>
                <th>Name</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allMovies.map((movie, i) => (
                <tr key={movie._id} className="border-b border-gray-600">
                  <td>{i + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.year}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(movie)}
                      className="btn mr-5"
                    >
                      Update
                    </button>
                    {shouldDeleteConfirmationApear === movie._id ? (
                      <>
                        <button
                          className="btn mr-5"
                          onClick={() => setShouldDeleteConfirmationApear(null)}
                        >
                          Cancel
                        </button>
                        <button className="btn" onClick={handleDelete}>
                          Confirm
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          setShouldDeleteConfirmationApear(movie._id)
                        }
                        className="btn"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add new movie  modal   */}

      {addNewMovieModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl p-10 bg-white rounded-2xl text-black">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-2xl font-semibold">Add new movie</h2>
            <button onClick={() => setAddNewMovieModal(false)}>
              <X />
            </button>
          </div>

          <form
            onSubmit={handleNewMovieSubmit}
            className="mt-5 grid grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title">Title</label>
                <input
                  value={newMovieData.title}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, title: e.target.value })
                  }
                  id="title"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="poster">Poster</label>
                <input
                  value={newMovieData.poster}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, poster: e.target.value })
                  }
                  id="poster"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="genre">Genre</label>
                <input
                  value={newMovieData.genre}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, genre: e.target.value })
                  }
                  id="genre"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="year">Year</label>
                <input
                  value={newMovieData.year}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, year: e.target.value })
                  }
                  id="year"
                  type="number"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rating">Rating</label>
                <input
                  value={newMovieData.rating}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, rating: e.target.value })
                  }
                  id="rating"
                  type="number"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="plot">Plot</label>
                <input
                  value={newMovieData.plot}
                  onChange={(e) =>
                    setNewMovieData({ ...newMovieData, plot: e.target.value })
                  }
                  id="plot"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
            </div>
            <button className="btn col-span-2">Add</button>
          </form>
        </div>
      )}

      {/* update movie modal  */}

      {shouldUpdateModalOpen.status && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl p-10 bg-white rounded-2xl text-black">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-2xl font-semibold">Update movie</h2>
            <button
              onClick={() =>
                setShouldUpdateModalOpen({
                  status: false,
                  movie: {},
                })
              }
            >
              <X />
            </button>
          </div>
          <form
            onSubmit={handleUpdatedMovieSubmit}
            className="mt-5 grid grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title">Title</label>
                <input
                  value={shouldUpdateModalOpen.movie.title}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        title: e.target.value,
                      },
                    })
                  }
                  id="title"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="poster">Poster</label>
                <input
                  value={shouldUpdateModalOpen.movie.posters?.at(0)}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        posters: [e.target.value],
                      },
                    })
                  }
                  id="poster"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="genre">Genre</label>
                <input
                  value={shouldUpdateModalOpen.movie.genre}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        genre: e.target.value,
                      },
                    })
                  }
                  id="genre"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="year">Year</label>
                <input
                  value={shouldUpdateModalOpen.movie.year}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        year: e.target.value,
                      },
                    })
                  }
                  id="year"
                  type="number"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rating">Rating</label>
                <input
                  value={shouldUpdateModalOpen.movie.rating}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        rating: e.target.value,
                      },
                    })
                  }
                  id="rating"
                  type="number"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="plot">Plot</label>
                <input
                  value={shouldUpdateModalOpen.movie.plot}
                  onChange={(e) =>
                    setShouldUpdateModalOpen({
                      ...shouldUpdateModalOpen,
                      movie: {
                        ...shouldUpdateModalOpen.movie,
                        plot: e.target.value,
                      },
                    })
                  }
                  id="plot"
                  type="text"
                  className="outline-none border p-2.5 rounded-xl focus:border-black"
                />
              </div>
            </div>
            <button className="btn col-span-2">Update</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ManageMoviesPage;
