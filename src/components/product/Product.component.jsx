import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";
import styled from "styled-components"
import { mobile } from './../../responsive';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  position: absolute;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s all ease;
  cursor: pointer;

`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  width: 25%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }

  ${mobile({width: "100%"})}
  
`

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
`

const Image = styled.img`
  height:75%;
  overflow: hidden;
  z-index: 2;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

const Product = ({item}) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined/>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined/>
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  )
}

export default Product