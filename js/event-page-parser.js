class EventPageParser {
    constructor() {
        /** @type {Document} */
        this.parsedPage = new Document();

        window.addEventListener(EventID.showSelectedEventInfo, this.BuildEventPage.bind(this));
    }

    BuildEventPage() {
        let rootDiv = document.getElementById("rootDiv");
        if (rootDiv) {
            rootDiv.parentElement.removeChild(rootDiv);
        }

        rootDiv = document.createElement('div');
        rootDiv.id = "rootDiv";

        const eventInfoContainer = document.createElement('div');
        eventInfoContainer.id = "eventInfoContainer";

        const eventName = document.createElement('h2');
        eventName.innerHTML = MOBILE_VIEW.selectedEvent.name;
        eventInfoContainer.appendChild(eventName);

        const eventHost = document.createElement('p');
        eventHost.innerHTML = MOBILE_VIEW.selectedEvent.host;
        eventInfoContainer.appendChild(eventHost);

        const eventCountry = document.createElement('p');
        eventCountry.innerHTML = MOBILE_VIEW.selectedEvent.country;
        eventInfoContainer.appendChild(eventCountry);

        const eventDate = document.createElement('p');
        eventDate.innerHTML = MOBILE_VIEW.selectedEvent.from + " - " + MOBILE_VIEW.selectedEvent.to;
        eventInfoContainer.appendChild(eventDate);

        rootDiv.appendChild(eventInfoContainer);
        document.body.appendChild(rootDiv);

        MOBILE_VIEW.loadingCircle.ShowLoadingCircle(35);

        this.DownloadEventPage();
    }

    DownloadEventPage() {
        const url = CORS_PREFIX + MYRCM_PREFIX + MOBILE_VIEW.selectedEvent.onlineReports;
        console.log(url);


        const that = this;
        const x = new XMLHttpRequest();
        x.open('GET', url);
        x.onload = x.onerror = function () {
            const parser = new DOMParser();
            that.parsedPage = parser.parseFromString(x.responseText, "text/html");
            Events.DispatchEventWithID(EventID.hideLoadingCircle);
            that.BuildResultLinks();
        };

        x.send();
    }

    BuildResultLinks() {
        const rootDiv = document.getElementById('rootDiv');

        const tdList = this.parsedPage.getElementsByTagName('td');

        for (let i = 0; i < tdList.length; i++) {
            if (tdList[i].textContent === "Streaming:" && tdList[i + 1].getElementsByTagName('a').length > 0) {
                const streamingButton = document.createElement('div');
                streamingButton.innerHTML = "Online Streaming";
                streamingButton.id = "streamingButton";
                streamingButton.onclick = function () {
                    let affix = tdList[i + 1].getElementsByTagName('a')[0].getAttribute('href');
                    affix = affix.substring(0, affix.search('&tType'));
                    window.open(MYRCM_PREFIX + affix, "_blank");
                }

                rootDiv.appendChild(streamingButton);

            } else if (tdList[i].textContent === "Sections:") {
                const sections = tdList[i + 1].getElementsByTagName('a');
                console.log(tdList[i + 1]);


                for (let j = 0; j < sections.length; j++) {
                    const sectionButton = document.createElement('div');
                    sectionButton.innerHTML = sections[j].innerHTML;
                    sectionButton.classList.add('sectionButton');

                    if (j === 0) {
                        sectionButton.id = "firstSectionButton";
                    }

                    sectionButton.onclick = function () {
                        console.log(sections[j].getAttribute('onclick'));
                    }

                    rootDiv.appendChild(sectionButton);
                }
            }
        }
    }
}