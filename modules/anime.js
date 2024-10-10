export default class Anime {
    /* Llamados a la API */

    constructor(id, name, work, photo, email) {
        this.id = id;
        this.name = name;
        this.work = work;
        this.photo = photo;
        this.email = email;
    }

    static async getGenres() { 
        let list = [];  // Crear un listado para exportar elementos

        try {
            const resp = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users');  

            if (!resp.ok) {  
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();  

            data.forEach(element => {
                list.push(new Anime(element.id, element.firstName, element.jobTitle, element.photo, element.email));  // Nombres API
            });

        } catch (error) {
            console.error("Hubo un error al obtener los datos:", error);
        }

        return list;
    }
}