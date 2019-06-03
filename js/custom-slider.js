function checkSliderButton(buttonID, sliderItems) {
    let webPageWidth = $(window).width();
    console.log('sliderItems : ', sliderItems.length)
    // console.log('webPageWidth : ',webPageWidth);
    const DesktopItems = 4,
        TabletItems = 3,
        MobileItems = 1;
    var enbaleButton = 0;
    switch (true) {
        case(webPageWidth >= 1000):
            {
                console.log('For Desktop : ');
                enbaleButton = sliderItems.length == DesktopItems
                    ? 0
                    : (sliderItems.length / DesktopItems);
                break;
            }
        case(webPageWidth >= 600 && webPageWidth <= 1000):
            {
                console.log('For Tablet : ');
                enbaleButton = sliderItems.length == TabletItems
                    ? 0
                    : (sliderItems.length / TabletItems);
                break;
            }
        case(webPageWidth >= 0 && webPageWidth <= 600):
            {
                console.log('For Mobile : ');
                enbaleButton = sliderItems.length == MobileItems
                    ? 0
                    : (sliderItems.length / MobileItems);
                break;
            }

        default:
            {
                break;
            }

    }
    enbaleButton = Math.floor(enbaleButton);
    if (enbaleButton > 0) {
        $('#' + buttonID).show();
    } else {
        // $('#'+buttonID).hide();
    }
    console.log('enbaleButton  : ', webPageWidth, enbaleButton)
}
$(document)
    .ready(function () {

        var articleSlider = $('#articleSlider'),
            totalSlideCount = 0,
            activeSlideCount = 0,
            sliderItems = $('#articleSlider .sliderItem');

        $("#articleSlider").owlCarousel({
            loop: true,
            autoWidth: false,
            margin: 20,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    slideBy: 1,
                    loop: false,

                    nav: false
                },
                600: {
                    items: 3,
                    slideBy: 3,
                    nav: false,
                    loop: false

                },
                1000: {
                    items: 4,
                    slideBy: 4,
                    nav: true,
                    loop: false
                }
            },
            onInitialize:function(event){
                
            }
        });
        articleSlider.on('changed.owl.carousel', function (e) {
            var currentindex = e.item.index;
            console.log('currentindex : ', currentindex, e.page)
            totalSlideCount = e.page.count;
            return currentindex;
        });

        setTimeout(() => {
            checkSliderButton('articleLoadMoreButton', sliderItems);
        }, 1000);
        $('#articleLoadMoreButton').on('click', function (event) {
            console.log('owlSlider : ', totalSlideCount);
            activeSlideCount+=1;
            console.log('activeSlideCount<totalSlideCount : ',activeSlideCount,totalSlideCount)
            if(totalSlideCount==0 || activeSlideCount<totalSlideCount)
            {
                articleSlider.trigger('to.owl.carousel',[activeSlideCount,500]);
            }
            else{
                activeSlideCount = 0;
                articleSlider.trigger('to.owl.carousel',[activeSlideCount,500]);
            }
            event.preventDefault();
        });

    });
