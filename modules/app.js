import Anime from "./anime.js";

export default class App {
    constructor() {
        let item = document.getElementById('anime-form');
        item.addEventListener('submit', this.onSubmit);
        const addButton = document.getElementById('add-person-btn');
        addButton.addEventListener('click', this.toggleAddPersonForm);
        const newPersonForm = document.getElementById('new-person-form');
        newPersonForm.addEventListener('submit', this.addPerson);
    }

    onSubmit = async (ev) => {
        ev.preventDefault();
        console.log("Vamos a consultar la lista completa");

        const list = await Anime.getGenres();
        console.log(list);
        this.printResult(list);

        document.getElementById('add-person-btn').style.display = 'block'; 
    }

    toggleAddPersonForm = () => {
        const form = document.getElementById('add-person-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none'; 
    }

    addPerson = (ev) => {
        ev.preventDefault();
        const name = document.getElementById('name').value;
        const id = document.getElementById('id').value;
        const email = document.getElementById('email').value;
        const work = document.getElementById('work').value;
        const photo = document.getElementById('photo').value;

        const newUser = new Anime(id, name, work, photo, email);
        this.printResult([newUser], true); 

        document.getElementById('new-person-form').reset(); 
        this.toggleAddPersonForm(); 
    }

    printResult = (list, isNewUser = false) => {
        const result = document.querySelector("#result");
        if (!isNewUser) {
            result.innerHTML = ''; 
        }

        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        list.forEach((user) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-card';

            const name = document.createElement('h2');
            name.textContent = user.name;
            userDiv.appendChild(name);

            const photo = document.createElement('img');
            photo.src = user.photo;
            photo.alt = `${user.name}'s photo`;
            userDiv.appendChild(photo);

            const details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = `
                <strong>ID:</strong> ${user.id} <br>
                <strong>Email:</strong> ${user.email} <br>
                <strong>Work:</strong> ${user.work}
            `;
            userDiv.appendChild(details);

            gridContainer.appendChild(userDiv);
        });

        result.appendChild(gridContainer);
    }
}