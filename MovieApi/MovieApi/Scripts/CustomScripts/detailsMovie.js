$(() => {
    const tmdbKey = '6c062077aac02e651366a9737528c88d';

    let id = $(location).attr('href').split('/')[5];
    //$('#demo').text(id);
    $.get(`http://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}`).then(function(response) {
        //notificacions.loading('We search your film');
        //$('#aboutTitle').text(`About ${response.Title}`);
        $('#NameMovie').text(response.title);
        $.get(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=${tmdbKey}`).then(function (responseVideo) {
            console.log(response);
            $('#movieYoutube').attr('src', "https://www.youtube.com/embed/" + responseVideo.results[0].key);
        });
        $('#description').append(response.overview);
        $('#ReleaseDate').append(" - " + response.release_date);
        $('#RunTime').append(" - " + response.runtime + " min");
        $('#yearMovie').append(" - " + response.release_date.split('-')[0]);
        $('#Popularity').append(" - " + response.popularity);
        $('#OriginalLang').append(" - " + response.original_language);
        $('#Genre').append(" - ");
        var genres = "";
        for (let genre of response.genres) {
            genres += genre.name + ",";
        }
        genres = genres.substring(0, genres.length - 1);
        $('#Genre').append(genres);
        
                
       
        
        console.log(response.title);
    });

});

