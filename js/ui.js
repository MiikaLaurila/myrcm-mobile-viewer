goog.provide('ui');
class UIHandler {
    constructor(reportMode) {
        this.loadingCircle = new LoadingCircle();
        if (!reportMode) {
            this.selectedCountry = null;
            this.initializeCountrySelector();
            this.selectedEndPoint = ONLINE_ENDPOINT;
        }
        else {
            document.getElementsByClassName('headerText')[0].innerHTML = localStorage.getItem('eventName');
            this.lastView = null;
            this.createSectionButtons();
        }

    }

    /**
     * @param {HTMLTableCellElement} clickedButton 
     */
    selectOnlineEvents(clickedButton) {
        Array.from(document.getElementsByClassName('headerBarButton')).forEach(elem => {
            elem.classList.remove("selected");
        });
        clickedButton.classList.add("selected");

        this.loadingCircle.showLoadingCircle();
        viewer.networking.printEventTable(ONLINE_ENDPOINT, this.selectedCountry);
        this.selectedEndPoint = ONLINE_ENDPOINT;
    }

    /**
     * @param {HTMLTableCellElement} clickedButton 
     */
    selectArchiveEvents(clickedButton) {
        Array.from(document.getElementsByClassName('headerBarButton')).forEach(elem => {
            elem.classList.remove("selected");
        });
        clickedButton.classList.add("selected");

        this.loadingCircle.showLoadingCircle();
        viewer.networking.printEventTable(ARCHIVE_ENDPOINT, this.selectedCountry);
        this.selectedEndPoint = ARCHIVE_ENDPOINT;
    }

    initializeCountrySelector() {
        const countryDropdown = document.getElementById('countrySelect');
        const preSelectCountry = JSON.parse(localStorage.getItem('countryFilter'));

        COUNTRIES.forEach((country, index) => {

            const countryValue = document.createElement('option');
            countryValue.value = country.id;
            countryValue.innerHTML = country.label;

            countryDropdown.appendChild(countryValue);

            if (preSelectCountry && preSelectCountry.id === country.id) {
                this.selectedCountry = preSelectCountry;
                countryDropdown.selectedIndex = index + 2;
            }

        });

        countryDropdown.addEventListener('change', (evt) => {

            if (countryDropdown.options[countryDropdown.selectedIndex].value === "all") {
                viewer.ui.loadingCircle.showLoadingCircle();
                viewer.networking.printEventTable(this.selectedEndPoint);
                this.selectedCountry = null;
                localStorage.removeItem('countryFilter');
            }
            else {
                const country = {
                    id: countryDropdown.options[countryDropdown.selectedIndex].value,
                    label: countryDropdown.options[countryDropdown.selectedIndex].text
                };

                this.selectedCountry = country;
                localStorage.setItem('countryFilter', JSON.stringify(country));

                viewer.ui.loadingCircle.showLoadingCircle();
                viewer.networking.printEventTable(this.selectedEndPoint, country);
            }
        });
    }

    createSectionButtons() {

        const wrapper = document.createElement('div');
        const table = document.createElement('table');
        wrapper.appendChild(table);

        const buttonList = [
            ["TimeSchedule", "Timeschedule"],
            ["Participant", "Participants"],
            ["Arrangement", "Heat arrangement"],
            ["RankingList", "Rankinglists"],
            ["FreePractice", "Free practice"],
            ["Practice", "Practice"],
            ["Qualification", "Qualifying"],
            ["Final", "Finals"]
        ];

        buttonList.forEach(btn => {
            const row = document.createElement('tr');
            table.appendChild(row);

            const data = document.createElement('td');
            row.appendChild(data);

            data.innerHTML = btn[1];

            row.addEventListener('click', () => {
                viewer.networking.getSectionXML(viewer.eventKey, viewer.sectionKey, btn[0]);
            });
        });

        document.getElementById('eventListContainer').appendChild(wrapper);
    }


}