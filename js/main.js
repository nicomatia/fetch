/*
Carro de compras
*/

Swal.fire({
    title: 'Tienda de Arsenal Hispano',
    text: 'Sean bienvenidos!',
    imageUrl: '../img/imgShop.webp',
    width: "90%",
    imageWidth: "90%",
    imageHeight: "auto",
    imageAlt: 'Custom image',
    })

let carrito = [];

class productoCarrito{
    constructor(nombre,precio,imagen,id,subtotal){
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
        this.cantidad=1;
        this.id=id;
        this.subtotal=precio;
    }
}

// pinto la pagina con los productos del array [productos]

const fetchData = fetch(`../productos.json`)
                    .then((response) => response.json())
                    .then((json) => pintarPagina(json))

function pintarPagina(data){
    let divContainer = document.getElementById("row"); 
    data.forEach(producto => {
        let div = document.createElement("div");
            div.classList = "col-4 mt-3";
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.id}">
                <div class="card-body">
                    <h5 class="card-body">${producto.nombre}</h5>
                    <p><strong>US$</strong></p>
                    <p class="card-text"><strong>${producto.precio}</strong></p>
                    <button class="btn btn-primary anadirCarrito">Añadir al carro</button>
                </div>
            </div>`
            divContainer.appendChild(div);
            crearBotones()
    })
}

// function pintarPagina (data){
//     let divContainer = document.getElementById("row"); 
//     for (let producto of data){
//             let div = document.createElement("div");
//             div.classList = "col-4 mt-3";
//             div.innerHTML = `
//             <div class="card" style="width: 18rem;">
//                 <img src="${producto.imagen}" class="card-img-top" alt="${producto.id}">
//                 <div class="card-body">
//                     <h5 class="card-body">${producto.nombre}</h5>
//                     <p><strong>US$</strong></p>
//                     <p class="card-text"><strong>${producto.precio}</strong></p>
//                     <button class="btn btn-primary anadirCarrito">Añadir al carro</button>
//                 </div>
//             </div>`
//             divContainer.appendChild(div);
//         }
//     }

// pintarPagina();

// agrego eventos de agregar a carrito a boton de compra

function crearBotones(){
    let anadirCarrito = document.querySelectorAll(".anadirCarrito");
    let itemContainer = document.querySelector(".shoppingCartItemsContainer");
    
    anadirCarrito.forEach((enviarCarro) => {
        enviarCarro.addEventListener("click", enviarCarroClick);
    })
}


// agrego a carrito via localStorage

function enviarCarroClick(event){

    // libreria
    Toastify({
        text: "Agregado correctamente",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "repeating-linear-gradient(135deg, rgba(24,24,24, 0.07) 0px, rgba(24,24,24, 0.07) 2px,transparent 2px, transparent 4px),repeating-linear-gradient(45deg, rgba(24,24,24, 0.07) 0px, rgba(24,24,24, 0.07) 2px,transparent 2px, transparent 4px),linear-gradient(0deg, rgb(170, 42, 46),rgba(178, 16, 30, 0.650))",
        offset: {
            x: "150px",
            y: "150px",
        }
        }
    }).showToast()

    let recuperarCarrito = JSON.parse(localStorage.getItem("carrito")); 

    if(recuperarCarrito){
        carrito = recuperarCarrito;
    }

    let index = carrito.findIndex(producto => producto.id == event.target.parentNode.parentNode.children[0].alt)
    console.log(index)
    console.log(carrito)

    let nombre = event.target.parentNode.children[0].textContent;
    let precio = event.target.parentNode.children[2].textContent;
    let imagen = event.target.parentNode.parentNode.children[0].src;
    let id = event.target.parentNode.parentNode.children[0].alt;

    if(index == -1){
        const producto = new productoCarrito(nombre,precio,imagen,id);
        carrito.push(producto);
    }else{
        carrito[index].cantidad++;
        carrito[index].subtotal=carrito[index].precio*carrito[index].cantidad;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}













