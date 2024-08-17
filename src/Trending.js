import axios from "axios";
import { useQuery } from "react-query";
//  all trending today
const apiKey = "4506a33c6fd8b3db74243b36650bd7fb";
export function getTrending() {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );
}
export function getTrendingDay(time_window) {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${apiKey}`
  );
}
// // all trending today details
// export function getTrendingDetails(id) {
//   return axios.get(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
//   );
// }
// // smilir movies
// export function getSimilar(id) {
//   return axios.get(
//     `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
//   );
// }
// // Recommendation Movie
// export function getRecommend(id) {
//   return axios.get(
//     `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
//   );
// }
// // movies cast
// export function getMovieCast(id) {
//   return axios.get(
//     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
//   );
// }
// Generalized function to fetch details based on type
export function getDetails(id, type) {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; // Replace with your API key
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
  return axios.get(url);
}

// Similar function for TV shows and movies
export function getSimilar(id, type) {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; // Replace with your API key
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}`;
  return axios.get(url);
}

export function getRecommend(id, type) {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; // Replace with your API key
  const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}`;
  return axios.get(url);
}

export function getCast(id, type) {
  const apiKey = "4506a33c6fd8b3db74243b36650bd7fb"; // Replace with your API key
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`;
  return axios.get(url);
}

export function useGetTrenting(key, fn) {
  return useQuery(key, fn, {
    select: (data) => data?.data,
  });
}
