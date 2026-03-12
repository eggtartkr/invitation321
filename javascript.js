/* DOM 로드 후 모든 기능 실행 */
document.addEventListener("DOMContentLoaded", function() {

  /* 1. Swiper 설정 */
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 15,
    centeredSlides: true,
    loop: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom"
    }
  });

  /* 2. D-Day 카운트다운 */
  function updateCountdown() {
    const targetDate = new Date("March 21, 2026 19:30:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");
    const countdownBox = document.getElementById("countdown");

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if(daysEl) daysEl.innerText = d < 10 ? "0" + d : d;
      if(hoursEl) hoursEl.innerText = h < 10 ? "0" + h : h;
      if(minsEl) minsEl.innerText = m < 10 ? "0" + m : m;
      if(secsEl) secsEl.innerText = s < 10 ? "0" + s : s;
    } else if (countdownBox) {
      countdownBox.innerHTML = "<p style='font-family:Jua; font-size:20px; color:#0ea5e9;'>서우의 첫 생일을 축하합니다! 🎉</p>";
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* 3. 캘린더 생성 */
  const year = 2026;
  const month = 2; // 3월 (0부터 시작하므로 2가 3월입니다)
  const eventDay = 21;

  const header = document.getElementById("calendar-header");
  const daysContainer = document.getElementById("calendar-days");

  if (header && daysContainer) {
    const date = new Date(year, month);
    const firstDay = date.getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    header.innerText = `${year}년 ${month + 1}월`;

    for (let i = 0; i < firstDay; i++) {
      daysContainer.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= lastDate; i++) {
      const day = document.createElement("div");
      day.innerText = i;
      if (i === eventDay) {
        day.classList.add("event-day");
      }
      daysContainer.appendChild(day);
    }
  }

  /* 4. BGM 토글 제어 */
  const bgm = document.getElementById("bgm");
  const musicBtn = document.getElementById("music-btn");
  const iconOn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M533.6 96.5C523.3 88.1 508.2 89.7 499.8 100C491.4 110.3 493 125.4 503.3 133.8C557.5 177.8 592 244.8 592 320C592 395.2 557.5 462.2 503.3 506.3C493 514.7 491.5 529.8 499.8 540.1C508.1 550.4 523.3 551.9 533.6 543.6C598.5 490.7 640 410.2 640 320C640 229.8 598.5 149.2 533.6 96.5zM473.1 171C462.8 162.6 447.7 164.2 439.3 174.5C430.9 184.8 432.5 199.9 442.8 208.3C475.3 234.7 496 274.9 496 320C496 365.1 475.3 405.3 442.8 431.8C432.5 440.2 431 455.3 439.3 465.6C447.6 475.9 462.8 477.4 473.1 469.1C516.3 433.9 544 380.2 544 320.1C544 260 516.3 206.3 473.1 171.1zM412.6 245.5C402.3 237.1 387.2 238.7 378.8 249C370.4 259.3 372 274.4 382.3 282.8C393.1 291.6 400 305 400 320C400 335 393.1 348.4 382.3 357.3C372 365.7 370.5 380.8 378.8 391.1C387.1 401.4 402.3 402.9 412.6 394.6C434.1 376.9 448 350.1 448 320C448 289.9 434.1 263.1 412.6 245.5zM80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416z"/></svg>`;
  const iconOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z"/></svg>`;

  if (musicBtn && bgm) {
    musicBtn.innerHTML = iconOff;
    musicBtn.addEventListener("click", () => {
      if (bgm.paused) {
        bgm.play();
        musicBtn.innerHTML = iconOn;
      } else {
        bgm.pause();
        musicBtn.innerHTML = iconOff;
      }
    });
  }

  /* 5. 스크롤 애니메이션 (Intersection Observer) */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade").forEach(el => {
    observer.observe(el);
  });

  /* 6. 메인 헤더 ❤️ 내리는 효과 실행 */
  setInterval(createHeart, 400); // 0.4초마다 하트 생성 함수 실행

});

/* --- 함수 정의 (외부) --- */

// 하트 생성 함수
function createHeart() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const heart = document.createElement('div');
  heart.classList.add('heart-drop');
  heart.innerText = '♥️';

  // 레이아웃 뒤틀림 방지를 위해 position 강제 주입
  heart.style.position = 'absolute';
  heart.style.zIndex = '1';

  const startX = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = Math.random() * 3 + 4;
  const size = Math.random() * 10 + 15;

  heart.style.left = startX + '%';
  heart.style.animationDelay = delay + 's';
  heart.style.animationDuration = duration + 's';
  heart.style.fontSize = size + 'px';
  heart.style.opacity = Math.random() * 0.4 + 0.3;

  header.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, (delay + duration) * 2000);
}

// URL 복사
function copyUrl() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("초대장 링크가 복사되었습니다! 🎉");
  });
}

// 카카오톡 공유
function sendKakao() {
  if (!window.Kakao) return;

  // 초기화 체크 (키가 이미 등록되어 있지 않을 때만 실행)
  if (!Kakao.isInitialized()) {
    Kakao.init('4b592594d23fc39a7f88e513fa634336'); 
  }

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "서우의 첫 생일 초대장",
      description: "2026.03.21 오후 7:30 경복궁 대구점",
      imageUrl: "https://seou-first-birthday.vercel.app/images/0.jpeg", // 실제 배포 주소를 넣으면 더 정확해요!
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href
      }
    },
    buttons: [
      {
        title: "초대장 보기",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href
        }
      }
    ]
  });
}