
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         2.80
// @description     Removes all "You are leaving our site..." and redirection stuff from links
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт" и переадресацию из ссылок
// @icon            https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @update          https://github.com/XX-J/Direct-links-out/raw/master/Direct links out.user.js
// @author          nokeya & XX-J...
//   4PDA
// @include         *://4pda.*
// @include         *://*.4pda.*
//   AdGuard (forum)
// @include         *://forum.adguard.com/*
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
// ==/UserScript==


var RemoveAttributes, RemoveClasses;
var Anchor, ReplaceAnchor = '', isBase64, After, ReplaceAfter = '';
var Location = window.location, HostName = window.location.hostname;

//   Simple rewrite link
function rwSimple(link) {
  if (RemoveAttributes) for (var i = 0; i < RemoveAttributes.length; ++i) {
    link.removeAttribute(RemoveAttributes[i]);
  }
  if (RemoveClasses) for (var i = 0; i < RemoveClasses.length; ++i) {
    link.classList.remove(RemoveClasses[i]);
  }
  if (!!link.getAttribute('href')) {
    link.href = decodeURIComponent(link.href);
    if (Anchor && (link.href.search(Anchor) != -1)) {
      link.href = link.href.replace(Anchor, ReplaceAnchor);
      if (isBase64) link.href = decodeURIComponent(escape(window.atob(link.getAttribute('href'))));
    }
    if (link.href.search(After) > 0) link.href = link.href.replace(After, ReplaceAfter);
  }
}

function rwaSimple() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
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
    var jslog = link.getAttribute('jslog');
    jslog = jslog.substring(jslog.indexOf(':') + 1, jslog.lastIndexOf(';')).replace(/(-|\.)/g, '+').replace(/_/g, '/');
    jslog = unescape(window.atob(jslog).replace(/\\u/g, '%u'));
    link.href = jslog.substring(jslog.indexOf('"') + 1, jslog.lastIndexOf('"'));
  }, 700);
}

//   Kickass Torrents
function rwKickassTorrents(link) {
  if (!!link.getAttribute('href')) {
    link.href = decodeURIComponent(link.href);
    if (link.href.search(Anchor) != -1) rwSimple(link);
  }
}

//   Twitter
function rwTwitter(link) {
//  if (link.href.includes('/t.co/')) {   --- fetch ?
  if (/^(ht|f)tp/i.test(link.text)) link.href = link.text.replace('…', '');
}


//   Determine Anchors, functions and listeners
var rwLink = rwSimple, rwAll = rwaSimple;

if (/(4pda|instagram)/i.test(HostName)) {
  Anchor = /.+u=/i; After = /&e=.*/i;
}
else if (/(adguard|github)/i.test(HostName)) {
  Anchor = /.+\/AnonymousRedirect\/redirect\.html\?url=/i;
  ReplaceAnchor = 'https://href.li/?';
}
else if (/danieldefo/i.test(HostName)) {
  RemoveAttributes = ['data-proxy-href'];
}
else if (/deviantart/i.test(HostName)) {
  Anchor = /.+outgoing\?/i;
}
else if (/disq/i.test(HostName)) {
  Anchor = /.+url=/i; After = /:[0-9a-zA-Z_&=]{10,}/;
}
else if (/(electrotransport|repack|rsload|usbdev)/i.test(HostName)) {
  Anchor = /.+url=/i; isBase64 = 1;
}
else if (/(facebook|messenger)/i.test(HostName)) {
  Anchor = /.+u=/i; After = /(\?|&)(h|fbclid)=.*/i;
  rwLink = rwFacebook;
}
else if (/forumavia/i.test(HostName)) {
  Anchor = /.+\/e\/\?l=/i;
}
else if (/google/i.test(HostName)) {
  RemoveAttributes = ['data-ved', 'onmousedown', 'oncontextmenu', 'ping', 'jsaction', 'jsname'];
  rwLink = rwGoogle;
}
else if (/ixbt/i.test(HostName)) {
  Anchor = /.+live\/redirect\//i; isBase64 = 1;
}
else if (/kickassto/i.test(HostName)) {
  RemoveAttributes = ['class'];
  Anchor = /.+confirm\/url\//i; isBase64 = 1;
  rwLink = rwKickassTorrents;
}
else if (/(liveinternet|oszone|pixiv|reactor|soundcloud|steam|wikimapia)/i.test(HostName)) {
  Anchor = /.+url=/i;
}
else if (/mozilla/i.test(HostName)) {
  Anchor = /.+outgoing.prod.mozaws.net\/v.\/[0-9a-zA-Z]+\//i; After = /(\?|&)utm_content=.*/i;
}
else if (/ok/i.test(HostName)) {
  Anchor = /.+st\.link=/i; After = /&st\.name=.*/i;
}
else if (/picarto/i.test(HostName)) {
  Anchor = /.+referrer\?go=/i; After = /&ref=.*/i;
}
else if (/(playground|rubattle)/i.test(HostName)) {
  Anchor = /www\.[0-9a-zA-Z]+\.(net|ru)\/redirect\/(https\/|http\/|)/i;
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
  Anchor = /.+redirect\?z=/i; After = /&t=.*/i;
}
else if (/twitter/i.test(HostName)) {
  rwLink = rwTwitter;
}
else if (/upwork/i.test(HostName)) {
  Anchor = /.+leaving-odesk\?ref=/i;
}
else if (/vk/i.test(HostName)) {
  Anchor = /.+to=/i; After = /(\?|&)(cc_key|from_content|post)=.*/i;
}
else if (/yandex/i.test(HostName)) {
  RemoveAttributes = ['data-counter'];
  Anchor = /.+&img_url=/i; After = /&pos=.*/i;
}
else if (/yaplakal/i.test(HostName)) {
  Anchor = /.+go\/\?/i;
}
else if (/youtube/i.test(HostName)) {
  Anchor = /.+q=/i; After = /&(redir_token|event|v)=.*/i;
}

document.addEventListener('DOMNodeInserted', function(event) {
  if (!event || !event.target || !(event.target instanceof HTMLElement)) return;
  var node = event.target;
  if (node instanceof HTMLAnchorElement) rwLink(node);
  var links = node.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i) rwLink(links[i]);
}, false);

rwAll();
