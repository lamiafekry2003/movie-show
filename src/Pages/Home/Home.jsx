import { Helmet } from "react-helmet";
import Header from "../../Component/Header/Header";
import PopularAtHome from "../../Component/PopularAtHome/PopularAtHome";
import TopRatedHome from "../../Component/TopRatedHome/TopRatedHome";
import TrendingTime from "../../Component/TrendingTime/TrendingTime";
import tvIcon from "../../assets/tv.svg"; // Correct import for SVG

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Movie-show</title>
        <meta name="description" content="Helmet application" />
        <link rel="icon" href={tvIcon} />
      </Helmet>
      
      <Header />     
      <TrendingTime />
      <PopularAtHome />
      <TopRatedHome />
    </>
  );
}