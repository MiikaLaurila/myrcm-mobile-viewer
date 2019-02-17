
goog.provide('networking');
class NetworkClient {
    constructor() {

    }

    
    doAjaxCall(endpoint, country) {

        let dataObject = {};
        if (country) {
            const filter = '[{"field":{"label":"Country","value":"Country"},"operator":{"label":"equals","value":"eq"},"value":{"label":"\\"' + country.label +'\\"","value":"' + country.id + '"}}]';
            dataObject = {'filter' : filter, 'cType' : 'json', 'ajax' : true};
        }
        else {
            dataObject = { 'cType': 'json', 'ajax': true };
        }

        $.ajax({
            url: CORS_PREFIX + MYRCM_PREFIX + endpoint,
            type: "POST",
            data: dataObject,
            success: function (resultData) {
                viewer.ui.loadingCircle.hideLoadingCircle();
                console.log(resultData);
                
                if (resultData.DATA) {
                    document.getElementById('eventListContainer').innerHTML = resultData.DATA;
                }
                else {
                    document.getElementById('eventListContainer').innerHTML = resultData;
                }
            },
            error: function (resultData) {
                viewer.ui.loadingCircle.hideLoadingCircle();
                document.getElementById('eventListContainer').innerHTML = 'error downloading myrcm data';
                console.error('error downloading myrcm data')
            }
        });
    }
}


