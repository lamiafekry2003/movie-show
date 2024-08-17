// import { useState } from "react";
// import { getTrendingDay, useGetTrenting } from "../../Trending";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
// import moment from "moment";

// export default function TrendingTime() {
//   // State to control the time window (day/week)
//   const [time_window, setTimeWindow] = useState("day");

//   // Corrected useGetTrenting to properly call getTrendingDay with time_window
//   const { data } = useGetTrenting(["trendDay", time_window], () =>
//     getTrendingDay(time_window)
//   );

//   var settings2 = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 6,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 6,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   console.log(data);

//   return (
//     <div className="container mx-auto px-3 my-10">
//       <div className="relative">
//         <div className="flex">
//           <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
//             Trending
//           </h2>
//           <div className="mb-5 border-2 border-orange-800 rounded-[30px] cursor-pointer mx-4 flex justify-center">
//             <button
//               className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in ${
//                 time_window === "day"
//                   ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
//                   : ""
//               }`}
//               onClick={() => setTimeWindow("day")}
//             >
//               Today
//             </button>
//             <button
//               className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
//                 time_window === "week"
//                   ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
//                   : ""
//               }`}
//               onClick={() => setTimeWindow("week")}
//             >
//               This Week
//             </button>
//           </div>
//         </div>
//         <Slider {...settings2} className="mx-4">
//           {data?.results?.length > 0 ? (
//             data.results.map((movie) => (
//               <div className="" key={movie.id}>
//                 <Link
//                   to={`/home/${movie?.id}`}
//                   className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block relative hover:scale-105 transition-all rounded-lg"
//                 >
//                   {movie?.poster_path ? (
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
//                       alt={movie?.title || movie?.name}
//                     />
//                   ) : (
//                     <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
//                       No image found
//                     </div>
//                   )}
//                   <div className="absolute bottom-1 right-1 w-8 h-8 z-50">
//                     <CircularProgressbar
//                       value={(movie.vote_average || 0) * 10}
//                       text={`${(movie.vote_average || 0) * 10}%`}
//                       background
//                       backgroundPadding={6}
//                       styles={buildStyles({
//                         textSize: "20px",
//                         pathColor: `rgba(23, 23, 23, ${
//                           (movie.vote_average || 0) / 10
//                         })`,
//                         textColor: "#171717",
//                         trailColor: "transparent",
//                         backgroundColor: "#ffffff",
//                       })}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
//                     <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-white">
//                       {movie?.title || movie?.name}
//                     </h2>
//                     <p>{moment(movie?.release_date).format("MMMM Do YYYY")}</p>
//                   </div>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="text-white">No trending movies found for {time_window}.</div>
//           )}
//         </Slider>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { getTrendingDay, useGetTrenting } from "../../Trending";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import moment from "moment";

export default function TrendingTime() {
  // State to control the time window (day/week)
  const [time_window, setTimeWindow] = useState("day");

  // Corrected useGetTrenting to properly call getTrendingDay with time_window
  const { data } = useGetTrenting(["trendDay", time_window], () =>
    getTrendingDay(time_window)
  );

  var settings2 = {
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
          <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
            Trending
          </h2>
          <div className="mb-5 border-2 border-orange-800 rounded-[30px] cursor-pointer mx-4 flex justify-center">
            <button
              className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in ${
                time_window === "day"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </button>
            <button
              className={`px-5 py-1 border-0 rounded-[30px] transition duration-75 ease-in-out ${
                time_window === "week"
                  ? " bg-gradient-to-l from-red-700 to-orange-500 text-white"
                  : ""
              }`}
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </button>
          </div>
        </div>
        <Slider {...settings2} className="mx-4">
          {data?.results?.length > 0 ? (
            data.results.map((item) => (
              <div className="" key={item.id}>
                <Link
                  to={`/home/${item.media_type}/${item.id}`} // Ensure media_type is included
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
              </div>
            ))
          ) : (
            <div className="text-white">No trending movies found for {time_window}.</div>
          )}
        </Slider>
      </div>
    </div>
  );
}
