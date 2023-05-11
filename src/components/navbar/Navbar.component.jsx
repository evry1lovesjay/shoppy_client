import { Search, ShoppingCartOutlined } from "@mui/icons-material"
import { Badge } from "@mui/material"
import styled from "styled-components"
import {mobile} from "../../responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../../redux/userRedux"

const Container = styled.div`
  height: 60px;

  ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({padding: "10px 0px"})}
 `
const Left = styled.div`
    flex: 1px;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    
    ${mobile({marginLeft: "15px"})}

`

const Input = styled.input`
  border: none;
  ${mobile({width: "50px"})}
`

const Center = styled.div`
    flex: 1px;
    text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize: "24px", marginLeft:"3px"})}
`

const Right = styled.div`
    flex: 1px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${mobile({flex:2, justifyContent: "center"})}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: "12px", marginLeft:"10px"})}
`

const Navbar = () => {

  const quantity = useSelector(state=> state.cart.quantity)
  const isLoggedIn = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
};

  return (
    <Container>
      <Wrapper>
        <Left> 
            <Language>EN</Language>
        <SearchContainer>
            <Input placeholder="Search"/>
            <Search style={{color:"grey", fontSize: 16}}/>
        </SearchContainer>
        </Left>
        <Center> <Logo>Shoppy..</Logo> </Center>
        <Right>
                
                
            {isLoggedIn ?
                (<>
                <Link style={{ textDecoration: 'none', color: 'black' }} onClick={handleLogOut}>
                    <MenuItem>LOG OUT</MenuItem>
                </Link>
                <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary"> 
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
                </Link>
                </>)
                :
                (<>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/register">
                  <MenuItem>REGISTER</MenuItem>
                </Link>

                <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
            </>)
            }
          
        </Right>
      </Wrapper> 
    </Container>
  )
}

export default Navbar