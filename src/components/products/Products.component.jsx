import styled from "styled-components"
// import { popularProducts } from "../../data"
import Product from "../product/Product.component"
import { useState } from 'react';
import { useEffect } from 'react';
import { API_URL } from "../requestMethods"
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`


const Products = ({cat, filters, sort}) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])


  useEffect(()=>{
    const getProducts = async ()=>{
      try {
        // const res = await axios.get(cat ? `http://localhost:7000/api/products?category=${cat}` : "http://localhost:7000/api/products")
        const res = await axios.get(cat ? `https://shoppy-api-m4i9.onrender.com/api/products?category=${cat}` : "https://shoppy-api-m4i9.onrender.com/api/products")
        // const res = await axios.get(cat ? `${API_URL}/api/products?category=${cat}` : `${API_URL}/api/products`)
        setProducts(res.data)
      } catch (error) {
        
      }
    }
    getProducts()
  }, [cat])

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter((item)=> Object.entries(filters).every(([key,value])=>
        item[key].includes(value)
      )))
      
  }, [cat, filters, products])

  useEffect(()=>{
    if(sort==="newest"){
      setFilteredProducts(prev =>
        [...prev].sort((a,b)=> a.createdAt - b.createdAt))
    }
    else if(sort==="asc"){
      setFilteredProducts(prev =>
        [...prev].sort((a,b)=> a.price - b.price))
    }
    else{
      setFilteredProducts(prev =>
        [...prev].sort((a,b)=> b.price - a.price))
    }
  }
  ,[sort]) 

  return (
    <Container>
        {cat ? filteredProducts.map((item)=>(
            <Product item={item} key={item._id}/>
        )) : products.slice(0,8).map((item)=>(
          <Product item={item} key={item._id}/>))}
    </Container>
  )
}

export default Products