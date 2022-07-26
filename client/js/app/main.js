import { currentInstance } from "./controllers/NegociaçãoController.js";
    
const a = new currentInstance()

document.querySelector('.form').onsubmit = a.adicionar.bind(a)
document.querySelector('#btn-apagar').onclick = a.apagar.bind(a)
