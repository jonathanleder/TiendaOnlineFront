import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Offcanvas} from 'react-bootstrap';
import {useAuth} from '../Components/AuthContext.jsx';
import {FaShoppingBag} from 'react-icons/fa';
import logo from '../assets/images/logo.jpg';


function MyNavbar() {

    const{user,logout} = useAuth();//extraemos de la funcion useAuth el usuario y si esta logueado o no
    const [searchterm,setSearchTerm] = useState('');

    const[showCartMenu,setShowCartMenu] = useState(false);
    const handleCartClick = () => {
        setShowCartMenu(!showCartMenu);
    }

    const handleSearch= (event) => {
        event.preventDefault();
        if(searchterm.trim()){ /* empty */ }
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
                        </Nav.Link>

                        {user ? (


                        <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>

                            <NavDropdown.Item href="/ayuda">Ayuda</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
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
                    <p>Aqui se mostraran los productos en el carrito de compras</p>
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    );
}

export default MyNavbar;