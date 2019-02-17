goog.require('constants');
goog.require('ui');
goog.require('networking');

class Viewer {
    constructor() {
        // /** @type {RCEventData} */
        // this.selectedEvent = null;
        this.ui = new UIHandler();
        this.networking = new NetworkClient();
        //this.mainPageParser = new MainPageParser();
        //this.eventPageParser = new EventPageParser();

        this.ui.loadingCircle.showLoadingCircle();
        this.networking.doAjaxCall('?pId[E]=0');
    }
}

/** @type {Viewer} */
var viewer = new Viewer();

function doAjaxCall(endpoint){
    viewer.ui.loadingCircle.showLoadingCircle();
    viewer.networking.doAjaxCall(endpoint);
}