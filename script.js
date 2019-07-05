var cont, imgs, ctrlL, ctrlR, counter, index = 0, count = index + 1;


function init(target, configuration) {

  // if (configuration.autoscroll) {
  //   function startAutoscroll() {
  //     setInterval(ctrlR.dispatchEvent(click), 1000);
  //   }
  // }


// Container initialization
  cont = document.getElementById(target);
  imgs = cont.children;
  cont.style.cssText = 'position: relative; overflow: hidden; height:' + imgs[0].height + 'px;';

// Images alignment
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].style.cssText = 'position: absolute; z-index: 0;';
  }

  imgs[index].style.zIndex  = "1";


// Control buttons creation
  function createControls() {
    //buttons
    ctrlL = document.createElement('button');
    ctrlL.innerHTML = '&lArr;';
    ctrlL.style.cssText = 'position: absolute; z-index: 2; width: 40px; height: 40px; top: 50%; left: 0px; transform: translateY(-50%); background-color: rgba(53, 53, 53, 0.8); color: #fff; font-size: 30px; border: none;';
    cont.parentElement.appendChild(ctrlL);

    ctrlR = document.createElement('button');
    ctrlR.innerHTML = '&rArr;';
    ctrlR.style.cssText = 'position: absolute; z-index: 2; width: 40px; height: 40px; top: 50%; right: 0px; transform: translateY(-50%); background-color: rgba(53, 53, 53, 0.8); color: #fff; font-size: 30px; border: none;';
    cont.parentElement.appendChild(ctrlR);

    //page counter
    counter = document.createElement('div');
    counter.innerHTML = count + "/" + (imgs.length);
    counter.style.textAlign = "center";
    cont.parentElement.appendChild(counter);
  }
  createControls();


//Click events
  ctrlL.addEventListener('click', function() {
    hideImg(index);
    index--;
    index = index < 0 ? imgs.length - 1 : index;
    count = index + 1;
    showImg(index);
    changeCounter(count);
    console.log(index);

  });

  ctrlR.addEventListener('click', function() {
    hideImg(index);
    index++;
    index = index > imgs.length - 1 ? 0 : index;
    count = index + 1;
    showImg(index);
    changeCounter(count);
    console.log(index);
});

 function changeCounter (count){
  counter.innerHTML = count + "/" + (imgs.length);
 }

 function showImg(index) {
   imgs[index].style.zIndex = "1";
 }

 function hideImg(index) {
   imgs[index].style.zIndex  = "0";
 }
}
