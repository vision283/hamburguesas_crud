
//variables glovales 
const d = document
let tablepro = d.querySelector("#table-pro tbody")
let  buscador = d.querySelector("#buscar-imput")
let nameUser = d.querySelector("#nombre-usuario")
let btnLogout = d.querySelector("#btnLogout")


// funcion para poner nombre 
let  getUser =() => {
let user = JSON.parse(localStorage.getItem("userLogin"))
nameUser.textContent = user.nombre

}
// evento para el boton del  logaut
    btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin")
    location.href = "../login.html"
})
// evento para probar el campo de buscar
buscador.addEventListener("keyup",()=>{
//console.log(buscador.value)
serchProductTble()

})
// evento para el navegador 
d.addEventListener("DOMContentLoaded",()=>{
    getTableData()
    getUser()
} )




// funcion para traer los datos de la bd a la tabla 
let getTableData = async () =>{
    let url = "http://localhost/backend-apiCrud/productos"
    try {
        let respuesta =  await fetch(url,{
            method:"GET", 
            headers:{
             "content-type" : "application/json"
            },
          }) 
          if (respuesta.status === 204) {
           console.log(" no hay datos en la BD") 
          }else{
            let tableData  = await respuesta.json()
        console.log(tableData)
        // agregar datos de la tabla  a localstorage
        localStorage.setItem("datosTabla", JSON.stringify(tableData))
            

        // agregar los datos a la tabla 
        

        tableData.forEach((dato, i) => {
          let row = d.createElement("tr")
          row.innerHTML = `
          <td> ${i+1} </td>
           <td> ${dato.nombre} </td>
            <td> ${dato.descripcion} </td>
             <td> ${dato.precio } </td>
              <td> ${dato.stock} </td>
               <td> <img src="${dato.imagen}" width="100px"> </td>
                 <td> 
                   <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5      15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0  0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                   
                   </button>
                   <br><br>
                    ${ nameUser.textContent == "vendedor" ? "" :

                  ` <button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                  </svg>
                   
                   </button>`}
                  </td>
          
          `
          tablepro.appendChild(row)

        });

          }
     } catch (error) {
        console.log(error)
     }
     
}
 // funcion para editar produtos de la tabla
    let editDataTable =( pos ) =>{
    let products =[]
    let productSave = JSON.parse(localStorage.getItem("datosTabla"))
    if (productSave  != null){
    products = productSave 

    }
    let singleProduct = products[pos]
//console.log(products)
localStorage.setItem("productEdit",JSON.stringify(singleProduct))
localStorage.removeItem("datosTabla")
location.href ="../crear-pro.html"
   
}
// funcion para eliminar produtos de la tabla
  let deleteDataTable =( pos )=>{
  let products =[]
  let productSave = JSON.parse(localStorage.getItem("datosTabla"))
  if (productSave  != null){
  products = productSave 

  }
  let singleProduct = products[pos]
  //console.log("producto a eliminar "+ singleProduct.nombre)
  let iDproduct = {
    id:singleProduct.id
  }
  let confirmar = confirm(`¿deseas eliminar el producto :${singleProduct.nombre}?`)
  if(confirmar){
    // llamar a la funcion para realizar la peticion 
    senDeleteproduct( iDproduct )

  }
}
// funcuion para realizar la peticion de eliminar productos 
let senDeleteproduct = async ( id ) =>{
  let url = "http://localhost/backend-apiCrud/productos"
  try {
     let respuesta =  await fetch(url,{
         method:"DELETE", 
         headers:{
          "content-type" : "application/json"
         },
         body: JSON.stringify(id) 
      
       }) 
       if (respuesta.status === 406) {
         alert(" el ID enviado no fue admitido  ")
       }else{
         let mensaje  = await respuesta.json()
          alert(mensaje.message)
          location.reload()
       }
  } catch (error) {
     console.log(error)
  }
 

}
// funcion para quitar productos de la tabla 
let clearDataTable = () => {
  let rowTable =d.querySelectorAll("#table-pro tbody tr")
 // console.log(rowTable)
 rowTable.forEach((row)=>{
    row.remove()
 })
}
 // funcion para buscar un producto de la tabla 
 let serchProductTble = ()=>{
  let products =[]
  let productSave = JSON.parse(localStorage.getItem("datosTabla"))
  if (productSave  != null){
  products = productSave 

  }
  //console.log(products)

  // obtener lo escrito en el campo de texto
  let texSchears = buscador.value.toLowerCase()

  clearDataTable()
 // console.log(texSchears)
  let i = 0
   for (let pro of products) {
    // comprobar coincidencia del producto 
    if ( pro.nombre.toLowerCase().indexOf(texSchears) != -1 ){
         // console.log("enconte algo ")
         let row = d.createElement("tr")
         row.innerHTML = `
         <td> ${i++} </td>
          <td> ${pro.nombre} </td>
           <td> ${pro.descripcion} </td>
            <td> ${pro.precio } </td>
             <td> ${pro.stock} </td>
              <td> <img src="${pro.imagen}" width="100px"> </td>
                <td> 
                  <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5      15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0  0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                   </svg>
                  
                  </button>
                  <br><br>
                   ${ nameUser.textContent == "vendedor" ? "" :

                 ` <button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                 <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                 </svg>
                  
                  </button>`}
                 </td>
         
         `
         tablepro.appendChild(row)


    }
    }

   }


