
// Places focus on the name input
$(' #name ').focus();

// We want to initially hide the input form for the "other" job-role
$('#other-title').hide();


// Listens to the job-role selection for any changes
$('#title').on('change', function(event){
    const selectedRole = event.target.value;
    // If 'other' is selected than we show the input field for other
    if (selectedRole === "other"){
        $('#other-title').show();
     } else {
         $('#other-title').hide();
     }

});


// We want to initially hide the options to choose the shirt colors
$('#color option').hide();

// Dynamically adds another option that ask for the user to pick a theme
$('#color').prepend('<option>"Please select a T-shirt theme."</option>');
$('#color option').eq(0).attr("selected",true);



$('#design').on('change', function(event){
    const selectedDesign = event.target.value;
    if (selectedDesign === "js puns") {
        $('#color option').eq(1).show().attr("selected",true).next().show().next().show();
        $('#color option').eq(4).hide().next().hide().next().hide();
        $('#color option').eq(0).hide();
     } else if (selectedDesign === "heart js") {
        $('#color option').eq(4).show().attr("selected",true).next().show().next().show();
        $('#color option').eq(1).hide().next().hide().next().hide();
        $('#color option').eq(0).hide();

     } else {
        $('#color option').hide(); 
        $('#color option').eq(0).show().attr("selected",true);
        $('#color option').eq(1).attr('selected',false);
        $('#color option').eq(4).attr('selected',false);
     }

});

let totalCostDiv = $('<div>"This is a div."</div>');
$('.activities').append(totalCostDiv);

let totalCost = 0;

$('.activities').on('click', function(event){
    const clicked = event.target;
    console.log(clicked.dataset.cost);
    let price = parseInt(clicked.dataset.cost.match(/\d+/g));
    console.log(price);
    
    if (clicked.checked){
         totalCost = totalCost += price;
     } else {
        totalCost = totalCost -= price;
     }
     console.log(totalCost);

});