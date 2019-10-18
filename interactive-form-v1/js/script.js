
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

let $totalCostDiv = $('<div>"This is a div."</div>');
$('.activities').append($totalCostDiv);
let totalCost = 0;

$('.activities').on('click', function(event){
    const clicked = event.target;
    let price = parseInt(clicked.dataset.cost.match(/\d+/g));
    let time = clicked.dataset.dayAndTime;
    let name = clicked.name;
     
    $('.activities input').each(function(){
        if(time === $(this).attr('data-day-and-time') && name !== $(this).attr('name')) 
        {   
            if (clicked.checked) {
                $(this).attr("disabled", true);
                $(this).parent().css('color', 'gray');
            } else {
                $(this).removeAttr("disabled");
                $(this).parent().css('color', 'black');
            }
        } 
    });
    
    if (clicked.checked){
         totalCost = totalCost += price;
     } else {
        totalCost = totalCost -= price;
     }
    $totalCostDiv.text('$' + totalCost);
});

$('#paypal').hide();
$('#bitcoin').hide();

$('#payment').on('change', function(event){
    const paymentOption = event.target;

    if (paymentOption.value !== $('#payment').eq(0).attr('value')) {
        $('#payment option').eq(0).hide();
    }

    if (paymentOption.value === $('#payment option').eq(1).attr('value')) {
        console.log('you picked the credit card');
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if (paymentOption.value === $('#payment option').eq(2).attr('value')) {
        console.log('you picked the paypal');
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();


    }
});