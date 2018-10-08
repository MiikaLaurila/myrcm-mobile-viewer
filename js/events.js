class Events {
    static DispatchEventWithID(evtID)
    {
        window.dispatchEvent(new Event(EventID[evtID]));
    }
}

const EventID = {

    //MAIN PAGE
    "mainPageDownloaded": "mainPageDownloaded",
    "showSelectedEventInfo": "showSelectedEventInfo",

    //LOADING CIRCLE
    "showLoadingCircle": "showLoadingCircle",
    "hideLoadingCircle": "hideLoadingCircle"
}