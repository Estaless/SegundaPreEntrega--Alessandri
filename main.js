const carrito = [];

const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return "- "+producto.nombre+" $"+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'));
    comprarProductos(listaOrdenada);

};

/*listaOrdenada es igual a listaDeProductos*/ 

const comprarProductos = (listaDeProductos) => {
    let seguirComprando;
    let productoNombre = "";
    let productoCantidad = 0;

    do {
        productoNombre = prompt('¿Que quiere comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos quiere comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase()); 
                                                                                                                    /*toLowerCase no importa si escribe en mayuscula o minuscula*/

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad);
        } else {
            alert('El producto no se encuentra en Stock');
        }

        seguirComprando = confirm('¿Quiere agregar otro producto?')
    } while (seguirComprando);

    confirmarCompra();

}

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad;
        carrito.push(producto)
    }
    
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar precione "Aceptar" sino "Cancelar" para eliminar productos del carrito.'
    );

    if (confirmar) {
        finalizarCompra(listaProductos);
    } else {
        const productoAEliminar = prompt('¿quiere eliminar un producto?');
        eliminarProductoCarrito(productoAEliminar);
    }

};
                                                                                                        /*(index, 1) = indice del elemento, cantidad de elemenos a eliminar*/
const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre) {                                                                                             /*productorNombre = productoAEliminar*/

            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const realizarCompra = () => {
    const productosBaratos = confirm('Bienvenido a su compra, ¿Quiere ordenar productos de menor precio a mayor?');
    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

realizarCompra()
