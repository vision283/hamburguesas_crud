// variables glovales formularui login 
const d = document
userInput = d.querySelector("#usuarioForm")
passInput = d.querySelector("#contraForm")
btnLogin = d.querySelector(".btnLogin")

/////evento al boton del formulario 
 btnLogin.addEventListener("click", ()=>{
  //  alert( " escribio " + userInput.value);
    let dataForm = getData()
    sendData(dataForm)
 } )

 // funcion para validar formulario y obtener datos formulario 

let getData = () => {
    // validar formulario 
    let user ;
if (userInput.value  && passInput.value){
    user = {
        usuario: userInput.value,
        contrasena: passInput.value
    }
    userInput.value = "";
    passInput.value = "";
    
}else{
  alert(" el usuario y la contraseña son obligatorios ¡¡¡")   
}
console.log(user)
return user ; 
}


// funcion para resivir los datos y 
// realizar la peticion al servidor 

let sendData = async (data) => {
 let url = "http://localhost/backend-apiCrud/login"
 try {
    let respuesta =  await fetch(url,{
        method:"post", 
        headers:{
         "content-type" : "application/json"
        },
        body: JSON.stringify(data) 
     
      }) 
      if (respuesta.status === 401) {
        alert(" el usuario  y/o  la contraseña incorrecto")
      }else{
        let userLogin  = await respuesta.json()
        alert(`bienvenido : ${userLogin.nombre}`)
        // guardar datos en localstoragwe 
        localStorage.setItem("userLogin", JSON.stringify(userLogin))
        location.href = "../index.html"
      }
 } catch (error) {
    console.log(error)
 }

}




