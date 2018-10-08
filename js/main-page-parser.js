class MainPageParser {
    constructor() {
        this.selectedPageID = "evt";
        this.selectedPageHeader = "Online Events"

        /** @type {Document} */
        this.parsedPage = new Document();

        this.CreatePageSelect();
        this.DownloadSelectedMainPage();

        window.addEventListener(EventID.mainPageDownloaded, this.BuildCurrentParsedPage.bind(this));
    }

    DownloadSelectedMainPage() {

        const url = "http://" + window.location.hostname + ":6969/" +
           MYRCM_PREFIX + '?hId[1]=' + this.selectedPageID + '&pLa=en&tType=classic';

        const that = this;
        const x = new XMLHttpRequest();
        x.open('GET', url);
        x.onload = x.onerror = function () {
            const parser = new DOMParser();
            that.parsedPage = parser.parseFromString(x.responseText, "text/html");
            Events.DispatchEventWithID(EventID.mainPageDownloaded);
        };

        x.send();
    }

    CreatePageSelect() {

        const dropDown = document.createElement('select');

        const online = document.createElement('option');
        online.innerHTML = 'Online Events';
        online.value = 'evt';
        dropDown.appendChild(online);

        const upcoming = document.createElement('option');
        upcoming.innerHTML = 'Upcoming Events';
        upcoming.value = 'com';
        dropDown.appendChild(upcoming);

        const archived = document.createElement('option');
        archived.innerHTML = 'Archived Events';
        archived.value = 'arv';
        dropDown.appendChild(archived);

        dropDown.addEventListener('change', () => {
            this.selectedPageHeader = dropDown.options[dropDown.selectedIndex].text;
            this.selectedPageID = dropDown.options[dropDown.selectedIndex].value;

            const rootDiv = document.getElementById("rootDiv");
            if (rootDiv) {
                rootDiv.parentElement.removeChild(rootDiv);
            }

            this.DownloadSelectedMainPage();
        });

        dropDown.id = "pageSelect";
        document.body.appendChild(dropDown);
    }

    BuildCurrentParsedPage() {
        this.BuildEventsTable();
    }

    BuildEventsTable() {
        const rootDiv = document.createElement('div');
        rootDiv.id = "rootDiv";

        const eventTable = document.createElement('div');

        const eventList = this.ParseEventList();
        for (let i = 0; i < eventList.length; i++) {

            const eventRow = document.createElement('div');

            const eventRowHeader = document.createElement('div');
            eventRowHeader.innerHTML = eventList[i].name;
            eventRowHeader.classList.add('eventRowHeader');
            eventRow.appendChild(eventRowHeader);

            const eventRowHost = document.createElement('div');
            eventRowHost.innerHTML = eventList[i].host;
            eventRowHost.classList.add('eventRowHost');
            eventRow.appendChild(eventRowHost);

            const eventRowDate = document.createElement('div');
            eventRowDate.innerHTML = eventList[i].from + " - " + eventList[i].to;
            eventRowDate.classList.add('eventRowDate');
            eventRow.appendChild(eventRowDate);

            eventRow.classList.add('eventRow');
            
            eventRow.onclick = function(){
                MOBILE_VIEW.selectedEvent = eventList[i];
                Events.DispatchEventWithID(EventID.showSelectedEventInfo);
                console.log(MOBILE_VIEW.selectedEvent);
                
            }

            eventTable.appendChild(eventRow);
        }

        eventTable.id = "eventTable";
        rootDiv.appendChild(eventTable);

        document.body.appendChild(rootDiv);
    }


    ParseEventList() {
        const dataRows = this.parsedPage.getElementsByClassName('dataList').item(0).children[0].children;
        let eventList = [];

        for (let i = 1; i < dataRows.length; i++) {

            const event = {
                host: "",
                name: "",
                country: "",
                from: "",
                to: "",
                onlineReports: "",
                onlineStreaming: "",
                hostPage: ""
            };

            event.host = dataRows[i].children[1].querySelector('a').innerHTML;
            event.hostPage = dataRows[i].children[1].querySelector('a').href;
            event.country = dataRows[i].children[3].innerHTML;
            event.from = dataRows[i].children[4].innerHTML;
            event.to = dataRows[i].children[5].innerHTML;

            if (this.selectedPageID !== "evt") {
                event.name = dataRows[i].children[2].querySelector('a').innerHTML;
                event.onlineReports = dataRows[i].children[2].querySelector('a').href;
            } else {
                event.name = dataRows[i].children[2].innerHTML;
                event.onlineReports = dataRows[i].children[6].querySelector('a').href;

                if (dataRows[i].children[7].querySelector('a')) {
                    event.onlineStreaming = dataRows[i].children[7].querySelector('a').href;
                } else {
                    event.onlineStreaming = "N/A";
                }

            }

            eventList.push(event);
        }

        return eventList;
    }
}