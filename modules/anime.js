export default class Anime{
/* LLamados a las API*/

    constructor(id, name, work, photo, email){
        this.id = id;
        this.name = name;
        this.work = work;
        this.photo = photo;
        this.email = email;
    }

    static async getGenres(){ 

        let list = [];        //creo un listado para exportar elementos

        const resp = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users');    //llamado 

        const data = (await resp.json()).data;                      
        data.forEach(element => {              //recorro los datos de cada elemeto y agrego a lista
            list.push(new Anime(element.id, element.firstName, element.jobTitle, element.photo, element.email));         //nombres api
        });
        return list;
    }
}