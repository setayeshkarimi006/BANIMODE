import { __unstable__loadDesignSystem } from "tailwindcss";
import "./style.css";
//*
document.addEventListener("DOMContentLoaded", () => {
  const closeIcon = document.getElementById("closeIcon");
  const imageBox = document.getElementById("imageBox");

  if (closeIcon && imageBox) {
    closeIcon.addEventListener("click", () => {
      imageBox.classList.add("hidden");
    });
  } else {
    console.log("یکی از المنت‌ها پیدا نشد");
  }
});
//swiper
var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});
var swiper = new Swiper(".mySwiper_5", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: "#custom-swiper-next-5",
    prevEl: "#custom-swiper-prev-5",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var swiper = new Swiper(".mySwiper_4", {
  slidesPerView: 5,
  spaceBetween: 30,
});

  //timer
  // مقدار اولیه زمان: ساعت، دقیقه، ثانیه
  let hours = 0;
  let minutes = 5;
  let seconds = 30;

  const timerElement = document.getElementById("timer");

  function updateTimer() {
    // نمایش زمان با فرمت دو رقمی
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    timerElement.textContent = `${h}:${m}:${s}`;
  }

  function countdown() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      timerElement.textContent = "00:00:00";
      timerElement.style.color = "#f87171"; // تغییر رنگ به قرمز در پایان
      return;
    }

    // کاهش زمان
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        hours--;
      }
    }

    updateTimer();
  }

  // اجرای هر ثانیه
  updateTimer();
  const interval = setInterval(countdown, 1000);
  

// بارگذاری Swiper
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper7", {
    slidesPerView: 5, 
    spaceBetween: 20, 
    loop: false, 
    freeMode: false, 
    breakpoints: {
      768: {
        slidesPerView: 3, 
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5, 
        spaceBetween: 20, 
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        updateButtons(this);
      },
      init: function () {
        updateButtons(this);
      },
    },
  });
  function updateButtons(swiperInstance) {
    const prevBtn = document.getElementById("swiper-prev");
    const nextBtn = document.getElementById("swiper-next");
    if (swiperInstance.isBeginning) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }
    if (swiperInstance.isEnd) {
      nextBtn.classList.add("hidden");
    } else {
      nextBtn.classList.remove("hidden");
    }
  }
});
//the apis code :
const API_URL = "http://localhost:3000/products";
const slides = document.querySelectorAll('.app-container');

if (slides.length === 0) {
    console.log("هیچ اسلایدی پیدا نشد!");
} else {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("خطا در ارتباط با سرور");
            return response.json();
        })
        .then(data => {
            const products = data.products;

            slides.forEach((slide, index) => {
                if (index < products.length) {
                    const product = products[index];
                    
                    // محاسبه قیمت نهایی
                    const finalPrice = product.price - (product.price * product.discount / 100);
                    
                    // آدرس‌های عکس (اگر آدرس‌ها اشتباه بود، از عکس پیش‌فرض استفاده کن)
                    const imgNormal = product['1image'] || 'https://via.placeholder.com/300';
                    const imgHover = product['0image'] || imgNormal;

                    // ساخت HTML با قابلیت تغییر عکس با Hover
                    slide.innerHTML = `
                        <div class="bg-white rounded-lg shadow-md p-4 h-full flex flex-col relative overflow-hidden">
                            <div class="relative w-full h-32 mb-2">
                                <!-- عکس اول (پیش‌فرض) -->
                                <img 
                                    src="${imgNormal}" 
                                    class="w-full h-full object-cover rounded transition-opacity duration-300" 
                                    id="img-${index}"
                                    alt="${product.title}"
                                >
                                <!-- عکس دوم (مخفی) -->
                                <img 
                                    src="${imgHover}" 
                                    class="w-full h-full object-cover rounded absolute top-0 left-0 opacity-0 transition-opacity duration-300" 
                                    id="img-hover-${index}"
                                    alt="${product.title}"
                                >
                            </div>
                            
                            <h3 class="font-bold text-gray-800 text-sm mb-1">${product.title}</h3>
                            <p class="text-gray-600 text-xs mb-2 line-clamp-2">${product.description}</p>
                            
                            <div class="mt-auto">
                                <span class="text-blue-600 font-bold text-sm">${finalPrice.toLocaleString()} تومان</span>
                                ${product.discount > 0 ? `<span class="text-red-500 text-xs line-through mr-2">${product.price.toLocaleString()}</span>` : ''}
                            </div>
                        </div>
                    `;

                    // اضافه کردن رویداد Hover برای تغییر عکس
                    const imgNormalEl = document.getElementById(`img-${index}`);
                    const imgHoverEl = document.getElementById(`img-hover-${index}`);

                    if (imgNormalEl && imgHoverEl) {
                        // وقتی موس رفت روی کارت
                        slide.addEventListener('mouseenter', () => {
                            imgNormalEl.style.opacity = '0';
                            imgHoverEl.style.opacity = '1';
                        });

                        // وقتی موس اومد بیرون
                        slide.addEventListener('mouseleave', () => {
                            imgNormalEl.style.opacity = '1';
                            imgHoverEl.style.opacity = '0';
                        });
                    }

                } else {
                    slide.innerHTML = '<div class="text-center text-gray-400 text-xs">خالی</div>';
                }
            });
        })
        .catch(error => {
            console.error("خطا:", error);
            slides.forEach(slide => {
                slide.innerHTML = '<div class="text-red-500 text-xs text-center">خطا در بارگذاری</div>';
            });
        });
}
