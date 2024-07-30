// import axios from "axios";
// import { useQuery } from "react-query";



// export default function VideoPlay({data}) {
//     const fetchMoviePopularDetails = async (id) => {
//         const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; // Replace with your IMDb API key
//         const url = `https://api.themoviedb.org/3/movie/${data?.id}/videos?api_key=${apiKey}`;
//         const response = await axios.get(url);
//         return response.data;
//       };
//       const {data:videoData}=useQuery(['video',id],()=>fetchMoviePopularDetails(id))
//   return(
//     <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'> 
//     <div className='bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>
      
//       <button onClick={close} className=' absolute -right-1 -top-6 text-3xl z-50'>
//           {/* <IoClose/> */}
//       </button>

//       <iframe
//         src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
//         className='w-full h-full'
//       />



//     </div>
// </section>
//   )
// }
