$(document).ready(function () 
{
    showLinks();
});
function showLinks()
{
  if (localStorage.getItem("token") === null)
  {
    if(window.location.pathname === "/ONama.html"){
      $("#aboutmeni").show();
    }
    else{
      $("#aboutmeni").hide();
    }
    $("#NastavniPlanBtn").hide();
    $("#OdjaviSeBtn").hide();
    $("#PrijaviSeBtn").show();
  } 
  else
  {
    var currUserElement = document.getElementById("currentUser");
    currUserElement.innerHTML = localStorage.getItem("user");
    $("#NastavniPlanBtn").show();
    $("#OdjaviSeBtn").show();
    $("#PrijaviSeBtn").hide();
  }
}
  