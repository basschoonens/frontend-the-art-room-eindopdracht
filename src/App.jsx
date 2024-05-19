import styles from './App.module.css'
import {Routes, Route, Navigate} from "react-router-dom";
import ShoppingCart from "./pages/orders/shoppingcart/ShoppingCart.jsx";
import Home from "./pages/home/Home.jsx";
import MainGallery from "./pages/galleries/MainGallery.jsx";
import ArtistGallery from "./pages/galleries/ArtistGallery.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Order from "./pages/orders/order/Order.jsx";
import Purchased from "./pages/orders/purchased/Purchased.jsx";
import About from "./pages/about/About.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AddNewArtwork from "./pages/artworks/AddNewArtwork.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import Register from "./pages/register/Register.jsx";


function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <div className={styles.appContainer}>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/maingallery" element={<MainGallery/>}/>
                    <Route path="/artistgallery" element={isAuth ? <ArtistGallery/> : <Navigate to="/"/>} />
                    <Route path="/artist/addnewartwork" element={<AddNewArtwork/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/purchased" element={<Purchased/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </div>
        </>
    )
}

export default App
