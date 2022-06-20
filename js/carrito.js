// traigo el localStorage al carrito

const carrito = JSON.parse(localStorage.getItem("carrito"));

// pinto los items a comprar

let tbody = document.querySelector("#tbody");

function pintarCarro(arrayCarrito){
    for(let producto of arrayCarrito){
        let tr = document.createElement("tr");
        tr.className = "shoppingCartItem";
        tr.innerHTML = `<td>${producto.imagen}</td><td>${producto.nombre}</td><td>US$ ${producto.precio}</td><td>${producto.cantidad}</td><td class="shoppingCartItemPrice">US$ ${producto.subtotal}</td><td><button id="${producto.id}" class="btn btn-danger eliminar">ELIMINAR</button></td>`;
        tbody.appendChild(tr);
    }
}

pintarCarro(carrito);

// boton eliminar producto

let botonEliminar = document.querySelectorAll(".eliminar");

botonEliminar.forEach(elemento => {
    elemento.addEventListener("click", eliminarProducto);
})

function eliminarProducto(event){
    let index = carrito.findIndex(producto => producto.id == event.target.id);
    carrito.splice(index,1);
    console.log(event.target.parentNode.parentNode);
    event.target.parentNode.parentNode.remove();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// mostrar total

function actualizarPrecio(){
    let total=0;
    const totalCarro = document.querySelector(".shoppingCartTotal");
    const itemCarro = document.querySelectorAll(".shoppingCartItem");

    itemCarro.forEach(shoppingCartItem =>{
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice");
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace(`US$`,``));
        total = total + shoppingCartItemPrice;
    })

    totalCarro.innerHTML = `US$ ${total}`
}

actualizarPrecio()

// boton comprar


function comprar(){
    const comprarButton = document.querySelector(`.comprarButton`)
    comprarButton.addEventListener("click", () => {
        Swal.fire({
            icon: 'success',
            title: 'Compra lista',
            text: 'Que disfrutes tus productos!',
        })
    })
}

comprar()



















