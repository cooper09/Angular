var Kalender = function(){
  console.log("Kalender");
  var calendar_html = '<div><table id="calendar_table"> <tr> <th class="month_ctl" id="prev_month" width="40px"><button><-</button></th> <th class="month_tite" id="month_title">Current Month</th> <th class="month_ctl" id="next_month" width="40px"><button>-></button></th> </tr> <tr> <table id="calendar"> <tr id="weekday_headers"> <th>Su</th> <th>Mo</th> <th>Tu</th> <th>We</th> <th>Th</th> <th>Fr</th> <th>Sa</th> </tr> <tr class="week" id="week0"> <th class="day" id="day0">0</th> <th class="day" id="day1">0</th> <th class="day" id="day2">0</th> <th class="day" id="day3">0</th> <th class="day" id="day4">0</th> <th class="day" id="day5">0</th> <th class="day" id="day6">0</th> </tr><tr class="week" id="week1"> <th class="day" id="day7">0</th> <th class="day" id="day8">0</th> <th class="day" id="day9">0</th> <th class="day" id="day10">0</th> <th class="day" id="day11">0</th> <th class="day" id="day12">0</th> <th class="day" id="day13">0</th> </tr><tr class="week" id="week2"> <th class="day" id="day14">0</th> <th class="day" id="day15">0</th> <th class="day" id="day16">0</th> <th class="day" id="day17">0</th> <th class="day" id="day18">0</th> <th class="day" id="day19">0</th> <th class="day" id="day20">0</th> </tr><tr class="week" id="week3"> <th class="day" id="day21">0</th> <th class="day" id="day22">0</th> <th class="day" id="day23">0</th> <th class="day" id="day24">0</th> <th class="day" id="day25">0</th> <th class="day" id="day26">0</th> <th class="day" id="day27">0</th> </tr><tr class="week" id="week4"> <th class="day" id="day28">0</th> <th class="day" id="day29">0</th> <th class="day" id="day30">0</th> <th class="day" id="day31">0</th> <th class="day" id="day32">0</th> <th class="day" id="day33">0</th> <th class="day" id="day34">0</th> </tr><tr class="week" id="week5"> <th class="day" id="day35">0</th> <th class="day" id="day36">0</th> <th class="day" id="day37">0</th> <th class="day" id="day38">0</th> <th class="day" id="day39">0</th> <th class="day" id="day40">0</th> <th class="day" id="day41">0</th> </tr> </table> </tr> </table></div';
  var months = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
  var blocked_dates;
  var d;
  var current_month_value;
  var current_year_value;
  var click_callback;

  this.insertCalender = function(div, booked, callback){
    click_callback = callback;
    div.html(calendar_html)
    d = new Date();
    blocked_dates = booked;
    current_month_value = d.getMonth();
    current_year_value = d.getFullYear();
    changeMonth(d.getMonth(), d.getFullYear());

    $("#prev_month").click(function(){
      current_month_value--;
      d = new Date(current_year_value, current_month_value);
      changeMonth(d.getMonth(), d.getFullYear());
    });

    $("#next_month").click(function(){
      current_month_value++;
      d = new Date(current_year_value, current_month_value);
      changeMonth(d.getMonth(), d.getFullYear());
    });

    setupClickHandling();
  }

  function setupClickHandling()
  {
    console.log("setting up click handling");
    for (var i = 0; i < 41; i++) {
      var day_identifier = "#day"+i;
      $(day_identifier).click(function(e){ onDateClicked(e); return false; });
    };
  }
  
  function onDateClicked(evt, bookedDates ){
    var target_html = evt.target.innerHTML;
    var day_picked = parseInt(target_html);
    var selected_date = new Date(current_year_value, current_month_value, day_picked);
    click_callback(selected_date);
  }

  function dateIsBlocked(dateToCheck)
   {
    var blocked = false;
    for (var i=0; i<blocked_dates.length; i++){
      var blockedDate = blocked_dates[i];
      var isSameDay = (dateToCheck.getDate() == blockedDate.getDate() 
        && dateToCheck.getMonth() == blockedDate.getMonth()
        && dateToCheck.getFullYear() == blockedDate.getFullYear())
      if( isSameDay ){
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

    var current_date = 0;
    var current_slot = 0;
    var found_first = false;

    for (var week_num=0; week_num<=5; week_num++){
      for (var day_index=0; day_index<7; day_index++) {
        if( week_num == 0 && day_index == first_day){
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

  
}

