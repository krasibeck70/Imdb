$(() => {

    const tmdbKey = '6c062077aac02e651366a9737528c88d';
    function selectGenresById(id) {
        var genres = {
            "28": "Action",
            "12": "Adventure",
            "16": "Animation",
            "35": "Comedy",
            "80": "Crime",
            "99": "Documentary",
            "18": "Drama",
            "10751": "Family",
            "14": "Fantasy",
            "36": "History",
            "27": "Horror",
            "10402": "Music",
            "9648": "Mystery",
            "10749": "Romance",
            "878": "Science Fiction",
            "10770": "TV Movie",
            "53": "Thriller",
            "10752": "War",
            "37": "Western"
        };
        return genres[id];
    }
    let app = $('#app2');
    app.text('');

    $.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=6c062077aac02e651366a9737528c88d`)
        .then(function (response) {
            notificacions.loading('We search your film');

            console.log(response);

            for (let movies of response.results) {
                if (movies.poster_path === null) {
                    continue;
                }
                let firstDIv = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card">');
                let a = $('<a href="#">');
                let thumbnail = $('<div class="thumbnail">');
                let image = $(`<img src="${"http://image.tmdb.org/t/p/w185/" + movies.poster_path}" alt="#">`);
                let caption = $('<div class="caption">');
                let h3 = $('<h3>').text(movies.release_date.split('-')[0]);
                let small = $('<small>');
                var title = movies.title.substring(0, 13);
                small.text(title + "...");

                let hr = $('<hr>');
                var genres = "";
                for (let genre of movies.genre_ids) {
                    genres += selectGenresById(genre) + ",";
                }

                genres = genres.substring(0, 24);
                let p = $('<p>').text(genres);
                let button = $(`<a href="/Home/MovieDetails/${movies.id} class="btn btn-default" data-id="${movies
                    .id}" role="button">View More</a>`);
                button.on('click', sendInfo);
                h3.append(small);
                caption.append(h3);
                caption.append(hr);
                caption.append(p);
                caption.append(button);
                thumbnail.append(image);
                thumbnail.append(caption);
                firstDIv.append(a);
                firstDIv.append(thumbnail);
                app.append(firstDIv);
            }
        }).catch(notificacions.handleError);

    function sendInfo() {
        let id = $(this).data('id');
        var url = "/Home/MovieDetails/";

        $.ajax({
            type: "GET",
            url: url + id
        });
    }
})