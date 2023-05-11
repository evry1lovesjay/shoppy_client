import Announcement from "../components/announcement/Announcement.component"
import Categories from "../components/categories/Categories.component"
import Footer from "../components/footer/Footer.component"
import Navbar from "../components/navbar/Navbar.component"
import Newsletter from "../components/newsletter/Newsletter.component"
import Products from "../components/products/Products.component"
import Slider from "../components/slider/Slider.component"


const Home = () => {
  return (
  <>
    <Announcement/>
    <Navbar />
    <Slider/>
    <Categories/>
    <Products/>
    <Newsletter/>
    <Footer/>
  </>
  )
}

export default Home