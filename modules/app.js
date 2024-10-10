import Anime from "./anime.js";

export default class App {
    /* Modificar el DOM / escuchar eventos */

    constructor() {
        let item = document.getElementById('anime-form');
        item.addEventListener('submit', this.onSubmit.bind(this));  // Listener para el formulario de consulta
    }

    // Método para manejar el submit y traer la lista
    async onSubmit(ev) {            
        ev.preventDefault();  // Evitar el comportamiento por defecto del form
        console.log("Vamos a consultar la lista completa");
        
        const list = await Anime.getGenres();  // Obtener la lista completa
        console.log(list);

        this.printResult(JSON.stringify(list, null, 2));  // Mostrar el resultado en la página, formateado para mejor visualización
    }

    // Mostrar el resultado en la página en el <pre><code> del HTML
    printResult(data) {
        const result = document.querySelector("#result");
        result.textContent = data;
    }
}