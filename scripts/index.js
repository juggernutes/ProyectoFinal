$(document).ready(function() {
    cargarDatosPaginadosDesdeAPI('https://mangaverse-api.p.rapidapi.com/manga', '.grid', 'title', 'sub_title', 15);
    cargarDatosPaginadosDesdeAPI('https://mangaverse-api.p.rapidapi.com/manga/latest', '.slider', 'title', 'sub_title', 5);
});

function cargarDatosPaginadosDesdeAPI(url, containerClass, dataProcessor, titleKey, limit) {
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

            for (let i = 0; i < limit && i < data.length; i++) {
                const itemData = data[i];
                const item = $('<div>').addClass(containerClass === '.grid' ? 'grid-item' : 'slide');
                const img = $('<img>').attr('src', itemData.thumb).attr('alt', itemData.title);
                const info = $('<div>').addClass(containerClass === '.grid' ? 'image-info' : 'slide-info');
                const titleElement = containerClass === '.grid' ? $('<h3>') : $('<h2>');
                const titleText = itemData[titleKey];
                const p = $('<p>').text(itemData.summary);

                titleElement.text(titleText);
                info.append(titleElement);
                info.append(p);
                item.append(img);
                item.append(info);
                const link = $('<a>').attr('href', `manga.html?id=${itemData.id}`);
                link.append(item);
                container.append(link);
            }
        },
        error: function(error) {
            console.error('Error al cargar los datos desde la API:', error);
        }
    });
}
