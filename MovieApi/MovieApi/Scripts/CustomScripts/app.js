$(() => {

    const apiKey = '6425b200';
    const tmdbKey = '6c062077aac02e651366a9737528c88d';
    //let text = 'http://www.omdbapi.com/?t=the+flash&apikey=6425b200';
    let video = "http://api.themoviedb.org/3/movie/550/videos?api_key=6c062077aac02e651366a9737528c88d";
    let demp = "http://api.themoviedb.org/3/search/movie?api_key=6c062077aac02e651366a9737528c88d&query=fast";
    

    $(document).ready(function() {
        let sideslider = $('[data-toggle=collapse-side]');
        let sel = sideslider.attr('data-target');
        let sel2 = sideslider.attr('data-target-2');
        sideslider.click(function(event) {
            $(sel).toggleClass('in');
            $(sel2).toggleClass('out');
        });
    });
    // ADD EVENT LISTENER "CLICK"
    $('#buttonSearch').on('click', searchMovieByTitleOrYear);

    // FIND SELECTED OPTION
    $('.selectpicker').on('change',
        function() {
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
            $('#movie').attr('placeholder', "Search by " +  val[0]['label']);
        });

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
                    if (movies.poster_path === 'N/A') {
                        continue;
                    }
                    let firstDIv = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card">');
                    let a = $('<a href="#">');
                    let thumbnail = $('<div class="thumbnail">');
                    let image = $(`<img src="${"http://image.tmdb.org/t/p/w185/" + movies.poster_path}" alt="#">`);
                    let caption = $('<div class="caption">');
                    let h3 = $('<h3>').text(movies.release_date);
                    let small = $('<small>');
                    if (movies.title.length > 23) {
                        small.text(movies.title.substring(0, 23) + '...');
                    } else {
                        small.text(movies.title);
                    }

                    let hr = $('<hr>');
                    let p = $('<p>').text('adsadsadasdasdasdasdasdasd');
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
           
        //} else {
        //    $.get(`http://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${movie}`)
        //        .then(function(response) {
        //            notificacions.loading('We search your film');
        //            let counter = 0;

        //            for (let movies of response.results) {
        //                if (movies.Poster === 'N/A') {
        //                    continue;
        //                }
        //                let firstDIv = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card">');
        //                let a = $('<a href="#">');
        //                let thumbnail = $('<div class="thumbnail">');
        //                let image = $(`<img src="${"http://image.tmdb.org/t/p/w185/" + movies.poster_path}" alt="#">`);
        //                let caption = $('<div class="caption">');
        //                let h3 = $('<h3>').text(movies.release_date);
        //                let small = $('<small>');
        //                if (movies.title.length > 23) {
        //                    small.text(movies.title.substring(0, 23) + '...');
        //                } else {
        //                    small.text(movies.title);
        //                }

        //                let hr = $('<hr>');
        //                let p = $('<p>').text('adsadsadasdasdasdasdasdasd');
        //                let button = $(`<a href="/Home/MovieDetails/${movies.id}" class="btn btn-default" data-id="${movies
        //                    .id}" role="button">View More</a>`);
        //                button.on('click', sendInfo);
        //                //button.attr('href',
        //                    //'http://localhost:63342/Imdb/detailsMovie.html?_ijt=oriblor4ujtv39ebfiu7cokbl');
        //                h3.append(small);
        //                caption.append(h3);
        //                caption.append(hr);
        //                caption.append(p);
        //                caption.append(button);
        //                thumbnail.append(image);
        //                thumbnail.append(caption);
        //                firstDIv.append(a);
        //                firstDIv.append(thumbnail);
        //                app.append(firstDIv);
        //            }
        //            //console.log(response.Search);
        //        }).catch(notificacions.handleError);
    }

    function searchByAuthor() {
        let app = $('#app');
        app.text('');
        let author = $('#movie').val();

        $.get(`https://api.themoviedb.org/3/search/person?api_key=${tmdbKey}&query=${author}`)
            .then(function (response) {
                notificacions.loading('We search your film');

                //console.log(response);

                for (let singleMovie of response.results) {
                    console.log(singleMovie);
                    for (let movies of singleMovie['known_for']) {
                        console.log(movie);
                        if (movies.poster_path === 'N/A') {
                            continue;
                        }
                        let firstDIv = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card">');
                        let a = $('<a href="#">');
                        let thumbnail = $('<div class="thumbnail">');
                        let image = $(`<img src="${"http://image.tmdb.org/t/p/w185/" + movies.poster_path}" alt="#">`);
                        let caption = $('<div class="caption">');
                        let h3 = $('<h3>').text(movies.release_date);
                        let small = $('<small>');
                        var title = movies.title;
                        title = title.substring(0, 23);
                        small.text(title);
                        //if (movies.title.length > 23) {
                        //    small.text(movies.title.substring(0, 23) + '...');
                        //} else {
                        //    small.text(movies.title);
                        //}

                        let hr = $('<hr>');
                        let p = $('<p>').text('adsadsadasdasdasdasdasdasd');
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
        let genre = $('#movie').val();
        let movieGenre = genres.selectGenres(genre);

        $.get(`https://api.themoviedb.org/3/genre/${movieGenre}/movies?api_key=${tmdbKey}`)
            .then(function (response) {
                notificacions.loading('We search your film');

                console.log(response);

                for (let movies of response.results) {
                    if (movies.poster_path === 'N/A') {
                        continue;
                    }
                    let firstDIv = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card">');
                    let a = $('<a href="#">');
                    let thumbnail = $('<div class="thumbnail">');
                    let image = $(`<img src="${"http://image.tmdb.org/t/p/w185/" + movies.poster_path}" alt="#">`);
                    let caption = $('<div class="caption">');
                    let h3 = $('<h3>').text(movies.release_date);
                    let small = $('<small>');
                    if (movies.title.length > 23) {
                        small.text(movies.title.substring(0, 23) + '...');
                    } else {
                        small.text(movies.title);
                    }

                    let hr = $('<hr>');
                    let p = $('<p>').text('adsadsadasdasdasdasdasdasd');
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

