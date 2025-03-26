
// variables glovales de administrador 
const d = document
let nameUser = d.querySelector("#nombre-usuario")
let btnLogout = d.querySelector("#btnLogout")

d.addEventListener("DOMContentLoaded", ()=>{
    getUser()
})

// funcion para poner nombre 
let getUser = () => {
let user = JSON.parse(localStorage.getItem("userLogin"))
nameUser.textContent = user.nombre

}
// evento para el boton del  logaut
btnLogout.addEventListener("click", () =>{
    localStorage.removeItem("userLogin")
    location.href = "../login.html"
})