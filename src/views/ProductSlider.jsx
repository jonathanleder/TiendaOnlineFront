import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card} from "react-bootstrap";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import {Button} from "react-bootstrap";
import "../stylesheets/ProductSlider.css";




const ProductSlider = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products/")
            .then((res)=>{
                setProducts(res.data);
            })
            .catch((err)=>{
                console.log("Error al obtener productos ",err);
            });
    },[]);

    const slideLeft= () =>{
        const slider = document.getElementsById("product-slider");
        slider.scrollLeft = slider.scrollLeft-300;
    }
    const slideRight= () =>{
        const slider = document.getElementsById("product-slider");
        slider.scrollLeft = slider.scrollLeft+300;
    }
    return (
        <div className="product-slider-container">
            {/* Botón de navegación izquierda */}
            <MdChevronLeft
                size={40}
                className="slider-icon left"
                onClick={slideLeft}
            />

            {/* Contenedor del slider */}
            <div id="product-slider" className="product-slider">
                {/* Muestra un mensaje de carga si no hay productos */}
                {products.length === 0 ? (
                    <p>Cargando productos...</p>
                ) : (
                    // Mapea los productos y crea una tarjeta para cada uno
                    products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <Card style={{ width: "18rem" }}>
                                {/* Imagen del producto, asegurando la ruta correcta */}
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8080/${product.imagenUrl}`}
                                />

                                <Card.Body>
                                    <Card.Title>{product.nombre}</Card.Title>{" "}
                                    {/* Nombre del producto */}
                                    <Card.Text>
                                        <strong>Precio:</strong>{" "}
                                        {new Intl.NumberFormat("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0,
                                        }).format(product.precio)}
                                    </Card.Text>
                                    {/* Precio del producto */}
                                    {/*  Redirige al detalle del producto */}
                                    <Button variant="primary" >Ver Producto</Button>{" "}
                                    {/*onClick={()=> navigate(`/producto/${product.id}`)})*/}
                                    {/* Botón para ver más detalles */}
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                )}
            </div>

            {/* Botón de navegación derecha */}
            <MdChevronRight
                size={40}
                className="slider-icon right"
                onClick={slideRight}
            />
        </div>
    );
}

export default ProductSlider;