var offSetVal = 0;
var searchTerm = "";

$(".topic").on("click", function () {

        searchTerm = $(this).data("search");
        if (searchTerm === "searchButton") {
                searchTerm = $("#mySearch").val().trim();
             
                $(".imgButtons").append('<button data-search="' + searchTerm + '">' +
                        searchTerm + '</button>')
        }
        
        offSetVal = 0;
        $(".imgArea").html("<p></p>")
        displayImg();
        $(".addMoreArea").html('<p><button class="addButton row">Add 10 more</button></p>');
        $(".addButton").on("click", function () {
        offSetVal = offSetVal + 10;
        displayImg();
        });
});

function displayImg(){


var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm +
                "&api_key=P4zd4DpT3G8sVMwDCrmBEMrl1EjVGHk3&limit=10&offset=" +
                offSetVal;

$.ajax({
                url: queryURL,
                method: "GET"
        })
        
        .done(function (response) {
                console.log(response.data);

                for (var i = 0; i < response.data.length; i++) {


                 var div = $('<div class="imgDiv col-md-4">');
                var img = $('<img class = "imgSize">');
                var rating = $("<p>Rating: </p>");
                var ratingValue = response.data[i].rating;

                img.attr("data-animate", response.data[i].images.downsized.url);
                img.attr("data-still", response.data[i].images.downsized_still.url);
                img.attr("data-state", "still")
                img.attr("src", response.data[i].images.downsized_still.url);

                $('.imgArea').append(div);
                div.append(img);
                div.append(rating);
                rating.append(ratingValue);

                }
        })
};

$(document).on("click", 'img', function () {
var state = $(this).attr("data-state");
var animatedURL = $(this).attr("data-animate");
var stillURL = $(this).attr("data-still");
if (state === "still") {
        $(this).attr("src", animatedURL);
        $(this).attr("data-state", "animated");
} else {
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");
        }
})
