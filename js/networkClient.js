goog.provide('networking');
class NetworkClient {
    constructor() {

    }


    doAjaxCall(endpoint, country) {

        let postOptions = '&tType=classic&cType=json&ajax=true';
        if (country) {
            const filter = '[{"field":{"label":"Country","value":"Country"},"operator":{"label":"equals","value":"eq"},"value":{"label":"\\"' + country.label + '\\"","value":"' + country.id + '"}}]';
            postOptions = postOptions + '&filter=' + filter;
        }

        const x = new XMLHttpRequest();

        x.open('GET', CORS_PREFIX + MYRCM_PREFIX + endpoint + postOptions, true);

        x.onreadystatechange = (evt) => {
            if (x.readyState === 4 && x.status === 200) {
                const resultData = JSON.parse(x.response);
                console.log(resultData);
                viewer.ui.loadingCircle.hideLoadingCircle();

                if (resultData.DATA) {
                    document.getElementById('eventListContainer').innerHTML = resultData.DATA;
                } else {
                    document.getElementById('eventListContainer').innerHTML = resultData;
                }
            }
            else if(x.readyState === 4){
                console.error('MYRCM data fetch failed');
            }
        };

        x.onerror = (err) => {
            console.error(err);
        }

        x.send();



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