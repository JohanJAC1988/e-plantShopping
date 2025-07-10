import React, { useState, useEffect } from 'react';
// ¡Importa useDispatch Y useSelector aquí!
import { useDispatch, useSelector } from 'react-redux'; 
import { addItem } from '../features/cart/cartSlice'; // Importa la acción addItem desde tu slice de carrito

import './ProductList.css'; // Asegúrate de que este archivo CSS exista
import CartItem from './CartItem'; // Tu componente de carrito, si lo gestionas con showCart/showPlants

function ProductList({ onHomeClick }) {
    // Estados para controlar la visibilidad de las páginas, según tu código original
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true); // Controla la visibilidad de la lista de productos

    // --- Solución de muestra para el hook useState ---
    // Variable para la gestión del estado que rastrea qué productos se han añadido al carrito
    // Usaremos product.id como clave en lugar de product.name para mayor robustez
    const [addedToCart, setAddedToCart] = useState({});

    // Hook useDispatch de React-Redux para despachar acciones
    const dispatch = useDispatch();

    // **¡NUEVA LÍNEA AQUÍ!** Accede al totalItems del carrito desde Redux
    const totalItemsInCart = useSelector((state) => state.cart.totalItems);


    // Tu arreglo de plantas, anidado por categorías
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { id: 1, name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { id: 2, name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { id: 3, name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { id: 4, name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { id: 5, name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { id: 6, name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { id: 7, name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { id: 8, name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { id: 9, name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
                { id: 10, name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
                { id: 11, name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
                { id: 12, name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Hyacinth is a beautiful flowering plant known for its fragrant.", cost: "$22" }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { id: 13, name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", description: "The oregano plants contains compounds that can deter certain insects.", cost: "$10" },
                { id: 14, name: "Marigold", image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", description: "Natural insect repellent, also adds color to the garden.", cost: "$8" },
                { id: 15, name: "Geraniums", image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", description: "Known for their insect-repelling properties while adding a pleasant scent.", cost: "$20" },
                { id: 16, name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Repels flies and mosquitoes, also used in cooking.", cost: "$9" },
                { id: 17, name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { id: 18, name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Repels mosquitoes and attracts cats.", cost: "$13" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { id: 19, name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Soothing gel used for skin ailments.", cost: "$14" },
                { id: 20, name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system, helps fight colds.", cost: "$16" },
                { id: 21, name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues and headaches.", cost: "$13" },
                { id: 22, name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Calms nerves and promotes relaxation.", cost: "$14" },
                { id: 23, name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Soothes anxiety and promotes sleep.", cost: "$15" },
                { id: 24, name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Heals wounds and soothes skin irritations.", cost: "$12" }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { id: 25, name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Thrives in low light and requires minimal watering.", cost: "$25" },
                { id: 26, name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect and can grow in various conditions.", cost: "$10" },
                { id: 27, name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Needs infrequent watering and is resilient to most pests.", cost: "$15" },
                { id: 28, name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", description: "Hardy plant that tolerates low light and neglect.", cost: "$20" },
                { id: 29, name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant plants with unique shapes and colors.", cost: "$18" },
                { id: 30, name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Requires minimal care and adds color to indoor spaces.", cost: "$22" }
            ]
        }
    ];

    // Estilos internos (puedes moverlos a ProductList.css si lo prefieres)
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    // Funciones de manejo de clics para navegación
    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Muestra el carrito
        setShowPlants(false); // Oculta la lista de plantas
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Muestra la lista de plantas
        setShowCart(false); // Oculta el carrito
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false); // Oculta el carrito
        setShowPlants(true); // Muestra la lista de plantas
    };

    // --- Funcionalidad de Añadir al Carrito (Solución de muestra) ---
    const handleAddToCart = (product) => {
        // Primero, limpia el costo eliminando el "$" y convirtiéndolo a número
        const numericCost = parseFloat(product.cost.replace('$', ''));
        // Crea un nuevo objeto de producto con el costo numérico, para evitar mutar el original
        const productToSend = { ...product, cost: numericCost };

        // Despacha la acción `addItem` a tu store de Redux
        dispatch(addItem(productToSend));

        // Actualiza el estado local `addedToCart` para reflejar que el producto fue añadido
        // Usa `product.id` como clave para una identificación única del producto
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.id]: true, // Marca este ID de producto como "añadido"
        }));

        console.log(`¡"${product.name}" añadido al carrito!`); // Mensaje de confirmación en consola
    };


    return (
        <div>
            {/* Encabezado / Barra de navegación */}
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div>
                        {/* Icono del carrito. El contador de artículos se agregará más adelante. */}
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                                </svg>
                                {/* Aquí puedes agregar el contador de artículos del carrito */}
                                {/* <span className="cart-item-count">{totalItemsInCart}</span> */}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Contenido principal: Lista de Productos o Carrito */}
            {/* Mostrar la lista de productos si showCart es false y showPlants es true */}
            {!showCart && showPlants ? (
                <div className="product-grid-container"> {/* Contenedor principal según tu muestra */}
                    {/* --- Solución para mostrar plantas y botón de agregar al carrito --- */}
                    {plantsArray.map((category, index) => ( // Loop a través de cada categoría en plantsArray
                        <div key={index} className="plant-category-section"> {/* Contenedor para cada sección de categoría */}
                            <h1>
                                <div>{category.category}</div> {/* Muestra el nombre de la categoría */}
                            </h1>
                            <div className="product-list"> {/* Contenedor para la lista de tarjetas de plantas dentro de la categoría */}
                                {category.plants.map((plant) => ( // Loop a través de cada planta en la categoría actual
                                    // Asegurarse de que cada planta tenga un 'id' único para la key.
                                    // Asumiendo que has añadido 'id' a tus objetos de planta como en mi ejemplo anterior.
                                    <div className="product-card" key={plant.id}> {/* Clave única para cada tarjeta de planta */}
                                        <img
                                            className="product-image"
                                            src={plant.image} // Muestra la imagen de la planta
                                            alt={plant.name} // Texto alternativo para accesibilidad
                                        />
                                        <div className="product-title">{plant.name}</div> {/* Muestra el nombre de la planta */}
                                        <div className="product-description">{plant.description}</div> {/* Muestra la descripción de la planta */}
                                        <div className="product-cost">{plant.cost}</div> {/* Muestra el costo de la planta como string */}
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)} // Llama a la función para agregar al carrito
                                        >
                                            {/* Cambia el texto del botón si el producto ya fue añadido */}
                                            {addedToCart[plant.id] ? 'Añadido' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Mostrar el componente CartItem cuando showCart es true
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
