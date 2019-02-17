goog.provide('networking');
class NetworkClient {
    constructor() {

    }


    doAjaxCall(endpoint, country) {

        let filter = "";
        if (country) {
            filter = '[{"field":{"label":"Country","value":"Country"},"operator":{"label":"equals","value":"eq"},"value":{"label":"\\"' + country.label + '\\"","value":"' + country.id + '"}}]';
        }

        const x = new XMLHttpRequest();

        x.open('POST', CORS_PREFIX + MYRCM_PREFIX + endpoint, true);
        x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        x.onload = (evt) => {
            console.log(x.response);
            viewer.ui.loadingCircle.hideLoadingCircle();
            
            const resultData = JSON.parse(x.response);
            console.log(resultData);

            if (resultData.DATA) {
                document.getElementById('eventListContainer').innerHTML = resultData.DATA;
            } else {
                document.getElementById('eventListContainer').innerHTML = resultData;
            }
        };

        if (filter.length > 0) {
            x.send('cType=json&ajax=true&filter=' + filter);
        } else {
            x.send('cType=json&ajax=true');
        }



        // $.ajax({
        //     url: CORS_PREFIX + MYRCM_PREFIX + endpoint,
        //     type: "POST",
        //     data: jqueryObject,
        //     headers: {
        //         'X-Requested-With': 'XMLHttpRequest'
        //     },
        //     success: function (resultData) {
        //         viewer.ui.loadingCircle.hideLoadingCircle();
        //         console.log(resultData);

        //         if (resultData.DATA) {
        //             document.getElementById('eventListContainer').innerHTML = resultData.DATA;
        //         }
        //         else {
        //             document.getElementById('eventListContainer').innerHTML = resultData;
        //         }
        //     },
        //     error: function (resultData) {
        //         viewer.ui.loadingCircle.hideLoadingCircle();
        //         document.getElementById('eventListContainer').innerHTML = 'error downloading myrcm data';
        //         console.error('error downloading myrcm data')
        //     }
        // });
    }
}