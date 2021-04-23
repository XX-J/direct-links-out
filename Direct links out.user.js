
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         2.47
// @description     Removes all "You are leaving our site..." and redirection stuff from links
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт" и переадресацию из ссылок
// @icon            https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @update          https://github.com/XX-J/Direct-links-out/raw/master/Direct links out.user.js
// @author          nokeya & XX-J...
//   4PDA
// @include         *://4pda.ru/*
// @include         *://*.4pda.ru/*
//   DanielDefo
// @include         *://danieldefo.ru/*
// @include         *://*.danieldefo.ru/*
//   DeviantArt
// @include         *://deviantart.com/*
// @include         *://*.deviantart.com/*
//   Disq.us
// @include         *://disq.us/*
// @include         *://*.disq.us/*
// @include         *://disqus.com/*
// @include         *://*.disqus.com/*
//   Facebook
// @include         *://facebook.com/*
// @include         *://*.facebook.com/*
// @include         *://messenger.com/*
// @include         *://*.messenger.com/*
//   ForumAvia
// @include         *://*.forumavia.ru/*
//   Google
// @include         *://google.*
// @include         *://www.google.*
// @include         *://encrypted.google.*
//   Instagram
// @include         *://instagram.com/*
// @include         *://*.instagram.com/*
//   JoyReactor
// @include         *://joyreactor.cc/*
// @include         *://*.joyreactor.cc/*
// @include         *://reactor.cc/*
// @include         *://*.reactor.cc/*
// @include         *://joyreactor.com/*
// @include         *://*.joyreactor.com/*
//   Kickass
// @include         *://kat.cr/*
// @include         *://*.kat.cr/*
// @include         *://katproxy.is/*
// @include         *://*.katproxy.is/*
// @include         *://kickassto.co/*
// @include         *://*.kickassto.co/*
// @include         *://thekat.tv/*
// @include         *://*.thekat.tv/*
//   LRepacks
// @include         *://lrepacks.*
// @include         *://*.lrepacks.*
//   Addons.Mozilla.Org
// @include         *://addons.mozilla.org/*
//   Одноклассники
// @include         *://ok.ru/*
// @include         *://*.ok.ru/*
//   Picarto
// @include         *://picarto.tv/*
// @include         *://*.picarto.tv/*
//   Pixiv
// @include         *://pixiv.net/*
// @include         *://*.pixiv.net/*
//   Repack.me
// @include         *://repack.me/*
// @include         *://*.repack.me/*
//   RsLoad
// @include         *://rsload.net/*
// @include         *://*.rsload.net/*
//   Slack
// @include         *://*.slack.com/*
//   SoundCloud
// @include         *://soundcloud.com/*
// @include         *://*.soundcloud.com/*
//   Steam
// @include         *://steamcommunity.com/*
// @include         *://*.steamcommunity.com/*
//   Taker
// @include         *://taker.im/*
// @include         *://*.taker.im/*
//   Tumblr
// @include         *://tumblr.com/*
// @include         *://*.tumblr.com/*
//   Twitter
// @include         *://twitter.com/*
// @include         *://*.twitter.com/*
//   Upwork
// @include         *://upwork.com/*
// @include         *://*.upwork.com/*
//   USBDev
// @include         *://usbdev.ru/*
// @include         *://*.usbdev.ru/*
//   ВКонтакте
// @include         *://vk.com/*
// @include         *://*.vk.com/*
//   Wikimapia
// @include         *://wikimapia.org/*
//   Яндекс
// @include         *://yandex.*
// @include         *://*.yandex.*
//   ЯПлакалъ
// @include         *://yaplakal.com/*
// @include         *://*.yaplakal.com/*
//   YouTube
// @include         *://youtube.com/*
// @include         *://*.youtube.com/*
// ==/UserScript==


// anchors and functions
var anchor;  // string
var after;  // string or regexp
var B64, remAttr;
var retTrue = function() { return true; };  // dummy function to always return true

//   Simple rewrite link - based on anchors
function rwSimple(link) {
  if (!!link.getAttribute('href')) {
    link.href = decodeURIComponent(link.href);
    if (link.href.search(anchor) > 0) {
      link.href = link.href.substring(link.href.search(anchor) + anchor.length);
      if (B64) link.href = decodeURIComponent(escape(window.atob(link.getAttribute('href'))));
    }
    if (link.href.search(after) > 0) link.href = link.href.substring(0, link.href.search(after));
  }
  if (link.hasAttribute(remAttr)) link.removeAttribute(remAttr);
}

function rwaSimple() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}


//   Facebook
function rwFacebook(link) {
  if (/referrer_log/i.test(link.onclick)) {
    link.removeAttribute('onclick');
    link.removeAttribute('onmouseover');
  }
  rwSimple(link);
}

//   Google
function rwGoogle(link) {
  // replace global rwt script
  if (window.rwt && window.rwt != retTrue) {
    delete window.rwt;
    Object.defineProperty(window, 'rwt', { value: retTrue, writable: false });
  }
  // main search
  if (link.hasAttribute('onmousedown')) link.removeAttribute('onmousedown');
  // images
  if (link.hasAttribute('jsaction') && !(link.getAttribute('jsaction') == '')) link.setAttribute('jsaction', link.getAttribute('jsaction').replace(/(mousedown:irc.rl|keydown:irc.rlk)/g,''));
}

//   Kickass
function rwKickass(link) {
  var ndx = link.href.indexOf(anchor);
  if (ndx != -1) {
    link.href = window.atob(unescape(link.href.substring(ndx + anchor.length, link.href.length - 1)));
    link.className = '';
  }
}

//   Addons.Mozilla.Org
function rwAMO(link) {
  if (/outgoing.prod.mozaws.net/i.test(link.href)) {
    var tmp = link.href;
    link.href = "#";
    // we have to fight mozilla's replacing of direct redirect string with jquery events
    setTimeout(function() {
      tmp = decodeURIComponent(tmp.replace(/(http|https):\/\/outgoing.prod.mozaws.net\/v1\/[0-9a-zA-Z]+\//i,''));
      link.href = tmp.replace(/(\?|&)utm_content=.*/i,'');
    }, 100);
  }
}

//   Slack
function rwSlack(link) {
  if (link.hasAttribute('onclick')) link.removeAttribute('onclick');
  if (link.hasAttribute('onmouseover')) link.removeAttribute('onmouseover');
}

//   Twitter
function rwTwitter(link) {
  if (link.hasAttribute('data-expanded-url') && !(link.getAttribute('data-expanded-url') == '')) {
    link.href = link.getAttribute('data-expanded-url');
    link.removeAttribute('data-expanded-url');
  }
}
function rwaTwitter() {
  var links = document.getElementsByClassName('twitter-timeline-link');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}

//   ВКонтакте
function rwVK(link) {
  var parent = link.parentNode;
  if ((link.className === 'page_media_link_thumb') && parent.hasAttribute('href') && !(parent.getAttribute('href') == '')) {
    link.href = parent.getAttribute('href');
    parent.removeAttribute('href');
    parent.removeAttribute('onclick');
    link.removeAttribute('onclick');
  }

  var ndx = link.href.indexOf(anchor);
  if (ndx != -1) {
    var newlink = link.href.substring(ndx + anchor.length);
    var afterArr = ['&post=', '&el=snippet', '&cc_key='];
    for (var i = 0; i < afterArr.length; ++i) {
      ndx = newlink.indexOf(afterArr[i]);
      if (ndx != -1) newlink = newlink.substring(0, ndx);
    }
    link.href = unescape(newlink);
  }
}

//   Яндекс
//function rwYandex(link) {
//  if (link.hasAttribute('data-counter')) link.removeAttribute('data-counter');
//  rwSimple(link);
//}


// determine anchors, functions and listeners
var rwLink = rwSimple, rwAll = rwaSimple;
var HostName = window.location.hostname;

if (/(4pda|instagram)/i.test(HostName)) { anchor = 'u='; after = '&e='; }
else if (/danieldefo/i.test(HostName)) remAttr = 'data-proxy-href';
else if (/deviantart/i.test(HostName)) anchor = 'outgoing?';
else if (/disq/i.test(HostName)) { anchor = 'url='; after = /:([A-Za-z0-9]+)/; }
else if (/(facebook|messenger)/i.test(HostName)) { anchor = 'u='; after = '&h='; rwLink = rwFacebook; }
else if (/forumavia/i.test(HostName)) anchor = '/e/?l=';
else if (/google/i.test(HostName)) rwLink = rwGoogle;
else if (/(kat|kickass)/i.test(HostName)) { anchor = 'confirm/url/'; rwLink = rwKickass; }
else if (/(lrepacks|repack|rsload|usbdev)/i.test(HostName)) { anchor = 'url='; B64 = 1; }
else if (/mozilla/i.test(HostName)) rwLink = rwAMO;
else if (/ok/i.test(HostName)) { anchor = 'st.link='; after = '&st.name='; }
else if (/picarto/i.test(HostName)) { anchor = 'referrer?go='; after = '&ref='; }
else if (/(pixiv|reactor|soundcloud|steam|wikimapia)/i.test(HostName)) anchor = 'url=';
else if (/slack/i.test(HostName)) rwLink = rwSlack;
else if (/taker/i.test(HostName)) anchor = 'phpBB2/goto/';
else if (/tumblr/i.test(HostName)) { anchor = 'redirect?z='; after = '&t='; }
else if (/twitter/i.test(HostName)) { rwLink = rwTwitter; rwAll = rwaTwitter; }
else if (/upwork/i.test(HostName)) anchor = 'leaving-odesk?ref=';
else if (/vk/i.test(HostName)) { anchor = 'to='; rwLink = rwVK; }
else if (/yandex/i.test(HostName)) { anchor = '&img_url='; after = '&pos='; } // remAttr = 'data-counter'; rwLink = rwYandex;
else if (/yaplakal/i.test(HostName)) anchor = 'go/?';
else if (/youtube/i.test(HostName)) { anchor = 'q='; after = /&(redir_token|event|v)=/; }

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  var node = event.target;
  if (node instanceof HTMLAnchorElement) rwLink(node);
  var links = node.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}, false);

rwAll();
