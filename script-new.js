function Slider(target, options) {

  var cont, imgs, index=0;

  this.init = function () {
    this.buildSlider();
    this.controls();
  }

  this.buildSlider = function(){

    // Container initialization
    cont = document.getElementById(target);
    imgs = cont.children;
    cont.style.cssText = 'position: relative; overflow: hidden; height:' + imgs[0].height + 'px;';

    // Images alignment
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.cssText = 'position: absolute; z-index: 0;';
    }
    imgs[this.index].style.zIndex  = "1";
  }

  //controls creation
  this.controls = function () {

    function changeCounter (count) {
     counter.innerHTML = count + "/" + (imgs.length);
    }

    function showImg(index) {
      imgs[index].style.zIndex = "1";
    }

    function hideImg(index) {
      imgs[index].style.zIndex  = "0";
    }

    for (var i = 0; i < 2; i++) {
      var btn = document.createElement('button');
      btn.className = "_btn";
      btn.style.cssText = 'position: absolute; z-index: 2; width: 40px; height: 40px; top: 50%; transform: translateY(-50%); background-color: rgba(53,  53, 53, 0.8); color: #fff; font-size: 30px; border: none; cursor: pointer;';

      if (i == 0) {
        btn.innerHTML = "&lArr;";
        btn.style.left = "0";
        btn.addEventListener('click', function () {
          // hideImg(this.index);
          index++;
          // this.index = this.index > imgs.length - 1 ? 0 : this.index;
          // this.count = this.index + 1;
          // showImg(this.index);
          // changeCounter(this.count);
          console.log(index);
        });
      } else {
        btn.innerHTML = "&rArr;";
        btn.style.right = "0";
        btn.addEventListener('click', function () {


        });
      }
      cont.parentElement.appendChild(btn);
    }
  }
}
