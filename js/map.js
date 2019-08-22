mapboxgl.accessToken = 'pk.eyJ1Ijoic2luYW5hdHJhIiwiYSI6ImNpcTloaTlocjAwNWFodm0yODJjODF5MXYifQ.urgyj3bpfbG3dX4uTOOZtQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sinanatra/cjy31bkbp0i631cogwlq890m4',
    // style: 'mapbox://styles/mapbox/dark-v10',

    center: [10, 40],
    zoom: 5
});

var years = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019'
];

map.on('load', function () {

    function filterBy(year) {
        var filters = ['==', 'year', year];
        map.setFilter('positive-point', filters);
        map.setFilter('positive-heat', filters);

        // Set the label to the year
        document.getElementById('year').textContent = years[year];
    }

    // positive layer - loaded with d3 for ajax
    d3.json('./data/positive.geojson', function (err, data) {
        if (err) throw err;

        // get the last number from the year - to count from 0 - 2010
        data.features = data.features.map(function (d) {
            d.properties.year = d.properties.year.toString().slice(-1)
            d.properties.year = Number(d.properties.year)
            return d;
        });

        map.addSource('positive', {
            'type': 'geojson',
            data: data
        });


        console.log(data)


        map.addLayer({
            "id": "positive-heat",
            "type": "heatmap",
            "source": "positive",
            "maxzoom": 15,
            "paint": {
                // increase weight as diameter breast height increases
                "heatmap-weight": {
                    "property": "elem",
                    "type": "exponential",
                    "stops": [
                        [1, 0],
                        [62, 1]
                    ]
                },
                // increase intensity as zoom level increases
                "heatmap-intensity": {
                    "stops": [
                        [11, 1],
                        [15, 3]
                    ]
                },
                // use sequential color palette to use exponentially as the weight increases
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0, "rgba(33,102,172,0)",
                    0.2, "rgb(156, 204, 216)",
                ],

                // increase radius as zoom increases
                "heatmap-radius": {
                    "stops": [
                        [11, 15],
                        [15, 20]
                    ]
                },
                // decrease opacity to transition into the circle layer
                "heatmap-opacity": {
                    "default": 1,
                    "stops": [
                        [14, 1],
                        [15, 0]
                    ]
                },
            }
        });

        map.addLayer({
            "id": "positive-point",
            "type": "circle",
            "source": "positive",
            "minzoom": 8,
            "paint": {

                // increase the radius of the circle as the zoom level and dbh value increases
                "circle-radius": {
                    "property": "elem",
                    "type": "exponential",
                    "stops": [
                        [{ zoom: 15, value: 1 }, 5],
                        [{ zoom: 15, value: 62 }, 10],
                        [{ zoom: 22, value: 1 }, 20],
                        [{ zoom: 22, value: 62 }, 50],
                    ]
                },
                "circle-color": "rgb(156, 204, 216)",
                "circle-stroke-color": "white",
                "circle-stroke-width": 1,
                "circle-opacity": {
                    "stops": [
                        [1, 0],
                        [2, 1]
                    ],

                }
            }
        });

        filterBy(0);

        document.getElementById('timeline').addEventListener('input', function (e) {
            var year = parseInt(e.target.value, 10);
            filterBy(year);
        });
    });

    // negative layer - loaded with d3 for ajax
    d3.json('./data/negative.geojson', function (err, data) {

        function filterBy(year) {
            var filters = ['==', 'year', year];
            map.setFilter('negative-point', filters);
            map.setFilter('negative-heat', filters);

            // Set the label to the year
            document.getElementById('year').textContent = years[year];
        }

        if (err) throw err;

        data.features = data.features.map(function (d) {
            d.properties.year = d.properties.year.toString().slice(-1)
            d.properties.year = Number(d.properties.year)
            return d;
        });

        map.addSource('negative', {
            'type': 'geojson',
            data: data
        });

        console.log(data)

        map.addLayer({
            "id": "negative-heat",
            "type": "heatmap",
            "source": "negative",
            "maxzoom": 15,
            "paint": {
                // increase weight as diameter breast height increases
                "heatmap-weight": {
                    "property": "elem",
                    "type": "exponential",
                    "stops": [
                        [1, 0],
                        [62, 1]
                    ]
                },
                // increase intensity as zoom level increases
                "heatmap-intensity": {
                    "stops": [
                        [11, 1],
                        [15, 3]
                    ]
                },
                // use sequential color palette to use exponentially as the weight increases
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0, "rgba(33,102,172,0)",
                    0.2, "rgb(248, 187, 184)",
                ],


                // increase radius as zoom increases
                "heatmap-radius": {
                    "stops": [
                        [11, 15],
                        [15, 20]
                    ]
                },
                // decrease opacity to transition into the circle layer
                "heatmap-opacity": {
                    "default": 1,
                    "stops": [
                        [14, 1],
                        [15, 0]
                    ]
                },
            }
        });

        map.addLayer({
            "id": "negative-point",
            "type": "circle",
            "source": "negative",
            "minzoom": 8,
            "paint": {

                // increase the radius of the circle as the zoom level and dbh value increases
                "circle-radius": {
                    "property": "elem",
                    "type": "exponential",
                    "stops": [
                        [{ zoom: 15, value: 1 }, 5],
                        [{ zoom: 15, value: 62 }, 10],
                        [{ zoom: 22, value: 1 }, 20],
                        [{ zoom: 22, value: 62 }, 50],
                    ]
                },
                "circle-color": "rgb(248, 187, 184)",
                "circle-stroke-color": "white",
                "circle-stroke-width": 1,
                "circle-opacity": {
                    "stops": [
                        [1, 0],
                        [2, 1]
                    ],

                }
            }
        });

        filterBy(0);

        document.getElementById('timeline').addEventListener('input', function (e) {
            var year = parseInt(e.target.value, 10);
            filterBy(year);
        });

        // map.on('click', 'positive-point', function (e) {
        //     new mapboxgl.Popup()
        //         .setLngLat(e.features[0].geometry.coordinates)
        //         .setHTML( e.features[0].properties.display_name)
        //         .addTo(map);
        // });

        // map.on('click', 'negative-point', function (e) {
        //     new mapboxgl.Popup()
        //         .setLngLat(e.features[0].geometry.coordinates)
        //         .setHTML( + e.features[0].properties.display_name)
        //         .addTo(map);
        // });
    });
});