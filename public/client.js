// Hacer una petición para obtener los datos de la base de datos
fetch('/datos')
    .then(response => response.json())
    .then(data => {
        const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
        data.forEach(row => {
            const newRow = tabla.insertRow();
            newRow.insertCell().appendChild(document.createTextNode(row.id));
            newRow.insertCell().appendChild(document.createTextNode(row.name));
            newRow.insertCell().appendChild(document.createTextNode(row.email));
            newRow.insertCell().appendChild(document.createTextNode(row.type));
            newRow.insertCell().appendChild(document.createTextNode(row.registration_date));
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Manejar el envío del formulario
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const type = document.getElementById('type').value;

    fetch('/subir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, type })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Recargar los datos de la tabla
                location.reload();
            } else {
                console.error('Error al subir los datos:', data.error);
            }
        })
        .catch(error => console.error('Error al enviar los datos:', error));
});
