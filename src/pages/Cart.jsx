import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components"
import Navbar from "../components/navbar/Navbar.component"
import Announcement from './../components/announcement/Announcement.component';
import Footer from './../components/footer/Footer.component';
import { mobile } from './../responsive';
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

// const publishable_key = process.env.STRIPE_PUBLISHABLE_KEY

const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`

const Title = styled.div`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({display: "none"})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
`
const ProductName = styled.div`
    flex: 3;
`
const ProductId = styled.div`
    flex: 3;
`
const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
`
const ProductSize = styled.div`

`
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom: "20px"})}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`

`

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: #fff;
    font-weight: 600;
`


const Cart = () => {

    const cart = useSelector(state=> state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    
    // Step 1: Get token from stripe
    const onToken = (token) => {
        setStripeToken(token)
    }

    // Step 2: After getting token, send details to backend for processing
    useEffect(()=>{
        const makeRequest = async ()=>{
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                })
                navigate("/success", {state:{stripeData: res.data, products: cart}})
                // const stripeData = res.data
                // const products = cart
                // console.log(stripeData)
                // console.log(products)
            } catch (error) {}
        }
            stripeToken && cart.total >=1 && makeRequest()
        
    }, [stripeToken, cart.total,navigate,cart])

  return (
    <Container >
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    
                    {cart.products.map(product=>(
                    <Product>
                        {/* "https://img.freepik.com/free-photo/pair-trainers_144627-3809.jpg?w=360&t=st=1680001881~exp=1680002481~hmac=f32f68fd4d5c3562652abbcad5b8ba7d21b602ce96a8052dbb13c5f0b1e8106d" */}
                            <ProductDetail>
                            <Image src={product.img} />
                            <Details>
                                <ProductName><b>Product: </b>{product.title}</ProductName>
                                <ProductId><b>ID: </b>{product._id}</ProductId>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>SIZE: </b>{product.size}</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                    ))}
                    
                    <Hr />
                    
                </Info>    
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice> $ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice> $ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice> $ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem  type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice> $ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    
                    <StripeCheckout
                    name="Shoppy..."
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    // stripeKey={publishable_key}
                    stripeKey="pk_test_51MrjMmEamiBE0i9kcYKhB7ovbwFIVi4xZZerRItcr0aBZXqYeGKsiE6ThXxmk2WeR7ZxpbRgYeOu2heVEov8A7bp00CoOI4wfa"
                    >
                        
                        <SummaryButton>CHECKOUT NOW</SummaryButton>
                    </StripeCheckout>
                </Summary>    
            </Bottom> 
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart