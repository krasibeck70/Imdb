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
        $('#description').text(" - " + response.overview);
        $('#ReleaseDate').text(" - " + response.release_date);
        $('#RunTime').text(" - " + response.runtime);
        $('#yearMovie').text(" - " + response.release_date.split('-')[0]);
        $('#Popularity').text(" - " + response.popularity);
        $('#OriginalLang').text(" - " + response.original_language);
        $('#HomePage').text(" - " + response.homepage);
        console.log(response.title);
    });

});

