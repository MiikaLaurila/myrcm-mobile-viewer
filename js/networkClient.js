goog.provide('networking');
class NetworkClient {
    constructor() {

    }


    printEventTable(endpoint, country) {

        let postOptions = '&tType=classic&cType=json&ajax=true';
        if (country) {
            const filter = '[{"field":{"label":"Country","value":"Country"},"operator":{"label":"equals","value":"eq"},"value":{"label":"\\"' + country.label + '\\"","value":"' + country.id + '"}}]';
            postOptions = postOptions + '&filter=' + filter;
        }

        const x = new XMLHttpRequest();

        x.open('GET', CORS_PREFIX + MAIN_PREFIX + endpoint + postOptions, true);

        x.onreadystatechange = (evt) => {
            if (x.readyState === 4 && x.status === 200) {
                const resultData = JSON.parse(x.response);
                viewer.ui.loadingCircle.hideLoadingCircle();

                if (resultData.DATA) {
                    document.getElementById('eventListContainer').innerHTML = resultData.DATA;
                } else {
                    document.getElementById('eventListContainer').innerHTML = resultData;
                }
            }
            else if (x.readyState === 4) {
                console.error('MYRCM data fetch failed');
            }
        };

        x.onerror = (err) => {
            console.error(err);
        }

        x.send();
    }

    printEventPage(endpoint) {
        const x = new XMLHttpRequest();

        x.open('GET', CORS_PREFIX + MAIN_PREFIX + "?" + endpoint, true);

        x.onreadystatechange = (evt) => {
            if (x.readyState === 4 && x.status === 200) {

                const parser = new DOMParser();
                const eventPage = parser.parseFromString(x.response, "text/html");
                const eventContent = eventPage.getElementsByClassName('REboxGreenContent')[0];

                Array.from(eventContent.getElementsByTagName('img')).forEach(img => {
                    img.parentElement.removeChild(img);
                });

                const colToRemove = eventContent.getElementsByClassName('event')[0].children[0].children[0].children[1];
                colToRemove.parentElement.removeChild(colToRemove);

                const paddingsToRemove = eventContent.getElementsByClassName('event')[0].getElementsByTagName('table')[0].getElementsByTagName('table')[0].getElementsByTagName('tr');
                Array.from(paddingsToRemove).forEach(row => {
                   row.removeChild(row.children[0]); 
                });

                document.getElementById('eventListContainer').appendChild(eventContent);
                viewer.ui.loadingCircle.hideLoadingCircle();
            }
            else if (x.readyState === 4) {
                console.error('MYRCM data fetch failed');
            }
        };

        x.onerror = (err) => {
            console.error(err);
        }

        x.send();
    }

    getSectionXML(eventID, sectionID, subSectionName){
        const x = new XMLHttpRequest();

        x.open('GET', CORS_PREFIX + REPORT_PREFIX + eventID + "/" + sectionID + "?treeView=" + subSectionName + "&cType=XML", true);

        x.onreadystatechange = (evt) => {
            if (x.readyState === 4 && x.status === 200) {

                const parser = new DOMParser();
                const sectionXML = parser.parseFromString(x.response, "text/xml");
                console.log(sectionXML);
                
                return sectionXML;
            }
            else if (x.readyState === 4) {
                console.error('MYRCM data fetch failed');
            }
        };

        x.onerror = (err) => {
            console.error(err);
        }

        x.send();
    }
}