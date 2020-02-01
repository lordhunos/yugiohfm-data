$(document).ready(function () {
    $('#scrapCards').on('click', async function (evt) {
        for (let i = 300; i < 302; i++) {
            await $.get(`/getCardInfo/${i}`, function (data) {
                $('#result').append(data + '<br>');
            });
        }
    });
    $('#scrapRivals').on('click', async function (evt) {
        for (let i = 1; i < 40; i++) {
            await $.get(`/getRivalInfo/${i}`, function (data) {
                $('#result').append(data + '<br>');
            });
        }
    });
    $('#scrapFusions').on('click', function (evt) {
        $.get('/getFusionsJSON', function (data) {
            $('#result').append(data + '<br>');
        });
    });
    $('#scrapRituals').on('click', function (evt) {
        $.get('/getRitualsJSON', function (data) {
            $('#result').append(data + '<br>');
        });
    });
    $('#scrapEquips').on('click', function (evt) {
        $.get('/getEquipsJSON', function (data) {
            $('#result').append(data + '<br>');
        });
    });
    $('#showCards').on('click', function (evt) {
        $.get('/cards', function (data) {
            data.forEach(element => { 
                $('#result').append('<pre>'  + JSON.stringify(element, undefined, 3) + '</pre>');
            });
        }, 'json' );
    });
    $('#scrapImages').on('click', function (evt) {
        $.get('/getImages', function (data) {
            $('#result').append(data + '<br>');
        });
    });
});