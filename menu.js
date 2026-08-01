/* =========================================================
   MENU.JS — Header navigation: mobile burger + dropdown menus
   Each service link opens its OWN dropdown panel (separate menus).
   ========================================================= */
(function(){
  "use strict";

  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".main-nav");

  if(burger && nav){
    burger.addEventListener("click", function(){
      var isOpen = nav.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  /* Dropdown toggles — tap-to-open on mobile, hover on desktop (handled in CSS) */
  document.querySelectorAll(".has-dropdown > a").forEach(function(link){
    link.addEventListener("click", function(e){
      if(window.innerWidth <= 900){
        e.preventDefault();
        var parent = link.parentElement;
        var wasOpen = parent.classList.contains("open");
        document.querySelectorAll(".has-dropdown").forEach(function(li){ li.classList.remove("open"); });
        if(!wasOpen){ parent.classList.add("open"); }
      }
    });
  });

  /* Close mobile menu when a real link (not dropdown toggle) is tapped */
  document.querySelectorAll(".dropdown-panel a, nav.main-nav > ul > li:not(.has-dropdown) > a").forEach(function(link){
    link.addEventListener("click", function(){
      if(window.innerWidth <= 900 && nav){
        nav.classList.remove("open");
        if(burger){ burger.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }
        document.body.style.overflow = "";
      }
    });
  });

  /* Close dropdowns when clicking outside (desktop) */
  document.addEventListener("click", function(e){
    if(!e.target.closest(".has-dropdown")){
      document.querySelectorAll(".has-dropdown").forEach(function(li){ li.classList.remove("open"); });
    }
  });

  /* Escape key closes everything */
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      document.querySelectorAll(".has-dropdown").forEach(function(li){ li.classList.remove("open"); });
      if(nav){ nav.classList.remove("open"); }
      if(burger){ burger.classList.remove("open"); }
      document.body.style.overflow = "";
    }
  });

})();
