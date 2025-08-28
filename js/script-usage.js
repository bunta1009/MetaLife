// $(".openbtn").click(function () {
//   $(this).toggleClass('active');
// });

// ハンバーガーメニュー
// $(function () {
//   $('.hamburger').on('click', function () {
//     $('header').toggleClass('open');
//   });

//   // メニューのリンクをクリックしたら閉じる
//   $('#navi a').on('click', function () {
//     $('header').removeClass('open');
//   });
// });
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


// トップページリンク
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {
    //上から200pxスクロールしたら
    $("#page-top").removeClass("DownMove"); //#page-topについているDownMoveというクラス名を除く
    $("#page-top").addClass("UpMove"); //#page-topについているUpMoveというクラス名を付与
  } else {
    if ($("#page-top").hasClass("UpMove")) {
      //すでに#page-topにUpMoveというクラス名がついていたら
      $("#page-top").removeClass("UpMove"); //UpMoveというクラス名を除き
      $("#page-top").addClass("DownMove"); //DownMoveというクラス名を#page-topに付与
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$("#page-top a").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    500
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

// スムーススクロール
document.addEventListener("DOMContentLoaded", function () {
  const headerOffset = 80; // ヘッダーの高さ分
  // .section-nav 内のすべてのリンクに対応
  const links = document.querySelectorAll('.section-nav a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // デフォルトのリンク挙動を無効化
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

document.querySelectorAll(".section-nav li").forEach((li) => {
  li.addEventListener("mouseenter", () => {
    li.classList.remove("animate");
    void li.offsetWidth;
    li.classList.add("animate");
  });
});

// navの固定
$(window).on("scroll", function () {
  const nav = $(".section-nav");
  const wrapperTop = $(".usage-scene-wrapper").offset().top;
  const wrapperBottom =
    $(".usage-scene-wrapper").offset().top +
    $(".usage-scene-wrapper").outerHeight() -
    nav.outerHeight();
  const scrollTop = $(window).scrollTop();
  if (scrollTop > wrapperTop && scrollTop < wrapperBottom) {
    nav.addClass("is-fixed");
  } else {
    nav.removeClass("is-fixed");
  }
});

// 矢印の下アニメーション
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".section-nav li");
  navItems.forEach((item) => {
    const arrow = item.querySelector(".p-arrow");
    if (arrow) {
      item.addEventListener("mouseenter", () => {
        arrow.classList.add("animate");
      });
      // アニメーションが終わったらクラスを削除してリセット
      arrow.addEventListener("animationend", () => {
        arrow.classList.remove("animate");
      });
    }
  });
});

// フェードイン
document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector(".p-copy");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // 一度だけ発火
        }
      });
    },
    {
      rootMargin: "-30% 0px -30% 0px", // 上下に余白をとり、中央付近で発火
      threshold: 0,
    }
  );

  if (target) observer.observe(target);
});


window.addEventListener('scroll', function () {
  const titleEn = document.querySelector('.p-pageTitle__en');
  const scrollY = window.scrollY;

  // 0〜500px のスクロール範囲で最大 -50px 移動
  const maxOffset = -50;
  const rate = Math.min(scrollY / 500, 1); // 0〜1
  const offsetX = rate * maxOffset;

  titleEn.style.transform = `translateX(${offsetX}px)`;
});