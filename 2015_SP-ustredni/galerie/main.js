jQuery(function ($) {
    var $select = $('select[name=galleries]'),
        $title = $('h1.title'),
        $photos = $('ul.photos'),
        $detail = $('.detail');

    var showTitle = function (title) {
        $title.text(title);
    };

    var showGallery = function (id) {
        var name = $select.find('[value=' + id + ']').text();
        $.get('http://192.168.2.222/api/json/' + id).success(function (res) {
            $photos.find('li').remove();
            $.each(res, function (i, photo) {
                var $photo = $('<li><img></li>');
                $photo.find('img').attr('src', photo.url);
                if (typeof photo.description != "undefined") {
                    $photo.attr('data-description', photo.description);
                }
                $photos.append($photo);
            });
        });
        showTitle(name);
    };

    var initDetail = function () {
        $photos.on('click', 'li img', function (e) {
            var $targetImg = $(this);
            console.log($targetImg);
            $detail.find('img').attr('src', $targetImg.attr('src'));
            if (typeof $targetImg.parent().data().description != "undefined") {
                $detail.find('h2').text($targetImg.parent().data().description).show();
            } else {
                $detail.find('h2').hide();
            }
            $detail.show();
        });
        $detail.click(function (e) {
            if (!$(e.target).is('img')) {
                $(this).hide();
            }
        });
    };

    initDetail();

    $select.on('change', function (e) {
        showGallery(e.target.value);
    });

    $.get('http://192.168.2.222/api/json/index').success(function (galleries) {
        var gallery;
        $.each(galleries, function (i, gallery) {
            $select.append($('<option></option>').attr('value', gallery.id).text(gallery.name));
        });
        var random = galleries[Math.floor(Math.random() * galleries.length)].id;
        $select.find('option[value=' + random + ']').attr('selected', 'selected');
        showGallery(random);
    });

    $(document).keypress(function (e) {
        if (e.which == 70 || e.which == 102) { // f or F
            var elem = $('html').get(0);
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else if (e.which == 0) {
            $detail.hide();
        }
    });

    $.ajaxError(function () {
        alert('Požadavek na API selhal!');
    });
});