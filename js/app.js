
const itemCarrito=document.getElementById("contenedorCarrito")

const con = document.getElementById("contenedorPizza")

const formulario=document.getElementById("formulario")

const finalizarCompra= document.getElementById("enviarTotal")

let acarrito = JSON.parse(localStorage.getItem("contenedorCarrito")) || []

let fechProductos=[]
console.log(fechProductos)

const mostrarProducto = async()=> {
	
	const resp= await fetch("./js/productos.json")
	const productos = await resp.json()
	fechProductos = productos
	contenedorPizza.innerHTML="";
	
productos.forEach((pizza,) =>{
    const conteiner = document.createElement(`div`)
	conteiner.classList.add("principal")
   conteiner.innerHTML =
     `
	 <div class="card" style="width: 18rem;">
    <h5 class="tipotext1">${pizza.tipo}</h5>
    <img src="${pizza.Imagen}" class="img1">
    <p class="ingrediente1">${pizza.ingredientes}</p>
    <p class="precio1"><small class="text-muted">$${pizza.precio}</small></p>
    <button id="${pizza.id}" type="button" class="botonagregar" data-bs-toggle="button" autocomplete="off">Agregar a Carrito</button>
	</div>
	`
	
    contenedorPizza.appendChild(conteiner);

    const botonPizza= document.getElementById(`${pizza.id}`)
    botonPizza.addEventListener(`click`, ()=>{
         agregarACarrito(productos,pizza.id)
		 
} )
 })
 
}

const agregarACarrito= (pizzas,id)=> {
	const pizza = pizzas.find((pizza)=>pizza.id===id)
	const productoEnCarrito= acarrito.find((pizza)=> pizza.id===id);
 if (productoEnCarrito){
	productoEnCarrito.cantidad++;
	localStorage.setItem("contenedorCarrito", JSON.stringify(acarrito))
	mostrarCarrito()
 }else {pizza.cantidad=1
	acarrito.push(pizza)
	localStorage.setItem("contenedorCarrito", JSON.stringify(acarrito))
mostrarCarrito()
 }
}

  const mostrarCarrito = ()=>{
	  itemCarrito.id ="contenedorCarrito"
	  itemCarrito.innerHTML= ""
	 acarrito.forEach((pizza)=>{
	 const mostrarCarrito= document.createElement("ul")
	 mostrarCarrito.classList.add("cssproductos")
	 mostrarCarrito.innerHTML=
	 `
	 <h5 class="tipotext2">${pizza.tipo}</h5>
	 <img src="${pizza.Imagen}" class="img2" alt="card-img-top">
	<p class="ingrediente2">${pizza.ingredientes}</p>
	<p class="precio2"><small class="text-muted">$${pizza.precio * pizza.cantidad}</small></p>
	<p class="cantidad1"><small class="text-muted">Total-${pizza.cantidad}</small></p>
	 <button id="eliminar${pizza.id}" type="button" class="eliminarelemento" data-bs-toggle="button" autocomplete="off">Eliminar Producto</button>
     </div>
	 `

	 itemCarrito.appendChild(mostrarCarrito)

	 const boton = document.getElementById(`eliminar${pizza.id}`);
	 boton.addEventListener("click", ()=>{
		eliminarPizza(pizza.id)

	 })

	 })
 }

 const eliminarPizza = (id) =>{
	    acarrito=acarrito.filter((pizza) =>pizza.id !==id)
     localStorage.setItem("carrito", JSON.stringify(acarrito));
	    mostrarCarrito();
	 }

  const finalizar = ()=>{
	const itemCarrito=document.getElementById("contenedorCarrito")
	itemCarrito.innerHTML="";
	const limpiar= document.getElementById("enviarTotal");
	limpiar.addEventListener("click", ()=>{
        itemCarrito.innerHTML="";
		acarrito.splice(0, acarrito.length)
		finalizar()
	})
  }

const filtrado= (fechProductos) => {
	const itemEconomicas=document.getElementById("economicas")
	itemEconomicas=fechProductos.filter((pizza)=>pizza.precio < 2000);
	
	filtrado()
	
	// const itemVeganas=document.getElementById("veganas")
// 	 if(itemEconomicas){
// 		itemEconomicas.addEventListener("click"), ()=>{
// 		pizzas.filter((p)=>p.precio < 1350);
// 		   filtrado()


// 		}
// //    const veganas = id.filter((i)=> i.id >= 5)
 } 


 const inputName=document.getElementById("inputName")

 const direccion=document.getElementById("idDireccion")

const btn =document.getElementById("btn")

 formulario.addEventListener("submit", validacionformulario)

 function validacionformulario(e){
	 e.preventDefault()

 console.log(`Estos son tu datos: ${inputName.value}, Direccion a enviar${direccion.value}`)

 }

 btn.addEventListener("click", ()=> {
	Swal.fire({
		title: 'Quiere jugardar sus datos',
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: 'Guardar',
		denyButtonText: `Eliminar`,
	  }).then((result) => {

		if (result.isConfirmed) {
		  Swal.fire(`Estos son tus datos:${inputName.value} ${direccion.value}`, '', 'success')
		} else if (result.isDenied) {
		  Swal.fire('Los datos no fueron guardados', '', 'info')
		}
	  })
	  })

mostrarProducto()
mostrarCarrito()
finalizar()




