// includes:
// Dataset
// DepartementCode
// AdditionalInfos

function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  get = eval(httpGet("https://geo.api.gouv.fr/communes?lat="+lat+"&lon="+long+"&fields=nom,code&format=json&geometry=centre"))
  departement = get[0]["code"].slice(0,2)
  if(departement == "97"){departement = get[0]["code"].slice(0,3)}
  if(departement != DepartementCode){window.location.replace("départements_communes/"+departement+"_communes.html")}else{
  
  p = document.createElement("p")
  p.innerHTML = get[0]["nom"]
  infos = document.createElement("div")
  infos.innerHTML = "population: "+Dataset["population"][get[0]["code"]]+" surface: "+Dataset["surface"][get[0]["code"]]

  document.body.insertBefore(infos, document.body.firstChild)
  document.body.insertBefore(p, document.body.firstChild)

  document.getElementById("c"+get[0]["code"]).style.fill = "blue"

  circle = document.createElementNS("http://www.w3.org/2000/svg","circle")
  circle.setAttributeNS(null,"cx",((long*AdditionalInfos[0])-AdditionalInfos[4])*AdditionalInfos[6])
  circle.setAttributeNS(null,"cy",(-(((lat*AdditionalInfos[1])-AdditionalInfos[5])-AdditionalInfos[3]))*AdditionalInfos[6])
  circle.setAttributeNS(null,"r",4)
  circle.setAttributeNS(null,"fill","skyblue")
  circle.setAttributeNS(null,"stroke-width",1)
  circle.setAttributeNS(null,"stroke","black")
  document.getElementsByTagName("svg")[0].appendChild(circle)
  
}});