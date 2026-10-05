const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

/**
 * mostrar un modal con el datalle del producto
 * @method mostrarmodal
 * @param {number} num - id del elemnto que se desea visualizar el modal
 */
mostrarmodal = (num) => {
  document.getElementById("nombreproducto").innerText = productos[num].nombre;
  document.getElementById("descripcionproducto").innerText = productos[num].description;
  document.getElementById("modal").style.display = 'block';
}

/**
 * cerrar un modal con el datalle del producto
 * @method cerrarmodal
 */
cerrarmodal = () => {
  document.getElementById("modal").style.display = 'none';
}

/**
 * dar formato a un precio, ej: $3.123,45
 * @method formatearprecio
 * @param {number} precio - precio sin formato
 * @returns {string} precio con formato
 */
formatearprecio = (precio) =>{
  let formato = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return "$" + formato.format(precio);
}

/**
 * mostrar la cantidad de productos del carrito al lado del boton de carrito
 * @method actualizarcontador
 */
actualizarcontador = () =>{
  let carritolist = localStorage.getItem("carrito");

  if(carritolist==null){
    carritolist=[];
  }else{
    carritolist = JSON.parse(carritolist);
  }
  document.getElementById("contador").innerText = carritolist.length;
}

/**
 * mostrar catalogo
 * @method mostrarcatalogo
 */
mostrarcatalogo = () =>{
  // si no existe el div catalogo estamos en carrito.html
  if(document.getElementById("catalogo") == null){
    mostrarcarrito();
    return;
  }

  let contenido = "";
  let lista = filtrarproductos();

  lista.forEach((producto) => {
    let id = productos.indexOf(producto);
    contenido += `<div>
                    <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${formatearprecio(producto.precio)}</p>
                    <button type="button" onclick="mostrarmodal(${id})">ver detalle de producto</button>
                    <button type="button" onclick="agregaralcarrito(${id})">Agregar al carrito</button>
                </div>`;
  });
  document.getElementById("catalogo").innerHTML = contenido;
  actualizarcontador();
}

agregaralcarrito = (num) =>{
  let carritolist = localStorage.getItem("carrito");
  console.log(carritolist);

  if(carritolist==[] || carritolist==null){
    carritolist=[];
  }else{
    carritolist = JSON.parse(carritolist);
  }
    carritolist.push(num);
    console.log(carritolist);
  localStorage.setItem("carrito", JSON.stringify(carritolist));
  actualizarcontador();
}

mostrarcarrito = () =>{
  let carritolist = localStorage.getItem("carrito");
  let contenido = "";
  let total = 0;
  let cantidades = {};

  if(carritolist==null){
    carritolist=[];
  }else{
    carritolist = JSON.parse(carritolist);
  }

  if(carritolist.length==0){
    contenido = "<div>Su carrito está vacio.</div>";
  }else{
    carritolist.forEach((num) =>{
      if(cantidades[num] == undefined){
        cantidades[num] = 0;
      }
      cantidades[num] += 1;
      total += productos[num].precio;
    });

    productos.forEach((producto, id) =>{
      if(cantidades[id] != undefined){
        contenido += `<div>
                        <h3>${producto.nombre}</h3>
                        <p>${formatearprecio(producto.precio)}</p>
                        <p>Cantidad: ${cantidades[id]}</p>
                        <button type="button" onclick="eliminarproducto(${id})">Eliminar</button>
                      </div>`;
      }
    });
  }

  document.getElementById("carrito").innerHTML = contenido;
  document.getElementById("total").innerText = formatearprecio(total);
  actualizarcontador();
}

/**
 * eliminar una unidad de un producto del carrito
 * @method eliminarproducto
 * @param {number} id - id del producto en el array productos
 */
eliminarproducto = (id) =>{
  let carritolist = JSON.parse(localStorage.getItem("carrito"));
  let posicion = carritolist.indexOf(id);
  carritolist.splice(posicion, 1);
  localStorage.setItem("carrito", JSON.stringify(carritolist));
  mostrarcarrito();
}

/**
 * vaciar el carrito
 * @method vaciarcarrito
 */
vaciarcarrito = () =>{
  localStorage.removeItem("carrito");
  mostrarcarrito();
}

/**
 * filtrar los productos segun busqueda, precios, marca y tipos
 * @method filtrarproductos
 * @returns {array} productos que cumplen con los filtros
 */
filtrarproductos = () =>{
  let texto = document.getElementById("search").value.toLowerCase();
  let minimo = document.getElementById("minimo").value;
  let maximo = document.getElementById("maximo").value;
  let marca = document.getElementById("marca").value;

  let tipos = [];
  document.getElementsByName("tipo").forEach((check) =>{
    if(check.checked){
      tipos.push(check.value);
    }
  });

  let resultado = productos.filter((producto) =>{
    let cumple = true;

    if(!producto.nombre.toLowerCase().includes(texto) && !producto.description.toLowerCase().includes(texto)){
      cumple = false;
    }
    if(minimo !== "" && producto.precio < Number(minimo)){
      cumple = false;
    }
    if(maximo !== "" && producto.precio > Number(maximo)){
      cumple = false;
    }
    if(marca !== "" && producto.marca !== marca){
      cumple = false;
    }
    if(tipos.length > 0 && !tipos.includes(producto.categoria.toLowerCase())){
      cumple = false;
    }
    return cumple;
  });

    let orden = document.getElementById("orden").value;

  if(orden === "menor"){
    resultado.sort((a, b) => a.precio - b.precio);
  }else if(orden === "mayor"){
    resultado.sort((a, b) => b.precio - a.precio);
  }else if(orden === "nombreaz"){
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }else if(orden === "nombreza"){
    resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }

  return resultado;
}

