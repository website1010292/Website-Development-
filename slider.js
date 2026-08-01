/* =========================================================
   SLIDER.JS — lightweight carousel for testimonials & hero stats
   Works on any element with [data-slider] wrapping [data-slide] items
   ========================================================= */
(function(){
  "use strict";

  document.querySelectorAll("[data-slider]").forEach(function(root){
    var track = root.querySelector("[data-slider-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var prevBtn = root.querySelector("[data-slider-prev]");
    var nextBtn = root.querySelector("[data-slider-next]");
    var dotsWrap = root.querySelector("[data-slider-dots]");
    if(!track || slides.length === 0) return;

    var index = 0;
    var autoplayMs = parseInt(root.getAttribute("data-autoplay") || "0", 10);
    var timer = null;

    function perView(){
      var w = window.innerWidth;
      var attrPer = parseInt(root.getAttribute("data-per-view") || "1", 10);
      if(w <= 720) return 1;
      if(w <= 1080) return Math.min(2, attrPer);
      return attrPer;
    }

    function buildDots(){
      if(!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var pages = Math.max(1, slides.length - perView() + 1);
      for(var i=0;i<pages;i++){
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to slide " + (i+1));
        if(i === index) dot.classList.add("active");
        dot.addEventListener("click", function(idx){
          return function(){ goTo(idx); };
        }(i));
        dotsWrap.appendChild(dot);
      }
    }

    function update(){
      var pv = perView();
      var slideWidth = 100 / pv;
      slides.forEach(function(s){ s.style.flex = "0 0 " + slideWidth + "%"; s.style.maxWidth = slideWidth + "%"; });
      var maxIndex = Math.max(0, slides.length - pv);
      if(index > maxIndex) index = maxIndex;
      track.style.transform = "translateX(-" + (index * slideWidth) + "%)";
      if(dotsWrap){
        Array.prototype.forEach.call(dotsWrap.children, function(d, i){
          d.classList.toggle("active", i === index);
        });
      }
    }

    function goTo(i){
      var pv = perView();
      var maxIndex = Math.max(0, slides.length - pv);
      index = Math.max(0, Math.min(i, maxIndex));
      update();
    }

    if(nextBtn){ nextBtn.addEventListener("click", function(){ goTo(index+1 > (slides.length - perView()) ? 0 : index+1); }); }
    if(prevBtn){ prevBtn.addEventListener("click", function(){ goTo(index-1 < 0 ? Math.max(0, slides.length - perView()) : index-1); }); }

    window.addEventListener("resize", function(){ buildDots(); update(); });

    if(autoplayMs > 0){
      function startAuto(){
        timer = setInterval(function(){
          var pv = perView();
          goTo(index+1 > (slides.length - pv) ? 0 : index+1);
        }, autoplayMs);
      }
      root.addEventListener("mouseenter", function(){ clearInterval(timer); });
      root.addEventListener("mouseleave", startAuto);
      startAuto();
    }

    buildDots();
    update();
  });

})();
