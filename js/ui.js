goog.provide('ui');
class UIHandler {
    constructor() {
        this.loadingCircle = new LoadingCircle();
        this.initializeCountrySelector();
        this.selectedEndPoint = ONLINE_ENDPOINT;
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
        viewer.networking.doAjaxCall(ONLINE_ENDPOINT);
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
        viewer.networking.doAjaxCall(ARCHIVE_ENDPOINT);
        this.selectedEndPoint = ARCHIVE_ENDPOINT;
    }

    initializeCountrySelector() {
        const countryDropdown = document.getElementById('countrySelect');

        COUNTRIES.forEach(country => {

            const countryValue = document.createElement('option');
            countryValue.value = country.id;
            countryValue.innerHTML = country.label;

            countryDropdown.appendChild(countryValue);

        });

        countryDropdown.addEventListener('change', (evt) => {

            if (countryDropdown.options[countryDropdown.selectedIndex].value === "all") {
                viewer.ui.loadingCircle.showLoadingCircle();
                viewer.networking.doAjaxCall(this.selectedEndPoint);
            }
            else {
                const country = {
                    id: countryDropdown.options[countryDropdown.selectedIndex].value,
                    label: countryDropdown.options[countryDropdown.selectedIndex].text
                };

                viewer.ui.loadingCircle.showLoadingCircle();
                viewer.networking.doAjaxCall(this.selectedEndPoint, country);
            }
        });
    }


}