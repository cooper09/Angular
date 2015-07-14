
  $(function() 
  {

    var bookedDates = []
    //cooper s

    var months = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
    var d = new Date();

    // block dates - testing


    //var blocked_dates = [new Date(2015, 6, 8),new Date(2015, 6, 9),new Date(2015, 6, 10),new Date(2016, 0, 29)];

    
    var current_month_value = d.getMonth();
    var current_year_value = d.getFullYear();

     for (i=1 ; i < 4 ; i++ ) {
      var bookedObj = new Object();
      bookedObj = new Date (current_year_value, current_month_value, i);
      bookedDates.push(bookedObj);
    }

    console.log ("final bookedData array: ", bookedDates );

    //var blocked_dates = [new Date(2015, 6, 8),new Date(2015, 6, 9),new Date(2015, 6, 10),new Date(2016, 0, 29)];

    var blocked_dates = bookedDates;

    // console.log("current_year_value",current_year_value);
    // console.log("current_month_value",current_month_value);
    
    function onDateClicked(evt, bookedDates ){
      var target_html = evt.target.innerHTML;
      var day_picked = parseInt(target_html);
      var selected_date = new Date(current_year_value, current_month_value, day_picked);
      var str = ""+months[current_month_value]+" "+day_picked+", "+current_year_value;
      console.log("onDateClicked-Clicked date:",selected_date);
      console.log("onDateClicked-Current booked dates: ", bookedDates);

    }

    function setupClickHandling()
    {
      console.log("setting up click handling: " + bookedDates );
      for (var i = 0; i < 41; i++) {
        var day_identifier = "#day"+i;
        $(day_identifier).click(function(e){ onDateClicked(e, bookedDates); return false; });
      };
    }

   function dateIsBlocked(dateToCheck)
   {
    var blocked = false;

    //console.log("dateIsBlocked: " + dateToCheck );

    for (var i=0; i<blocked_dates.length; i++){
      var blockedDate = blocked_dates[i];
      // console.log("Checking "+dateToCheck+"vs "+blockedDate);
      var isSameDay = (dateToCheck.getDate() == blockedDate.getDate() 
        && dateToCheck.getMonth() == blockedDate.getMonth()
        && dateToCheck.getFullYear() == blockedDate.getFullYear())
      if( isSameDay ){
        // console.log("Matched Day!");
        blocked = true
      }
    }
    
    return blocked
   }

  function changeMonth(m,year){

      var month_name = months[m];
      var start = new Date(year,m,1)
      var first_day = start.getDay();
      var last_date = new Date(year,m,0).getDate();

      // console.log("first day of month",start);
      // console.log("last date of month",last_date);
      
      // console.log("first day of week",first_day);

      var current_date = 0;
      var current_slot = 0;
      var found_first = false;

      for (var week_num=0; week_num<=5; week_num++){
        for (var day_index=0; day_index<7; day_index++) {

          // console.log("week "+week_num +" day "+day_index);
          if( week_num == 0 && day_index == first_day){
            // console.log("found first!");
            found_first = true;
          }
          var day_identifier = "#day"+current_slot;
          var cell = $(day_identifier);
          if(found_first && current_date <= last_date){
            current_date++;
            cell.html(current_date);
          }else{
            cell.html("");
          }
          var cell_date = new Date(current_year_value, current_month_value, current_date);
          // console.log("current_year_value",current_year_value);
          // console.log("current_date",current_date);
          
          // console.log("cell_date",cell_date);
          if (dateIsBlocked(cell_date)){
            cell.css("background-color","red");
            cell.css("cursor","none");
          }else{
            cell.css("background-color","yellow");
          }
          current_slot++;
        }
      }
      // console.log(month_name);
      $( "#month_title" ).html(month_name+" "+year);
    }

    $("#prev_month").click(function(){
      current_month_value--;
      d = new Date(current_year_value, current_month_value);

      changeMonth(d.getMonth(), d.getFullYear())
    });

    $("#next_month").click(function(){
      current_month_value++;
      d = new Date(current_year_value, current_month_value);
      changeMonth(d.getMonth(), d.getFullYear())
    });

    setupClickHandling();
    changeMonth(d.getMonth(), d.getFullYear());
    

  });

   function getData() {
                $.ajax({
                    url: 'http://sonyainc.net/harlemreservations/test.php?format=json=1&callback=parseResponse',
                    dataType: 'jsonp',
                    jsonpCallback: 'parseResponse'
                }).error(function(e) {
                    alert("Error: " + e.error );
                });

           }; //end getEvents function 

  function parseResponse (response) {
              _resp = response;
              console.log("And for our new response: " , _resp.booked ); 
              bookedDates = _resp.booked;  
              console.log("bookedDates: ", bookedDates );
            }//end parseResponse
