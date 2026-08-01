/* =========================================================
   CONTACT.JS — Contact form handling + visitor comments
   Comments are stored in the visitor's own browser (localStorage)
   so the page works with no backend/server required.
   To collect comments centrally, swap the storage calls below
   for a real API / Formspree / Google Sheets endpoint.
   ========================================================= */
(function(){
  "use strict";

  var WHATSAPP_NUMBER = "923140303073"; // 0314 0303073 in international format

  /* ---------------- Project inquiry form ---------------- */
  var form = document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var msgBox = document.getElementById("formMsg");
      var name = form.querySelector('[name="name"]').value.trim();
      var business = form.querySelector('[name="business"]').value.trim();
      var contactInfo = form.querySelector('[name="contact"]').value.trim();
      var websiteType = form.querySelector('[name="websiteType"]');
      var message = form.querySelector('[name="message"]').value.trim();

      if(name.length < 2 || contactInfo.length < 5 || message.length < 5){
        showMsg(msgBox, "Please fill in your name, a WhatsApp number or email, and a short project description.", "err");
        return;
      }

      var text = "New project inquiry from website%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        (business ? "Business: " + encodeURIComponent(business) + "%0A" : "") +
        "Contact: " + encodeURIComponent(contactInfo) + "%0A" +
        (websiteType ? "Website Type: " + encodeURIComponent(websiteType.value) + "%0A" : "") +
        "Project Description: " + encodeURIComponent(message);

      showMsg(msgBox, "Thanks! Opening WhatsApp so we can confirm your request instantly...", "ok");
      form.reset();

      setTimeout(function(){
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank");
      }, 900);
    });
  }

  function showMsg(box, text, type){
    if(!box) return;
    box.textContent = text;
    box.className = "form-msg show " + type;
  }

  /* ---------------- Newsletter (footer) ---------------- */
  var newsForm = document.getElementById("newsletterForm");
  if(newsForm){
    newsForm.addEventListener("submit", function(e){
      e.preventDefault();
      var input = newsForm.querySelector("input");
      var note = newsForm.querySelector(".news-note");
      if(input && input.value.includes("@")){
        if(note){ note.textContent = "Subscribed! Welcome to the crew."; note.style.color = "var(--accent-green)"; }
        input.value = "";
      } else if(note){
        note.textContent = "Enter a valid email address.";
        note.style.color = "var(--accent-red)";
      }
    });
  }

  /* ---------------- Comment section ---------------- */
  var STORAGE_KEY = "mfp_comments_v1";
  var commentForm = document.getElementById("commentForm");
  var commentsList = document.getElementById("commentsList");
  var commentCount = document.getElementById("commentCount");

  function loadComments(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(err){ return []; }
  }

  function saveComments(list){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }catch(err){ /* storage unavailable */ }
  }

  function initials(name){
    return name.trim().split(/\s+/).slice(0,2).map(function(w){ return w[0] ? w[0].toUpperCase() : ""; }).join("");
  }

  function starString(n){
    n = Math.max(1, Math.min(5, parseInt(n,10) || 5));
    return "★".repeat(n) + "☆".repeat(5-n);
  }

  function renderComments(){
    if(!commentsList) return;
    var list = loadComments();
    commentsList.innerHTML = "";
    if(commentCount){ commentCount.textContent = list.length; }

    if(list.length === 0){
      commentsList.innerHTML = '<div class="comment-empty">No comments yet — be the first to share your experience!</div>';
      return;
    }

    list.slice().reverse().forEach(function(c){
      var card = document.createElement("div");
      card.className = "comment-card";
      card.innerHTML =
        '<div class="comment-top">' +
          '<div class="comment-author"><span class="comment-avatar">' + initials(c.name) + '</span>' + escapeHtml(c.name) + '</div>' +
          '<span class="comment-date">' + escapeHtml(c.date) + '</span>' +
        '</div>' +
        '<div class="comment-stars">' + starString(c.rating) + '</div>' +
        '<p style="margin:0;">' + escapeHtml(c.text) + '</p>';
      commentsList.appendChild(card);
    });
  }

  function escapeHtml(str){
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  if(commentForm){
    commentForm.addEventListener("submit", function(e){
      e.preventDefault();
      var name = commentForm.querySelector('[name="cname"]').value.trim();
      var text = commentForm.querySelector('[name="ctext"]').value.trim();
      var ratingInput = commentForm.querySelector('[name="rating"]');
      var rating = ratingInput ? parseInt(ratingInput.value, 10) || 5 : 5;
      var msgBox = document.getElementById("commentMsg");

      if(name.length < 2 || text.length < 4){
        showMsg(msgBox, "Please add your name and a short comment.", "err");
        return;
      }

      var list = loadComments();
      list.push({ name:name, rating:rating, text:text, date:"Just now" });
      saveComments(list);
      renderComments();
      showMsg(msgBox, "Thanks for your feedback! Your comment has been posted.", "ok");
      commentForm.reset();
      commentForm.querySelectorAll(".rating-select span").forEach(function(s){ s.classList.remove("active"); });
      if(ratingInput) ratingInput.value = "5";
    });
  }

  renderComments();

})();
