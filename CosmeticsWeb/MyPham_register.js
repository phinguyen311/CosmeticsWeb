//register
$(function() {

    $("#name_error_message").hide();
    $("#email_error_message").hide();
    $("#phonenumber_error_message").hide();
    $("#password_error_message").hide();
    $("#retype_password_error_message").hide();
    
    var error_name = false;
    var error_email = false;
    var error_phonenumber = false;
    var error_password = false;
    var error_retype_password = false;
    
    $("#form_name").focusout(function(){
       check_name();
    });
    $("#form_email").focusout(function() {
       check_email();
    });
    $("#form_phonenumber").focusout(function() {
       check_email();
    });
    $("#form_password").focusout(function() {
       check_password();
    });
    $("#form_retype_password").focusout(function() {
       check_retype_password();
    });
    
    function check_name() {
       var pattern = /^[a-zA-Z]*$/;
       var name = $("#form_name").val();
       if (pattern.test(name) && name !== '') {
          $("#name_error_message").hide();
          $("#form_name").css("border-bottom","2px solid #34F458");
       } else {
          $("#name_error_message").html("Should contain only Characters");
          $("#name_error_message").show();
          $("#orm_fname").css("border-bottom","2px solid #F90A0A");
          error_name = true;
       }
    }
    
    function check_email() {
       var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
       var email = $("#form_email").val();
       if (pattern.test(email) && email !== '') {
          $("#email_error_message").hide();
          $("#form_email").css("border-bottom","2px solid #34F458");
       } else {
          $("#email_error_message").html("Invalid Email");
          $("#email_error_message").show();
          $("#form_email").css("border-bottom","2px solid #F90A0A");
          error_email = true;
       }
    }
    
    function check_phonenumber() {
       var pattern = /^[0-9]*$/;
       var phonenumber = $("#form_phonenumber").val();
       if (pattern.test(phonenumber) && phonenumber !== '') {
          $("#phonenumber_error_message").hide();
          $("#form_phonenumber").css("border-bottom","2px solid #34F458");
       } else {
          $("#phonenumber_error_message").html("Invalid Phone Number");
          $("#phonenumber_error_message").show();
          $("#form_phonenumber").css("border-bottom","2px solid #F90A0A");
          error_phonenumber = true;
       }
    }
    
    function check_password() {
       var password_length = $("#form_password").val().length;
       if (password_length < 8) {
          $("#password_error_message").html("Atleast 8 Characters");
          $("#password_error_message").show();
          $("#form_password").css("border-bottom","2px solid #F90A0A");
          error_password = true;
       } else {
          $("#password_error_message").hide();
          $("#form_password").css("border-bottom","2px solid #34F458");
       }
    }
    
    function check_retype_password() {
       var password = $("#form_password").val();
       var retype_password = $("#form_retype_password").val();
       if (password !== retype_password) {
          $("#retype_password_error_message").html("Passwords Did not Matched");
          $("#retype_password_error_message").show();
          $("#form_retype_password").css("border-bottom","2px solid #F90A0A");
          error_retype_password = true;
       } else {
          $("#retype_password_error_message").hide();
          $("#form_retype_password").css("border-bottom","2px solid #34F458");
       }
    }
    
    $("#registration_form").submit(function() {
        error_name = false;
        error_email = false;
        error_phonenumber = false;
        error_password = false;
        error_retype_password = false;
    
        check_name(); 
        check_email();
        check_phonenumber();
        check_password();
        check_retype_password();
    
       if (error_name === false && error_phonenumber === false && error_email === false && error_password === false && error_retype_password === false) {
          alert("Registration Successfull");
          return true;
       } else {
          alert("Please Fill the form Correctly");
          return false;
       }
    
    });
    });
//Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoieXV5b3BlaTAyIiwiYSI6ImNrd201amxtZTA2ajcybmw2dzZiOTJuODMifQ.rS4KYciM5pIZ96g6lDpf_Q';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.060982, 42.35725],
        zoom: 18,
    });