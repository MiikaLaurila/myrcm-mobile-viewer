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

        const url = "http://127.0.0.1:6969/" +
            'http://www.myrcm.ch/myrcm/main?hId[1]=' + this.selectedPageID + '&pLa=en';

        const that = this;
        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            success: function (data) {
                const parser = new DOMParser();
                that.parsedPage = parser.parseFromString(data, "text/html");
                Events.DispatchEventWithID(EventID.mainPageDownloaded);
            }
        });
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


        if (this.selectedPageID === "evt") {
            this.BuildEventPage();
        }

    }

    BuildEventPage() {
        const rootDiv = document.createElement('div');
        rootDiv.id = "rootDiv";
        rootDiv.appendChild(this.CreateHeader(this.selectedPageHeader));

        const eventTable = document.createElement('table');

        const eventList = this.ParseEventList();
        for (let i = 0; i < eventList.length; i++) {

            const eventRow = document.createElement('table');

            const eventRowHeader = document.createElement('tr');
            eventRowHeader.innerHTML = eventList[i].name;
            eventRow.appendChild(eventRowHeader);

            const eventRowButtons = document.createElement('tr');

            const leftButtonCell = document.createElement('td');
            const leftButton = document.createElement('button');
            leftButton.innerHTML = "Results";
            leftButton.onclick = function (evt) {
                console.log(eventList[i].onlineReports);
            };
            leftButtonCell.appendChild(leftButton);
            eventRowButtons.appendChild(leftButtonCell);

            const rightButtonCell = document.createElement('td');
            const rightButton = document.createElement('button');
            rightButton.innerHTML = "Streaming";
            rightButton.onclick = function (evt) {
                console.log(eventList[i].onlineStreaming);
            };

            if (eventList[i].onlineStreaming === "N/A") {
                rightButton.disabled = true;
            }
            rightButtonCell.appendChild(rightButton);
            eventRowButtons.appendChild(rightButtonCell);

            eventRow.appendChild(eventRowButtons);
            eventTable.appendChild(eventRow);
        }

        rootDiv.appendChild(eventTable);

        document.body.appendChild(rootDiv);
    }

    CreateHeader(headerText) {
        const header = document.createElement('h2');
        header.classList.add('pageHeader');
        header.innerHTML = headerText;
        return header;
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