$(' #name ').focus();

$('#other-title').hide();

$('#title').on('change', function(event){
    const selectedRole = event.target.value;
    if (selectedRole === "other"){
        $('#other-title').show();
     } else {
         $('#other-title').hide();
     }

});

$('#color option').hide();
$('#color').prepend('<option>"Please select a T-shirt theme."</option>');
$('#color option').eq(0).attr("selected",true);

$('#design').on('change', function(event){
    const selectedDesign = event.target.value;
    if (selectedDesign === "js puns"){
        $('#color option').eq(1).show().attr("selected",true).next().show().next().show();
        $('#color option').eq(4).hide().next().hide().next().hide();
     } else {
        $('#color option').eq(4).show().attr("selected",true).next().show().next().show();
        $('#color option').eq(1).hide().next().hide().next().hide();
     }

});