// import { getTrending, useGetTrenting } from "../../Trending";
// import { Carousel } from "react-responsive-carousel";
// import "./header.scss";
// import { Link } from "react-router-dom";
// // import TrendingTime from "../TrendingTime/TrendingTime";

// export default function Header() {
//   const { data } = useGetTrenting("getTrend", getTrending);
//   console.log(data);

//   return (
//     <div className="w-full   lg:min-h-screen flex flex-col">
//       <div className="flex flex-col flex-grow   lg:max-h-screen">
//         <Carousel
//           autoPlay={true}
//           showArrows={false}
//           infiniteLoop={true}
//           showStatus={false}
//           showIndicators={false}
//         >
//           {data?.results?.map((movie) => (
//             <div
//               key={movie?.id}
//               className="w-full h-screen  overflow-hidden relative group transition-all"
//             >
//               <div className="w-full h-full">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
//               <div className="container mx-auto">
//                 <div className="w-full absolute bottom-0 max-w-md ">
//                   <div className="text-content pl-4 text-left">
//                     {" "}
//                     {/* Apply padding-left here */}
//                     <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl ">
//                       {movie?.title ||
//                         movie?.original_name ||
//                         movie?.original_title}
//                     </h2>
//                     <p className="text-ellipsis line-clamp-3 my-2 ">
//                       {movie?.overview}
//                     </p>
//                     <div className="flex items-center gap-4">
//                       <p>Rating: {Number(movie?.vote_average).toFixed(1)}+</p>
//                       <span>|</span>
//                       <p>View: {Number(movie?.popularity).toFixed(0)}</p>
//                     </div>
//                     <Link to={`/home/${movie?.id}`}>
//                       <button className=" bg-white px-4 py-2 text-black font-bold rounded my-4  hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
//                         Play Now
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getTrending, useGetTrenting } from "../../Trending";

export default function Header() {
  const { data } = useGetTrenting("getTrend", getTrending);

  return (
    <div className="w-full lg:min-h-screen flex flex-col">
      <div className="flex flex-col flex-grow lg:max-h-screen">
        <Carousel
          autoPlay={true}
          showArrows={false}
          infiniteLoop={true}
          showStatus={false}
          showIndicators={false}
        >
          {data?.results?.map((movie) => (
            <div
              key={movie?.id}
              className="w-full h-screen overflow-hidden relative group transition-all"
            >
              <div className="w-full h-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className="w-full absolute bottom-0 max-w-md">
                  <div className="text-content pl-4 text-left">
                    <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                      {movie?.title || movie?.original_name || movie?.original_title}
                    </h2>
                    <p className="text-ellipsis line-clamp-3 my-2">{movie?.overview}</p>
                    <div className="flex items-center gap-4">
                      <p>Rating: {Number(movie?.vote_average).toFixed(1)}+</p>
                      <span>|</span>
                      <p>View: {Number(movie?.popularity).toFixed(0)}</p>
                    </div>
                    <Link to={`/home/${movie?.media_type}/${movie?.id}`}>
                      <button className="bg-white px-4 py-2 text-black font-bold rounded my-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                        Play Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
