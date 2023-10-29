const token = localStorage.getItem("token");

$(document).ready(function ()
{
  $("#Navigacija").load("Navigacija.html");
  $("form").submit(RegistrationForUser);
  $("form").submit(LogInForUser);
});

function Logout(event)
{
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.reload();
}

function RegistrationForUser(event)
{
  event.preventDefault();
  const currentusername = $("input[name='usernameregistration']").val();
  const currentpassword = $("input[name='psw']").val();
  const data = 
  {
  username: currentusername,
  password: currentpassword,
  };
  $.ajax({
    type: "POST",
    url: "https://www.fulek.com/data/api/user/register",
  
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function () 
    {
      window.location.href = "PrijaviSe.html";
    },
  });
}


function LogInForUser(event) 
{
  event.preventDefault();
  const currentusername = $("input[name='usernamelogin']").val();
  const currentpassword = $("input[name='psw']").val();
  const data = 
  {
    username: currentusername,
    password: currentpassword,
  };
  $.ajax({
    type: "POST",
    url: "https://www.fulek.com/data/api/user/login",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response)
    {
      if (response.statusCode === 200) 
      {
        $("#message").text("Uspjesna prijava :) Na pocetnu stranicu 3,2,1...");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);
        setTimeout(function () 
        {
          $(location).attr("href", "Pocetna.html");
        },3000);
      }
      else 
      {
        $("#message").text("User not found.");
      }
    },
  });
}

