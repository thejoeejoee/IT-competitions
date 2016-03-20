Date.prototype.monthDays = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
};
Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

var specials = [[1, 0], [1, 4], [8, 4], [5, 6], [6, 6], [28, 8], [28, 9], [17, 10], [24, 11], [25, 11], [26, 11]],
    months = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
jQuery(function ($) {
    var today = (new Date());
    var $info = $(".info");
    var $calendar = $(".calendar"),
        month = today.getMonth(),
        year = today.getFullYear(),
        days = today.monthDays(),
        selectedDay = 0;
    // returns, if day is special
    var isSpecial = function (year, month, day, index) {
        if (index % 7 == 6) {
            return true;
        }
        var special = false;
        $.each(specials, function (index, val) {
            if (val[0] == day && val[1] == month) {
                special = true;
            }
        });
        return special;
    };
    // redraws calendar for selected month and year
    var redrawCalendar = function () {
        $(".selector .year").text(year);
        $(".selector .month").text(month + 1);
        $calendar.find('.day, .week').remove();
        $calendar.find("li").removeClass("special").removeClass("today").each(function (index, el) {
            var $el = $(el);
            day = (index + 1 % days) + 1 - (new Date(year, month, 0)).getDay() - 1;
            if (index % 7 == 0) {
                $el.append($("<span></span>").addClass('week').text((new Date(year, month, day)).getWeekNumber() + ". "));
            }
            if (day < 1 || day - 1 > days) {
                return;
            }
            $el.data("year", year).data("month", month).data("day", day);
            $el.append($("<span></span>").addClass('day').text(day));
            $el.append($("<textarea></textarea>"));
            if (isSpecial(year, month, day, index)) {
                $el.addClass('special');
            }
            if (today.toDateString() == new Date(year, month, day).toDateString()) {
                $el.addClass("today");
            }
        });
    };
    redrawCalendar();
    // selectors
    $("button").click(function (e) {
        var action = $(this).data("action");
        $info.hide();
        $("li").removeClass("active");
        if (action == "next-year") {
            year += 1;
        } else if (action == "next-month") {
            if (month == 11) {
                year += 1;
                month = 0;
            } else {
                month += 1;
            }
        } else if (action == "prev-month") {
            if (month == 0) {
                year -= 1;
                month = 11;
            } else {
                month -= 1;
            }
        } else if (action == "prev-year") {
            year -= 1;
        }
        redrawCalendar();
    });
    // click on day
    $("li:has(.day)").click(function (e) {
        $("li").removeClass("active");
        $(this).addClass("active");
        $info.find(".month").text(months[$(this).data("month")]);
        $info.find(".year").text($(this).data("year"));
        $info.find(".day").text($(this).data("day"));
        $info.show();
        var day = $(this).data("day").toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        var month = ($(this).data("month") + 1).toString();
        if (month.length < 2) {
            month = "0" + month;
        }
        $.ajax({
            url: '//svatky.adresa.info/json',
            data: {lang: "cs", date: day + month}
        }).done(function (res) {
            $info.find(".name").text(res[0].name);
        }).fail(function () {
            alert("Svátek nelze načíst");
        });
    });
});