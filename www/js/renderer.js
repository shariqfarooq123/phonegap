var loadUrl ="";
currentRequest = null ;
    function render_news_list(){
    	console.log("fetching json data...")
    	currentRequest= $.ajax({
    			               
                url: "http://shariq.herokuapp.com/news/",
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                	console.log("success");
                    console.log(data);
                    parse_data(data);                
                },
                error: function(e){
                    console.log("error")
                	console.log(e.message);
                }
              
     });
    }
    function parse_data(data){
        document.getElementById("mainpage").innerHTML= '<ul id="newslist" data-role="listview" data-inset="true"></ul>"';
        $("#newslist").trigger('create');
        

        $.each(data,function(index,element){
            $("#newslist").append("<li><a data-type="+element.type+" data-link="+element.link+" class='news' href=''><p class='ui-li-aside'><strong>"+element.age+"</strong></p><h2>"+element.headline+"</h2><h3>"+element.text+"</h3></a></li>");
           
            
        });
        $("#newslist").listview().listview('refresh');
         $(".news").click(function(event) {
                var link = $(this).data('link');
                var type = $(this).data('type');
                console.log("type= "+type);
                if(type=='pdf'){
                    loadUrl = "https://docs.google.com/viewer?url="+link;
                    console.log("url is "+loadUrl);
                    $("#pdfcontent").attr('src', loadUrl+"&embedded=true");
                    
                    $.mobile.pageContainer.pagecontainer("change", "#myPDF");
                    //window.location=loadUrl;
                    //$("#content").load(loadUrl);
                    
                 }
                else{
                  $("#pdfcontent").attr('src', "http://"+link);
                  $.mobile.pageContainer.pagecontainer("change", "#myPDF");
                }
            });
    }
function render_register_page(){
    if(currentRequest!=null){
        currentRequest.abort();
    }
    registerHTML = '<button onclick="render_std_login();" class="ui-btn ui-btn-inline">I\'m a student</button>'+
    '<button class="ui-btn ui-btn-inline" onclick="render_teacher_login();">I\'m a teacher</button>';
    document.getElementById("mainpage").innerHTML= registerHTML;

}
function render_std_login(){
     if(currentRequest!=null){
        currentRequest.abort();
    }
   document.getElementById("mainpage").innerHTML= "hey this is student page";
   //$("#mainpage").load("html/student.html");
   
}
function render_teacher_login(){
     if(currentRequest!=null){
        currentRequest.abort();
    }
    document.getElementById("mainpage").innerHTML= "hey this is teacher page";   
}



