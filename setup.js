if (window.location.hash) {
  const pathname = window.location.hash.slice(1);

  const target = document.querySelector('#offline-resources-1x');
  target.src = `assets/${pathname}/default_100_percent/100-offline-sprite.png`;
  const target2 = document.querySelector('#offline-resources-2x');
  target2.src = `assets/${pathname}/default_200_percent/200-offline-sprite.png`;

  const ad = document.querySelector('.ad > img');
  ad.src = `assets/banners/${pathname}.png`;
}

function onAd() {
  const pathname = window.location.hash.slice(1);
  let link = 'https://onelink.to/2n7b9c';

  switch (pathname) {
    case 'dongdong':
      link = 'https://second-team.com';
      break;
    case 'ghost':
      link = 'https://www.instagram.com/fermentedghost/';
      break;
    default:
      break;
  }

  window.open(link);
}
