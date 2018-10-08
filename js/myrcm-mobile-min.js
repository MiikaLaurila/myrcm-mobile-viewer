var EventPageParser=function(){};var Events=function(){};Events.DispatchEventWithID=function(b){window.dispatchEvent(new Event(EventID[b]))};var EventID={mainPageDownloaded:"mainPageDownloaded",showSelectedEventInfo:"showSelectedEventInfo",showLoadingCircle:"showLoadingCircle",hideLoadingCircle:"hideLoadingCircle"};var LoadingCircle=function(){window.addEventListener(EventID.showLoadingCircle,this.ShowLoadingCircle.bind(this));window.addEventListener(EventID.hideLoadingCircle,this.HideLoadingCircle.bind(this));this.loadingImage=document.createElement("div");this.loadingImage.innerHTML='<div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div>';
this.loadingImage.classList.add("sk-circle");this.loadingImage.style.display="none";document.body.appendChild(this.loadingImage)};LoadingCircle.prototype.ShowLoadingCircle=function(){this.loadingImage.style.display="block"};LoadingCircle.prototype.HideLoadingCircle=function(){this.loadingImage.style.display="none"};var MainPageParser=function(){Events.DispatchEventWithID(EventID.showLoadingCircle);this.selectedPageID="evt";this.selectedPageHeader="Online Events";this.parsedPage=new Document;this.CreatePageSelect();this.DownloadSelectedMainPage();window.addEventListener(EventID.mainPageDownloaded,this.BuildCurrentParsedPage.bind(this))};
MainPageParser.prototype.DownloadSelectedMainPage=function(){var b=this,c=new XMLHttpRequest;c.open("GET",CORS_PREFIX+MYRCM_PREFIX+"?hId[1]="+this.selectedPageID+"&pLa=en&tType=classic");c.onload=c.onerror=function(){var a=new DOMParser;b.parsedPage=a.parseFromString(c.responseText,"text/html");Events.DispatchEventWithID(EventID.mainPageDownloaded);Events.DispatchEventWithID(EventID.hideLoadingCircle)};c.send()};
MainPageParser.prototype.CreatePageSelect=function(){var b=this,c=document.createElement("select"),a=document.createElement("option");a.innerHTML="Online Events";a.value="evt";c.appendChild(a);a=document.createElement("option");a.innerHTML="Upcoming Events";a.value="com";c.appendChild(a);a=document.createElement("option");a.innerHTML="Archived Events";a.value="arv";c.appendChild(a);c.addEventListener("change",function(){Events.DispatchEventWithID(EventID.showLoadingCircle);b.selectedPageHeader=c.options[c.selectedIndex].text;
b.selectedPageID=c.options[c.selectedIndex].value;var a=document.getElementById("rootDiv");a&&a.parentElement.removeChild(a);b.DownloadSelectedMainPage()});c.id="pageSelect";document.body.appendChild(c)};MainPageParser.prototype.BuildCurrentParsedPage=function(){this.BuildEventsTable()};
MainPageParser.prototype.BuildEventsTable=function(){var b=document.createElement("div");b.id="rootDiv";for(var c=document.createElement("div"),a=this.ParseEventList(),d={i:0};d.i<a.length;d={i:d.i},d.i++){var f=document.createElement("div"),e=document.createElement("div");e.innerHTML=a[d.i].name;e.classList.add("eventRowHeader");f.appendChild(e);e=document.createElement("div");e.innerHTML=a[d.i].host;e.classList.add("eventRowHost");f.appendChild(e);e=document.createElement("div");e.innerHTML=a[d.i].from+
" - "+a[d.i].to;e.classList.add("eventRowDate");f.appendChild(e);f.classList.add("eventRow");f.onclick=function(b){return function(){MOBILE_VIEW.selectedEvent=a[b.i];Events.DispatchEventWithID(EventID.showSelectedEventInfo);console.log(MOBILE_VIEW.selectedEvent)}}(d);c.appendChild(f)}c.id="eventTable";b.appendChild(c);document.body.appendChild(b)};
MainPageParser.prototype.ParseEventList=function(){for(var b=this.parsedPage.getElementsByClassName("dataList").item(0).children[0].children,c=[],a=1;a<b.length;a++){var d={host:"",name:"",country:"",from:"",to:"",onlineReports:"",onlineStreaming:"",hostPage:""};d.host=b[a].children[1].querySelector("a").innerHTML;d.hostPage=b[a].children[1].querySelector("a").href;d.country=b[a].children[3].innerHTML;d.from=b[a].children[4].innerHTML;d.to=b[a].children[5].innerHTML;"evt"!==this.selectedPageID?(d.name=
b[a].children[2].querySelector("a").innerHTML,d.onlineReports=b[a].children[2].querySelector("a").href):(d.name=b[a].children[2].innerHTML,d.onlineReports=b[a].children[6].querySelector("a").href,b[a].children[7].querySelector("a")?d.onlineStreaming=b[a].children[7].querySelector("a").href:d.onlineStreaming="N/A");c.push(d)}return c};var MobileView=function(){this.selectedEvent=null;this.loadingCircle=new LoadingCircle;this.mainPageParser=new MainPageParser},MYRCM_PREFIX="http://www.myrcm.ch/myrcm/main",CORS_PREFIX="http://192.168.11.52:6969/",MOBILE_VIEW=new MobileView;

//# sourceMappingURL=../js/myrcm-mobile-min.js.map