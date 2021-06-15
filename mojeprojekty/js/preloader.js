(function($) {

    function preload(urls) {

        var dfd = $.Deferred(),
            length = urls.length,
            counter = 0;

        $.each(urls, function(i, url) {

            var img = $("<img>");

            img.on("load", function() {

                counter++;

                dfd.notify(url, counter, length);

                if(counter === length) {
                    dfd.resolve(urls);
                }

            });

            img.on("error", function() {

                length--;

                dfd.notify(null, counter, length);

                if(counter === length) {
                    dfd.resolve(urls);
                }

                // dfd.reject();

            });

            img.attr("src", url);

        });

        return dfd.promise();

    }

    $(document).ready(function() {

        function appendImage(url) {

            var img = $("<img>", {
                src: url,
                css: {
                    width: "25%",
                    float: "left",
                    opacity: 0
                }
            });

            $(".box").append(img);
            img.animate({
                opacity: 1
            }, 500);

        }

        var imgs = [
            "img/las1.jpg",
            "img/las2.jpg",
            "img/gory1.jpg",
            "img/gory2.jpg"
        ];

        // $.each(imgs, function(i, url) {

        //     appendImage(url);

        // });

        preload(imgs).then(
            function(imgs) {
                // $.each(imgs, function(i, url) {
                //     appendImage(url);
                // });
            },
            function() {
                $(".box").append("<p>Wystąpił błąd</p>");
            },
            function(url, counter, length) {

                if(url) {
                    appendImage(url);
                }

                var progress = $("#progress");

                progress.stop().animate({
                    width: (counter/length*100) + "%"
                }, 300);

            }
        );

    });

})(jQuery);


















