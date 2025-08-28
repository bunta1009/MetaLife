document.addEventListener("DOMContentLoaded", () => {
  const fill = document.getElementById("progress-bar-fill");
  const text = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  let startTime = null;
  const duration = 3000; // 3秒で100%まで進む

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    let progress = Math.min(elapsed / duration, 1); // 0〜1にクランプ
    fill.style.width = (progress * 100) + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 完了時の処理
      fill.style.backgroundColor = "#00ff00"; // 緑
      text.textContent = "COMPLETE";
      text.style.color = "#00ff00";

setTimeout(() => {
  loadingScreen.style.opacity = 0;
  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainContent.style.display = "block";

    // 🔽 ココに追加！
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        if (window.innerWidth <= 1100) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
          });
        } else {
          const container = document.getElementById("horizontal-scroll");
          const targetLeft = target.offsetLeft;
          const containerLeft = container.offsetLeft;
          const currentScroll = container.scrollLeft;

          const scrollTo = targetLeft - containerLeft + currentScroll;

          container.scrollTo({
            left: scrollTo,
            behavior: "smooth"
          });
        }
      }
    }

  }, 1000);
}, 800);

    }
  }

  requestAnimationFrame(animate);
});

// スクロールでフェードイン
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.5 });

  fadeElements.forEach(el => observer.observe(el));
});


// horizontascroll 横スクロール
  const scrollElement = document.querySelector("#horizontal-scroll");

  function handleScroll(e) {
    // 横スクロール処理はPCのみ（スマホ無効）
    if (window.innerWidth <= 1000) return;

    const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;

    // 横スクロールが必要ない or はみ出てない場合は抜ける
    if (
      (scrollElement.scrollLeft <= 0 && e.deltaY < 0) ||
      (scrollElement.scrollLeft >= maxScrollLeft && e.deltaY > 0)
    ) {
      return;
    }

    e.preventDefault();
    scrollElement.scrollLeft += e.deltaY;
  }

  // 一度削除して再登録（冗長防止）
  scrollElement.removeEventListener("wheel", handleScroll);
  scrollElement.addEventListener("wheel", handleScroll, { passive: false });

/* Drawer */
  jQuery(".drawer-btn").on("click", function () {
    jQuery(".drawer-btn").toggleClass("open");
    $('.header-sp__menu').toggleClass('open');
  });
  jQuery(".header-menu-btn").on("click", function () {
    jQuery(".drawer-btn").toggleClass("open");
    $('.header-sp__menu').toggleClass('open');
  });

  jQuery(window).on("scroll", function ($) {
    if (100 < jQuery(this).scrollTop()) {
      jQuery("#js-to-tobutton").show();
    } else {
      jQuery("#js-to-tobutton").hide();
    }
  });

/* Smooth Scroll */
  $('a[href^="#"]').click(function (e) {
    const href = $(this).attr("href");
    const $target = $(href);

    if (!$target.length) return;

    e.preventDefault();

    if (window.innerWidth <= 1100) {
      // ★ スマホ：縦スクロール
      const scrollTo = $target.offset().top;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 600, 'swing');

    } else {
      // ★ PC：横スクロール
      const $container = $('#horizontal-scroll');
      const targetOffset = $target.offset().left;
      const containerOffset = $container.offset().left;
      const currentScroll = $container.scrollLeft();

      const scrollTo = targetOffset - containerOffset + currentScroll;

      $container.animate({
        scrollLeft: scrollTo
      }, 600, 'swing');
    }
  });

// usageの横スクロール
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });