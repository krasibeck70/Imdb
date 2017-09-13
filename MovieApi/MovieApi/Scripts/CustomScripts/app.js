$(() => {
    function selectGenres(name) {
        var genres = {
            "action": 28,
            "adventure": 12,
            "animation": 16,
            "comedy": 35,
            "Crime": 80,
            "documentary": 99,
            "drama": 18,
            "family": 10751,
            "fantasy": 14,
            "history": 36,
            "horror": 27,
            "music": 10402,
            "mystery": 9648,
            "romance": 10749,
            "science Fiction": 878,
            "TV Movie": 10770,
            "thriller": 53,
            "war": 10752,
            "western": 37
        };
        return genres[name];
    }
    function selectGenresById(id) {
        var genres = {
            "28": "Action",
            "12":"Adventure",
            "16":"Animation",
            "35":"Comedy",
            "80":"Crime",
            "99":"Documentary",
            "18":"Drama",
            "10751":"Family",
            "14":"Fantasy",
            "36":"History",
            "27":"Horror",
            "10402":"Music",
            "9648":"Mystery",
            "10749":"Romance",
            "878":"Science Fiction",
            "10770":"TV Movie",
            "53": "Thriller",
            "10752": "War",
            "37": "Western"
        };
        return genres[id];
    }

    
    const tmdbKey = '6c062077aac02e651366a9737528c88d';


    $(document).ready(function () {
        let sideslider = $('[data-toggle=collapse-side]');
        let sel = sideslider.attr('data-target');
        let sel2 = sideslider.attr('data-target-2');
        sideslider.click(function (event) {
            $(sel).toggleClass('in');
            $(sel2).toggleClass('out');
        });
    });
    // ADD EVENT LISTENER "CLICK"
    $('#buttonSearch').on('click', searchMovieByTitleOrYear);

    // FIND SELECTED OPTION
    $('.selectpicker').on('change',
        function () {
            let val = $(this).find('option:selected');
            console.log(val[0]['label']);
            if (val[0]['label'] === "Author") {
                $('#buttonSearch').off('click');
                $('#buttonSearch').on('click', searchByAuthor);
            } else if (val[0]['label'] === "Genre") {
                $('#buttonSearch').off('click');
                $('#buttonSearch').on('click', searchByGenre);
            } else {
                $('#buttonSearch').off('click');
                $('#buttonSearch').on('click', searchMovieByTitleOrYear);
            }
            $('#movie').attr('placeholder', "Search by " + val[0]['label']);
        });

    function home() {
        let app = $('#app');
        app.text('');

        $.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}`)
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
    }
    home();
    // FUNCTION SEARCH MOVIE WHEN CLICK BUTTON SEARCH
    function searchMovieByTitleOrYear() {
        let app = $('#app');
        app.text('');
        let movie = $('#movie').val();

        $.get(`http://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${movie}`)
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
                    var title = movies.title.substring(0,13);
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
    }

    function searchByAuthor() {
        let app = $('#app');
        app.text('');
        let author = $('#movie').val();

        $.get(`https://api.themoviedb.org/3/search/person?api_key=${tmdbKey}&query=${author}`)
            .then(function (response) {
                notificacions.loading('We search your film');

                for (let singleMovie of response.results) {
                    console.log(singleMovie);
                    for (let movies of singleMovie['known_for']) {
                        console.log(movie);
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
                }

            }).catch(notificacions.handleError);
    }

    function searchByGenre() {
        let app = $('#app');
        app.text('');
        let genre = $('#movie').val().toLowerCase();
        let movieGenre = selectGenres(genre);
        console.log(movieGenre);

        $.get(`https://api.themoviedb.org/3/genre/${movieGenre}/movies?api_key=${tmdbKey}`)
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
    }

    function sendInfo() {
        let id = $(this).data('id');
        var url = "/Home/MovieDetails/";

        $.ajax({
            type: "GET",
            url: url + id
        });
    }

});

