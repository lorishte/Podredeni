import requesterService from '../requester';
const endPoint = '/settings';
const auth = 'admin';

export default {

    load: () => {

        return requesterService.get(endPoint, null);
    },

    getCurrentSetting: (settingName) => {

        let apiSettings = JSON.parse(sessionStorage.getItem('apiSettings'));

        if(!apiSettings){
            
        }


        return apiSettings[settingName];
    },

    edit: (state) => {

        let queryString = generateSettingsDetails(state);

        let url = "" + endPoint + queryString.result + "&";

        console.log(url);

        return requesterService.update(url, auth, null);
    },

};

function generateSettingsDetails(state) {

    let result = "?";

    for (var key in state) {

        if(state[key] == false) state[key] = 0;
        else if(state[key] == true) state[key] = 1;

        result += key + "=" + state[key] + "&";
    }

	return {
        result
	};
}
