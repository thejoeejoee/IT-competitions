$(function () {
    var $originalWindow = $(".window");
    var windowCounter = 2;

    var $secWindow = buildWindow();

    $secWindow.css({
        left: $originalWindow.width() + parseInt($originalWindow.css("left")) + 8,
        top: $originalWindow.css("top")
    });

    $(window.document).click(".window", function (evt) {
        makeActiveWindow($(evt.target));
    });
    $(window.document).on("click", ".header .maximize-toggle", function (evt) {
        $(evt.target).closest(".window").toggleClass("maximized");
    });
    $(window.document).on("click", ".window .close", function (evt) {
        $(evt.target).closest(".window").remove();
        buildWindow();
        buildWindow();
    });

    $(".window").last().addClass("active");

    function buildWindow() {
        var $new = $originalWindow.clone();
        $new.appendTo(".desktop.active");
        $new.find(".title").text("Okno " + windowCounter);
        var $activeDesktop = $(".desktop.active");
        var css =
        {
            left: Math.random() * ($activeDesktop.width() - $new.width()),
            top: Math.random() * ($activeDesktop.height() - $new.height())
        };
        makeActiveWindow($new);
        $new.css(css);
        windowCounter++;
        return $new;
    }

    function makeActiveWindow($window) {
        $('.desktop.active .window').removeClass("active");
        if ($window.hasClass("window")) {
            $window.addClass("active");
        } else {

            $window.closest(".window").addClass("active");
        }
    }

    $(window.document).on("dblclick", function (e) {
        if ($(e.target).parents(".window").length) {
            return;
        }
        var $window = buildWindow();
        makeActiveWindow($window);
        $window.css({
            left: Math.max(e.pageX - $window.width() / 2, 0),
            top: Math.max(e.pageY - $window.height() / 2, 0)
        });
    });

    var $dragging = null;
    $('body').on("mousedown", ".window .header", function (e) {
        $(this).parents(".window").addClass('draggable');
        makeActiveWindow($(e.target));
        var el_w = $('.draggable').outerWidth();
        $('body').on("mousemove", function (e) {
            if ($dragging) {
                $dragging.offset({
                    top: e.pageY,// - el_h / 2,
                    left: e.pageX - el_w / 2
                });
            }
        });
        $dragging = $(e.target).parents(".window");
    }).on("mouseup", ".draggable", function (e) {
        $dragging = null;
        $(this).removeClass('draggable');
    });


    var desktopCounter = 4;
    $(".tabs .add").click(function (e) {
        var $tab = $("<div></div>").addClass("tab").text("Plocha " + desktopCounter);
        $tab.attr("data-id", desktopCounter);
        var $desktop = $("<div></div>").addClass("desktop").attr("data-id", desktopCounter);
        $tab.insertBefore(e.target);
        $(".desktops").append($desktop);
        makeActiveDesktop(desktopCounter);
        desktopCounter++;
    });

    function makeActiveDesktop(id) {
        $(".tab, .desktop").removeClass("active");
        $(".tab[data-id=" + id + "]").addClass("active");
        $(".desktop[data-id=" + id + "]").addClass("active");
    }

    $(window.document).on("click", ".tab:not(.add)", function (e) {
        makeActiveDesktop($(e.target).attr("data-id"));
    })
});