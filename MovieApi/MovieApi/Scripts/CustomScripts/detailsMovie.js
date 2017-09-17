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
        
        $.get(`https://api.themoviedb.org/3/movie/${response.id}/credits?api_key=6c062077aac02e651366a9737528c88d`)
            .then(function (responseActors) {
                let actors = "";
                for (let actor of responseActors.cast) {
                    actors += actor.name + ",";
                    //console.log(actor.name);
                }
                $('#Actors').append(" - " + actors);
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
        $('#buttonLike').attr('data-id', response.id);
        $('#buttonLike').on('click', addMovie);
        

        function addMovie() {
            var gen = "";
            for (var i = 0; i < response.genres.length; i++) {
                gen += response.genres[i].name + " ";
                console.log(response.genres[i]);
            }
            console.log(gen);
            var json = {
                'Id': response.id,
                'Name': response.name,
                'Poster': response.poster_path,
                'Budget': response.budget,
                'GenresString': gen,
                'Lenguage': response.original_language,
                'Overview': response.overview,
                'Popularity': response.popularity,
                'Runtime': response.runtime,
                'VoteAverage': response.vote_average,
                'Title': response.title,
                'RealeseDate': response.release_date
            }
            $.ajax({
                url: "/Home/FavoritesMovies?",
                type: "POST",
                data: JSON.stringify(json),
                contentType: "application/json; charset=utf-8"
        });
        }

        console.log(response.title);
    });

});

