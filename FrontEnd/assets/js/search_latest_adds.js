$(document).ready(function () {
    $("#search_adds_button").keyup(function () {
        var filter = $(this).val();
        $("#product-list li").each(function () {
            
            if ($(this).children('div').children('h2').text().search(new RegExp(filter, "i")) < 0 && $(this).children('.div3').children('.div32').children('.ploc').children('.location').text().search(new RegExp(filter, "i")) < 0) 
            {
                $(this).fadeOut();
            }
            else
            {
                $(this).show();
            }
        });
    });
});
