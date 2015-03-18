// ==UserScript==
// @name         TagPro Favicon Flair
// @namespace    http://www.reddit.com/user/Bob_Smith_IV/
// @description  Changes the TagPro favicon to your current flair
// @include      http://tagpro-*.koalabeast.com*
// @author       BobSmithIV
// @version      0.1
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://raw.githubusercontent.com/BobSmithIV/TagProFaviconFlair/master/TagProFaviconFlair.user.js
// ==/UserScript==

// initialize flair (called first time the userscript is run only):
if(!GM_getValue('currentFlair')){
    GM_setValue('currentFlair','initial');
}

// change the favicon to the current flair:
changeFavicon(GM_getValue('currentFlair'));

// if the user clicks while on the profile, check to see if they changed their flair
$('body').click(function(){
  if (document.URL.search('profile') >= 0){ // if on the profile page,
    
    elements = document.getElementsByTagName('input'); 
    for(var i=0; i<elements.length; i++) {
        if(elements[i].name=="selectedFlair" && elements[i].checked){ // if this is a selected flair radio,
            if (GM_getValue('currentFlair')!=elements[i].value){ // if the selected flair is different to what it was before
                changeFavicon(elements[i].value); // change the favicon 
                GM_setValue('currentFlair',elements[i].value); // save the new value
            }
        }
    }
}
});

// changes the favicon to the inputted flair image, as hosted by myself on GitHub
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