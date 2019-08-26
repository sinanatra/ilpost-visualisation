var dataset = "normalized_yearly-top100-entities-topics-sentiment.json"
var num = 1
var availableTags = [];
var minimumValue = 0.3

var positive = "251, 251, 221"
var negative = "199, 204, 218"

var orderbyValue = []

function sortNumber(a, b) {
    return a - b;
}

d3.json("data/" + dataset, function(data) {
    console.log(data);

    for (i in data) {
        $("#content").append(
            "<div class='elements' >" +
            "<div class='year'><p>" + data[i].year + "</p> </div>" +
            " <div class='element' data-type='entities' data-year='" + data[i].year + "'></div>" +
            " <div class='element' data-type='organizations' data-year='" + data[i].year + "'></div>" +
            " <div class='element' data-type='places' data-year='" + data[i].year + "'></div>" +
            "</div>"
        )

        // adds people to div
        for (j in data[i].entities) {
            // most frequent words
            var frequency = data[i].entities[j].freq
                //get overall sentiment value
            var overallSentimet = data[i].entities[j].overall_sentiment
            var normalisedSentiment = data[i].entities[j].normalized_overall_sentiment
                // people
            var entity = data[i].entities[j].entity_name

            if (frequency > num) {
                if (overallSentimet > 0) {

                    $(".element[data-type=entities][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='positive' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }
                if (overallSentimet < 0) {
                    $(".element[data-type=entities][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='negative' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }

            }

            orderbyValue.push(normalisedSentiment)
        }

        // console.log(orderbyValue.sort(sortNumber))

        // adds organisations to div
        for (j in data[i].organizations) {
            // most frequent words
            var frequency = data[i].organizations[j].freq
                //get overall sentiment value
            var overallSentimet = data[i].organizations[j].overall_sentiment
            var normalisedSentiment = data[i].organizations[j].normalized_overall_sentiment
                // people
            var entity = data[i].organizations[j].entity_name

            if (frequency > num) {
                if (overallSentimet > 0) {
                    $(".element[data-type=organizations][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='positive' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }
                if (overallSentimet < 0) {
                    $(".element[data-type=organizations][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='negative' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }

            }
        }

        // adds places to div
        for (j in data[i].places) {
            // most frequent words
            var frequency = data[i].places[j].freq
                //get overall sentiment value
            var overallSentimet = data[i].places[j].overall_sentiment
            var normalisedSentiment = data[i].places[j].normalized_overall_sentiment
                // people
            var entity = data[i].places[j].entity_name

            if (frequency > num) {
                if (overallSentimet > 0) {
                    $(".element[data-type=places][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='positive' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }
                if (overallSentimet < 0) {
                    $(".element[data-type=places][ data-year=" + data[i].year + "]").append(
                        "<div class='elem' ><p id='split' class='negative' style=opacity:" + (Math.abs(normalisedSentiment) + minimumValue) + "> " + entity + " </p></div>"
                    )
                }

            }
        }

        // open the first div
        $(".elements:first-of-type").addClass('open');

        (function(datum) {
            $(document).on('click', "#split", function() {
                var thisParentYear = $(this).parent().parent().attr('data-year') // get Specific year i.e. 2010 2011 etc
                var thisParentType = $(this).parent().parent().attr('data-type') // get typology i.e. places organization entities

                if (thisParentType == "entities" && thisParentYear == datum.year) {
                    for (j in datum.entities) {
                        var thisEntityName = datum.entities[j].entity_name
                        var thisSelection = $(this).text()
                        var thisArea = datum.entities[j].areas
                        if (thisSelection.includes(thisEntityName)) {

                            $(".elements .elem").removeClass("info");
                            $(".elem>div").remove();

                            $(this).parent().toggleClass("info")
                            $(".info").append("<div class='infoContainer'> </div>")

                            for (el in thisArea) {

                                for (em in thisArea[el].pos_sents) {
                                    var pos_sents = thisArea[el].pos_sents[em][0]
                                    var pos_value = thisArea[el].pos_sents[em][1]
                                    var originalLink = thisArea[el].pos_sents[em][2]
                                    $(".infoContainer").append("<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + positive + "," + (Math.abs(pos_value) + minimumValue) + ");'>" + pos_sents + "</a></div>")
                                }
                                for (em in thisArea[el].neg_sents) {
                                    var neg_sents = thisArea[el].neg_sents[em][0]
                                    var neg_value = thisArea[el].neg_sents[em][1]
                                    var originalLink = thisArea[el].neg_sents[em][2]
                                    $(".infoContainer").append("<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + negative + "," + (Math.abs(neg_value) + minimumValue) + ");'>" + neg_sents + "</a></div>")
                                }
                            }
                        }
                    }
                }
                if (thisParentType == "organizations" && thisParentYear == datum.year) {
                    for (j in datum.organizations) {
                        var thisEntityName = datum.organizations[j].entity_name
                        var thisSelection = $(this).text()
                        var thisArea = datum.organizations[j].areas
                        if (thisSelection.includes(thisEntityName)) {

                            $(".elements .elem").removeClass("info");
                            $(".elem>div").remove();

                            $(this).parent().toggleClass("info")
                            $(".info").append("<div class='infoContainer'> </div>")

                            for (el in thisArea) {

                                for (em in thisArea[el].pos_sents) {
                                    var pos_sents = thisArea[el].pos_sents[em][0]
                                    var pos_value = thisArea[el].pos_sents[em][1]
                                    var originalLink = thisArea[el].pos_sents[em][2]
                                    $(".infoContainer").append("<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + positive + "," + (Math.abs(pos_value) + minimumValue) + ");'>" + pos_sents + "</a></div>")
                                    console.log(positive + ", ")

                                }
                                for (em in thisArea[el].neg_sents) {
                                    var neg_sents = thisArea[el].neg_sents[em][0]
                                    var neg_value = thisArea[el].neg_sents[em][1]
                                    var originalLink = thisArea[el].neg_sents[em][2]
                                    $(".infoContainer").append("<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + negative + "," + (Math.abs(neg_value) + minimumValue) + ");'>" + neg_sents + "</a></div>")
                                }
                            }
                        }
                    }
                }
                if (thisParentType == "places" && thisParentYear == datum.year) {
                    for (j in datum.places) {
                        var thisEntityName = datum.places[j].entity_name
                        var thisSelection = $(this).text()
                        var thisArea = datum.places[j].areas
                        if (thisSelection.includes(thisEntityName)) {

                            $(".elements .elem").removeClass("info");
                            $(".elem>div").remove();

                            $(this).parent().toggleClass("info")
                            $(".info").append("<div class='infoContainer'> </div>")


                            for (el in thisArea) {

                                for (em in thisArea[el].pos_sents) {
                                    var pos_sents = thisArea[el].pos_sents[em][0]
                                    var pos_value = thisArea[el].pos_sents[em][1]
                                    var originalLink = thisArea[el].pos_sents[em][2]
                                    $(".infoContainer").append("<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + positive + "," + (Math.abs(pos_value) + minimumValue) + ");'>" + pos_sents + "</a></div>")
                                    console.log(positive + ", ")

                                }
                                for (em in thisArea[el].neg_sents) {
                                    var neg_sents = thisArea[el].neg_sents[em][0]
                                    var neg_value = thisArea[el].neg_sents[em][1]
                                    var originalLink = thisArea[el].neg_sents[em][2]
                                    $(".infoContainer").append("<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' style='background-color:rgba(" + negative + "," + (Math.abs(neg_value) + minimumValue) + ");'>" + neg_sents + "</a></div>")
                                }
                            }
                        }
                    }
                }
            });
        })(data[i]);

        //  Autocomplete array
        for (j in data[i].entities) {
            var entity = data[i].entities[j].entity_name
            availableTags.push(entity)
        };
        for (j in data[i].organizations) {
            var entity = data[i].organizations[j].entity_name
            availableTags.push(entity)
        };
        for (j in data[i].places) {
            var entity = data[i].places[j].entity_name
            availableTags.push(entity)
        };
    }
    uniq = [...new Set(availableTags)];

    // autocomplete function
    $("#tags").autocomplete({
        appendTo: "#autocomplete",
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(uniq, request.term);
            response(results.slice(0, 10));
        },
        messages: {
            noResults: '',
            results: function() {} // to do 
        }

    });

    // Searches for a word and displays results
    document.getElementById('searchWord').onclick = function() {
        $("#searchResult").html("")
        $("#searches").html(" ")

        selectedWord = document.getElementById("tags").value;

        var n = 0;

        for (i in data) {
            $("#searchResult").append(
                " <div class='searchedElementContainer' data-year='" + data[i].year + "'>" +
                " <div class='searchedElementYear year'  data-year='" + data[i].year + "'>" + data[i].year + "</div>" +

                " <div class='searchedElementContent' data-year='" + data[i].year + "'>" +
                " <div class='searchedElement ' data-type='entities' data-year='" + data[i].year + "'></div>" +
                " <div class='searchedElement ' data-type='organizations' data-year='" + data[i].year + "'></div>" +
                " <div class='searchedElement ' data-type='places' data-year='" + data[i].year + "'></div>" +
                "</div>" +
                "</div>"
            )


            for (j in data[i].entities) {

                var entity = data[i].entities[j].entity_name

                if (entity.toLowerCase().includes(selectedWord.toLowerCase())) {
                    var overallSentimet = data[i].entities[j].overall_sentiment
                    var normalisedSentiment = data[i].entities[j].normalized_overall_sentiment

                    if (overallSentimet > 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + positive + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }
                    if (overallSentimet < 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + negative + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }

                    n += data[i].entities[j].freq

                    $("#searches").html(
                        " <div class='searchAmount'>" + selectedWord + " appare " + n + " volte" + "</div>"
                    )

                    var thisArea = data[i].entities[j].areas
                    for (el in thisArea) {
                        for (em in thisArea[el].pos_sents) {
                            var pos_sents = thisArea[el].pos_sents[em][0]
                            var pos_value = thisArea[el].pos_sents[em][1]
                            var originalLink = thisArea[el].pos_sents[em][2]
                            $(".searchedElement[data-type=entities][ data-year=" + data[i].year + "]").append(
                                "<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank'>" + pos_sents + "</a></div>"
                            )
                        }
                        for (em in thisArea[el].neg_sents) {
                            var neg_sents = thisArea[el].neg_sents[em][0]
                            var neg_value = thisArea[el].neg_sents[em][1]
                            var originalLink = thisArea[el].neg_sents[em][2]
                            $(".searchedElement[data-type=entities][ data-year=" + data[i].year + "]").append(
                                "<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' >" + neg_sents + "</a></div>"
                            )
                        }
                    }
                }
            }
            for (j in data[i].organizations) {

                var entity = data[i].organizations[j].entity_name


                if (entity.toLowerCase().includes(selectedWord.toLowerCase())) {
                    var overallSentimet = data[i].organizations[j].overall_sentiment
                    var normalisedSentiment = data[i].entities[j].normalized_overall_sentiment


                    if (overallSentimet > 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + positive + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }
                    if (overallSentimet < 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + negative + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }

                    n += data[i].organizations[j].freq

                    $("#searches").html(
                        " <div class='searchAmount' data-type='organizations' data-year='" + data[i].year + "'>" + selectedWord + " appare " + n + " volte" + "</div>"
                    )

                    var thisArea = data[i].organizations[j].areas
                    for (el in thisArea) {
                        for (em in thisArea[el].pos_sents) {
                            var pos_sents = thisArea[el].pos_sents[em][0]
                            var pos_value = thisArea[el].pos_sents[em][1]
                            var originalLink = thisArea[el].pos_sents[em][2]
                            $(".searchedElement[data-type=organizations][ data-year=" + data[i].year + "]").append(
                                "<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank'>" + pos_sents + "</a></div>"
                            )
                        }
                        for (em in thisArea[el].neg_sents) {
                            var neg_sents = thisArea[el].neg_sents[em][0]
                            var neg_value = thisArea[el].neg_sents[em][1]
                            var originalLink = thisArea[el].neg_sents[em][2]
                            $(".searchedElement[data-type=organizations][ data-year=" + data[i].year + "]").append(
                                "<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' >" + neg_sents + "</a></div>"
                            )
                        }
                    }
                }
            }
            for (j in data[i].places) {

                var entity = data[i].places[j].entity_name

                if (entity.toLowerCase().includes(selectedWord.toLowerCase())) {
                    var overallSentimet = data[i].places[j].overall_sentiment
                    var normalisedSentiment = data[i].entities[j].normalized_overall_sentiment


                    if (overallSentimet > 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + positive + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }
                    if (overallSentimet < 0) {
                        $(".searchedElementContainer[ data-year=" + data[i].year + "]").css("background", "rgba(" + negative + "," + (Math.abs(normalisedSentiment) + minimumValue) + "");
                    }

                    n += data[i].places[j].freq

                    $("#searches").html(
                        " <div class='searchAmount' data-type='places' data-year='" + data[i].year + "'>" + selectedWord + " appare " + n + " volte" + "</div>"
                    )

                    var thisArea = data[i].places[j].areas
                    for (el in thisArea) {
                        for (em in thisArea[el].pos_sents) {
                            var pos_sents = thisArea[el].pos_sents[em][0]
                            var pos_value = thisArea[el].pos_sents[em][1]
                            var originalLink = thisArea[el].pos_sents[em][2]
                            $(".searchedElement[data-type=places][ data-year=" + data[i].year + "]").append(
                                "<div class='pos_sents'> <a href=https://" + originalLink + " target='_blank'>" + pos_sents + "</a></div>"
                            )
                        }
                        for (em in thisArea[el].neg_sents) {
                            var neg_sents = thisArea[el].neg_sents[em][0]
                            var neg_value = thisArea[el].neg_sents[em][1]
                            var originalLink = thisArea[el].neg_sents[em][2]
                            $(".searchedElement[data-type=places][ data-year=" + data[i].year + "]").append(
                                "<div class='neg_sents'> <a href=https://" + originalLink + " target='_blank' >" + neg_sents + "</a></div>"
                            )
                        }
                    }
                }
            }
        };

    }






});