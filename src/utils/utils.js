/**
 * Created by Marian on 05/07/2018.
 */

function LoadFacebookScripts(){

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = "(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=602878320047542&autoLogAppEvents=1';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));";
    document.body.appendChild(s);

}

function formatDate(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();

    return `${('0' + day).slice(-2)}.${('0' + months).slice(-2)}.${years}`;

}

function formatDateAndTime(inputDate) {

    let date = new Date(inputDate);

    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${('0' + day).slice(-2)}.${('0' + months).slice(-2)}.${years} ${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`;

}

export default {
    formatDate,
    formatDateAndTime,
    LoadFacebookScripts
}