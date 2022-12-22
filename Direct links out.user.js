
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         4.5
// @description     Removes all "You are leaving our site..." and redirection stuff from links.
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт..." и переадресацию из ссылок.
// @author          nokeya & XX-J...
// @homepageURL     https://github.com/XX-J/Direct-links-out
// @run-at          document-start
// @icon            https://raw.githubusercontent.com/XX-J/Direct-links-out/master/icon.png
// @updateURL       https://raw.githubusercontent.com/XX-J/Direct-links-out/master/Direct%20links%20out.user.js
//   4PDA
// @include         /^https?://([^./]+\.)*4pda\.[^./]+//
//   AdGuard (forum)
// @match           *://forum.adguard.com/*
//   Большой вопрос
// @match           *://*.bolshoyvopros.ru/*
//   Car.ru
// @match           *://*.car.ru/*
//   DanielDefo
// @match           *://*.danieldefo.ru/*
//   DeviantArt
// @match           *://*.deviantart.com/*
//   Disqus
// @match           *://*.disq.us/*
// @match           *://*.disqus.com/*
//   ElectroTransport
// @match           *://electrotransport.ru/*
//   Facebook
// @match           *://*.facebook.com/*
//   Ferra.ru
// @match           *://*.ferra.ru/*
//   Фишки
// @match           *://*.fishki.net/*
//   ForumAvia
// @match           *://*.forumavia.ru/*
//   GitHub
// @match           *://github.com/*
// @match           *://*.github.io/*
//   Google
// @include         /^https?://(www|news)\.google(\.com)?\.[^./]+//
//   Instagram
// @match           *://*.instagram.com/*
//   iXBT
// @match           *://*.ixbt.com/*
//   JoyReactor
// @match           *://*.joyreactor.cc/*
// @match           *://*.reactor.cc/*
// @match           *://*.joyreactor.com/*
//   Kickass Torrents
// @match           *://*.kickasstorrents.pw/*
// @match           *://*.kickassto.co/*
//   LinkedIn
// @match           *://*.linkedin.com/*
//   LiveInternet
// @match           *://*.liveinternet.ru/*
//   LRepacks
// @include         /^https?://([^./]+\.)*lrepacks\.[^./]+//
//   Ответы Mail.ru
// @match           *://otvet.mail.ru/*
//   Messenger
// @match           *://*.messenger.com/*
//   Addons.Mozilla.Org
// To allow extensions to work on sites from FireFox "black list" (like AMO) clean this "black list" by set `extensions.webextensions.restrictedDomains = ""`  and  `privacy.resistFingerprinting.block_mozAddonManager = true` in `about:config`.
// @match           *://addons.mozilla.org/*
//   MySKU
// @match           *://mysku.ru/*
//   Одноклассники
// @match           *://*.ok.ru/*
//   OSzone
// @match           *://*.oszone.net/*
//   Picarto
// @match           *://*.picarto.tv/*
//   Pixiv
// @match           *://*.pixiv.net/*
//   PlayGround
// @match           *://*.playground.ru/*
//   Рамблер
// @match           *://*.rambler.ru/*
//   Repack.me
// @match           *://*.repack.me/*
//   RsLoad
// @match           *://*.rsload.net/*
//   RuBattle.net
// @match           *://*.rubattle.net/*
//   RuTracker.org
// @include         /^https?://([^./]+\.)*rutracker\.[^./]+//
//   Slack
// @match           *://*.slack.com/*
//   SoundCloud
// @match           *://*.soundcloud.com/*
//   Steam
// @match           *://*.steamcommunity.com/*
// @match           *://*.steampowered.com/*
//   SubscribeStar
// @match           *://*.subscribestar.com/*
//   Taker
// @match           *://*.taker.im/*
//   Telegram
// @match           *://*.t.me/*
//   Tumblr
// @match           *://*.tumblr.com/*
//   Twitter
// @match           *://*.twitter.com/*
//   Upwork
// @match           *://*.upwork.com/*
//   USBDev
// @match           *://*.usbdev.ru/*
//   ВКонтакте
// @match           *://*.vk.com/*
//   Wikimapia
// @match           *://wikimapia.org/*
//   Яндекс
// @include         /^https?://([^./]+\.)*yandex(\.com)?\.[^./]+/(search|images)//
//   ЯПлакалъ
// @match           *://*.yaplakal.com/*
//   YouTube
// @match           *://*.youtube.com/*
//   Zoon
// @match           *://*.zoon.ru/*
// ==/UserScript==


let RemoveAttributes, Anchor, ReplacerAnchor = '', After;
let HostName = location.hostname, Location = location.href;

function rwHRef(link) {
  if (/http/i.test(link.protocol)) {
    let HRef = link.href
    if (Anchor && Anchor.test(HRef)) HRef = decodeURIComponent(HRef).replace(Anchor, ReplacerAnchor);
    if (After && After.test(HRef)) HRef = decodeURIComponent(HRef).replace(After, '');
    if (/^(aHR0c|ZnRw|bWFnbmV0|ZWQya)/.test(HRef)) HRef = decodeURIComponent(atob(HRef));
    if (HRef != link.href) link.href = HRef;
  }
}

function rwLink(link) {
  if (/(ht|f)tp|magnet|ed2k/i.test(link.protocol)) {
    if (RemoveAttributes && (!Anchor || Anchor.test(link.href)))
      for (let Attribute of RemoveAttributes) link.removeAttribute(Attribute);
    rwHRef(link);
  }
}

function rwAll() {
  for (let link of document.links) rwLink(link);
  new MutationObserver( Mutations => {
    for (let Mutation of Mutations) {
      for (let Node of Mutation.addedNodes) {
        if (Node instanceof HTMLElement) {
          if (Node instanceof HTMLAnchorElement) rwLink(Node);
          for (let link of Node.querySelectorAll('a')) rwLink(link);
        }
      }
      if (Mutation.type === "attributes") rwLink(Mutation.target);
    }
  }).observe( document.body, { childList: true, attributeFilter: ['href'], subtree: true });
}


//   Determine anchors, functions and observers:

if (/4pda|facebook|instagram|messenger/i.test(HostName)) {
  Anchor = /.+[?&]u=/i;  After = /[?&](e|h|fbclid)=.*/i;
}
else if (/adguard|github/i.test(HostName)) {
  Anchor = /.+\/AnonymousRedirect\/redirect\.html\?url=/i;
  ReplacerAnchor = 'https://href.li/?';
}
else if (/bolshoyvopros|forumavia/i.test(HostName)) {
  Anchor = /.+\?l=/i;  After = /&src=.*/i;
}
else if (/(^|\.)car\.ru$/i.test(HostName)) {
  rwAll = () => {
    function ChangeTagName(SelectedElement) {
      let NewElement = document.createElement('a');
      for (let Attribute of SelectedElement.attributes) NewElement.setAttribute(Attribute.name, Attribute.value);
      let onclick = NewElement.getAttribute('onclick');  NewElement.removeAttribute('onclick');
      NewElement.setAttribute('href', onclick.slice(onclick.indexOf("href='") + 6, onclick.lastIndexOf("'")));
      NewElement.innerHTML = SelectedElement.innerHTML;
      SelectedElement.parentNode.replaceChild(NewElement, SelectedElement);
    }
    for (let SelectedElement of document.querySelectorAll('[onclick*="href"]')) ChangeTagName(SelectedElement);
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) {
        for (let Node of Mutation.addedNodes) {
          if (Node instanceof HTMLElement) {
            if (Node.matches('[onclick*="href"]')) ChangeTagName(Node);
            for (let SelectedElement of Node.querySelectorAll('[onclick*="href"]')) ChangeTagName(SelectedElement);
          }
        }
      }
    }).observe( document.body, { childList: true, subtree: true });
  }
}
else if (/danieldefo/i.test(HostName)) {
  RemoveAttributes = ['data-proxy-href'];
}
else if (/deviantart/i.test(HostName)) {
  Anchor = /.+outgoing\?/i;
}
else if (/disq/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;  After = /:[^.:]{9,}$/;
}
else if (/electrotransport|fishki|liveinternet|oszone|pixiv|reactor|repack|rsload|soundcloud|steam|usbdev|wikimapia/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;
}
else if (/ferra/i.test(HostName)) {
  Anchor = /.+click\/forums_out\//i;
}
else if (/\/\/www\.google\.[^/]+\/searc((?![^=][?&]tbm=(isch|shop)).)+$/i.test(Location)) {
  RemoveAttributes = ['data-jsarwt', 'data-usg', 'data-ved', 'ping'];
}
else if (/\/\/www\.google\..+[^=][?&]tbm=isch/i.test(Location)) {
  Anchor = /.+[?&](img)?url=/i;  After = /&(psig|imgrefurl)=.*/i;
  rwAll = () => {
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) if (Mutation.attributeName === "href") { rwLink(Mutation.target) } else {
        if (Mutation.target === document.querySelector('[data-hp]   div:not([aria-hidden="true"]) > c-wiz   [role="region"] > [role="link"] > img')) {
          Mutation.target.parentNode.href = Mutation.target.attributes.src.value;
          Mutation.target.parentNode.setAttribute('rlhc', 1);
        }
      }
    }).observe( document.body, { attributeFilter: ['href', 'src'], subtree: true });
  }
}
else if (/\/\/www\.google\..+[^=]([?&]tbm=shop|\/shopping)/i.test(Location)) {
  Anchor = /.+url\?(url|q)=/i;  After = /&(rct|sa)=.*/i;
}
else if (/news\.google/i.test(HostName)) {
  //   Rid of Event Listener 'click'.
  rwLink = link => {
    let jslog = link.getAttribute('jslog');
    if (/5:/.test(jslog)) {
      jslog = jslog.slice(jslog.indexOf(':') + 1, jslog.lastIndexOf(';')).replace(/[-.]/g, '+').replace(/_/g, '/');
      jslog = unescape(atob(jslog).replace(/\\u/g, '%u'));
      link.href = jslog.slice(jslog.indexOf('"') + 1, jslog.lastIndexOf('"'));
      link.removeAttribute('jslog');
    }
  }
}
else if (/ixbt/i.test(HostName)) {
  Anchor = /.+live\/redirect\//i;
}
else if (/kickassto/i.test(HostName)) {
  RemoveAttributes = ['class'];
  Anchor = /.+confirm\/url\//i;
}
else if (/linkedin/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;  After = /&(trk|messageThreadUrn)=.*/i;
}
else if (/otvet\.mail\.ru/i.test(HostName)) {
  Anchor = /.+\?externalLink=/i;
  rwLink = link => {
    if (/^((ht|f)tp|\/\/|magnet|ed2k)/i.test(link.getAttribute('href')) &&
      !/(^|\.)mail\.ru$/i.test(link.hostname)) link.rel = "301"
  }
}
else if (/mozilla/i.test(HostName)) {
  Anchor = /.+\.outgoing\.[^/]+\/v.\/[^/]+\//i;  After = /[?&]utm_content=.*/i;
}
else if (/mysku/i.test(HostName)) {
  Anchor = /.+\?r=/i;  After = /&key=.*/i;
}
else if (/(^|\.)ok\.ru$/i.test(HostName)) {
  Anchor = /.+st\.link=/i;  After = /&st\.name=.*/i;
}
else if (/picarto/i.test(HostName)) {
  Anchor = /.+referrer\?go=/i;  After = /&ref=.*/i;
}
else if (/playground|rubattle/i.test(HostName)) {
  rwHRef = link => {
    if (/^http.+\/redirect\//i.test(link.href)) link.href = decodeURIComponent(link.href)
      .replace(/.+\/redirect\//i, '').replace(/[^/]+/, m => /\./.test(m) ? "http://" + m : m + ":/")
  }
}
else if (/rambler/i.test(HostName)) {
  Anchor = /.+[?&]redirect_url=/i;  After = /[?&]utm_source=.*/i;
}
else if (/rutracker/i.test(HostName)) {
  rwAll = () => {
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) if (Mutation.target.classList.contains('p-ext-link')) Mutation.target.classList.remove('p-ext-link');
    }).observe( document.body, { attributeFilter: ['class'], subtree: true });
  }
}
else if (/slack/i.test(HostName)) {
  RemoveAttributes = ['onclick', 'onmouseover'];
}
else if (/subscribestar/i.test(HostName)) {
  RemoveAttributes = ['data-href'];
  Anchor = /.+\?url=/i;  After = /\n/g;
}
else if (/taker/i.test(HostName)) {
  Anchor = /.+phpBB2\/goto\//i;
}
else if (/(^|\.)t\.me$/i.test(HostName)) {
  RemoveAttributes = ['onclick'];
  Anchor = /.+\?url=/i;  After = /&(amp|rhash)[;=].*/i;
}
else if (/tumblr/i.test(HostName)) {
  Anchor = /.+redirect\?z=/i;  After = /&t=.*/i;
}
else if (/twitter/i.test(HostName)) {
  rwLink = link => {
    if (/^https?:\/\/t\.co\//i.test(link.href)) {
      if (/^((ht|f)tp|\/\/|magnet|ed2k)/i.test(link.text)) link.href = link.text.replace('…', '');
      else {
        //   If Content Security Policy in FireFox is buggy, then put `security.csp.enable = false` in `about:config`.
        fetch(link.href).then(Response => Response.text()).then(Text => link.href = Text.replace(/.+\<title\>/i, '').replace(/\<\/title.+/i, ''));
        //  Попробовать с функцией async ( ...
//      console.log('111 Pre_fetch 111');
//      link.href = (await (await fetch(link.href)).text()).replace(/.+\<title\>/i, '').replace(/\<\/title.+/i, '');
//      console.log('222 Post_fetch 222');
      }
    }
  }
}
else if (/upwork/i.test(HostName)) {
  Anchor = /.+leaving-odesk\?ref=/i;
}
else if (/vk|zoon/i.test(HostName)) {
  Anchor = /.+to=/i;  After = /[?&](cc_key|from_content|post|hash)=.*/i;
}
else if (/yandex\.[^/]+\/search/i.test(Location)) {
  RemoveAttributes = ['data-counter', 'data-log-node'];
}
else if (/yandex\.[^/]+\/images/i.test(Location)) {
  Anchor = /.+&img_url=/i;  After = /&text=.*/i;
}
else if (/yaplakal/i.test(HostName)) {
  Anchor = /.+go\/\?/i;
}
else if (/youtube/i.test(HostName)) {
  Anchor = /.+[?&]q=/i;  After = /&(redir_token|event|v)=.*/i;
}

//   Redirecting wrong link to right link from outer app.
if (window == top) rwHRef(location);
document.readyState == "loading" ? document.addEventListener('DOMContentLoaded', rwAll, { once: true }) : rwAll();
