
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


// Event listener looking for changes in the design id. Depending on what design we choose we will select which options show
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
// Creating a variable that holds a div object.
let $totalCostDiv = $('<div id="total"></div>');
// We are appending the variable we created above.
$('.activities').append($totalCostDiv);
// Variable create do keep track of the total.
let totalCost = 0;
// Event listener in the activities class listening for clicks to determine what options are in the same time as other options.
$('.activities').on('click', function(event){
    const clicked = event.target;
    // We want to keep track of the price of what we clicked.
    let price = parseInt(clicked.dataset.cost.match(/\d+/g));
    // and the time as well
    let time = clicked.dataset.dayAndTime;
    let name = clicked.name;
     

    // Loop through the activities class inputs
    $('.activities input').each(function(){
        // if the time of what we clicked is equal to anything in the loop and isn't equal the name of what we clicked
        if(time === $(this).attr('data-day-and-time') && name !== $(this).attr('name')) 
        {   
            // then check to see if its clicked
            if (clicked.checked) {
                $(this).attr("disabled", true);
                $(this).parent().css('color', 'gray');
            } else {
                $(this).removeAttr("disabled");
                $(this).parent().css('color', 'black');
            }
        } 
    });
    // add the the price of what we clicked to totalCost and subtract if we uncheck
    if (clicked.checked){
         totalCost = totalCost += price;
     } else {
        totalCost = totalCost -= price;
     }
    $totalCostDiv.text('$' + totalCost);
});
// We want to hide these options and only show them if they are selected in payment method.
$('#paypal').hide();
$('#bitcoin').hide();
// We are checking what payment option we are selecting and then showing/hiding what we need
$('#payment').on('change', function(event){
    const paymentOption = event.target;
    

    if (paymentOption.value !== $('#payment').eq(0).attr('value')) {
        $('#payment option').eq(0).hide();
    }

    if (paymentOption.value === $('#payment option').eq(1).attr('value')) {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if (paymentOption.value === $('#payment option').eq(2).attr('value')) {
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();


    }
});

let $invalidName = $('<div id="validateName">Please provide name</div>');
$('#name').before($invalidName);
$('#validateName').hide().css( "color", "red" );
let $invalidEmail = $('<div id="validateEmail">Please provide email</div>');
$('#mail').before($invalidEmail);
$('#validateEmail').hide().css( "color", "red" );
let invalidActivity = $('<div id="validateActivity">Please pick an activity</div>');
$totalCostDiv.before(invalidActivity);
$('#validateActivity').hide().css( "color", "red" );
let $invalidCard = $('<div id="validateCard">Invalid Card Number</div>');
$('#cc-num').before($invalidCard);
$('#validateCard').hide().css("color", "red");

function validateName(){
    
    $('#name').on('keyup submit', function(event){
        let nameInput = $('#name').val();
        let regex = /^[a-zA-Z ]{2,30}$/;
        
        if (regex.test(nameInput)){
            $('#validateName').hide();
            return true;
        } else if (nameInput === ''){
            $('#validateName').show().css( "color", "red" ).text("Please provide name");
            return false;
        } else {
            $('#validateName').show().css( "color", "red" ).text("Invalid name");
            return false;
        }
    });

}
function validateEmail(){
    
    $('#mail').on('keyup submit', function(event){
        let emailInput = $('#mail').val();
        let regex =/(.+)@(.+){2,}\.(.+){2,}/;
        
        if (regex.test(emailInput)){
            $('#validateEmail').hide();
            return true;

        } else if (emailInput === ''){
            $('#validateEmail').show().css( "color", "red" ).text("Please provide email");
            return false;
        } else {
            $('#validateEmail').show().css( "color", "red" ).text("Invalid Email");
            return false;
        }
    });
}

function validateActivity(){
    
    $('.activities').on('change', function(event){
        
        if ($totalCostDiv.text() == '$0'){
            $('#validateActivity').show().css( "color", "red" );
            return false;
        } else {
            $('#validateActivity').hide();
            return true;
        }
});
}

function validateCard(){
    
    $('#cc-num').on('focusout', function(event){
        let ccInput = $('#cc-num').val();
        let regex = /^[0-9]{16}$/;
        if (regex.test(ccInput)){
            $('#validateCard').hide();
            return true;
        } else if (ccInput === ''){
            $('#validateCard').show().css( "color", "red" ).text("Please provide card number");
            return false;
        } else {
            $('#validateCard').show().css( "color", "red" ).text("Invalid card number");
            return false;
        }
    });
}
function validateZip(){
    let $invalidZip = $('<div id="validateZip">Invalid Zip Code</div>');
    $('#zip').before($invalidZip);
    $('#validateZip').hide();
    $('#zip').on('focusout', function(event){
        let zipInput = $('#zip').val();
        let regex = /^[0-9]{5}$/;
        if (regex.test(zipInput)){
            $('#validateZip').hide();
            return true;
        } else if (zipInput === ''){
            $('#validateZip').show().css( "color", "red" ).text("Please provide zip");
            return false;
        } else {
            $('#validateZip').show().css( "color", "red" ).text("Invalid zip");
            return false;
        }
    });
}
function validateCvv(){
    let $invalidCvv = $('<div id="validateCvv">Invalid CVV number</div>');
    $('#cvv').before($invalidCvv);
    $('#validateCvv').hide();
    $('#cvv').on('focusout', function(event){
        let cvvInput = $('#cvv').val();
        let regex = /^[0-9]{3}$/;
        if (regex.test(cvvInput)){
            $('#validateCvv').hide();
            return true;
        } else if (cvvInput === ''){
            $('#validateCvv').show().css( "color", "red" ).text("Please provide cvv");
            return false;
        } else {
            $('#validateCvv').show().css( "color", "red" ).text("Invalid cvv");
            return false;
        }
    });
}
function paymentMethod(){
    $('#payment').on('change', function(event){
        const paymentOption = event.target;
    
        if (paymentOption.value === $('#payment option').eq(1).attr('value')) {
            validateCard();
            validateZip();
            validateCvv();
        }
    
        
    });
}

    $('form').on('submit', function(event){
        event.preventDefault();
        validateName();
        validateEmail();
        validateActivity();
        paymentMethod();
    });

validateName();
validateEmail();
validateActivity();
paymentMethod();




