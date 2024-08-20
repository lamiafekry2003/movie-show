import PropTypes from "prop-types";
export default function VideoPlay({ videoKey, closeVideo }) {
  return (
    <div className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full  max-h-[70vh] max-w-screen-lg aspect-video rounded  relative">
        <button
          onClick={closeVideo}
          className=" absolute -right-1 -top-9 text-3xl z-50"
        >
          &times;
        </button>

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

VideoPlay.propTypes = {
  videoKey: PropTypes.string.isRequired,
  closeVideo: PropTypes.func.isRequired,
};
