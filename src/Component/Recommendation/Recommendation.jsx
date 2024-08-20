
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import moment from "moment";
// motion
import { motion } from "framer-motion";
// variants
import { fedIn } from "../varints";

export default function Recommendation({ data, type }) {
  return (
    <motion.div 
    variants={fedIn("up", 0.1)} 
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <Link
      to={`/home/${type}/${data?.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block relative hover:scale-105 transition-all rounded-lg"
    >
      {data?.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title || data?.name}
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          No image found
        </div>
      )}
      <div className="absolute bottom-1 right-1 w-8 h-8 z-50">
        <CircularProgressbar
          value={(data.vote_average || 0) * 10}
          text={`${(data.vote_average || 0) * 10}%`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            textSize: "20px",
            pathColor: `rgba(23, 23, 23, ${(data.vote_average || 0) / 10})`,
            textColor: "#171717",
            trailColor: "transparent",
            backgroundColor: "#ffffff",
          })}
        />
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-white">
          {data?.title || data?.name}
        </h2>
        <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
      </div>
    </Link>
    </motion.div>
  );
}

Recommendation.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired, // Specify the type
};