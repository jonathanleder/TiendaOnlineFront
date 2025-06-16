import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Card, Offcanvas} from 'react-bootstrap';
import {useAuth} from '../Components/AuthContext.jsx';
import {FaShoppingBag} from 'react-icons/fa';
import {useCart} from '../Components/CartContext';
import Badge from 'react-bootstrap/Badge';
import "../stylesheets/MyNavbar.css";
import logo from '../assets/images/logo.jpg';


function MyNavbar() {

    const{
        cart,increaseQuantity,decreaseQuantity,removeFromCart,
            showCartMenu,setShowCartMenu,clearCart,
    }= useCart();

    const{user,logout} = useAuth();//extraemos de la funcion useAuth el usuario y si esta logueado o no
    const [searchterm,setSearchTerm] = useState('');

    const [errorMessage,setErrorMessage] = useState('');


    const handleCartClick = () => {
        setShowCartMenu(!showCartMenu);
    }

    const handleSearch= (event) => {
        event.preventDefault();
        if(searchterm.trim()){ /* empty */ }
    };
    const handleIncreaseQuantity = (productId,stock) =>{
        const productInCart = cart.find((item) => item.id === productId);
        if(productInCart.quantity < stock){
            increaseQuantity(productId);
            setErrorMessage(" ");
        }else{
            setErrorMessage("No hay stock disponible");
        }
    };

    const handleDecreaseQuantity = (productId) =>{
        decreaseQuantity(productId);
        setErrorMessage("");
    }

    const totalItemsInCart = cart.length;

    const totalPrice = cart.reduce((total,product) => total +product.precio *product.quantity, 0);
    const handleLogout = () => {
        clearCart();
        logout();
    }

    const handleCheckout = () => {
        if(user){
            window.location.href='/checkout';
        }else{
            window.location.href='/login';
        }
    };

    return (
        <Navbar expand="lg" className="color-navbar fixed-top">
            <Container>
                <Nav className="d-flex align-items-center">
                <img className="imagen_logo" src={logo} alt="logo de la tienda online"/>
                <Navbar.Brand className="ms-3" href="/home">Tienda Online</Navbar.Brand>
                <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control type="search"
                                  placeholder="Search..."
                                  className="me-2"
                                  aria-label="Search"
                                  value={searchterm}
                                  onChange={(e) => setSearchTerm(e.target.value)}/>
                    <Button className="bg-green text-white" type="submit">
                        Buscar
                    </Button>
                </Form>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link href="#" className="cart-icon" onClick={handleCartClick}>
                            <FaShoppingBag size={24}/>
                            {totalItemsInCart >0 &&(
                                <Badge pill bg="danger" className="cart-badge">
                                    { totalItemsInCart}
                                </Badge>
                            )}
                        </Nav.Link>


                        {user ? (


                        <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>

                            <NavDropdown.Item href="/ayuda">Ayuda</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Cerrar Sesion
                            </NavDropdown.Item>
                        </NavDropdown>
                            ) : (
                                <Nav.Link href="/login"> Iniciar Sesion</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Offcanvas show={showCartMenu} onHide={( ) => setShowCartMenu(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="cart-items-container">
                        {cart.map((product) => (
                            <div key={product.id} className="cart-item">
                                <img
                                          src={`http://localhost:8080/${product.imagenUrl}`}
                                          alt="imagen-url"
                                          className="cart-item-img"
                                />
                                <div className="cart-items-details">
                                    <p>{product.nombre}</p>
                                    <p>Precio unitario: {" "}
                                    {new Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 0,
                                    }).format(product.precio)}
                                    </p>
                                    <div className="quantity-container">
                                        <Button variant="secondary" size="sm" onClick={()=> handleDecreaseQuantity(product.id)}>
                                            -
                                        </Button>
                                        <span className="quantity">{product.quantity}</span>
                                        <Button variant="secondary" size="sm" onClick={()=> handleIncreaseQuantity(product.id,product.stock)}>
                                            +
                                        </Button>
                                    </div>
                                    <p>Precio total: {" "}
                                    {new Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        minimumFractionDigits: 0,
                                    }).format(product.precio * product.quantity)}
                                    </p>
                                    <Button variant="danger" size="sm" onClick={()=> removeFromCart(product.id)}>
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="cart-total">
                        <hr/>
                        <p className="total-text">
                            <strong>Total: </strong>{" "}
                                {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                }).format(totalPrice)}
                        </p>
                        {totalItemsInCart > 0 && (
                            <Button className="bg-green text-white w-100 mt-3" onClick={handleCheckout}>
                                {user ? "Ir a pagar" : "Iniciar Sesion para continuar"}
                            </Button>
                        )}
                    </div>
                    <p>Aqui se mostraran los productos en el carrito de compras</p>
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    );
}

export default MyNavbar;