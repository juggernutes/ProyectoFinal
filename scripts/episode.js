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
        url: `https://mangaverse-api.p.rapidapi.com/manga?id=${episodeId}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4fc3c08d3fmshcb7eec0ff175ea8p1b447ejsnf27e2074b76d',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(response) {
            const data = response.data;
            const lenght = data.length;

            for (let i = 0; i < lenght; i++) {
                if (data[i]) {
                    const imagenData = data[i];
                    const img = $('<img>').attr('src', imagenData.link).attr('alt', `Imagen ${i + 1}`);
                    $(container).append(img);
                }
            }
        },
        error: function(error) {
            console.error('Error al cargar las imágenes del episodio desde la API:', error);
        }
    });
}
