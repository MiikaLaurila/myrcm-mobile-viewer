class MobileView{
    constructor()
    {
        this.selectedEvent = null;
        this.loadingCircle = new LoadingCircle();
        this.mainPageParser = new MainPageParser();
    }
}

var MYRCM_PREFIX = "http://www.myrcm.ch/myrcm/main";
var CORS_PREFIX = "http://192.168.11.52:6969/";
var MOBILE_VIEW = new MobileView();