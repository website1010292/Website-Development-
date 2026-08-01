/* =========================================================
   SCRIPT.JS — Core site behavior for MobileFix Pro
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Footer year ---------- */
  document.querySelectorAll(".js-year").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in-view"); });
  }

  /* ---------- Header shadow on scroll + back-to-top ---------- */
  var header = document.querySelector(".site-header");
  var backTop = document.querySelector(".back-top");
  window.addEventListener("scroll", function(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(header){ header.style.boxShadow = y > 10 ? "0 2px 8px rgba(20,25,40,.08)" : "none"; }
    if(backTop){ backTop.classList.toggle("show", y > 500); }
  });
  if(backTop){
    backTop.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q = item.querySelector(".faq-q");
    if(!q) return;
    q.addEventListener("click", function(){
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
      if(!wasOpen){ item.classList.add("open"); }
    });
  });

  /* ---------- Pricing tabs (each service = separate price panel) ---------- */
  document.querySelectorAll(".price-tab").forEach(function(tab){
    tab.addEventListener("click", function(){
      var target = tab.getAttribute("data-target");
      var group = tab.closest(".pricing-tabs-wrap");
      if(!group) return;
      group.querySelectorAll(".price-tab").forEach(function(t){ t.classList.remove("active"); });
      group.querySelectorAll(".price-panel").forEach(function(p){ p.classList.remove("active"); });
      tab.classList.add("active");
      var panel = group.querySelector('[data-panel="' + target + '"]');
      if(panel){ panel.classList.add("active"); }
    });
  });

  /* ---------- Smooth-scroll for same-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      var id = a.getAttribute("href");
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior:"smooth", block:"start" });
        }
      }
    });
  });

  /* ---------- Rating stars widget (used in comment form) ---------- */
  document.querySelectorAll(".rating-select").forEach(function(box){
    var input = box.parentElement.querySelector('input[name="rating"]');
    box.querySelectorAll("span").forEach(function(star, idx){
      star.addEventListener("click", function(){
        var val = idx + 1;
        if(input) input.value = val;
        box.querySelectorAll("span").forEach(function(s, i2){
          s.classList.toggle("active", i2 < val);
        });
      });
    });
  });

})();
