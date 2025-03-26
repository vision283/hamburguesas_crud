// variables glovales del formilario 
const d= document
let nameInput=d.querySelector("#productos-select")
let preceInput = d.querySelector("#precio-pro")
let stockInput =d.querySelector("#stock-pro")
let descripcionInput =d.querySelector("#des-pro")
let imagen =d.querySelector("#imagen-pro")
let btnCreate = d.querySelector(".btn-create")
let productUpdate
let nameUser = d.querySelector("#nombre-usuario")
let btnLogout = d.querySelector("#btnLogout")


// funcion para poner nombre 
let getUser = () => {
let user = JSON.parse(localStorage.getItem("userLogin"))
nameUser.textContent = user.nombre

}
// evento para el boton del  logaut
    btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin")
    location.href = "../login.html"
})


// agregar un evento al boton 

btnCreate.addEventListener("click", ()=>{
   // alert("producto : "+ nameInput.value)
   let dataProduc=  getDataProduct()
   sendDataproduct(dataProduc)
})
// evento  al navegador para comprobar si recargo la pagina 
d.addEventListener("DOMContentLoaded", ()=>{
  getUser()
    productUpdate =JSON.parse(localStorage.getItem
      ("productEdit"))
      if(productUpdate != null){
        updateDataProduct()  

      }
})

 // funcion para validar el formulario 
 // obtener los datos 
 let getDataProduct = () => {
    // validar formulario 
    let product ;
if (nameInput.value  && preceInput.value && 
    stockInput.value && descripcionInput.value 
    && imagen.src
){
    product = {
        nombre: nameInput.value,
        descripcion:descripcionInput.value,
        precio:preceInput.value,
        stock:stockInput.value,
        imagen:imagen.src
    }
    preceInput.value = "";
    descripcionInput.value = "";
    stockInput.value = "";
    imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
    console.log(product)
    
}else{
  alert("todos los campos son obloigatorios ")   
}

return product ; 
}

// funcion para resivir los datos y 
// realizar la peticion al servidor 

let sendDataproduct = async (data) => {
    let url = "http://localhost/backend-apiCrud/productos"
    try {
       let respuesta =  await fetch(url,{
           method:"post", 
           headers:{
            "content-type" : "application/json"
           },
           body: JSON.stringify(data) 
        
         }) 
         if (respuesta.status === 406) {
           alert(" los datos enviados no son admitidos ")
         }else{
           let mensaje  = await respuesta.json()
            alert(mensaje.message)
            location.href="../listado-pro.html"
         }
    } catch (error) {
       console.log(error)
    }
   
   }

   // funcion para editar el producto

   let updateDataProduct = () =>{
    // agregar datos y editar en los campos       delformulario 
        nameInput.value = productUpdate.nombre
        preceInput.value = productUpdate.precio
        stockInput.value = productUpdate.stock 
        descripcionInput.value = productUpdate.descripcion
        imagen.src = productUpdate.imagen
        let producto
        // alternar el boton de crear y ediatr 
        let btnEdit = d.querySelector(".btn-update")
        btnCreate.classList.toggle("d-none")
        btnEdit.classList.toggle("d-none")
        // agregar evento al boton editar 
        btnEdit.addEventListener("click", ()=>{
          
          producto = {
            id: productUpdate.id,
            nombre: nameInput.value,
            descripcion:descripcionInput.value,
            precio:preceInput.value,
            stock:stockInput.value,
            imagen:imagen.src
        }
        // borrar info de localstorge 
        localStorage.removeItem("productEdit")
        // pasar los datos del poducto a la funcion 
        sendUpdateProduct(producto)
        })
   }

   // funcion para crear la peticion al servidor 
   let sendUpdateProduct = async ( pro )=>{

      let url = "http://localhost/backend-apiCrud/productos"
      try {
         let respuesta =  await fetch(url,{
             method:"PUT", 
             headers:{
              "content-type" : "application/json"
             },
             body: JSON.stringify(pro) 
          
           }) 
           if (respuesta.status === 406) {
             alert(" los datos enviados no son admitidos ")
           }else{
             let mensaje  = await respuesta.json()
              alert(mensaje.message)
              location.href="../listado-pro.html"
           }
      } catch (error) {
         console.log(error)
      }
     

   }
  

