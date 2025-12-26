/**
 * @param {number} usec;
 */
async function Sleep(usec) {
  await new Promise(r => setTimeout(r, (usec)));
}

/**
 * @param {number} min;
 * @param {number} max;
 */
function RandNumber(min, max) {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

$(document).ready(async function() {
  while (true) {
    for (var i = 0xE052; i <= 0xE0C6; ++i) {
      $('#loader').empty();
      $('#loader').html(`&#x${i.toString(16).padStart(4, "0")};`);
      await Sleep(1000/30);
    }
  }
});

const REBOOT_TEXT = "正在重新启动";
const UPDATE_TEXT = `正在配置更新<br/>已完成 <a>(percentage)%</a><br/>请勿关闭计算机`;
const BG_BLUE = '#0063b1';
const BG_BLACK = '#000000';
const ANIMI_DURATION = .25;

function ResetAnimi() {
  $('#winlogo').css('display', 'none');
  $('#loader').css('opacity', '1');
  $('#winlogo').css('opacity', '1');
  $('#loader').css('font-size', '2.2rem');
  $('body').css('background-color', BG_BLUE);
}

/**
 * @param {boolean} isOut;
 * @param {string[]} elements;
 * @param {number} Duration;
 */
async function OSIconAnimi(elements, isOut=false, Duration=ANIMI_DURATION) {
  /**
   * @param {string[]} elements;
   * @param {number} opacity;
   */
  async function DoAnimi(_elements, opacity) {
    _elements.forEach((val, index) => {
      $(val).css('opacity', opacity.toString());
    });
    await Sleep(ANIMI_DURATION / 100);
  }
  if (!isOut) for (var i = 0; i < 1; i += .01) {
    await DoAnimi(elements, i);
  } else for (var i = 1; i > 0; i -= .01) {
    await DoAnimi(elements, i);
  }
}

/**
 * @param {Element} element;
 */
function EnterFullScreen(element=document.documentElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Safari, Chrome
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}

async function CheckFullScreen() {
  if (!document.fullscreenElement)
    EnterFullScreen();
}

async function AutoFullScreen() {
  $(document).hover(CheckFullScreen);
  $(document).focus(CheckFullScreen);
  $(document).click(CheckFullScreen);
  $(document).mouseenter(CheckFullScreen);
  $(document).mouseover(CheckFullScreen);
  $(document).mouseleave(CheckFullScreen);
  $(document).mouseout(CheckFullScreen);
  $(document).mousemove(CheckFullScreen);
  $(document).keypress(CheckFullScreen);
  $(document).keydown(CheckFullScreen);
  $(document).keyup(CheckFullScreen);
  $(document).on('touchstart', CheckFullScreen);
  $(document).on('touchmove', CheckFullScreen);
  $(document).on('touchend', CheckFullScreen);
  $(document).on('touchcancel', CheckFullScreen);
  $(document).on('fullscreenchange', CheckFullScreen);
}

$(document).ready(async function() {
  // 自动全屏
  AutoFullScreen();
  while (true) {
    ResetAnimi();
    // 更新
    for(var i = 0; i <= 10; i++) {
      $('#loading_text').empty();
      $('#loading_text').html(UPDATE_TEXT.replace('(percentage)', (i*10).toString()));
      await Sleep(RandNumber(9810, 11451.4));
    }
    // 重启
    $('#loading_text').html(REBOOT_TEXT);
    await Sleep(1145);
    $('#loading_text').empty();
    // 黑屏
    $('body').css('background-color', BG_BLACK);
    $('#loader').css('display', 'none');
    await Sleep(2500);
    // Windows logo
    $('#loader').css('opacity', '0');
    $('#winlogo').css('opacity', '0');
    $('#loader').css('display', 'block');
    $('#loader').css('font-size', '1.6rem');
    $('#winlogo').css('display', 'block');
    await OSIconAnimi(['#loader', '#winlogo']);
    await Sleep(10000);
    await OSIconAnimi(['#loader', '#winlogo'], true);
    // 黑屏
    $('body').css('background-color', BG_BLACK);
    $('#winlogo').css('display', 'none');
    $('#loader').css('opacity', '0');
    await Sleep(2000);
    if (!!RandNumber(0, 1)) {
      // short Win logo
      $('#winlogo').css('opacity', '0');
      $('#winlogo').css('display', 'block');
      await OSIconAnimi(['#winlogo'], false, .00005);
      await Sleep(400);
      await OSIconAnimi(['#winlogo'], true, .00005);
    }
  }
});
