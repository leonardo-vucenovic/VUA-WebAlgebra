var Kolegiji = [];
var NaziviKolegija = [];
var TrenutniKolegijiUTablici = [];

let token1 = localStorage.getItem("token");

$("#tablica").hide();

function ShowTable() 
{
  $("#tablica").show();
}

ChechPage();
GetAllSubjectes();
function GetAllSubjectes()
{
  $.ajax({
    type: "GET",
    url: "https://www.fulek.com/data/api/supit/curriculum-list/hr",
    headers: { Authorization: "Bearer " + token1 },
    success: function (response)
    {
      response.data.forEach(function (q) 
      {
        Kolegiji.push(q);
        NaziviKolegija.push(q.kolegij);
      });
    },
  });
}

$(function () {
  $("#pretraga").autocomplete({
    source: NaziviKolegija,

    select: function (e, label) 
    {
      var vrijednost;
      Kolegiji.forEach((element) => {
        if (element.kolegij == label.item.label)
         {
          vrijednost = element.id;
        }
      });
      GetSubjectThenInsert(vrijednost);
    },
  });
});
function GetSubjectThenInsert(vrijednost)
{
  $.ajax(
    {
    type: "GET",
    url: `https://www.fulek.com/data/api/supit/get-curriculum/${vrijednost}`,
    headers: { Authorization: "Bearer " + token1 },
    success: function (response) 
    {
      InsertSubjectInTable(response.data);
      ShowTable();
      $("#pretraga").val("");
    },
  });
}



function Sum() 
{
  var Ukupnoects = document.getElementById("ects");
  var Ukupnosati = document.getElementById("sati");
  let zbrojects = 0;
  let zbrojsati = 0;
  TrenutniKolegijiUTablici.forEach((element) => 
  {
    zbrojects += element.ects;
    zbrojsati += element.sati;
  });
  Ukupnoects.innerHTML = zbrojects;
  Ukupnosati.innerHTML = zbrojsati;
  if (zbrojsati == 0) 
  {
    $("#tablica").hide();
  }
}

function InsertSubjectInTable(kolegij)
{
  TrenutniKolegijiUTablici.push(kolegij);
  let tablica = document.getElementById("tablica");
  let redak = tablica.insertRow(TrenutniKolegijiUTablici.length);
  let celija1 = redak.insertCell(0);
  let celija2 = redak.insertCell(1);
  let celija3 = redak.insertCell(2);
  let celija4 = redak.insertCell(3);
  let celija5 = redak.insertCell(4);
  let celija6 = redak.insertCell(5);
  let celija7 = redak.insertCell(6);

  var btn = document.createElement("button");
  btn.setAttribute("class", "brisi-button");
  btn.innerHTML = "Obriši";

  celija1.innerHTML = kolegij.kolegij;
  celija2.innerHTML = kolegij.ects;
  celija3.innerHTML = kolegij.sati;
  celija4.innerHTML = kolegij.predavanja;
  celija5.innerHTML = kolegij.vjezbe;
  celija6.innerHTML = kolegij.tip;
  celija7.appendChild(btn);
  Sum();
  DeleteSubjectFromTable(btn, kolegij);
}

function DeleteSubjectFromTable(button, kolegij)
{
  $(button).click(function () 
  {
    $(this).closest("tr").remove();
    for (var i = 0; i < TrenutniKolegijiUTablici.length; i++)
    {
      if (TrenutniKolegijiUTablici[i] == kolegij)
      {
        TrenutniKolegijiUTablici.splice(i, 1);
      }
    }
    Sum();
  });
}
/*
function ChechPage(){
  if(localStorage.getItem("token") === null);
  window.location.href = "Pocetna.html";
}
*/
