import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "./Component/Header/Header";
// import Navbar from "./Component/Navbar/Navbar";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home/Home";
import MovieDetails from "./Component/MovieDetails/MovieDetails";


export default function App() {
  const routs=createBrowserRouter([
    {path:'',element:<Layout></Layout>,children:[
      {index:true,element:<Home></Home>},
      {path:'home/:id',element:<MovieDetails></MovieDetails>}
    ]}
  ])
  return (
    <div>
      <RouterProvider router={routs}/>
    </div>
  )
}
