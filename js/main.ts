/// <reference path="../typings/globals/jquery/index.d.ts" />
var form = $("#searchByTitle");
var btnSearch = $("#btnSearch-title")[0];
var btnReset = $("#btnReset-title")[0];
var ratingNum: number; 
var storeResult: OMDB;

class OMDB {
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actor: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    metascore: number;
    imdbRating: number;
    imdbVotes: number;
    imdbID: string;
    type: string;
    tSeason: number;
    response: boolean = false;
    error: string;
    constructor(public data) {
        if (data.Response == "True") {
            this.title = data.Title;
            this.year = data.Year;
            this.rated = data.Rated;
            this.released = data.Released;
            this.runtime = data.Runtime;
            this.genre = data.Genre;
            this.director = data.Director;
            this.writer = data.Writer;
            this.actor = data.Actors;
            this.plot = data.Plot;
            this.language = data.Language;
            this.country = data.Country;
            this.awards = data.Awards;
            this.metascore = data.Metascore;
            this.imdbRating = data.imdbRating;
            this.imdbVotes = data.imdbVotes;
            this.imdbID = data.imdbID;
            this.type = data.Type;
            this.tSeason = data.totalSeasons;
            this.response = true;
            if (data.Poster != "N/A") {
                this.poster = data.Poster;
            } else {
                this.poster = "image/block_wall.jpg";
            }
        } else {
            this.error = data.Error;
            alert(this.error);
        }
        ratingNum=this.imdbRating;
    }
}

function showOutput(data): void {
    $("#title").text(data.title);
    $("#poster").attr("src", data.poster);
    $("#story").text(data.plot) ;
    $("#released").text (data.released);
    $("#rated").text(data.rated);
    $("#genre").text(data.genre);
    $("#runtime").text(data.runtime) ;
    $("#director").text(data.director);
    $("#writer").text(data.writer);
    $("#actors").text(data.actor);
    $("#lang").text(data.language) ;
    $("#country").text(data.country);
    $("#awards").text(data.awards);
    $("#metascore").text(data.metascore);
    $("#imdbrating").text(data.imdbRating);
    $("#imdbvotes").text(data.imdbVotes);
    $("#type").text(data.type) ;
    $("#year").text(data.year);
    if (data.type != "movie") {
        $("#tSeasons").attr("style", "visibility: visible");
        $("#totalseason").attr("style", "visibility: visible");
        $("#tSeasons").text(data.tSeason);
    } else {
        $("#totalseason").attr("style", "visibility: hidden");
        $("#tSeasons").attr("style", "visibility: hidden");
    }
    //$("#Rating").attr("src", data.poster);
}

//처음 들어왔을때 : iron man
function init(): void {
    var mine = "t=Iron+man&y=2008&plot=short";
    sendOmdbRequest(mine, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            showOutput(storeResult);
            showRatings(storeResult.imdbRating);
        } else {
            alert("Seems there is an error ;( Error message: " + storeResult.error);
        }
    });
}

btnSearch.onclick = function (): void {
    var userdata = form.serialize();
    sendOmdbRequest(userdata, function (omdbResult) {
        storeResult = new OMDB(omdbResult);
        if (storeResult.response == true) {
            showOutput(storeResult);
            showRatings(storeResult.imdbRating);
        } else {
            alert("Seems there is an error ;( Error message: " + storeResult.error);
        }
    });
}

function showRatings(ratNum: number){
    if(ratNum<2){
        $("#Rating").attr("src", "image/rating1.png");
    }else{
        if(ratNum<4){
            $("#Rating").attr("src", "image/rating2.png");
        }else{
            if(ratNum<6){
                $("#Rating").attr("src", "image/rating3.png");
            }else{
                $("#Rating").attr("src", "image/rating4.png");
            }
        }
    }

}


function sendOmdbRequest(userdata, callback): void {
    $.ajax({
        url: "http://www.omdbapi.com/?" + userdata,
        type: "Get",
        data: Text,
        processData: false
    }).done(function (data) {
        var movie = data;
        callback(movie);
    }).fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}

