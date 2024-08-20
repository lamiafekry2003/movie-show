import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";
import moment from "moment";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const fetchSearchResults = async (query) => {
    const apiKey ="4506a33c6fd8b3db74243b36650bd7fb";
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;
    const response = await axios.get(url);
    return response.data.results;
  };

  const { data: results, isLoading, error } = useQuery(
    ["searchResults", query],
    () => fetchSearchResults(query),
    {
      enabled: !!query,
    }
  );

  if (isLoading) return <div className="p-4 text-white">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-3 my-28 md:my-20">
      <h1 className="text-white text-2xl mb-4">Search Results for {`${query}`}</h1>
      <div className="  flex flex-col  justify-center items-center mx-4 md:grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {results?.length > 0 ? (
            results.map((item) => (
              <div className="" key={item.id}>
                <Link
                  to={`/home/${item.media_type}/${item.id}`} // Correctly set media_type and id
                  className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block relative hover:scale-105 transition-all rounded-lg my-3"
                >
                  {item?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                      alt={item?.title || item?.name}
                    />
                  ) : (
                    <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
                      No image found
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-8 h-8 z-50">
                    <CircularProgressbar
                      value={(item.vote_average || 0) * 10}
                      text={`${(item.vote_average || 0) * 10}%`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        textSize: "20px",
                        pathColor: `rgba(23, 23, 23, ${
                          (item.vote_average || 0) / 10
                        })`,
                        textColor: "#171717",
                        trailColor: "transparent",
                        backgroundColor: "#ffffff",
                      })}
                    />
                  </div>
                  <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
                    <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-white">
                      {item?.title || item?.name}
                    </h2>
                    <p>{moment(item?.release_date).format("MMMM Do YYYY")}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-white">Not found.</div>
          )}
        </div>
    </div>
  );
}