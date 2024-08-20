
import  { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import moment from "moment";
import SmilirMovie from "../Smiliar/SmilirMovie";
import Recommendation from "../Recommendation/Recommendation";
import { getDetails, getSimilar, getRecommend, getCast, getVideo, useGetTrenting } from "../../Trending";
import VideoPlay from "../Video/VideoPlay"; 
import { Helmet } from "react-helmet";
import tvIcon from "../../assets/tv.svg"
// motion
import { motion } from 'framer-motion';
// variants
import {fedIn} from '../varints'

export default function Details() {
  const { id, type } = useParams(); 

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const { data: details, error: detailsError } = useGetTrenting(
    ["details", id, type],
    () => getDetails(id, type)
  );

  const { data: cast, error: castError } = useGetTrenting(
    ["cast", id, type],
    () => getCast(id, type)
  );

  const { data: similar, error: similarError } = useGetTrenting(
    ["similar", id, type],
    () => getSimilar(id, type)
  );

  const { data: recommend, error: recommendError } = useGetTrenting(
    ["recommend", id, type],
    () => getRecommend(id, type)
  );

  if (detailsError || castError || similarError || recommendError) {
    return <div>Error loading data</div>;
  }

  const handlePlayNow = async () => {
    try {
      const videoResponse = await getVideo(id, type);
      const video = videoResponse.data.results[0]; // Get the first video available
      if (video) {
        setVideoData(video);
        setIsVideoPlaying(true);
      } else {
        alert("No video available for this title.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      alert("Failed to load video.");
    }
  };

  const closeVideo = () => {
    setIsVideoPlaying(false);
    setVideoData(null);
  };

  const duration = type === 'movie' ? (details?.runtime / 60)?.toFixed(1)?.split(".") : null;

  // Slider settings
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 7, slidesToScroll: 7, infinite: true, dots: false } },
      { breakpoint: 768, settings: { slidesToShow: 5, slidesToScroll: 5, infinite: true, dots: false } },
      { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 3, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    ],
  };

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 6, slidesToScroll: 6, infinite: true, dots: false } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: false } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div>
       <Helmet>
        <title>Movie-show</title>
        <meta name="description" content="Helmet application" />
        <link rel="icon" href={tvIcon} />
      </Helmet>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500/${details?.backdrop_path}`}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <motion.div 
        variants={fedIn('left', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
            className="w-60 h-80 object-cover rounded"
            alt=""
          />
          <button
            onClick={handlePlayNow} // Attach the event handler
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </motion.div>
        <motion.div 
        variants={fedIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {details?.title || details?.name}
          </h2>
          {details?.tagline && <p className="text-neutral-400 mt-1">{details?.tagline}</p>}
          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
          <div className="flex items-center gap-3">
            <p>Rating : {Number(details?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(details?.vote_count)}</p>
            {type === 'movie' && (
              <>
                <span>|</span>
                <p>Duration : {duration[0]}h {duration[1]}m</p>
              </>
            )}
          </div>
          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{details?.overview}</p>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
            <div className="flex items-center gap-3 my-3">
              <p>Status : {details?.status}</p>
              <span>|</span>
              <p>Release Date : {moment(details?.release_date).format("MMMM Do YYYY")}</p>
              <span>|</span>
              {type === 'movie' && <p>Revenue : {Number(details?.revenue)}</p>}
            </div>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
          </div>
          <div>
            <p className="text-white">
              <span>Director</span> : {cast?.crew.find(person => person.job === 'Director')?.name}
            </p>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
          </div>
          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-1 lg:gap-1 my-4">
            <Slider {...settings} className="mx-5">
              {cast?.cast
                ?.filter((person) => person.profile_path)
                .map((person) => (
                  <div key={person.cast_id}>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                        className="w-24 h-24 mx-auto object-cover rounded-full"
                      />
                    </div>
                    <p className="font-bold text-sm mx-auto text-center w-fit text-neutral-400">
                      {person.name}
                    </p>
                  </div>
                ))}
            </Slider>
          </div>
        </motion.div>
      </div>

      {/* Similar Movies/Shows */}
      <div className="container mx-auto my-10 px-3">
        <motion.h2 
        variants={fedIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="text-lg lg:text-2xl font-bold mb-3 text-white capitalize">
          Similar {type === 'movie' ? 'Movies' : 'Shows'}
        </motion.h2>
        <Slider {...settings2} className="mx-4">
          {similar?.results?.map((item) => (
            <SmilirMovie key={item.id} data={item} type={type} />
          ))}
        </Slider>
      </div>
      {/* Recommendations */}
      <div className="container mx-auto my-10 px-3">
        <motion.h2 
        variants={fedIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="text-lg lg:text-2xl font-bold mb-3 text-white capitalize">
          Recommendations
        </motion.h2>
        <Slider {...settings2} className="mx-4">
          {recommend?.results?.map((item) => (
            <Recommendation key={item.id} data={item} type={type} />
          ))}
        </Slider>
      </div>

      {/* Video Player  */}
      {isVideoPlaying && videoData && (
        <VideoPlay videoKey={videoData.key} closeVideo={closeVideo} />
      )}
    </div>
  );
}