class MobileView{
    constructor()
    {
        /** @type {RCEventData} */
        this.selectedEvent = null;

        this.loadingCircle = new LoadingCircle();
        this.mainPageParser = new MainPageParser();
        this.eventPageParser = new EventPageParser();
    }
}

var MYRCM_PREFIX = "http://www.myrcm.ch/myrcm/main";
var CORS_PREFIX = "http://192.168.11.52:6969/";

/** @type {MobileView} */
var MOBILE_VIEW = new MobileView();