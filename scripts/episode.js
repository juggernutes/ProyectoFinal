$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('id');
    const episodeTitle = decodeURIComponent(urlParams.get('title'));

    $('#episode-title').text(episodeTitle);
    cargarImagenesDelEpisodio(episodeId, '#image-container');
});

function cargarImagenesDelEpisodio(episodeId, container) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://mangaverse-api.p.rapidapi.com/manga?${episodeId}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4fc3c08d3fmshcb7eec0ff175ea8p1b447ejsnf27e2074b76d',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(data) {
            const containerElement = $(container);

            data.imagenes.forEach(imagenData => {
                const img = $('<img>').attr('src', imagenData.imagen_url).attr('alt', imagenData.descripcion);
                containerElement.append(img);
            });
        },
        error: function(error) {
            console.error('Error al cargar las imágenes del episodio desde la API:', error);
        }
    });
}
