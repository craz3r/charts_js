function ready() {
    var data = generateArrayOfDates(90, new Date(2017, 0, 1));
    var lastD = dateParseFromString(data[data.length - 1].date);
    var workdata = convertToArrays(data);

    var allBtn = document.querySelector("#all"),
        weekBtn = document.querySelector("#week"),
        monthBtn = document.querySelector("#month"),
        threeMonthsBtn = document.querySelector("#three");
    var ctx = document.getElementById("myChart");

    var chartOpts = {
            maintainAspectRatio: false,
            tooltips: {
                mode: 'nearest',
                intersect: false,
                displayColors: false
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            elements: {
                line: {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: '#05BFD5',
                    borderWidth: '2px',
                    capBezierPoints: false
                }
            }
    };

    var config = {
        type: 'line',
        data: {
            labels: workdata.x,
            datasets: [
                {
                    data: workdata.y
                }
            ]
        },
        options: chartOpts
    };

    allBtn.focus();
    var myChart = new Chart(ctx, config);

    allBtn.onclick = function() {
        myChart.data.labels = workdata.x;
        myChart.data.datasets.data = workdata.y;
        myChart.update();
    };
    weekBtn.onclick = function() {
        var week = data.filter(function(el) {
            return new Date(dateParseFromString(el.date)) > new Date(lastD - 1E3 * 60 * 60 * 24 * 7);
        });

        week = convertToArrays(week);
        myChart.data.datasets.data = week.y;
        myChart.data.labels = week.x;
        myChart.update();
    };
    monthBtn.onclick = function() {
        var month = data.filter(function(el) {
            return new Date(dateParseFromString(el.date)).getMonth() === new Date(lastD).getMonth();
        });

        month = convertToArrays(month);
        myChart.data.datasets.data = month.y;
        myChart.data.labels = month.x;
        myChart.update();
    };
    threeMonthsBtn.onclick = function() {
        var three = data.filter(function(el) {
            return new Date(dateParseFromString(el.date)).getMonth() > new Date(lastD).getMonth() - 3;
        });

        three = convertToArrays(three);
        myChart.data.datasets.data = three.y;
        myChart.data.labels = three.x;
        myChart.update();
    };
}

document.addEventListener("DOMContentLoaded", ready);


function generateArrayOfDates(number, start) {
    var arr = [];
    var counter = 0;
    while(counter < number) {
        var dt = new Date(start.getTime() + 1E3 * 60 * 60 * 24 * counter);
        //dt = getLocalDate(dt);
        arr.push({
            date: getLocalDate(dt),
            value: randomInteger(0, 1500)
        });
        counter++;
    }
    return arr;
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function dateParseFromString(str) {
    return Date.parse(str.split('.').reverse().join('-'));
}

function convertToArrays(data) {
    var converted = {};
    converted.x = [];
    converted.y = [];

    data.forEach(function(el) {
        converted.x.push(el.date);
        converted.y.push(el.value);
    });
    return converted;
}

function getLocalDate(input) {
    var day = input.getDate();
    if(day < 10) { day = "0" + day; }
    var month = input.getMonth() + 1;
    if(month < 10) { month = "0" + month; }
    var year = input.getFullYear();

    return day + '.' + month + '.' + year;
}