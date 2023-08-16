/*
  initialize canvas setting panel
 */

(function () {
  'use strict';

  // 캔버스 설정 패널을 초기화하는 함수
  var canvasSettings = function () {
    const _self = this;
    // "배경" 패널을 생성하여 .main-panel 요소에 추가
    $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="background-panel"><div class="content"><p class="title">배경</p></div></div>`);


    // 캔버스 크기 설정 섹션 추가
    (() => {
      $(`${this.containerSelector} .toolpanel#background-panel .content`).append(`
      <div class="canvas-size-setting">
        <p>캔버스 크기</p>
        <div class="input-container">
          <label>너비</label>
          <div class="custom-number-input">
          <button class="decrease">-</button>
          <input type="number" min="100" id="input-width" value="800"/>
          <button class="increase">+</button>
          </div>
        </div>
        <div class="input-container">
          <label>높이</label>
          <div class="custom-number-input">
          <button class="decrease">-</button>
          <input type="number" min="100" id="input-height" value="600"/>
          <button class="increase">+</button>
          </div>
        </div>
      </div>
    `);

      // 캔버스 크기 변경 함수
      var setDimension = () => {

        try {
          let width = $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val();
          let height = $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val();
          _self.canvas.setWidth(width)
          _self.canvas.originalW = width
          _self.canvas.setHeight(height)
          _self.canvas.originalH = height
          _self.canvas.renderAll()
          _self.canvas.trigger('object:modified')
        } catch (_) { }
      }

      $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).change(setDimension)
      $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).change(setDimension)
    })();



    // end set dimension section

    // 배경색 설정 섹션
    (() => {
      $(`${this.containerSelector} .toolpanel#background-panel .content`).append(`
      <div class="color-settings">
        <div class="tab-container">
          <div class="tabs">
            <div class="tab-label" data-value="color-fill" style="font-size: 12px;">채우기 색상</div>
            <div class="tab-label" data-value="gradient-fill" style="font-size: 12px;">그라디언트</div>
          </div>
          <div class="tab-content" data-value="color-fill">
            <input id="color-picker" value='black'/><br>
          </div>
          <div class="tab-content" data-value="gradient-fill">
            <div id="gradient-picker"></div>

            <div class="gradient-orientation-container">
              <div class="input-container">
                <label>방향</label>
                <select id="select-orientation">
                  <option value="linear">선형</option>
                  <option value="radial">방사형</option>
                </select>
              </div>
              <div id="angle-input-container" class="input-container">
                <label>각도</label>
                <div class="custom-number-input">
                  <button class="decrease">-</button>
                  <input type="number" min="0" max="360" value="0" id="input-angle">
                  <button class="increase">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br>
      <div class="template-settings">
      <div class="template-selector">
        <label>템플릿 선택</label>
        <select id="select-template">
          <option value="template1">기본</option>
          <option value="template2">코르크판1</option>
          <option value="template3">코르크판2</option>
          <option value="template4">칠판</option>
          <option value="template5">폴라로이드</option>
          <option value="template6">무지개</option>
          <option value="template7">바다</option>
          <option value="template8">해냄</option>
          <option value="template9">폴라로이드</option>
          <option value="template10">폴라로이드</option>
          <!-- 추가 템플릿 옵션 추가 가능 -->
        </select>
      </div>
      <!-- 추가 템플릿 설정 영역 -->
      <div class="template-options" id="template1-options">
        <!-- 템플릿 1 설정 내용 -->
      </div>
      <div class="template-options" id="template2-options">
        <!-- 템플릿 2 설정 내용 -->
      </div>
      <!-- 추가 템플릿 설정 영역 끝 -->
    </div>
    `)


      // 채우기 색상, 그라디언트 탭 라벨 클릭 이벤트 처리
      $(`${this.containerSelector} .toolpanel#background-panel .content .tab-label`).click(function () {
        // `.tab-label` 요소가 클릭되면, 다른 탭 라벨에서 `active`클래스를 제거
        $(`${_self.containerSelector} .toolpanel#background-panel .content .tab-label`).removeClass('active');
        // 클릭된 탭 라벨에 `active` 클래스를 추가
        $(this).addClass('active');
        // 클릭된 탭 라벨의 `data-value` 속성 가져와서 해당 값 가진 컨텐츠 보여줌
        let target = $(this).data('value');
        $(this).closest('.tab-container').find('.tab-content').hide();
        $(this).closest('.tab-container').find(`.tab-content[data-value=${target}]`).show();

        // 만약 선택된 탭이 "채우기 색상"인 경우, 선택한 색상을 가져와서 캔버스의 배경색을 업데이트하고 다시 렌더링
        if (target === 'color-fill') {
          let color = $(`${_self.containerSelector} .toolpanel#background-panel .content #color-picker`).val();
          try {
            _self.canvas.backgroundColor = color;
            _self.canvas.renderAll();
          } catch (_) {
            console.log("can't update background color")
          }
          // 그렇지 않은 경우 그라디언트 설정을 업데이트
        } else {
          updateGradientFill();
        }
      })

      // 초기 로드시 채우기 색상 탭 선택 (즉, 페이지 로드시 해당 탭 활성화 되어 있음)
      $(`${this.containerSelector} .toolpanel#background-panel .content .tab-label[data-value=color-fill]`).click();

      // 채우기 색상 선택 위젯 초기화 (사용자가 색상 선택하면 해당 배경색을 업데이트 하고 캔버스 다시 렌더링)
      $(`${this.containerSelector} .toolpanel#background-panel .content #color-picker`).spectrum({
        flat: true,
        showPalette: false,
        showButtons: false,
        type: "color",
        showInput: "true",
        allowEmpty: "false",
        move: function (color) {
          let hex = 'transparent';
          color && (hex = color.toRgbString()); // #ff0000
          _self.canvas.backgroundColor = hex;
          _self.canvas.renderAll();
        }
      });

      // 그라디언트 선택 위젯 초기화
      const gp = new Grapick({
        el: `${this.containerSelector} .toolpanel#background-panel .content #gradient-picker`,
        colorEl: '<input id="colorpicker"/>'// 커스텀 색상 선택 위젯을 위한 엘리먼트 지정
      });

      // 그라디언트 핸들러 색상 선택 위젯 초기화
      gp.setColorPicker(handler => {
        const el = handler.getEl().querySelector('#colorpicker');
        $(el).spectrum({
          showPalette: false,
          showButtons: false,
          type: "color",
          showInput: "true",
          allowEmpty: "false",
          color: handler.getColor(),
          showAlpha: true,
          change(color) {
            handler.setColor(color.toRgbString());
          },
          move(color) {
            handler.setColor(color.toRgbString(), 0);
          }
        });
      });

      gp.addHandler(0, 'red');
      gp.addHandler(100, 'blue');



      // 그라디언트 설정 업데이트
      const updateGradientFill = () => {
        let stops = gp.getHandlers();
        let orientation = $(`${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container #select-orientation`).val();
        let angle = parseInt($(`${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container #input-angle`).val());

        let gradient = generateFabricGradientFromColorStops(stops, _self.canvas.width, _self.canvas.height, orientation, angle);
        _self.canvas.setBackgroundColor(gradient)
        _self.canvas.renderAll()
      }

      // Do stuff on change of the gradient
      gp.on('change', complete => {
        updateGradientFill();
      })

      // 그라디언트 방향 변경 이벤트 처리
      $(`${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container #select-orientation`).change(function () {
        let type = $(this).val();
        if (type === 'radial') {
          $(this).closest('.gradient-orientation-container').find('#angle-input-container').hide();
        } else {
          $(this).closest('.gradient-orientation-container').find('#angle-input-container').show();
        }
        updateGradientFill();
      })


      // 그라디언트 각도 변경 이벤트 처리
      $(`${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container #input-angle`).change(function () {
        updateGradientFill();
      })

      // 배경 템플릿 선택 이벤트 처리
      $(`${this.containerSelector} .toolpanel#background-panel .content #select-template`).change(function () {
        let selectedTemplate = $(this).val();

        // 선택한 템플릿에 따라 배경 이미지와 캔버스 크기 설정
        if (selectedTemplate === 'template1') {
          fabric.Image.fromURL('이미지1.jpg', function (img) {

            // 이미지 비율을 유지하면서 캔버스 크기에 맞게 조정
            const canvasAspectRatio = _self.canvas.width / _self.canvas.height;
            const imageAspectRatio = img.width / img.height;

            if (canvasAspectRatio > imageAspectRatio) {
              img.scaleToWidth(_self.canvas.width);
            } else {
              img.scaleToHeight(_self.canvas.height);
            }

            // 이미지를 캔버스의 배경 이미지로 설정
            _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
          }, { crossOrigin: 'anonymous' });
        } else if (selectedTemplate === 'template2') {
          fabric.Image.fromURL('images/cork1.jpg', function (img) {
            const imageWidth = img.width;
            const imageHeight = img.height;
    
            _self.canvas.setWidth(imageWidth);
            _self.canvas.setHeight(imageHeight);
    
            img.scaleToWidth(imageWidth);
            img.scaleToHeight(imageHeight);
    
            _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
    
            const combinedObject = new fabric.Group([img, _self.canvas], {
                width: imageWidth,
                height: imageHeight,
            });
    
            _self.canvas.add(combinedObject);
            _self.canvas.renderAll();
    
            // Update input values to match image size
            $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
            $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);
    
        }, { crossOrigin: 'anonymous' });
        } else if (selectedTemplate === 'template3') {
          fabric.Image.fromURL('images/cork2.jpg', function (img) {
            // 이미지 비율을 유지하면서 캔버스 크기에 맞게 조정
            const canvasAspectRatio = _self.canvas.width / _self.canvas.height;
            const imageAspectRatio = img.width / img.height;

            if (canvasAspectRatio > imageAspectRatio) {
              img.scaleToWidth(_self.canvas.width);
            } else {
              img.scaleToHeight(_self.canvas.height);
            }

            // 이미지를 캔버스의 배경 이미지로 설정
            _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
          }, { crossOrigin: 'anonymous' });

        }  else if (selectedTemplate === 'template4') {
          fabric.Image.fromURL('images/칠판2.jpg', function (img) {
            const imageWidth = img.width;
            const imageHeight = img.height;
    
            _self.canvas.setWidth(imageWidth);
            _self.canvas.setHeight(imageHeight);
    
            img.scaleToWidth(imageWidth);
            img.scaleToHeight(imageHeight);
    
            _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
    
            const combinedObject = new fabric.Group([img, _self.canvas], {
                width: imageWidth,
                height: imageHeight,
            });
    
            _self.canvas.add(combinedObject);
            _self.canvas.renderAll();
    
            // Update input values to match image size
            $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
            $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);
    
        }, { crossOrigin: 'anonymous' });
      }
      
      else if (selectedTemplate === 'template5') {
        fabric.Image.fromURL('images/폴8.jpg', function (img) {
          const imageWidth = img.width;
          const imageHeight = img.height;
  
          _self.canvas.setWidth(imageWidth);
          _self.canvas.setHeight(imageHeight);
  
          img.scaleToWidth(imageWidth);
          img.scaleToHeight(imageHeight);
  
          _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
  
          const combinedObject = new fabric.Group([img, _self.canvas], {
              width: imageWidth,
              height: imageHeight,
          });
  
          _self.canvas.add(combinedObject);
          _self.canvas.renderAll();
  
          // Update input values to match image size
          $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
          $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);
  
      }, { crossOrigin: 'anonymous' });
    }
    else if (selectedTemplate === 'template6') {
      fabric.Image.fromURL('images/무지개.jpg', function (img) {
        const imageWidth = img.width;
        const imageHeight = img.height;

        _self.canvas.setWidth(imageWidth);
        _self.canvas.setHeight(imageHeight);

        img.scaleToWidth(imageWidth);
        img.scaleToHeight(imageHeight);

        _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));

        const combinedObject = new fabric.Group([img, _self.canvas], {
            width: imageWidth,
            height: imageHeight,
        });

        _self.canvas.add(combinedObject);
        _self.canvas.renderAll();

        // Update input values to match image size
        $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
        $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);

    }, { crossOrigin: 'anonymous' });
  }
  else if (selectedTemplate === 'template7') {
    fabric.Image.fromURL('images/바다.jpg', function (img) {
      const imageWidth = img.width;
      const imageHeight = img.height;

      _self.canvas.setWidth(imageWidth);
      _self.canvas.setHeight(imageHeight);

      img.scaleToWidth(imageWidth);
      img.scaleToHeight(imageHeight);

      _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));

      const combinedObject = new fabric.Group([img, _self.canvas], {
          width: imageWidth,
          height: imageHeight,
      });

      _self.canvas.add(combinedObject);
      _self.canvas.renderAll();

      // Update input values to match image size
      $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
      $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);

  }, { crossOrigin: 'anonymous' });
}
else if (selectedTemplate === 'template8') {
  fabric.Image.fromURL('images/해냄.jpg', function (img) {
    const imageWidth = img.width;
    const imageHeight = img.height;

    _self.canvas.setWidth(imageWidth);
    _self.canvas.setHeight(imageHeight);

    img.scaleToWidth(imageWidth);
    img.scaleToHeight(imageHeight);

    _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));

    const combinedObject = new fabric.Group([img, _self.canvas], {
        width: imageWidth,
        height: imageHeight,
    });

    _self.canvas.add(combinedObject);
    _self.canvas.renderAll();

    // Update input values to match image size
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);

}, { crossOrigin: 'anonymous' });
}
else if (selectedTemplate === 'template4') {
  fabric.Image.fromURL('images/칠판2.jpg', function (img) {
    const imageWidth = img.width;
    const imageHeight = img.height;

    _self.canvas.setWidth(imageWidth);
    _self.canvas.setHeight(imageHeight);

    img.scaleToWidth(imageWidth);
    img.scaleToHeight(imageHeight);

    _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));

    const combinedObject = new fabric.Group([img, _self.canvas], {
        width: imageWidth,
        height: imageHeight,
    });

    _self.canvas.add(combinedObject);
    _self.canvas.renderAll();

    // Update input values to match image size
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);

}, { crossOrigin: 'anonymous' });
}
else if (selectedTemplate === 'template4') {
  fabric.Image.fromURL('images/칠판2.jpg', function (img) {
    const imageWidth = img.width;
    const imageHeight = img.height;

    _self.canvas.setWidth(imageWidth);
    _self.canvas.setHeight(imageHeight);

    img.scaleToWidth(imageWidth);
    img.scaleToHeight(imageHeight);

    _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));

    const combinedObject = new fabric.Group([img, _self.canvas], {
        width: imageWidth,
        height: imageHeight,
    });

    _self.canvas.add(combinedObject);
    _self.canvas.renderAll();

    // Update input values to match image size
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
    $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);

}, { crossOrigin: 'anonymous' });
}
else if (selectedTemplate === 'template5') {
          fabric.Image.fromURL('images/폴8.jpg', function (img) {
              const imageWidth = img.width;
              const imageHeight = img.height;
      
              _self.canvas.setWidth(imageWidth);
              _self.canvas.setHeight(imageHeight);
      
              img.scaleToWidth(imageWidth);
              img.scaleToHeight(imageHeight);
      
              _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
      
              const combinedObject = new fabric.Group([img, _self.canvas], {
                  width: imageWidth,
                  height: imageHeight,
              });
      
              _self.canvas.add(combinedObject);
              _self.canvas.renderAll();
      
              // Update input values to match image size
              $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val(imageWidth);
              $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val(imageHeight);
      
          }, { crossOrigin: 'anonymous' });
      


        } 

      });
      // Helper function to set image as background and adjust canvas size
      function setImageAndCanvas(img) {
        const canvasAspectRatio = _self.canvas.width / _self.canvas.height;
        const imageAspectRatio = img.width / img.height;

        if (canvasAspectRatio > imageAspectRatio) {
          img.scaleToWidth(_self.canvas.width);
        } else {
          img.scaleToHeight(_self.canvas.height);
        }

        _self.canvas.setBackgroundImage(img, _self.canvas.renderAll.bind(_self.canvas));
        _self.canvas.renderAll();
      }

    })();
  }

  window.ImageEditor.prototype.initializeCanvasSettingPanel = canvasSettings;
})()