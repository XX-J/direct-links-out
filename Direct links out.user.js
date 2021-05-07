
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         2.58
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
// @include         *://kickasstorrents.pw/*
// @include         *://*.kickasstorrents.pw/*
// @include         *://kickassto.co/*
// @include         *://*.kickassto.co/*
// @include         *://katproxy.is/*
// @include         *://*.katproxy.is/*
//   LRepacks
// @include         *://lrepacks.*
// @include         *://*.lrepacks.*
//   Addons.Mozilla.Org
// @include         *://addons.mozilla.org/*
//   Одноклассники
// @include         *://ok.ru/*
// @include         *://*.ok.ru/*
//   OSzone
// @include         *://oszone.net/*
// @include         *://*.oszone.net/*
//   Picarto
// @include         *://picarto.tv/*
// @include         *://*.picarto.tv/*
//   Pixiv
// @include         *://pixiv.net/*
// @include         *://*.pixiv.net/*
//   PlayGround
// @include         *://playground.ru/*
// @include         *://*.playground.ru/*
//   Repack.me
// @include         *://repack.me/*
// @include         *://*.repack.me/*
//   RsLoad
// @include         *://rsload.net/*
// @include         *://*.rsload.net/*
//   Rubattle.net
// @include         *://rubattle.net/*
// @include         *://*.rubattle.net/*
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


var anchor, repAnchor = '', after;
var remClases, B64, remAttrs;
var retTrue = function() { return true; };  // dummy function to always return true

//   Simple rewrite link
function rwSimple(link) {
  if (!!link.getAttribute('href')) {
    link.href = decodeURIComponent(link.href);
    if (anchor && (link.href.search(anchor) != -1)) {
      if (remClases) link.removeAttribute('class');
      link.href = link.href.replace(anchor, repAnchor);
      if (B64) link.href = decodeURIComponent(escape(window.atob(link.getAttribute('href'))));
    }
    if (link.href.search(after) > 0) link.href = link.href.substring(0, link.href.search(after));
  }
  if (remAttrs) for (var i = 0; i < remAttrs.length; ++i) link.removeAttribute(remAttrs[i]);
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


// determine anchors, functions and listeners
var rwLink = rwSimple, rwAll = rwaSimple;
var HostName = window.location.hostname;

if (/(4pda|instagram)/i.test(HostName)) { anchor = /.+u=/i; after = '&e='; }
else if (/danieldefo/i.test(HostName)) remAttrs = ['data-proxy-href'];
else if (/deviantart/i.test(HostName)) anchor = /.+outgoing\?/i;
else if (/disq/i.test(HostName)) { anchor = /.+url=/i; after = /:[0-9a-zA-Z]+/; }
else if (/(facebook|messenger)/i.test(HostName)) { anchor = /.+u=/i; after = /(\?|&)(h|fbclid)=/i; rwLink = rwFacebook; }
else if (/forumavia/i.test(HostName)) anchor = /.+\/e\/\?l=/i;
else if (/google/i.test(HostName)) rwLink = rwGoogle;
else if (/(kat|kickass)/i.test(HostName)) { anchor = /.+confirm\/url\//i; remClases = 1; B64 = 1; }
else if (/(repack|rsload|usbdev)/i.test(HostName)) { anchor = /.+url=/i; B64 = 1; }
else if (/mozilla/i.test(HostName)) { anchor = /.+outgoing.prod.mozaws.net\/v.\/[0-9a-zA-Z]+\//i; after = /(\?|&)utm_content=/i; }
else if (/ok/i.test(HostName)) { anchor = /.+st\.link=/i; after = '&st.name='; }
else if (/(oszone|pixiv|reactor|soundcloud|steam|wikimapia)/i.test(HostName)) anchor = /.+url=/i;
else if (/picarto/i.test(HostName)) { anchor = /.+referrer\?go=/i; after = '&ref='; }
else if (/(playground|rubattle)/i.test(HostName)) anchor = /www\.[0-9a-zA-Z]+\.(net|ru)\/redirect\/(https\/|http\/|)/i;
else if (/slack/i.test(HostName)) remAttrs = ['onclick', 'onmouseover'];
else if (/taker/i.test(HostName)) anchor = /.+phpBB2\/goto\//i;
else if (/tumblr/i.test(HostName)) { anchor = /.+redirect\?z=/i; after = '&t='; }
else if (/twitter/i.test(HostName)) { rwLink = rwTwitter; rwAll = rwaTwitter; }
else if (/upwork/i.test(HostName)) anchor = /.+leaving-odesk\?ref=/i;
else if (/vk/i.test(HostName)) { anchor = /.+to=/i; after = /(\?|&)(cc_key|from_content)=/i; }
else if (/yandex/i.test(HostName)) { anchor = /.+&img_url=/i; after = '&pos='; remAttrs = ['data-counter']; }
else if (/yaplakal/i.test(HostName)) anchor = /.+go\/\?/i;
else if (/youtube/i.test(HostName)) { anchor = /.+q=/i; after = /&(redir_token|event|v)=/; }

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  var node = event.target;
  if (node instanceof HTMLAnchorElement) rwLink(node);
  var links = node.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}, false);

rwAll();
