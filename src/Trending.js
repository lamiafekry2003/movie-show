import axios from "axios";
import { useQuery } from "react-query";
//  all trending today
const apiKey = "4506a33c6fd8b3db74243b36650bd7fb";
export function getTrending() {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );
}
// trend
export function getTrendingDay(time_window) {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${apiKey}`
  );
}

// Generalized function to fetch details based on type details
export function getDetails(id, type) {

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
  return axios.get(url);
}

// video

export function getVideo(id, type) {
 
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`;
  return axios.get(url);
}

// Similar function for TV shows and movies
export function getSimilar(id, type) {
 
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}`;
  return axios.get(url);
}
// recommend
export function getRecommend(id, type) {
  
  const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}`;
  return axios.get(url);
}

// cast
export function getCast(id, type) {
  
  const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`;
  return axios.get(url);
}

export function useGetTrenting(key, fn) {
  return useQuery(key, fn, {
    select: (data) => data?.data,
  });
}
