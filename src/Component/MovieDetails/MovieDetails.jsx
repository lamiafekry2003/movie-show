import { useParams } from "react-router-dom";
import "./movieDetails.scss";
import {
  getMovieCast,
  getTrendingDetails,
  useGetTrenting,
} from "../../Trending";
import moment from "moment";
import Slider from "react-slick";

export default function MovieDetails() {
  const { id } = useParams();
  const { data } = useGetTrenting("movieDetail", () => getTrendingDetails(id));
  const { data: cast } = useGetTrenting("movieCast", () => getMovieCast(id));
  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  console.log(data);
  console.log(cast);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:6,
          slidesToScroll:6,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:5,
          slidesToScroll:5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className=" absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>
      <div className=" container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            className="w-60 h-80 object-cover rounded"
            alt=""
          />
        </div>
        <div>
          <h2 className=" text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.original_name || data?.original_title}
          </h2>
          <p className="text-neutral-400 mt-1">{data?.tagline}</p>
          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3 "></div>
          <div className="flex items-center gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>
          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3 "></div>
          <div>
            <h3 className=" text-xl font-bold text-white mb-1">OverView</h3>
            <p>{data?.overview}</p>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3 "></div>
            <div className=" flex items-center gap-3 my-3">
              <p> Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3 "></div>
          </div>
          <div>
            <p className=" text-white ">
              <span>Director</span> : {cast?.crew[0]?.name}
            </p>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3 "></div>
          </div>
          {/* <div className="grid "> */}
          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-1 lg:gap-1 my-4 ">
            <Slider {...settings} className="mx-5">
              {cast?.cast
                ?.filter((ele) => ele.profile_path)
                .map((cast) => (
                  <div key={cast?.cast_id} >
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${cast?.profile_path}`}
                        className="w-24 h-24 mx-auto object-cover rounded-full "
                      />
                    </div>
                    <p className="font-bold text-sm mx-auto w-fit text-neutral-400 ">
                      {cast?.name}
                    </p>
                  </div>
                ))}
            </Slider>
          </div>

          </div>
        </div>

      </div>
  );
}
