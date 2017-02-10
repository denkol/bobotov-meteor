import { Meteor } from 'meteor/meteor';
import { AccountsCommon } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
  /* Facebook */
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    "service" : "facebook",
    "appId" : "695731333928670",
    "secret" : "a5913050b5af22b7cec4b9d10c8a7b9f"
  });
  
  /* VK */
  ServiceConfiguration.configurations.remove({
    service: 'vk'
  });

  ServiceConfiguration.configurations.insert({
    service: 'vk',
    appId:   '1234567',       // Your app id
    secret:  'someappsecret', // Your app secret
    scope:   'email,status'   // Your app scope
  });

  Inject.rawHead('loader-style', '<style> .spinner-wrapper {display: flex;position: fixed;top: 0;left: 0;min-width: 100%;min-height: 100%;background-color: white;width: auto;height: auto;display: flex;overflow: hidden;z-index: 200;}.spinner {margin: auto; fill: #4A90E2;animation-name: spinnerrotate;animation-duration: 1s;animation-iteration-count: infinite;animation-timing-function: linear;transform-origin: 50% 50%;}@keyframes spinnerrotate {0%,100% {opacity: 1;}50% {opacity: 0.2;} } .example-appear{opacity:.01}.example-appear.example-appear-active{opacity:1;transition:opacity .2s ease-in} </style> ' + '<meta charset="UTF-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><meta name="fragment" content="!"><title>Bobotov - Лента объявлений в Черногории</title><meta property="og:image" content="/img/favicon/image.jpg"><link rel="apple-touch-icon" sizes="57x57" href="/img/favicon/apple-icon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/img/favicon/apple-icon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-icon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/img/favicon/apple-icon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-icon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/img/favicon/apple-icon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/img/favicon/apple-icon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/img/favicon/apple-icon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-icon-180x180.png"><link rel="icon" type="image/png" sizes="192x192" href="/img/favicon/android-icon-192x192.png"><link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="/img/favicon/favicon-96x96.png"><link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png"><link rel="manifest" href="/img/favicon/manifest.json"><meta name="msapplication-TileImage" content="/img/favicon/ms-icon-144x144.png"><meta name="theme-color" content="#EEE"><meta name="msapplication-navbutton-color" content="#EEE"><meta name="msapplication-TileColor" content="#EEE"><meta name="apple-mobile-web-app-status-bar-style" content="#EEE"><link rel="stylesheet" href="/css/main.css">');

  Inject.rawHead('loader-body2', '<div id="preloader" class="spinner-wrapper"><img class="spinner" src="/img/logo100x100.png" /></div>');

  Inject.rawHead('loader-body3', '<svg class="svg-icon-lib" xmlns="http://www.w3.org/2000/svg"> <symbol id="ico-3d" viewbox="0 0 17 17"> <title>Shape</title> <path d="M5.327 15.215a7.428 7.428 0 0 1-4.23-6.007H.036C.397 13.572 4.045 17 8.5 17l.467-.021L6.27 14.28l-.942.935zm.63-4.618c-.135 0-.262-.022-.368-.057a.758.758 0 0 1-.284-.17.702.702 0 0 1-.184-.262.845.845 0 0 1-.064-.333h-.92c0 .255.05.482.148.673.1.191.234.354.397.489.17.127.361.226.58.29.213.07.44.106.68.106.263 0 .51-.035.73-.106.227-.07.426-.177.588-.312.163-.134.298-.304.39-.51.092-.205.142-.432.142-.687 0-.134-.014-.269-.05-.396a1.273 1.273 0 0 0-.878-.885 1.486 1.486 0 0 0 .63-.532c.071-.106.12-.213.156-.326a1.13 1.13 0 0 0 .05-.34c0-.255-.043-.481-.128-.68a1.261 1.261 0 0 0-.361-.489 1.457 1.457 0 0 0-.546-.304c-.22-.064-.46-.1-.722-.1-.255 0-.489.036-.708.114a1.802 1.802 0 0 0-.56.319c-.149.134-.27.29-.361.474a1.412 1.412 0 0 0-.128.602h.921c0-.12.021-.226.064-.318a.666.666 0 0 1 .177-.241.84.84 0 0 1 .27-.156c.105-.035.212-.057.34-.057.282 0 .495.071.63.22.134.142.205.347.205.61 0 .127-.021.24-.057.346a.616.616 0 0 1-.177.262.898.898 0 0 1-.29.17 1.192 1.192 0 0 1-.411.064h-.545v.73h.545c.156 0 .297.014.425.05a.847.847 0 0 1 .319.162c.085.078.155.17.205.283.05.114.07.248.07.404 0 .29-.084.51-.247.659-.163.163-.39.234-.673.234zm6.056-4.194a2.359 2.359 0 0 0-.807-.545 2.665 2.665 0 0 0-1.034-.191H8.5v5.666h1.63c.389 0 .75-.063 1.069-.19.319-.128.595-.306.821-.54a2.39 2.39 0 0 0 .525-.842 3.24 3.24 0 0 0 .184-1.112v-.284c0-.41-.064-.779-.184-1.112a2.475 2.475 0 0 0-.532-.85zm-.276 2.239c0 .297-.035.56-.1.8-.07.234-.17.44-.304.602-.134.163-.304.29-.503.376a1.82 1.82 0 0 1-.7.127h-.645V6.46h.687c.51 0 .9.163 1.161.489.27.326.404.793.404 1.41v.283zM8.5 0l-.467.021L10.73 2.72l.942-.942a7.417 7.417 0 0 1 4.222 6.007h1.063A8.483 8.483 0 0 0 8.5 0z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-add-photo" viewbox="0 0 28 26"> <title>Shape</title> <path d="M3.625 3.833V.208h2.417v3.625h3.625V6.25H6.042v3.625H3.625V6.25H0V3.833h3.625zm3.625 7.25V7.458h3.625V3.833h8.458l2.212 2.417h3.83a2.424 2.424 0 0 1 2.417 2.417v14.5a2.424 2.424 0 0 1-2.417 2.416H6.042a2.424 2.424 0 0 1-2.417-2.416V11.083H7.25zm8.458 10.875a6.044 6.044 0 0 0 6.042-6.041 6.044 6.044 0 0 0-6.042-6.042 6.044 6.044 0 0 0-6.041 6.042 6.044 6.044 0 0 0 6.041 6.041zm-3.866-6.041a3.863 3.863 0 0 0 3.866 3.866 3.863 3.863 0 0 0 3.867-3.866 3.863 3.863 0 0 0-3.867-3.867 3.863 3.863 0 0 0-3.866 3.867z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-auto" viewbox="0 0 18 16"> <title>Shape</title> <path d="M15.92 1.01C15.72.42 15.16 0 14.5 0h-11c-.66 0-1.21.42-1.42 1.01L0 7v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V7l-2.08-5.99zM3.5 11C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8 5 8.67 5 9.5 4.33 11 3.5 11zm11 0c-.83 0-1.5-.67-1.5-1.5S13.67 8 14.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM2 6l1.5-4.5h11L16 6H2z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-building" viewbox="0 0 15 13"> <title>Shape</title> <path d="M7.5 2.958V.125H.417v12.75h14.166V2.958H7.5zm-4.25 8.5H1.833v-1.416H3.25v1.416zm0-2.833H1.833V7.208H3.25v1.417zm0-2.833H1.833V4.375H3.25v1.417zm0-2.834H1.833V1.542H3.25v1.416zm2.833 8.5H4.667v-1.416h1.416v1.416zm0-2.833H4.667V7.208h1.416v1.417zm0-2.833H4.667V4.375h1.416v1.417zm0-2.834H4.667V1.542h1.416v1.416zm7.084 8.5H7.5v-1.416h1.417V8.625H7.5V7.208h1.417V5.792H7.5V4.375h5.667v7.083zM11.75 5.792h-1.417v1.416h1.417V5.792zm0 2.833h-1.417v1.417h1.417V8.625z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-cat" viewbox="0 0 413.928 413.928"> <path d="M244.873 161.937c6.655 0 12.045 5.392 12.045 12.044 0 6.65-5.39 12.04-12.045 12.04-6.649 0-12.044-5.389-12.044-12.04 0-6.653 5.394-12.044 12.044-12.044z"></path> <path d="M371.029 339.641c-8.379-15.763-17.871-33.634-17.871-61.678 0-46.918 26.024-63.424 27.084-64.072 3.85-2.278 5.115-7.246 2.837-11.096a8.101 8.101 0 0 0-11.101-2.843c-1.429.85-35.021 21.39-35.021 78.011 0 32.083 10.958 52.708 19.76 69.282 6.312 11.865 11.29 21.246 11.29 31.968 0 7.683-1.672 13.23-4.83 16.062-3.217 2.879-7.42 2.452-7.499 2.452a7.894 7.894 0 0 0-1.171-.084h-29.815c3.47-5.432 5.516-11.855 5.516-18.769V13.703a8.106 8.106 0 0 0-5.933-7.805c-3.496-.986-7.225.503-9.107 3.615l-39.562 65.485c-12.139-.231-47.809-.509-154.588-.509-22.673 0-33.895.016-39.564.056L45.009 4.371C43.285 1.054 39.501-.657 35.9.234a8.102 8.102 0 0 0-6.184 7.868v370.762c0 19.28 15.681 34.969 34.966 34.969h289.382c.532.047 1.286.095 2.225.095 3.961 0 11.085-.881 17.36-6.297 7.003-6.054 10.558-15.614 10.558-28.429.001-14.75-6.396-26.805-13.178-39.561zM115.041 202.22c-15.572 0-28.242-12.667-28.242-28.239 0-15.575 12.675-28.244 28.242-28.244 15.57 0 28.242 12.669 28.242 28.244 0 15.572-12.667 28.239-28.242 28.239zm79.093 32.543h-5.982l-.654 11.253a8.1 8.1 0 0 1-8.079 7.631c-.156 0-.316-.005-.475-.011-4.464-.264-7.878-4.097-7.612-8.554l.599-10.314h-6.146a8.1 8.1 0 1 1 0-16.201h28.35c4.472 0 8.1 3.623 8.1 8.101a8.096 8.096 0 0 1-8.101 8.095zm50.739-32.543c-15.572 0-28.244-12.667-28.244-28.239 0-15.575 12.677-28.244 28.244-28.244 15.578 0 28.255 12.669 28.255 28.244-.001 15.572-12.677 28.239-28.255 28.239z"></path> <circle cx="115.041" cy="173.978" r="12.042"></circle> </symbol> <symbol id="ico-contacts" viewbox="0 0 18 20"> <title>Shape</title> <path d="M15.667 0H2.333v1.667h13.334V0zM2.333 20h13.334v-1.667H2.333V20zM15.667 3.333H2.333C1.417 3.333.667 4.083.667 5v10c0 .917.75 1.667 1.666 1.667h13.334c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667zM9 5.625c1.033 0 1.875.842 1.875 1.875A1.878 1.878 0 0 1 9 9.375 1.878 1.878 0 0 1 7.125 7.5c0-1.033.842-1.875 1.875-1.875zm4.167 8.542H4.833v-1.25c0-1.392 2.775-2.084 4.167-2.084s4.167.692 4.167 2.084v1.25z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-dashboard" viewbox="0 0 18 18"> <title>Shape</title> <path d="M0 10h8V0H0v10zm0 8h8v-6H0v6zm10 0h8V8h-8v10zm0-18v6h8V0h-8z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-euro" viewbox="0 0 18 18"> <title>Shape</title> <path d="M12 15.5A6.48 6.48 0 0 1 6.24 12H12v-2H5.58c-.05-.33-.08-.66-.08-1 0-.34.03-.67.08-1H12V6H6.24A6.491 6.491 0 0 1 12 2.5c1.61 0 3.09.59 4.23 1.57L18 2.3A8.955 8.955 0 0 0 12 0C8.08 0 4.76 2.51 3.52 6H0v2h3.06a8.262 8.262 0 0 0 0 2H0v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-event" viewbox="0 0 12 14"> <title>Shape</title> <path d="M9.333 8H6v3.333h3.333V8zM8.667.667V2H3.333V.667H2V2h-.667C.593 2 .007 2.6.007 3.333L0 12.667C0 13.4.593 14 1.333 14h9.334C11.4 14 12 13.4 12 12.667V3.333C12 2.6 11.4 2 10.667 2H10V.667H8.667zm2 12H1.333V5.333h9.334v7.334z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-eye" viewbox="0 0 561 561"> <path d="M280.5 89.25C153 89.25 43.35 168.3 0 280.5c43.35 112.2 153 191.25 280.5 191.25S517.65 392.7 561 280.5C517.65 168.3 408 89.25 280.5 89.25zm0 318.75C209.1 408 153 351.9 153 280.5S209.1 153 280.5 153 408 209.1 408 280.5 351.9 408 280.5 408zm0-204c-43.35 0-76.5 33.15-76.5 76.5s33.15 76.5 76.5 76.5 76.5-33.15 76.5-76.5-33.15-76.5-76.5-76.5z"></path> </symbol> <symbol id="ico-favorite" viewbox="0 0 13 13"> <title>Shape</title> <path d="M6.5 9.928l3.916 2.85-1.499-4.602 3.916-2.787H8.031L6.5.639l-1.53 4.75H.166l3.916 2.787-1.5 4.602z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-fullscreen" viewbox="0 0 14 14"> <title>Shape</title> <path d="M2 9H0v5h5v-2H2V9zM0 5h2V2h3V0H0v5zm12 7H9v2h5V9h-2v3zM9 0v2h3v3h2V0H9z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-general-info" viewbox="0 0 16 14"> <title>Shape</title> <path d="M10 12H0v2h10v-2zm6-8H0v2h16V4zM0 10h16V8H0v2zM0 0v2h16V0H0z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-graph-up" viewbox="0 0 20 12"> <title>Shape</title> <path d="M14 0l2.29 2.29-4.88 4.88-4-4L0 10.59 1.41 12l6-6 4 4 6.3-6.29L20 6V0z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-help" viewbox="0 0 16 16"> <title>Shape</title> <path d="M8 .5C3.86.5.5 3.86.5 8c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5C15.5 3.86 12.14.5 8 .5zm.75 12.75h-1.5v-1.5h1.5v1.5zm1.553-5.813l-.676.69c-.54.548-.877.998-.877 2.123h-1.5v-.375c0-.825.338-1.575.877-2.123l.93-.944c.278-.27.443-.646.443-1.058 0-.825-.675-1.5-1.5-1.5s-1.5.675-1.5 1.5H5a3 3 0 1 1 6 0c0 .66-.27 1.26-.697 1.688z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-history" viewbox="0 0 14 14"> <title>Shape</title> <path d="M7 .333C3.333.333.333 3.333.333 7s3 6.667 6.667 6.667 6.667-3 6.667-6.667S10.667.333 7 .333zM9.8 9.8L6.333 7.667v-4h1v3.466l3 1.8L9.8 9.8z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-home" viewbox="0 0 16 13"> <title>Shape</title> <path d="M6.5 13V8.5h3V13h3.75V7h2.25L8 .25.5 7h2.25v6z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-hot" viewbox="0 0 20 28"> <title>Shape</title> <path d="M11.875.838s.925 3.312.925 6c0 2.574-1.688 4.662-4.263 4.662C5.95 11.5 4 9.412 4 6.838l.037-.45A17.21 17.21 0 0 0 0 17.5c0 5.525 4.475 10 10 10s10-4.475 10-10c0-6.738-3.238-12.75-8.125-16.663zM9.637 23.75c-2.225 0-4.024-1.75-4.024-3.925 0-2.025 1.312-3.45 3.512-3.9 2.212-.45 4.5-1.513 5.775-3.225.487 1.613.737 3.313.737 5.05 0 3.313-2.687 6-6 6z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-hotel" viewbox="0 0 18 18"> <title>Shape</title> <path d="M10.127 11.56l1.43-1.43 6.44 6.443L16.57 18l-6.443-6.44zm4.293-5.73l2.86-2.86C13.33-.98 6.93-.99 2.98 2.95c3.93-1.3 8.31-.25 11.44 2.88zM2.95 2.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C2.7 11.29 1.65 6.91 2.95 2.98zm.02-.02l-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73C9.86 4.13 5.98 2.58 2.97 2.96z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-love-transp" viewbox="0 0 16 14"> <title>Shape</title> <path d="M11.375.25A4.491 4.491 0 0 0 8 1.817 4.491 4.491 0 0 0 4.625.25 4.085 4.085 0 0 0 .5 4.375C.5 7.21 3.05 9.52 6.912 13.03L8 14.012l1.088-.99C12.95 9.52 15.5 7.21 15.5 4.376A4.085 4.085 0 0 0 11.375.25zm-3.3 11.662L8 11.987l-.075-.075C4.355 8.68 2 6.542 2 4.375c0-1.5 1.125-2.625 2.625-2.625 1.155 0 2.28.742 2.678 1.77h1.402c.39-1.028 1.515-1.77 2.67-1.77 1.5 0 2.625 1.125 2.625 2.625 0 2.168-2.355 4.305-5.925 7.537z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-love" viewbox="0 0 13 13"> <title>Shape</title> <path d="M6.5 12.344l-.906-.825C2.375 8.6.25 6.675.25 4.312A3.404 3.404 0 0 1 3.688.876c1.087 0 2.13.506 2.812 1.306A3.743 3.743 0 0 1 9.313.875a3.404 3.404 0 0 1 3.437 3.438c0 2.362-2.125 4.287-5.344 7.212l-.906.819z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-messanges" viewbox="0 0 13 13"> <title>Shape</title> <path d="M12.125 2.75h-1.25v5.625H2.75v1.25c0 .344.281.625.625.625h6.875l2.5 2.5V3.375a.627.627 0 0 0-.625-.625zm-2.5 3.75V.875A.627.627 0 0 0 9 .25H.875A.627.627 0 0 0 .25.875v8.75l2.5-2.5H9a.627.627 0 0 0 .625-.625z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-next" viewbox="0 0 477.175 477.175"> <path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z"></path> </symbol> <symbol id="ico-next_prev" viewbox="0 0 8 8"> <title>Shape</title> <path d="M0 8l5.667-4L0 0v8zm6.667-8v8H8V0H6.667z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-notif" viewbox="0 0 15 18"> <title>Shape</title> <path d="M5.925 15.633a1.574 1.574 0 1 0 3.15 0h-3.15zm7.022-3.317V7.708a5.441 5.441 0 0 0-4.188-5.296v-.57c0-.697-.562-1.259-1.259-1.259-.697 0-1.259.562-1.259 1.26v.57a5.441 5.441 0 0 0-4.188 5.295v4.608L.375 13.994v.84h14.25v-.84l-1.678-1.678z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-picture" viewbox="0 0 18 18"> <title>Shape</title> <path d="M18 16V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM5.5 10.5L8 13.51 11.5 9l4.5 6H2l3.5-4.5z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-ratio" viewbox="0 0 15 13"> <title>Shape</title> <path d="M11.875 6.5h-1.25v1.875H8.75v1.25h3.125V6.5zm-7.5-1.875H6.25v-1.25H3.125V6.5h1.25V4.625zm8.75-3.75H1.875c-.688 0-1.25.563-1.25 1.25v8.75c0 .688.563 1.25 1.25 1.25h11.25c.688 0 1.25-.563 1.25-1.25v-8.75c0-.688-.563-1.25-1.25-1.25zm0 10.006H1.875V2.12h11.25v8.762z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-receipt" viewbox="0 0 13 15"> <title>Shape</title> <path d="M10.75 11.042h-8.5V9.625h8.5v1.417zm0-2.834h-8.5V6.792h8.5v1.416zm0-2.833h-8.5V3.958h8.5v1.417zM.125 14.583l1.063-1.062 1.062 1.062 1.063-1.062 1.062 1.062 1.063-1.062L6.5 14.583l1.063-1.062 1.062 1.062 1.063-1.062 1.062 1.062 1.063-1.062 1.062 1.062V.417l-1.063 1.062L10.75.417 9.687 1.479 8.626.417 7.562 1.479 6.5.417 5.437 1.479 4.375.417 3.312 1.479 2.25.417 1.187 1.479.125.417v14.166z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-remove" viewbox="0 0 18 18"> <title>Shape</title> <path d="M14.957 3.14a8.227 8.227 0 0 0-11.63 0 8.227 8.227 0 0 0 0 11.63 8.227 8.227 0 0 0 11.63 0 8.227 8.227 0 0 0 0-11.63zm-3.489 9.305l-2.326-2.326-2.326 2.326-1.163-1.163L7.98 8.956 5.653 6.63l1.163-1.163 2.326 2.326 2.326-2.326 1.163 1.163-2.326 2.326 2.326 2.326-1.163 1.163z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-search" viewbox="0 0 14 14"> <title>Shape</title> <path d="M9.625 8.5h-.592l-.21-.203A4.853 4.853 0 0 0 10 5.125 4.875 4.875 0 1 0 5.125 10a4.853 4.853 0 0 0 3.172-1.178l.203.21v.593l3.75 3.742 1.117-1.117L9.625 8.5zm-4.5 0A3.37 3.37 0 0 1 1.75 5.125 3.37 3.37 0 0 1 5.125 1.75 3.37 3.37 0 0 1 8.5 5.125 3.37 3.37 0 0 1 5.125 8.5z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-settings" viewbox="0 0 15 15"> <title>Shape</title> <path d="M12.763 8.194a5.52 5.52 0 0 0 .05-.694c0-.24-.022-.467-.05-.694l1.495-1.169a.357.357 0 0 0 .085-.453l-1.417-2.451a.356.356 0 0 0-.432-.156l-1.764.708a5.175 5.175 0 0 0-1.197-.694L9.263.714a.345.345 0 0 0-.346-.297H6.083a.345.345 0 0 0-.347.297l-.269 1.877a5.442 5.442 0 0 0-1.197.694l-1.764-.708a.346.346 0 0 0-.432.156L.658 5.183a.35.35 0 0 0 .084.454l1.495 1.169c-.028.227-.05.46-.05.694 0 .234.022.467.05.694L.742 9.363a.357.357 0 0 0-.085.453l1.417 2.451a.356.356 0 0 0 .432.156l1.764-.708c.368.283.765.517 1.197.694l.27 1.877c.02.17.17.297.346.297h2.834a.345.345 0 0 0 .347-.297l.269-1.877a5.442 5.442 0 0 0 1.197-.694l1.764.708c.163.064.347 0 .432-.156l1.416-2.45a.357.357 0 0 0-.085-.454l-1.494-1.169zM7.5 9.98A2.482 2.482 0 0 1 5.02 7.5 2.482 2.482 0 0 1 7.5 5.02 2.482 2.482 0 0 1 9.98 7.5 2.482 2.482 0 0 1 7.5 9.98z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-share" viewbox="0 0 12 14"> <title>Shape</title> <path d="M10 9.72c-.507 0-.96.2-1.307.513L3.94 7.467C3.973 7.313 4 7.16 4 7c0-.16-.027-.313-.06-.467l4.7-2.74A1.997 1.997 0 0 0 12 2.333c0-1.106-.893-2-2-2s-2 .894-2 2c0 .16.027.314.06.467l-4.7 2.74A1.997 1.997 0 0 0 0 7a1.997 1.997 0 0 0 3.36 1.46l4.747 2.773a1.88 1.88 0 0 0-.054.434c0 1.073.874 1.946 1.947 1.946a1.949 1.949 0 0 0 1.947-1.946A1.949 1.949 0 0 0 10 9.72z" fill-rule="evenodd"></path> </symbol> <symbol id="ico-teatr" viewbox="0 0 11 12"> <title>Shape</title> <path d="M1.167 5.417v3.791h1.625V5.417H1.167zm3.25 0v3.791h1.625V5.417H4.417zm-4.334 6.5h10.292v-1.625H.083v1.625zm7.584-6.5v3.791h1.625V5.417H7.667zM5.229.542L.083 3.25v1.083h10.292V3.25L5.229.542z" fill-rule="evenodd"></path> </symbol> </svg>');

});


