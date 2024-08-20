import { motion } from "framer-motion";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import tvIcon from "../../assets/tv.svg"
import { fedIn } from "../varints";

const fetchMovie = async (type, page) => {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; 
//   const page = queryKey[2]; // Get the page number from queryKey
  const url = `https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}&page=${page}`; // Corrected endpoint and query parameters
  const response = await axios.get(url);
  return response.data.results;
};


export default function TV() {
  const [type, setType] = useState("popular");
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery(
    ["trending", type,page ],
    () => fetchMovie(type,page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="container mx-auto px-3 my-20">
       <Helmet>
        <title>Movie-show</title>
        <meta name="description" content="Helmet application" />
        <link rel="icon" href={tvIcon} />
      </Helmet>
      <div className="relative">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between">
          <motion.h2 
           variants={fedIn('up', 0.2)}
           initial="hidden"
           whileInView="show"
           viewport={{ once: false, amount: 0.7 }}
          className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
            {type.replace("_", " ")}
          </motion.h2>
          <motion.div 
          variants={fedIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="mb-5 border-2 border-orange-800 rounded-[30px] cursor-pointer mx-4 flex justify-center">
            <button
              className={`px-2 md:px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in ${
                type === "popular"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setType("popular")}
            >
              Popular
            </button>
            <button
              className={`px-2 md:px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
                type === "top_rated"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setType("top_rated")}
            >
              Top Rated
            </button>
            <button
              className={`px-2 md:px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
                type === "on_the_air"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setType("on_the_air")}
            >
              on the air
            </button>
            <button
              className={`px-2 md:px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
                type === "airing_today"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setType("airing_today")}
            >
             Airing today
            </button>
          </motion.div>
        </div>
        <div className="  flex flex-col  justify-center items-center mx-4 md:grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data?.length > 0 ? (
            data.map((item,index) => (
              <motion.div 
              variants={fedIn('up', index * 0.1)} // Applying motion to each card
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
              className="" key={item.id}>
                <Link
                  to={`/home/tv/${item.id}`} // Correctly set media_type and id
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
              </motion.div>
            ))
          ) : (
            <div className="text-white">No {type.replace("_", " ")} found.</div>
          )}
        </div>
      </div>
      <div className=" mt-5 flex justify-center items-center">
            <Stack spacing={2}>
              <Pagination count={100} page={page} onChange={handleChange}   sx={{
            "& .MuiPaginationItem-text": {
              color: "white" // Change this to your desired color
            }
          }}/>
            </Stack>
          </div>
     
    </div>
  );
}
