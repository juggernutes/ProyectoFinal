$(document).ready(function () {
    $('#btnCargarEpisodio').on('click', function () {
        const titulo = $('#titulo').val();
        const numero = $('#numero').val();
        const archivo = $('#archivo')[0].files[0];

        if (titulo && numero && archivo) {
            const listItem = $('<li>').text(`${titulo} - ${archivo.name}`);
            const progressBar = $('<progress>').attr('value', 0).attr('max', 100);
            listItem.append(progressBar);

            $('#upload-list').append(listItem);

            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('numero', numero);
            formData.append('archivo', archivo);

            axios.post('https://mangaverse-api.p.rapidapi.com/upload', formData, {
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    progressBar.attr('value', percentCompleted);
                }
            })
                .then(response => {
                    alert('messageEpisodio cargado correctamente');
                    $('#upload-list').empty();
                    $('#upload-list').append($('<li>').text('Episodio cargado correctamente').css('color', 'green'));

                })
                .catch(error => {

                    alert('El archivo no es un PDF' + error.response.data.message);
                    $('#upload-list').empty();
                    $('#upload-list').append($('<li>').text('Error al cargar el archivo').css('color', 'red'));
                    
                });
        } else {
            alert('Completa todos los campos y selecciona un archivo');
        }
    });
});
