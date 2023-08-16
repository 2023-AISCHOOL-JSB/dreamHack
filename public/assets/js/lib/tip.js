/**
 * Define actions to manage tip section
 */
(function () {
  'use strict';

  function tipPanel() {
    const defaultTips = [
      'Tip : 화살표를 사용하여 선택한 개체를 1픽셀씩 이동!',
      'Tip : Shift를 클릭하여 여러 개체를 선택하고 수정하십시오!',
      'Tip : 물체를 15° 각도로 회전할 때 Shift를 누르십시오!',
      'Tip : Ctrl +/-, Ctrl + 휠을 확대 / 축소합니다!',
      'Tip : 클릭하여 점을 배치하고, 커브를 길게 누르십시오! 취소하려면 외부를 클릭하거나 Esc를 클릭하십시오!'
    ]
    const _self = this;
    $(`${this.containerSelector} .canvas-holder .content`).append(`
    <div id="tip-container">${defaultTips[parseInt(Math.random() * defaultTips.length)]}</div>`)
    this.hideTip = function () {
      $(`${_self.containerSelector} .canvas-holder .content #tip-container`).hide();
    }

    this.showTip = function () {
      $(`${_self.containerSelector} .canvas-holder .content #tip-container`).show();
    }

    this.updateTip = function (str) {
      typeof str === 'string' && $(`${_self.containerSelector} .canvas-holder .content #tip-container`).html(str);
    }
  }

  window.ImageEditor.prototype.initializeTipSection = tipPanel;
})();