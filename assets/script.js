tasks = [];

var Today = (moment().format("MMMM D, YYYY"))
$("#currentDay").text(Today);

//load tasks
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"))
    if(!tasks) {
    tasks={};
    };
    displayTasks(tasks)
}

var displayTasks = function(){
    $.each(tasks, function(info, array){

    var taskEl = $("<p>").addClass("description task-item-" + info).text(array)

    $("#task-item-" + info).replaceWith(taskEl);
})
}

//color code hours bins
var hourAudit =function(){
    var Hour = moment().hour() 
    for(var i=8; i<18; i++){
        var taskSection = $("#task-"+i)  
        if(Hour>i){
            $(taskSection).addClass("past");
        } else if (Hour === i){
            $(taskSection).addClass("present");
        }else{
            $(taskSection).addClass("future")
        }
    }
}

//Task update with click
$(".taskBin").on("click", "p", function(){
    var text = $(this).text().trim();
    var inputText = $("<textarea>").addClass("form-control").val(text);
  
    $(this).replaceWith(inputText);
    inputText.trigger("focus");
});

//Task needs to be updated
$(".taskBin").on("blur", "textarea", function() {
  
    var text = $(this).val().trim();
    
    var taskEl = $("<p>").addClass("taskItem").text(text);

    $(this).replaceWith(taskEl);
});    

//Save tasks
$(".saveBtn").on("click", function(){
    var index = $(".saveBtn").index(this);
  
    tasks[index] = $(this).parent().find(".taskItem").text();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

  
setInterval(function(){
hourAudit();},1000*60*60);


loadTasks();
hourAudit();