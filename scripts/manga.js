$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');

    cargarMangaDetalleDesdeAPI(`https://mangaverse-api.p.rapidapi.com/manga/${mangaId}`, '.details');
    cargarEpisodiosDesdeAPI(`https://mangaverse-api.p.rapidapi.com/manga/${mangaId}/episodes`, '.episodes');
});

function cargarMangaDetalleDesdeAPI(url, containerClass) {
    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4fc3c08d3fmshcb7eec0ff175ea8p1b447ejsnf27e2074b76d',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };
    $.ajax({
        ...settings,
        success: function(data) {
            const container = $(containerClass);

            const item = $('<div>').addClass('details-item');
            const img = $('<img>').attr('src', data.thumb).attr('alt', data.title);
            const info = $('<div>').addClass('details-info');
            const titleElement = $('<h2>').text(data.title);
            const p = $('<p>').text(data.summary);

            info.append(titleElement);
            info.append(p);
            item.append(img);
            item.append(info);

            container.append(item);
        },
        error: function(error) {
            console.error('Error al cargar los datos desde la API:', error);
        }
    });
}

function cargarEpisodiosDesdeAPI(url, containerClass) {
    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4fc3c08d3fmshcb7eec0ff175ea8p1b447ejsnf27e2074b76d',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(data) {
            const container = $(containerClass);

            data.forEach(itemData => {
                const episodeDiv = $('<div>').addClass('episode-item');
                const episodeTitle = $('<h3>').text(itemData.title);

                episodeDiv.append(episodeTitle);
                container.append(episodeDiv);

                episodeDiv.on('click', function() {
                    window.location.href = `episode.html?id=${itemData.id}&title=${encodeURIComponent(itemData.title)}`;
                });
            });
        },
        error: function(error) {
            console.error('Error al cargar los episodios desde la API:', error);
        }
    });
}
