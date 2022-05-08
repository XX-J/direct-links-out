
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         2.91
// @description     Removes all "You are leaving our site..." and redirection stuff from links
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт" и переадресацию из ссылок
// @icon            https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @update          https://raw.githubusercontent.com/XX-J/Direct-links-out/master/Direct%20links%20out.user.js
// @author          nokeya & XX-J...
//   4PDA
// @include         *://4pda.*
// @include         *://*.4pda.*
//   AdGuard (forum)
// @include         *://forum.adguard.com/*
//   Большой вопрос
// @include         *://bolshoyvopros.ru/*
// @include         *://*.bolshoyvopros.ru/*
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
//   ElectroTransport
// @include         *://electrotransport.ru/*
//   Facebook
// @include         *://facebook.com/*
// @include         *://*.facebook.com/*
// @include         *://messenger.com/*
// @include         *://*.messenger.com/*
//   Ferra.ru
// @include         *://*.ferra.ru/*
//   Фишки
// @include         *://fishki.net/*
// @include         *://*.fishki.net/*
//   ForumAvia
// @include         *://*.forumavia.ru/*
//   GitHub
// @include         *://github.com/*
// @include         *://*.github.io/*
//   Google
// @include         *://google.*
// @include         *://www.google.*
// @include         *://news.google.*
// @include         *://encrypted.google.*
//   Instagram
// @include         *://instagram.com/*
// @include         *://*.instagram.com/*
//   iXBT
// @include         *://ixbt.com/*
// @include         *://*.ixbt.com/*
//   JoyReactor
// @include         *://joyreactor.cc/*
// @include         *://*.joyreactor.cc/*
// @include         *://reactor.cc/*
// @include         *://*.reactor.cc/*
// @include         *://joyreactor.com/*
// @include         *://*.joyreactor.com/*
//   Kickass Torrents
// @include         *://kickasstorrents.pw/*
// @include         *://*.kickasstorrents.pw/*
// @include         *://kickassto.co/*
// @include         *://*.kickassto.co/*
//   LiveInternet
// @include         *://liveinternet.ru/*
// @include         *://*.liveinternet.ru/*
//   LRepacks
// @include         *://lrepacks.*
// @include         *://*.lrepacks.*
//   Addons.Mozilla.Org
// @include         *://addons.mozilla.org/*
//   MySKU
// @include         *://mysku.ru/*
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
//   rutracker.org
// @include         *://rutracker.*
//   Slack
// @include         *://*.slack.com/*
//   SoundCloud
// @include         *://soundcloud.com/*
// @include         *://*.soundcloud.com/*
//   Steam
// @include         *://steamcommunity.com/*
// @include         *://*.steamcommunity.com/*
// @include         *://*.steampowered.com/*
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
//   Zoon
// @include         *://zoon.ru/*
// @include         *://*.zoon.ru/*
// ==/UserScript==


let RemoveAttributes, RemoveClasses;
let Anchor, ReplacerAnchor = '', After, ReplacerAfter = '';
const Location = window.location, HostName = window.location.hostname;

//   Simple rewrite link
function rwSimple(link) {
  if (RemoveAttributes) for (let c = 0; c < RemoveAttributes.length; c++) {
    link.removeAttribute(RemoveAttributes[c]);
  }
  if (RemoveClasses) for (let c = 0; c < RemoveClasses.length; c++) {
    link.classList.remove(RemoveClasses[c]);
  }
  if (/^http/i.test(link.href)) {
    if (Anchor && ~link.href.search(Anchor)) {
      link.href = decodeURIComponent(link.href).replace(Anchor, ReplacerAnchor);
      if (/^(aHR0c|ZnRw|bWFnbmV0|ZWQya)/.test(link.getAttribute('href'))) link.href = decodeURIComponent(escape(window.atob(link.getAttribute('href'))));
    }
    if (link.href.search(After) > 0) link.href = decodeURIComponent(link.href).replace(After, ReplacerAfter);
  }
}

function rwaSimple() {
  let links = document.getElementsByTagName('a');
  for (let c = 0; c < links.length; c++) rwLink(links[c]);
}


//   Facebook
function rwFacebook(link) {
  if (/referrer_log/i.test(link.onclick)) RemoveAttributes = ['onclick', 'onmouseover'];
  rwSimple(link);
}

//   Google
function rwGoogle(link) {
  rwSimple(link);
  // Images  --- get rid of setInterval
  if (/&tbm=isch/i.test(Location)) setInterval (function() {
    document.querySelector('[data-a] img').parentNode.href = document.querySelector('[data-a] img').src
  }, 700);
  // News  --- get rid of setInterval
  if (/news/i.test(HostName) && link.hasAttribute('jslog')) setInterval (function() {
    let jslog = link.getAttribute('jslog');
    jslog = jslog.substring(jslog.indexOf(':') + 1, jslog.lastIndexOf(';')).replace(/(-|\.)/g, '+').replace(/_/g, '/');
    jslog = unescape(window.atob(jslog).replace(/\\u/g, '%u'));
    link.href = jslog.substring(jslog.indexOf('"') + 1, jslog.lastIndexOf('"'));
  }, 700);
}

//   Kickass Torrents
function rwKickassTorrents(link) {
  if (!!link.getAttribute('href')) {
    link.href = decodeURIComponent(link.href);
    if (~link.href.search(Anchor)) rwSimple(link);
  }
}

//   Twitter
function rwTwitter(link) {
//  if (link.href.includes('/t.co/')) {   --- fetch ?
  if (/^(ht|f)tp/i.test(link.text)) link.href = link.text.replace('…', '');
}


//   Determine Anchors, functions and listeners
let rwLink = rwSimple, rwAll = rwaSimple;

if (/(4pda|instagram)/i.test(HostName)) {
  Anchor = /.+u=/i;  After = /&e=.*/i;
}
else if (/(adguard|github)/i.test(HostName)) {
  Anchor = /.+\/AnonymousRedirect\/redirect\.html\?url=/i;
  ReplacerAnchor = 'https://href.li/?';
}
else if (/(bolshoyvopros|forumavia)/i.test(HostName)) {
  Anchor = /.+\?l=/i;  After = /&src=.*/i;
}
else if (/danieldefo/i.test(HostName)) {
  RemoveAttributes = ['data-proxy-href'];
}
else if (/deviantart/i.test(HostName)) {
  Anchor = /.+outgoing\?/i;
}
else if (/disq/i.test(HostName)) {
  Anchor = /.+url=/i;  After = /:[^\.]+$/;
}
else if (/(electrotransport|fishki|liveinternet|oszone|pixiv|reactor|repack|rsload|soundcloud|steam|usbdev|wikimapia)/i.test(HostName)) {
  Anchor = /.+url=/i;
}
else if (/(facebook|messenger)/i.test(HostName)) {
  Anchor = /.+u=/i;  After = /(\?|&)(h|fbclid)=.*/i;
  rwLink = rwFacebook;
}
else if (/ferra/i.test(HostName)) {
  Anchor = /.+click\/forums_out\//i;
}
else if (/google/i.test(HostName)) {
  RemoveAttributes = ['data-jsarwt', 'data-usg', 'data-ved', 'jsname', 'jsaction'];
  rwLink = rwGoogle;
}
else if (/ixbt/i.test(HostName)) {
  Anchor = /.+live\/redirect\//i;
}
else if (/kickassto/i.test(HostName)) {
  RemoveAttributes = ['class'];
  Anchor = /.+confirm\/url\//i;
  rwLink = rwKickassTorrents;
}
else if (/mozilla/i.test(HostName)) {
  Anchor = /.+outgoing.prod.mozaws.net\/v.\/[0-9a-zA-Z]+\//i;  After = /(\?|&)utm_content=.*/i;
}
else if (/mysku/i.test(HostName)) {
  Anchor = /.+\?r=/i;  After = /&key=.*/i;
}
else if (/ok/i.test(HostName)) {
  Anchor = /.+st\.link=/i;  After = /&st\.name=.*/i;
}
else if (/picarto/i.test(HostName)) {
  Anchor = /.+referrer\?go=/i;  After = /&ref=.*/i;
}
else if (/(playground|rubattle)/i.test(HostName)) {
  Anchor = /www\.(playground\.ru|rubattle\.net)\/redirect\/(https?\/)?/i;
}
else if (/rutracker/i.test(HostName)) {
  RemoveClasses = ['p-ext-link'];
}
else if (/slack/i.test(HostName)) {
  RemoveAttributes = ['onclick', 'onmouseover'];
}
else if (/taker/i.test(HostName)) {
  Anchor = /.+phpBB2\/goto\//i;
}
else if (/tumblr/i.test(HostName)) {
  Anchor = /.+redirect\?z=/i;  After = /&t=.*/i;
}
else if (/twitter/i.test(HostName)) {
  rwLink = rwTwitter;
}
else if (/upwork/i.test(HostName)) {
  Anchor = /.+leaving-odesk\?ref=/i;
}
else if (/(vk|zoon)/i.test(HostName)) {
  Anchor = /.+to=/i;  After = /(\?|&)(cc_key|from_content|post|hash)=.*/i;
}
else if (/yandex/i.test(HostName)) {
  RemoveAttributes = ['data-counter'];
  Anchor = /.+&img_url=/i;  After = /&pos=.*/i;
}
else if (/yaplakal/i.test(HostName)) {
  Anchor = /.+go\/\?/i;
}
else if (/youtube/i.test(HostName)) {
  Anchor = /.+q=/i;  After = /&(redir_token|event|v)=.*/i;
}

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  let node = event.target;
  if (node instanceof HTMLAnchorElement) rwLink(node);
  let links = node.getElementsByTagName('a');
  for (let c = 0; c < links.length; c++) rwLink(links[c]);
}, false);

rwAll();
