
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import LoadingCard from "../LoadingCard/LoadingCard";
// motion
import { motion } from 'framer-motion';
// variants
import { fedIn } from '../varints'

// Function to fetch popular media (movie or TV show)
const fetchPopular = async (media_type) => {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; 
  const url = `https://api.themoviedb.org/3/trending/${media_type}/week?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
};

export default function PopularAtHome() {
  const [media_type, setMediaType] = useState("movie");

  const { data, error, isLoading } = useQuery(
    ["trending", media_type],
    () => fetchPopular(media_type),
    { keepPreviousData: true }
  );

  if (error) {
    return <div className="text-white">Error: {error.message}</div>;
  }

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <div className="relative">
        <div className="flex justify-between">
          <motion.h2 
            variants={fedIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
             Popular
          </motion.h2>
          <motion.div 
            variants={fedIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mb-5 border-2 border-orange-800 rounded-[30px] cursor-pointer mx-4 flex justify-center">
            <button
              className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in ${
                media_type === "movie"
                  ? "bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setMediaType("movie")}
            >
              Movies
            </button>
            <button
              className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
                media_type === "tv"
                  ? "bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setMediaType("tv")}
            >
              TV Shows
            </button>
          </motion.div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mx-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <LoadingCard key={index} />
              ))}
          </div>
        ) : data?.length > 0 ? (
          <Slider {...settings2} className="mx-4">
            {data.map((item,index) => (
              <motion.div 
                variants={fedIn('up', index*.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="" key={item.id}>
                <Link
                  to={`/home/${media_type}/${item.id}`}
                  className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block relative hover:scale-105 transition-all rounded-lg"
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
            ))}
          </Slider>
        ) : (
          <div className="text-white mx-4">No trending {media_type} found.</div>
        )}
      </div>
    </div>
  );
}