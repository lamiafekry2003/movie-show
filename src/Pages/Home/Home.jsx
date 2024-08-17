import Header from "../../Component/Header/Header";
import PopularAtHome from "../../Component/PopularAtHome/PopularAtHome";
import TopRatedHome from "../../Component/TopRatedHome/TopRatedHome";
import TrendingTime from "../../Component/TrendingTime/TrendingTime";




export default function Home() {
 
  return (
    <div className="flex flex-col">
    <Header />
    <TrendingTime />
    <PopularAtHome/>
    <TopRatedHome/>
  </div>
  )
}
