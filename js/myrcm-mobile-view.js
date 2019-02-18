goog.require('constants');
goog.require('ui');
goog.require('networking');

class Viewer {
    constructor() {
        this.sectionKey = localStorage.getItem('sectionKey');
        this.eventKey = localStorage.getItem('eventKey');

        this.ui = new UIHandler(REPORT_MODE);
        this.networking = new NetworkClient();

        if (!SEARCH.length > 0 && !REPORT_MODE) {
            this.ui.loadingCircle.showLoadingCircle();
            this.networking.printEventTable(ONLINE_ENDPOINT, JSON.parse(localStorage.getItem('countryFilter')));
        }
        else if (!REPORT_MODE) {
            this.ui.loadingCircle.showLoadingCircle();
            this.networking.printEventPage(SEARCH);
        }
        else {
            this.ui.loadingCircle.hideLoadingCircle();
        }

    }
}

/** @type {Viewer} */
var viewer = new Viewer();

function doAjaxCall(endpoint) {
    viewer.ui.loadingCircle.showLoadingCircle();
    viewer.networking.printEventTable(endpoint);
}

function openNewWindows(eventKey, sectionKey) {
    localStorage.setItem('eventKey', eventKey);
    localStorage.setItem('sectionKey', sectionKey);
    localStorage.setItem('eventName', document.getElementsByTagName('h1')[0].innerHTML);
    window.open("./report.html", "_self");
}

function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}