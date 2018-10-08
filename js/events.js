class Events {
    static DispatchEventWithID(evtID)
    {
        window.dispatchEvent(new Event(EventID[evtID]));
    }
}

const EventID = {
    "mainPageDownloaded": "mainPageDownloaded",
    "showSelectedEventInfo": "showSelectedEventInfo"
}