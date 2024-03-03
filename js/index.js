function saveToLocalStorage(infoArray) {
    localStorage.setItem('personalInfo', JSON.stringify(infoArray));
}

function getFromLocalStorage() {
    const savedInfo = localStorage.getItem('personalInfo');
    if (savedInfo) {
        return JSON.parse(savedInfo);
    } else {
        return [];
    }
}

function displayInfo(infoArray) {
    const infoList = document.getElementById('infoList');
    infoList.innerHTML = '';
    infoArray.forEach((info, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${info.name}, Dirección: ${info.address}, Correo electrónico: ${info.email}, Comentarios: ${info.comments}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            deleteInfo(index);
        });
        listItem.appendChild(deleteButton);
        
        infoList.appendChild(listItem);
    });
}

function deleteInfo(index) {
    let infoArray = getFromLocalStorage();
    infoArray.splice(index, 1);
    saveToLocalStorage(infoArray);
    displayInfo(infoArray);
}

function validateForm() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    if (name.trim() === '' || address.trim() === '' || email.trim() === '') {
        alert('Debe ompletar todos los campos.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Correo electrónico inválido.');
        return false;
    }

    return true;
}

function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        return; 
    }

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;

    const personalInfo = {
        name: name,
        address: address,
        email: email,
        comments: comments
    };

    let infoArray = getFromLocalStorage();
    infoArray.push(personalInfo);
    saveToLocalStorage(infoArray);
    displayInfo(infoArray);

    document.getElementById('personalInfoForm').reset();
}

document.getElementById('personalInfoForm').addEventListener('submit', handleFormSubmit);

window.addEventListener('load', () => {
    const infoArray = getFromLocalStorage();
    displayInfo(infoArray);
});