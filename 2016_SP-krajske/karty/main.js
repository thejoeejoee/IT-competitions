$(function () {
    var types = ["♠", "♣", "♥", "♦"],
        values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

    var $card = $('<div class="card"><span class="type"></span></div>');
    for (var i = 0; i < 10; i++) {
        spawnCard();
    }

    function spawnCard() {
        var $new = $card.first().clone();

        var value = values[Math.floor(Math.random() * values.length)];
        var type = types[Math.floor(Math.random() * types.length)];

        $new.attr("data-value", value);
        $new.attr("data-type", type);
        $new.find(".type").attr("data-type", type);

        $new.appendTo("body");
        return $new;
    }

    $.each(types, function (i) {
        if (!$("[data-type=" + types[i] + "]").length) {
            $(".card").eq(Math.floor(Math.random() * 10)).attr("data-type", types[1]).find(".type").attr("data-type", types[1]);
        }
    });

    $("button").click(function () {
        $(".card").remove();
        setTimeout(function () {
            for (var i = 0; i < (parseInt($("input").val()) || 0); i++) {
                spawnCard()
            }
        }, 250);
    })
});