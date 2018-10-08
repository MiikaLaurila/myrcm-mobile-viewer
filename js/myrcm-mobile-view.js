class MobileView{
    constructor()
    {
        this.selectedEvent = null;
        this.mainPageParser = new MainPageParser();
    }
}

var MYRCM_PREFIX = "http://www.myrcm.ch/myrcm/main";
var CORS_PREFIX = "http://127.0.0.1:6969/";
var MOBILE_VIEW = new MobileView();