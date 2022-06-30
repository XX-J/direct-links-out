
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         3.2
// @description     Removes all "You are leaving our site..." and redirection stuff from links.
// @description:ru  Убирает "Бла-бла-бла, вы покидаете наш сайт..." и переадресацию из ссылок.
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
//   Car.ru
// @include         *://car.ru/*
// @include         *://*.car.ru/*
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
//   Ответы Mail.ru
// @include         *://otvet.mail.ru/*
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
//   Рамблер
// @include         *://rambler.ru/*
// @include         *://*.rambler.ru/*
//   Repack.me
// @include         *://repack.me/*
// @include         *://*.repack.me/*
//   RsLoad
// @include         *://rsload.net/*
// @include         *://*.rsload.net/*
//   RuBattle.net
// @include         *://rubattle.net/*
// @include         *://*.rubattle.net/*
//   RuTracker.org
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
// @include         *://yandex.*/search/*
// @include         *://*.yandex.*/search/*
// @include         *://yandex.*/images/*
// @include         *://*.yandex.*/images/*
// @include         *://yandex.*/news/*
// @include         *://*.yandex.*/news/*
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
  if (RemoveAttributes) for (let RemoveAttribute of RemoveAttributes) link.removeAttribute(RemoveAttribute);
  if (RemoveClasses) RemoveClasses.forEach( RemoveClass => link.classList.remove(RemoveClass));
  if (/^((ht|f)tp|magnet|ed2k)/i.test(link.href)) {
    if (Anchor && Anchor.test(link.href)) {
      link.href = decodeURIComponent(link.href).replace(Anchor, ReplacerAnchor);
      if (/^(aHR0c|ZnRw|bWFnbmV0|ZWQya)/.test(link.getAttribute('href'))) link.href = decodeURIComponent(escape(window.atob(link.getAttribute('href'))));
    }
    if (After && After.test(link.href)) link.href = decodeURIComponent(link.href).replace(After, ReplacerAfter);
  }
}

let rwLink = rwSimple;

let rwAll = () => {
  for (let AnchorElement of document.querySelectorAll('a')) rwLink(AnchorElement);
  new MutationObserver( Mutations => {
    for (let Mutation of Mutations) {
      for (let Node of Mutation.addedNodes) {
        if (Node instanceof HTMLElement) {
          if (Node instanceof HTMLAnchorElement) rwLink(Node);
          for (let AnchorElement of Node.querySelectorAll('a')) rwLink(AnchorElement);
        }
      }
      if (Mutation.type === "attributes") rwLink(Mutation.target);
    }
  }).observe( document.body, { childList: true, attributeFilter: ['href'], subtree: true });
}


//   Determine anchors, functions and observers:

if (/4pda|instagram/i.test(HostName)) {
  Anchor = /.+u=/i;  After = /&e=.*/i;
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
      let onclick = NewElement.getAttribute('onclick');
      NewElement.setAttribute('href', onclick.slice(onclick.indexOf("href='") + 6, onclick.lastIndexOf("'")));
      NewElement.removeAttribute('onclick');
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
  rwLink = link => { link.removeAttribute('data-proxy-href') }
}
else if (/deviantart/i.test(HostName)) {
  Anchor = /.+outgoing\?/i;
}
else if (/disq/i.test(HostName)) {
  Anchor = /.+url=/i;  After = /:[^.]{9,}$/;
}
else if (/electrotransport|fishki|liveinternet|oszone|pixiv|rambler|reactor|repack|rsload|soundcloud|steam|usbdev|wikimapia/i.test(HostName)) {
  Anchor = /.+url=/i;
}
else if (/facebook|messenger/i.test(HostName)) {
  Anchor = /.+u=/i;  After = /[?&](h|fbclid)=.*/i;
  rwLink = link => {
    if (/referrer_log/i.test(link.onclick)) { link.removeAttribute('onclick'); link.removeAttribute('onmouseover') }
    rwSimple(link);
  }
}
else if (/ferra/i.test(HostName)) {
  Anchor = /.+click\/forums_out\//i;
}
else if (/\/\/(www\.)?google\.(.(?![?&]tbm=))+$/i.test(Location)) {
  rwLink = link => { for (let RemoveAttribute of ['data-jsarwt', 'data-usg', 'data-ved']) link.removeAttribute(RemoveAttribute) }
}
else if (/\/\/(www\.)?google\..+[?&]tbm=isch/i.test(Location)) {
  Anchor = /.+\?imgurl=/i;  After = /&imgrefurl=.*/i;
  rwAll = () => {
    document.querySelector('[data-a] [role="region"] > [role="link"]').href = document.querySelector('[data-a] [role="region"] > [role="link"] > img').attributes.src.value;
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) if (Mutation.attributeName === "href") { rwLink(Mutation.target) } else {
        if (Mutation.target === document.querySelector('[data-a] [role="region"] > [role="link"] > img')) Mutation.target.parentNode.href = Mutation.target.attributes.src.value;
      }
    }).observe( document.body, { attributeFilter: ['href', 'src'], subtree: true });
  }
}
else if (/news\.google/i.test(HostName)) {
  //   Rid of Event Listener 'click'.
  rwLink = link => {
    if (link.hasAttribute('jslog')) {
      let jslog = link.getAttribute('jslog');  link.removeAttribute('jslog');
      jslog = jslog.slice(jslog.indexOf(':') + 1, jslog.lastIndexOf(';')).replace(/(-|\.)/g, '+').replace(/_/g, '/');
      jslog = unescape(window.atob(jslog).replace(/\\u/g, '%u'));
      link.href = jslog.slice(jslog.indexOf('"') + 1, jslog.lastIndexOf('"'));
    }
  }
}
else if (/ixbt/i.test(HostName)) {
  Anchor = /.+live\/redirect\//i;
}
else if (/kickassto/i.test(HostName)) {
  RemoveAttributes = ['class'];
  Anchor = /.+confirm\/url\//i;
  rwLink = link => { if (Anchor.test(link.href)) rwSimple(link) }
}
else if (/otvet\.mail\.ru/i.test(HostName)) {
  rwLink = link => { if (/^((ht|f)tp|\/\/|magnet|ed2k)/i.test(link.getAttribute('href')) && !/(^|\.)mail\.ru$/i.test(link.hostname)) link.rel = "301" }
}
else if (/mozilla/i.test(HostName)) {
  Anchor = /.+outgoing.prod.mozaws.net\/v.\/[0-9a-zA-Z]+\//i;  After = /[?&]utm_content=.*/i;
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
else if (/playground|rubattle/i.test(HostName)) {
  Anchor = /w.+\/redirect\/(https?\/)?/i;
}
else if (/rutracker/i.test(HostName)) {
  rwAll = () => {
    for (let AnchorElement of document.querySelectorAll('.p-ext-link')) AnchorElement.classList.remove('p-ext-link');
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) if (Mutation.target.classList.contains('p-ext-link')) Mutation.target.classList.remove('p-ext-link');
    }).observe( document.body, { attributeFilter: ['class'], subtree: true });
  }
}
else if (/slack/i.test(HostName)) {
  rwLink = link => { link.removeAttribute('onclick'); link.removeAttribute('onmouseover') }
}
else if (/taker/i.test(HostName)) {
  Anchor = /.+phpBB2\/goto\//i;
}
else if (/tumblr/i.test(HostName)) {
  Anchor = /.+redirect\?z=/i;  After = /&t=.*/i;
}
else if (/twitter/i.test(HostName)) {
  rwLink = link => {
    if (link.href.includes('/t.co/')) {
      if (/^((ht|f)tp|magnet|ed2k)/i.test(link.text)) { link.href = link.text.replace('…', ''); }
//      не срабатывает, попробовать set interval:            Content Security Policy?
//    else {
//      console.log('111 Pre_fetch 111');
//      link.href = (await (await fetch(link.href)).text()).replace(/.+\<title\>/i, '').replace(/\<\/title.+/i, '');
//      console.log('222 Post_fetch 222');
//    }
//      let IntervalID = setInterval( () => {
//        link.href = link.firstChild.attributes.src.value;
//        if (/^(ht|f)tp/i.test(link.href)) clearInterval(IntervalID);
//      }, 500)
    }
  }
}
else if (/upwork/i.test(HostName)) {
  Anchor = /.+leaving-odesk\?ref=/i;
}
else if (/vk|zoon/i.test(HostName)) {
  Anchor = /.+to=/i;  After = /[?&](cc_key|from_content|post|hash)=.*/i;
}
else if (/yandex\.[^.]{1,4}\/search/i.test(Location)) {
  rwLink = link => { link.removeAttribute('data-counter') }
}
else if (/yandex\.[^.]{1,4}\/images/i.test(Location)) {
  Anchor = /.+&img_url=/i;  After = /&text=.*/i;
}
else if (/yandex\.[^.]{1,4}\/news/i.test(Location)) {
  After = /[?&]utm_source=.*/i;
}
else if (/yaplakal/i.test(HostName)) {
  Anchor = /.+go\/\?/i;
}
else if (/youtube/i.test(HostName)) {
  Anchor = /.+q=/i;  After = /&(redir_token|event|v)=.*/i;
}

rwAll();
