import Anime from "./anime.js";

export default class App{
    /* Modificar el DOM / escuchar eventos */

    constructor(){
        let item = document.getElementById('anime-form');
        item.addEventListener('submit', this.#onSubmit );

        item = document.getElementById('anime-id');
        item.addEventListener('submit', this.#onSubmit);
    }

    #onSubmit = async (ev) => {            
        ev.preventDefault();  // Evitar el comportamiento por defecto del form
        console.log("Vamos a consultar la lista completa");
        
        const list = await Anime.getGenres();  // Obtener la lista completa
        console.log(list);

        this.#printResult(JSON.stringify(list));  // Mostrar el resultado en la página
    }

    //Mostrar en la pagina lo que se esta mostrando en consola
    #printResult = (data) =>{
        const result = document.querySelector("#result")
        result.textContent = data;
    }
}