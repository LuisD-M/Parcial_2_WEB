import Anime from "./anime.js";

export default class App {
    constructor() {
        let item = document.getElementById('anime-form');
        item.addEventListener('submit', this.onSubmit);
        const addButton = document.getElementById('add-person-btn');
        addButton.addEventListener('click', this.toggleAddPersonForm);
        const newPersonForm = document.getElementById('new-person-form');
        newPersonForm.addEventListener('submit', this.addPerson);

        const modifyButton = document.getElementById('modify-person-btn');
        modifyButton.addEventListener('click', this.toggleModifyPersonForm);
        const modifyPersonForm = document.getElementById('modify-person-form');
        modifyPersonForm.addEventListener('submit', this.modifyPerson);
    }

    onSubmit = async (ev) => {
        ev.preventDefault();
        const list = await Anime.getGenres();
        this.printResult(list);
        document.getElementById('add-person-btn').style.display = 'block'; 
        document.getElementById('modify-person-btn').style.display = 'block'; 
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

    toggleModifyPersonForm = () => {
        const form = document.getElementById('modify-person-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none'; 
    }

    modifyPerson = (ev) => {
        ev.preventDefault();
        const name = document.getElementById('modify-name').value;
        const parameter = document.getElementById('modify-parameter').value;
        const newValue = document.getElementById('new-value').value;

        const users = document.querySelectorAll('.user-card');
        users.forEach((userDiv) => {
            const userName = userDiv.querySelector('h2').textContent;
            if (userName === name) {
                if (parameter === "name") {
                    userDiv.querySelector('h2').textContent = newValue;
                } else if (parameter === "id") {
                    userDiv.querySelector('.details p:nth-child(1)').innerHTML = `<strong>ID:</strong> ${newValue}`;
                } else if (parameter === "email") {
                    userDiv.querySelector('.details p:nth-child(2)').innerHTML = `<strong>Email:</strong> ${newValue}`;
                } else if (parameter === "work") {
                    userDiv.querySelector('.details p:nth-child(3)').innerHTML = `<strong>Work:</strong> ${newValue}`;
                }
            }
        });

        document.getElementById('modify-person-form').reset();
        this.toggleModifyPersonForm();  // Cerrar el formulario de modificación después de la modificación
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
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Work:</strong> ${user.work}</p>
            `;
            userDiv.appendChild(details);

            gridContainer.appendChild(userDiv);
        });

        result.appendChild(gridContainer);
    }
}