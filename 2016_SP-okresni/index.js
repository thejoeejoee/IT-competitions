var app = angular.module('app', ["ngStorage"]);

app.controller('TripController', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.stations = ["Litovel", "Střeň", "Hynkov", "Chomoutov", "Olomouc"];
    $scope.startTime = new Date();
    $scope.startStation = "";
    $scope.endStation = "";
    $scope.computedDuration = 0;
    $scope.starts = [
        new Date(1, 1, 1971, 9, 0, 0),
        new Date(1, 1, 1971, 12, 0, 0),
        new Date(1, 1, 1971, 15, 0, 0)
    ];
    $scope.durations = {
        "0-1": 17,
        "1-2": 32 - 17,
        "2-3": 47 - 32,
        "3-4": 60 - 47,
        "4-3": 15,
        "3-2": 33 - 15,
        "2-1": 51 - 33,
        "1-0": 71 - 51
    };
    $scope.computeDuration = function () {
        if (!$scope.startStation || !$scope.endStation) {
            return;
        }

        var startIndex, endIndex;
        startIndex = $scope.stations.indexOf($scope.startStation);
        endIndex = $scope.stations.indexOf($scope.endStation);

        var shortIndex = startIndex + "-" + endIndex;
        if ($scope.durations.hasOwnProperty(shortIndex)) {
            $scope.computedDuration = $scope.durations[shortIndex];
        } else {
            var stationsRange = range(startIndex, endIndex, 1);
            var sumDuration = 0;
            var prevIndex = stationsRange[0];
            for (var i = 0; i < stationsRange.length; i++) {
                if (i == 0) {
                    continue;
                }
                sumDuration += $scope.durations[
                prevIndex + "-" + stationsRange[i]
                    ];
                prevIndex = stationsRange[i];
            }
            $scope.computedDuration = sumDuration;
        }
    };

    $localStorage.reservations = $localStorage.reservations || {};
    $scope.reservationName = "";
    $scope.reservationCount = 1;
    $scope.reservationTime = null;
    $scope.reserve = function () {
        if ($scope.reservationName in $localStorage.reservations) {
            alert(["Rezervace na jméno ", $scope.reservationName, " je již vystavena."].join(""));
            return;
        }
        $localStorage.reservations[$scope.reservationName] = [$scope.startStation, $scope.endStation, $scope.reservationTime, $scope.reservationCount];
        alert(["Spoj vyjíždějící v ", $scope.reservationTime, " zarezervován v úseku ",
            $scope.startStation, " - ", $scope.endStation, " na jméno ", $scope.reservationName, " pro ", $scope.reservationCount, " osob/u. Děkujeme!"].join(""));
    };

    $scope.deleteReservation = function () {
        if ($scope.deleteReservationName in $localStorage.reservations) {
            if (confirm(["Opravdu chcete smazat rezervaci na jméno ", $scope.deleteReservationName, "?"].join(""))) {
                delete $localStorage.reservations[$scope.deleteReservationName];
                alert("Rezervace smazána!");
            }

        } else {
            alert("Rezervace s tímto jménem se v našem systému nevyskytuje. Neudělali jste překlep?");
        }
    };
}]);


var range = function (start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

};