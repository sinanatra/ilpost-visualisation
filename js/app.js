$(document).on('click', ".elements:not(.open)", function() {
    $("#content .elements").removeClass("open");
    $(".elements .elem").removeClass("info");
    $(".elem>div").remove();
    $(this).closest('.elements').addClass("open");
});

$(document).on('click', ".element", function() {
    $(".info").get(0).scrollIntoView({ behavior: 'smooth' });
});

$(document).on('click', "#split[value=searches]", function() {
    $("#searchValue").css("display", "block")
    $("#content").css("display", "none")
    $(".mapLayer").css("display", "none")
    $("#map").css("display", "none")
    $(".topText h3").get(0).scrollIntoView({ behavior: 'smooth' });
    $("h3 #split").removeClass("selected")
    $(this).toggleClass("selected");
});

$(document).on('click', "#split[value=timeline]", function() {
    $("#searchValue").css("display", "none")
    $("#content").css("display", "block")
    $(".mapLayer").css("display", "none")
    $("#map").css("display", "none")
    $(".topText h3").get(0).scrollIntoView({ behavior: 'smooth' });
    $("h3 #split").removeClass("selected")
    $(this).toggleClass("selected");

});
$(document).on('click', "#split[value=map]", function() {
    $("#searchValue").css("display", "none")
    $("#content").css("display", "none")
    $(".mapLayer").css("display", "block")
    $("#map").css("display", "block")

    $(".topText h3").get(0).scrollIntoView({ behavior: 'smooth' });
    $("h3 #split").removeClass("selected")
    $(this).toggleClass("selected");

});