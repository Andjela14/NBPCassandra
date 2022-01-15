$("#filter-options :checkbox").click(function() 
	{
       	$(".list-wrapper #product-list li").hide();
       	$("#filter-options :checkbox:checked").each(function() 
       	{
           $("." + $(this).val()).fadeIn();
		});
       
        if($('#filter-options :checkbox').filter(':checked').length < 1) 
        {
        	$(".list-wrapper #product-list li").fadeIn();        	
        }
        
    });
