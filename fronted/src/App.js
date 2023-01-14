import './App.css'
import {Link,BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './store';
import CartScreen from './screens/CartScreen';
import Signin from './screens/Signin';
import ShippingAddress from './screens/ShippingAddress';
import SignupScreen from './screens/SignupScreen';
import Paymentmethod from './screens/Paymentmethod';
import PlaceorderScreen from './screens/PlaceOrderScreen';
import { ToastContainer} from 'react-toastify'


function App() {
  const {state,dispatch}=useContext(Store)
  const {cart,UserInfo}=state

  const signoutHandler=()=>{
  dispatch({type:"USER_SIGNOUT"})
  localStorage.removeItem("UserInfo")
  localStorage.removeItem("shippingaddress")
  localStorage.removeItem("paymentMethod")
  }
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container' >
      <header>
       <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Amazona</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">Cart
           { cart.cartItems.length>0 && (<Badge pill bg="danger">
               {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
            </Badge>) }
            </Link>
            { UserInfo ? 
            (
              <NavDropdown title={UserInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider/>
                <Link to="#signout" className="dropdown-item" onClick={signoutHandler}>
                  SignOut
                </Link>
              </NavDropdown>
            ) 
            :(
              <Link to={UserInfo?'/':'/signin'} className='nav-link'>SignIn</Link>
              )}
          </Nav>
        </Container>
        </Navbar> 
      </header>
      <main>
        <Container className='mt-3'>
              <ToastContainer  
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
      <Routes>
        <Route path='/products/:slug' element={<ProductScreen/>}/>
        <Route path='/products/:id' element={<ProductScreen/>}/>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignupScreen/>}/>
        <Route path='/orderplace' element={<PlaceorderScreen/>}/>
        <Route path='/paymentmethod' element={<Paymentmethod/>}/>
        <Route path='/shipping' element={<ShippingAddress/>}/>
        <Route path='/cart' element={<CartScreen/>}/>
      </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  )
  }

export default App;
