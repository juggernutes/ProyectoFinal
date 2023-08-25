const RAPIDAPI_KEY = '658ac5e946msh8c032ffe57abd6ep1b6d22jsnd6568da3b39b';
const API_URL = 'https://mangaverse-api.p.rapidapi.com/manga/fetch?page=1&genres=Harem%2CFantasy';
const SLIDER_CONTAINER = '.slider';
const GRID_CONTAINER = '.grid';
const TITLE_KEY = 'title';
const SUMMARY_KEY = 'sub_title';
const LIMIT = 5;

$(document).ready(function () {
    cargarDatos(API_URL, SLIDER_CONTAINER, TITLE_KEY, SUMMARY_KEY, LIMIT);
    cargarDatos(API_URL, GRID_CONTAINER, TITLE_KEY, SUMMARY_KEY, LIMIT);
});

function cargarDatos(url, containerClass, titleKey, summaryKey, limit) {
    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    };

    $.ajax({
        ...settings,
        success: function(response) {
            const data = response.data;
            const container = $(containerClass);

            for (let i = 0; i < limit && i < data.length; i++) {
                const itemData = data[i];
                const item = $('<div>').addClass(containerClass === SLIDER_CONTAINER ? 'slide' : 'grid-item');
                const img = $('<img>').attr('src', itemData.thumb).attr('alt', itemData.title);
                const info = $('<div>').addClass(containerClass === SLIDER_CONTAINER ? 'slide-info' : 'image-info');
                const titleElement = $(containerClass === SLIDER_CONTAINER ? '<h2>' : '<h3>').text(itemData[titleKey]);
                const p = $('<p>').text(itemData[summaryKey]);

                titleElement.text(itemData[titleKey]);
                info.append(titleElement);
                info.append(p);
                item.append(img);
                item.append(info);
                const link = $('<a>').attr('href', `/pages/manga.html?id=${itemData.id}`);
                link.append(item);
                container.append(link);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}
