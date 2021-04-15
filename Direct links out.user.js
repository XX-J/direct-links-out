
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         2.44
// @description     Removes all "You are leaving our site..." and redirection stuff from links
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт" и переадресацию из ссылок
// @icon            https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @update          https://github.com/XX-J/Direct-links-out/raw/master/Direct links out.user.js
// @author          nokeya & XX-J...
//   4PDA
// @match           *://4pda.ru/*
// @match           *://*.4pda.ru/*
//   DanielDefo
// @match           *://danieldefo.ru/*
// @match           *://*.danieldefo.ru/*
//   DeviantArt
// @match           *://deviantart.com/*
// @match           *://*.deviantart.com/*
//   Disq.us
// @match           *://disq.us/*
// @match           *://*.disq.us/*
// @match           *://disqus.com/*
// @match           *://*.disqus.com/*
//   Facebook
// @match           *://facebook.com/*
// @match           *://*.facebook.com/*
// @match           *://messenger.com/*
// @match           *://*.messenger.com/*
//   ForumAvia
// @match           *://*.forumavia.ru/*
//   Google
// @include         *://google.*
// @include         *://www.google.*
// @include         *://encrypted.google.*
//   Instagram
// @match           *://instagram.com/*
// @match           *://*.instagram.com/*
//   JoyReactor
// @match           *://joyreactor.cc/*
// @match           *://*.joyreactor.cc/*
// @match           *://reactor.cc/*
// @match           *://*.reactor.cc/*
// @match           *://joyreactor.com/*
// @match           *://*.joyreactor.com/*
//   Kickass
// @match           *://kat.cr/*
// @match           *://kickassto.co/*
// @match           *://katproxy.is/*
// @match           *://thekat.tv/*
// @match           *://*.kat.cr/*
// @match           *://*.kickassto.co/*
// @match           *://*.katproxy.is/*
// @match           *://*.thekat.tv/*
//   LRepacks
// @match           *://lrepacks.ru/*
// @match           *://*.lrepacks.ru/*
//   Addons.Mozilla.Org
// @match           *://addons.mozilla.org/*
//   Одноклассники
// @match           *://ok.ru/*
// @match           *://*.ok.ru/*
//   Picarto
// @match           *://picarto.tv/*
// @match           *://*.picarto.tv/*
//   Pixiv
// @match           *://pixiv.net/*
// @match           *://*.pixiv.net/*
//   Repack.me
// @match           *://repack.me/*
// @match           *://*.repack.me/*
//   RsLoad
// @match           *://rsload.net/*
// @match           *://*.rsload.net/*
//   Slack
// @match           *://*.slack.com/*
//   SoundCloud
// @match           *://soundcloud.com/*
// @match           *://*.soundcloud.com/*
//   Steam
// @match           *://steamcommunity.com/*
// @match           *://*.steamcommunity.com/*
//   Taker
// @match           *://taker.im/*
// @match           *://*.taker.im/*
//   Tumblr
// @match           *://tumblr.com/*
// @match           *://*.tumblr.com/*
//   Twitter
// @match           *://twitter.com/*
// @match           *://*.twitter.com/*
//   Upwork
// @match           *://upwork.com/*
// @match           *://*.upwork.com/*
//   USBDev
// @match           *://usbdev.ru/*
// @match           *://*.usbdev.ru/*
//   ВКонтакте
// @match           *://vk.com/*
// @match           *://*.vk.com/*
//   Wikimapia
// @match           *://wikimapia.org/*
//   Яндекс
// @match           *://yandex.ru/*
// @match           *://yandex.ua/*
// @match           *://yandex.by/*
// @match           *://yandex.kz/*
// @match           *://yandex.com.tr/*
// @match           *://yandex.com/*
// @match           *://*.yandex.ru/*
// @match           *://*.yandex.ua/*
// @match           *://*.yandex.by/*
// @match           *://*.yandex.kz/*
// @match           *://*.yandex.com.tr/*
// @match           *://*.yandex.com/*
//   ЯПлакалъ
// @match           *://yaplakal.com/*
// @match           *://*.yaplakal.com/*
//   YouTube
// @match           *://youtube.com/*
// @match           *://*.youtube.com/*
// ==/UserScript==


// anchors and functions
var anchor, after, ndx, B64, rwLink, rwAll;
rwLink = rwAll = function() {};
var retTrue = function() { return true; };  // dummy function to always return true

//   Simple rewrite link - based on anchors
function rwSimple(link) {
  if (link.hasAttribute('href') && !(link.getAttribute('href') == '')) {
    var newlink = decodeURIComponent(link.href);
    if (anchor) {
      ndx = newlink.search(anchor);
      if (ndx != -1) newlink = newlink.substring(ndx + anchor.length);
    }
    if (after) {
      ndx = newlink.search(after);
      if (ndx != -1) newlink = newlink.substring(0, ndx);
    }
    if (B64 && (ndx != -1)) newlink = decodeURIComponent(escape(window.atob(newlink)));
    link.href = newlink;
  }
}

function rwaSimple() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}


//   DanielDefo
function rwDanielDefo(link) {
  if (link.hasAttribute('data-proxy-href')) link.removeAttribute('data-proxy-href');
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
function rwYandex(link) {
  // main search
  if (link.hasAttribute('data-counter')) link.removeAttribute('data-counter');
  // images
  anchor = '&img_url='; after = '&pos=';
  rwSimple(link);
}

// determine anchors, functions and listeners
rwLink = rwSimple;
rwAll = rwaSimple;
var loc = window.location.hostname;

if (/(4pda|instagram)/i.test(loc)) { anchor = 'u='; after = '&e='; }
else if (/danieldefo/i.test(loc)) rwLink = rwDanielDefo;
else if (/deviantart/i.test(loc)) anchor = 'outgoing?';
else if (/disq/i.test(loc)) { anchor = 'url='; after = /:([A-Za-z0-9]+)/; }
else if (/(facebook|messenger)/i.test(loc)) { anchor = 'u='; after = '&h='; rwLink = rwFacebook; }
else if (/forumavia/i.test(loc)) anchor = '/e/?l=';
else if (/google/i.test(loc)) rwLink = rwGoogle;
else if (/(kat|kickass)/i.test(loc)) { anchor = 'confirm/url/'; rwLink = rwKickass; }
else if (/(lrepacks|repack|rsload|usbdev)/i.test(loc)) { anchor = 'url='; B64 = 1; }
else if (/mozilla/i.test(loc)) rwLink = rwAMO;
else if (/ok/i.test(loc)) { anchor = 'st.link='; after = '&st.name='; }
else if (/picarto/i.test(loc)) { anchor = 'referrer?go='; after = '&ref='; }
else if (/(pixiv|reactor|soundcloud|steam|wikimapia)/i.test(loc)) anchor = 'url=';
else if (/slack/i.test(loc)) rwLink = rwSlack;
else if (/taker/i.test(loc)) anchor = 'phpBB2/goto/';
else if (/tumblr/i.test(loc)) { anchor = 'redirect?z='; after = '&t='; }
else if (/twitter/i.test(loc)) { rwLink = rwTwitter; rwAll = rwaTwitter; }
else if (/upwork/i.test(loc)) anchor = 'leaving-odesk?ref=';
else if (/vk/i.test(loc)) { anchor = 'to='; rwLink = rwVK; }
else if (/yandex/i.test(loc)) rwLink = rwYandex;
else if (/yaplakal/i.test(loc)) anchor = 'go/?';
else if (/youtube/i.test(loc)) { anchor = 'q='; after = /&(redir_token|event|v)=/; }

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  var node = event.target;
  if (node instanceof HTMLAnchorElement) rwLink(node);
  var links = node.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}, false);

rwAll();
