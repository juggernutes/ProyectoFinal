$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');

    cargarMangaDetalleDesdeAPI(mangaId, '.manga-details');
    cargarEpisodiosDesdeAPI(mangaId, '.episodes');
});

function cargarMangaDetalleDesdeAPI(mangaId, containerClass) {
    const apiUrl = `https://mangaverse-api.p.rapidapi.com/manga?id=${mangaId}`;

    const settings = {
        async: true,
        crossDomain: true,
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '658ac5e946msh8c032ffe57abd6ep1b6d22jsnd6568da3b39b',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(response) {
            const data = response.data;
            const container = $(containerClass);

            const item = $('<div>').addClass('details-item');
            const img = $('<img>').attr('src', data.thumb).attr('alt', data.title).addClass('manga-image');
            const titleElement = $('<h2>').text(data.title).addClass('manga-title');
            const summaryElement = $('<p>').text(data.summary).addClass('manga-summary');

            container.find('.details-info').append(titleElement, summaryElement);
            item.append(img);
            container.append(item);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar los datos desde la API:', textStatus, errorThrown);
        }
    });
}


function cargarEpisodiosDesdeAPI(mangaId, containerClass) {
    const apiUrl = `https://mangaverse-api.p.rapidapi.com/manga/chapter?id=${mangaId}`;

    const settings = {
        async: true,
        crossDomain: true,
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '658ac5e946msh8c032ffe57abd6ep1b6d22jsnd6568da3b39b',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(response) {

            const data = response.data;
            const container = $(containerClass);

            data.forEach(itemData => {
                const episodeDiv = $('<div>').addClass('episode-item');
                const episodeTitle = $('<h3>').text(itemData.title);

                episodeDiv.append(episodeTitle);
                container.append(episodeDiv);

                const episodeImg = $('<img>').attr('src', '/img/mini.jpg').attr('alt', itemData.title);
                episodeDiv.append(episodeImg);

                episodeDiv.on('click', function() {
                    const encodedTitle = encodeURIComponent(itemData.title);
                    window.location.href = `episode.html?id=${itemData.id}&title=${encodedTitle}`;
                });
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar los episodios desde la API:', textStatus, errorThrown);
        }
    });
}

