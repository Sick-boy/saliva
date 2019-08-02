function Slider(target) {

  var container,
      containerDefault = document.getElementById(target),
      imgs,
      index = 0,
      count = index + 1,
      pageCounter,
      dotsContainer,
      dots,
      scroll,
      mergedOptions,
      defaultOptions;

/******** PUBLIC METHODS ********/
  this.destroy = function() {

    // autoscroll disable
    window.clearInterval(scroll);
    // buttons removal
    if (mergedOptions.buttons === true) {
      var btnToRemove = container.getElementsByTagName('button');
      for (var i = btnToRemove.length - 1; i >= 0; i--) {
        btnToRemove[i].remove();
      }
    }
    // dots removal
    if (mergedOptions.dots === true) {
      var dotsToRemove = container.getElementsByTagName('ul');
      for (var i = dotsToRemove.length - 1; i >= 0; i--) {
        dotsToRemove[i].remove();
      }
    }
    //counter removal
    if (mergedOptions.counter === true) {
      var counterToRemove = container.getElementsByTagName('div');
      for (var i = counterToRemove.length - 1; i >= 0; i--) {
        counterToRemove[i].remove();
      }
    }
    // container's styling reversal
    for (var i = imgs.length - 1; i >= 0; i--) {
      imgs[i].style.cssText = '';
    }
    container.style.cssText = '';

    // nullification of methods
    this.init = null;
    this.destroy = null;
  };

  this.init = function (userOptions) {

    // default slider settings
    defaultOptions = {
        autoscroll: false,
        counter: false,
        buttons: false,
        buttonsCustomClass: [],
        dots: true,
        width: containerDefault.offsetWidth,
        height: containerDefault.offsetHeight,
        startFrom: 0
    };

    // if user options exist, use them. Else use default
    if (userOptions && typeof userOptions === 'object') {
      mergedOptions = {...defaultOptions, ...userOptions};
    } else {
      mergedOptions = defaultOptions;
    }

    // initializing container
    buildContainer();
    // pagination dots on/off?
    if (mergedOptions.dots === true) {
      buildDots();
    };
    // autoscroll on/off?
    if (mergedOptions.autoscroll === true) {
      scroll = window.setInterval(function() { restartAutoscroll() }, 1000);
    };
    // page counter on/off?
    if (mergedOptions.counter === true) {
      buildCounter();
    };
    // control buttons on/off?
    if (mergedOptions.buttons === true) {
      buildButtons();
    };
    // start from slide x ?
    if (mergedOptions.startFrom > 0) {
        if (mergedOptions.startFrom > imgs.length - 1) {
          switchImage(imgs.length - 1);
        } else {
          switchImage(mergedOptions.startFrom - 1);
        }
    } else if (mergedOptions.startFrom <= 0) {
      switchImage(0);
    };
  };

/******** CONTROL FUNCTIONS ********/

  function buildContainer() {
    // Container initialization
    container = document.getElementById(target);
    imgs = container.getElementsByTagName('img');

    container.style.cssText = 'position: relative; display: inline-block';
    container.style.width = mergedOptions.width + 'px';
    container.style.height = mergedOptions.height + 'px';

    // Images initial alignment
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.cssText = 'position: absolute; z-index: 0; width:' + mergedOptions.width + 'px; height:' + mergedOptions.height + 'px;';
    }
    imgs[index].style.zIndex  = "1";
  };

  function buildButtons() {
    //buttons initialization
    for (var a = 0; a < 2; a++) {
      var btn = document.createElement('button');
      btn.classList.add("_saliva-btn");
      btn.style.cssText = 'position: absolute; z-index: 2; width: 40px; height: 40px; transform: translateY(-50%); background-color: rgba(53,  53, 53, 0.8); color: #fff; font-size: 30px; border: none; cursor: pointer;';

      if (a == 0) {
        btn.innerHTML = "&lArr;";
        // if container width and/or height enabled
        if (typeof mergedOptions.height === 'number') {
            btn.style.top = (container.offsetHeight / 2) + 'px';
        } else {
            btn.style.top = '50%';
        };
        btn.style.left = "0";

          // if custom classes are set
          if (mergedOptions.buttonsCustomClass.length > 0) {
            for (var i = 0; i < mergedOptions.buttonsCustomClass.length; i++) {
              btn.classList.add(mergedOptions.buttonsCustomClass[i]);
            }
          };

        btn.addEventListener('click', function () {
          switchImage('left');
          restartAutoscroll();
        });

      } else {
        btn.innerHTML = "&rArr;";
        // if container width and/or height enabled
        if (typeof mergedOptions.height === 'number') {
            btn.style.top = (container.offsetHeight / 2) + 'px';
        } else {
            btn.style.top = '50%';
        };
        btn.style.right = '0';

          // if custom classes are set
          if (mergedOptions.buttonsCustomClass.length > 0) {
            for (var i = 0; i < mergedOptions.buttonsCustomClass.length; i++) {
              btn.classList.add(mergedOptions.buttonsCustomClass[i]);
            }
          };

        btn.addEventListener('click', function () {
          switchImage('right');
          restartAutoscroll();
        });
      }
      container.appendChild(btn);
    };
  };

  function buildCounter() {
    //page counter creation
    pageCounter = document.createElement('div');
    pageCounter.innerHTML = count + "/" + (imgs.length);
    pageCounter.style.cssText = "text-align: center; position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);";
    container.appendChild(pageCounter);
  };

  function switchImage(arg) {
    //hide all images
    for(var i = 0; i < imgs.length; i++) {
      imgs[i].style.zIndex = "0";
      // if dots enabled repaint all to disabled
      if (mergedOptions.dots === true) {
        dots[i].style.backgroundColor = 'rgba(255,255,255,.5)';
      }
    }
    //show previous, next or selected image
    if (arg === 'left') {
      index--;
      index = index < 0 ? imgs.length - 1 : index;
    } else if (arg === 'right') {
      index++;
      index = index > imgs.length - 1 ? 0 : index;
    } else {
      index = arg;
    };

    imgs[index].style.zIndex = "1";
    // if dots enabled repaint active
    if (mergedOptions.dots === true) {
      dots[index].style.backgroundColor = 'rgba(255,255,255,.8)';
    };
    //if counter enabled
    if (mergedOptions.counter === true) {
      count = index + 1;
      changeCounter(count);
    }
  };

  function restartAutoscroll() {
    if (mergedOptions.autoscroll === true) {
      window.clearInterval(scroll);
      scroll = window.setInterval(function () {
        switchImage('left');
      }, 3000);
    }
  };

  function changeCounter (count) {
      if (mergedOptions.counter === true) {
        pageCounter.innerHTML = count + "/" + (imgs.length);
      }
  };

  function buildDots() {
    dotsContainer = document.createElement('ul');
    dotsContainer.style.cssText = "position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); z-index: 2; margin: 0; padding: 0;"
    container.appendChild(dotsContainer);

    for (var i = 0; i < imgs.length; i++) {
      var dot  = document.createElement('li');
      dot.style.cssText = "display: inline-block; width: 15px; height: 15px; border-radius: 50%; margin: 2px; background: rgba(255,255,255,.5); cursor: pointer; box-shadow: inset 0px 1px 3px 0px rgba(0,0,0,.6)";
      dot.dataset.index = i;
      dot.addEventListener("click", function () {
        switchImage(Number(this.dataset.index));
        changeCounter(count);
        restartAutoscroll();
      });
      dotsContainer.appendChild(dot);
    }
    dots = dotsContainer.children;
  };

};
