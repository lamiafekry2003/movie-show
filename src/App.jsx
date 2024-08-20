// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import Header from "./Component/Header/Header";
// // import Navbar from "./Component/Navbar/Navbar";
// import Layout from "./Component/Layout/Layout";
// import Home from "./Pages/Home/Home";
// import MovieDetails from "./Component/MovieDetails/MovieDetails";


// export default function App() {
//   const routs=createBrowserRouter([
//     {path:'',element:<Layout></Layout>,children:[
//       {index:true,element:<Home></Home>},
//       {path:'home/:id',element:<MovieDetails></MovieDetails>}
//     ]}
//   ])
//   return (
//     <div>
//       <RouterProvider router={routs}/>
//     </div>
//   )
// }
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home/Home";
import Details from "./Component/Details/Details";
import Movie from "./Component/Movie/Movie";
import TV from "./Component/TV/TV";
import SearchPage from "./Pages/SearchPage/SearchPage";
import NotFound from "./Pages/NotFound/NotFound";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path:'', element: <Home /> },
        { path: 'home/:type/:id', element:<Details/> },
        {path:'movie' ,element:<Movie/>},
        { path: 'movie/:id', element: <Details /> },
        {path:'tv',element:<TV/>},
        { path: 'tv/:id', element: <Details /> },
        {path:'search',element:<SearchPage/>},
        {path:'*',element:<NotFound/>}
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

