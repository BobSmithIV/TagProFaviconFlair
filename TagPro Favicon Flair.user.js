// ==UserScript==
// @name         TagPro Favicon Flair
// @namespace    http://www.reddit.com/user/Bob_Smith_IV/
// @description  Changes the TagPro favicon to your current flair
// @include      http://tagpro-*.koalabeast.com*
// @author       BobSmithIV
// @version      0.1
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://raw.githubusercontent.com/BobSmithIV/TagProFaviconFlair/master/TagPro%20Favicon%20Flair.user.js
// ==/UserScript==

if(!GM_getValue('currentFlair')){
    GM_setValue('currentFlair','initial');
}

changeFavicon(GM_getValue('currentFlair'));

$('body').click(function(){
  if (document.URL.search('profile') >= 0){
    elements = document.getElementsByTagName('input');
    for(var i=0; i<elements.length; i++) {
        if(elements[i].name=="selectedFlair" && elements[i].checked){
            if (GM_getValue('currentFlair')!=elements[i].value){
                changeFavicon(elements[i].value);
            }
            GM_setValue('currentFlair',elements[i].value);
        }
    }
}
});

function changeFavicon(flair) {
    var link = document.createElement('link');
    var oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/BobSmithIV/TagProFaviconFlair/master/flairs/'+flair+'.png';
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}