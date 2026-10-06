/* ═══ CONFIG ═══ */
const CONFIG = {
    heartImages: [
        'images/girl1.jpg',
        'images/girl2.jpg',
        'images/girl3.jpg',
        'images/girl4.jpg',
    ],
    petals: [
        'images/petal-blush-broad-01.webp',
        'images/petal-cream-broad-01.webp',
        'images/petal-cream-heart-01.webp',
        'images/petal-cream-long-01.webp',
        'images/petal-peach-broad-01.webp',
        'images/petal-peach-long-01.webp',
        'images/petal-peach-long-02.webp',
    ],
    beats: [
        'Ngọn nến đã tắt…',
        'nhưng em không đi qua năm nay một mình đâu.',
        'Anh không có bánh kem thật ở đây , nhận đỡ bánh kem online nha bae.',
    ],
    letterBody: `Anh không giỏi nói mấy lời hoa mỹ, nên viết đơn giản thôi: chúc mừng sinh nhật em.

Năm vừa rồi chắc chẳng dễ dàng gì, vậy mà em vẫn đi tới được hôm nay — giỏi hơn em nghĩ nhiều đấy.

Anh chỉ mong em ăn ngon ngủ đủ, bớt lo một chút, và nhớ là luôn có người ở đây khi em cần.`,
};

let selectedWish = null;
let wishText = 'Điều ước của em';
let sparkInterval = null;

/* ═══ HELPERS ═══ */
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
    });

    const spotlightOverlay = document.getElementById('spotlightOverlay');
    if (spotlightOverlay) spotlightOverlay.style.opacity = '0';

    const screen = document.getElementById(id);
    if (screen) {
        screen.classList.add('active');
        void screen.offsetWidth;
        screen.style.opacity = '1';
    }
}

function initPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;
    const count = 14;
    for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.src = CONFIG.petals[i % CONFIG.petals.length];
        img.classList.add('petal');
        img.style.left = Math.random() * 100 + '%';
        img.style.width = (16 + Math.random() * 28) + 'px';
        img.style.animationDuration = (7 + Math.random() * 6) + 's';
        img.style.animationDelay = -(Math.random() * 12) + 's';
        const rot = Math.random() * 360;
        img.style.transform = `rotate(${rot}deg)`;
        container.appendChild(img);
    }
}

function initSparks() {
    const sparks = document.getElementById('sparks');
    if (!sparks) return;

    if (sparkInterval) clearInterval(sparkInterval);

    sparkInterval = setInterval(() => {
        const flame = document.getElementById('flame');
        if (!flame || !flame.classList.contains('lit') || flame.classList.contains('extinguished')) return;

        const spark = document.createElement('div');
        spark.classList.add('spark');
        spark.style.left = (Math.random() * 16 - 8) + 'px';
        spark.style.top = (Math.random() * 5) + 'px';
        spark.style.animationDuration = (3 + Math.random() * 2) + 's';
        sparks.appendChild(spark);

        setTimeout(() => spark.remove(), 5000);
    }, 600);
}

/* ✅ Phát nhạc 1 */
function playMusic1() {
    const music1 = document.getElementById('bgMusic');
    const music2 = document.getElementById('bgMusic2');
    if (music2) { music2.pause(); music2.currentTime = 0; }
    if (music1) {
        music1.volume = 0.5;
        music1.currentTime = 0;
        music1.play().catch(err => console.log('Music1 blocked:', err));
    }
}

/* ✅ Phát nhạc 2 */
function playMusic2() {
    const music1 = document.getElementById('bgMusic');
    const music2 = document.getElementById('bgMusic2');
    if (music1) { music1.pause(); music1.currentTime = 0; }
    if (music2) {
        music2.volume = 0.5;
        music2.currentTime = 0;
        music2.play().catch(err => console.log('Music2 blocked:', err));
    }
}

/* ═══ STEP 1: LOADING ═══ */
function step1_loading() {
    showScreen('loading');
    
    const music1 = document.getElementById('bgMusic');
    const music2 = document.getElementById('bgMusic2');
    if (music1) { music1.pause(); music1.currentTime = 0; }
    if (music2) { music2.pause(); music2.currentTime = 0; }
    
    const loadingScreen = document.getElementById('loading');
    let started = false;
    
    const startExperience = () => {
        if (started) return;
        started = true;
        
        playMusic1();
        
        setTimeout(step2_opening, 600);
        
        loadingScreen.removeEventListener('click', startExperience);
        loadingScreen.removeEventListener('touchstart', startExperience);
    };
    
    loadingScreen.addEventListener('click', startExperience);
    loadingScreen.addEventListener('touchstart', startExperience);
}

/* ═══ STEP 2: OPENING ═══ */
function step2_opening() {
    showScreen('opening');
    
    const startSlot = () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                animateOpeningNumbers();
            });
        });
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startSlot);
    } else {
        setTimeout(startSlot, 300);
    }
}

function createOpeningStars() {
    const container = document.getElementById('openingStars');
    if (!container) return;
    
    container.innerHTML = '';
    const starCount = 18;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('opening-star');
        
        if (Math.random() < 0.3) {
            star.classList.add('sparkle');
        }
        
        star.style.left = (Math.random() * 90 + 5) + '%';
        star.style.top = (Math.random() * 85 + 5) + '%';
        star.style.animationDelay = (Math.random() * 2) + 's, ' + (Math.random() * 3) + 's';
        
        const scale = 0.6 + Math.random() * 0.8;
        star.style.transform = `scale(${scale})`;
        
        container.appendChild(star);
    }
    
    setTimeout(() => {
        container.classList.add('show');
    }, 100);
}

function animateOpeningNumbers() {
    const slotDay = document.getElementById('slotDay');
    const slotMonth = document.getElementById('slotMonth');
    if (!slotDay || !slotMonth) return;

    const FINAL_DAY = 6;
    const FINAL_MONTH = 10;

    function buildDayStrip(finalDay) {
        const days = [];
        for (let i = 0; i < 3; i++) {
            for (let d = 1; d <= 31; d++) days.push(d);
        }
        days.push(finalDay);
        return days;
    }

    function buildMonthStrip(finalMonth) {
        const months = [];
        for (let i = 0; i < 3; i++) {
            for (let m = 1; m <= 12; m++) months.push(m);
        }
        months.push(finalMonth);
        return months;
    }

    const dayArr = buildDayStrip(FINAL_DAY);
    const monthArr = buildMonthStrip(FINAL_MONTH);

    slotDay.innerHTML = dayArr.map(d => `<span>${d}</span>`).join('');
    slotMonth.innerHTML = monthArr.map(m => `<span>Tháng ${m}</span>`).join('');

    const daySpan = slotDay.querySelector('span');
    const monthSpan = slotMonth.querySelector('span');
    if (!daySpan || !monthSpan) return;

    const dayItemHeight = daySpan.getBoundingClientRect().height;
    const monthItemHeight = monthSpan.getBoundingClientRect().height;

    console.log('✅ Day height:', dayItemHeight, '| Month height:', monthItemHeight);

    if (dayItemHeight === 0 || monthItemHeight === 0) {
        console.warn('❌ Slot height = 0 — check CSS!');
        return;
    }

    const dayStopIndex = dayArr.length - 1;
    const monthStopIndex = monthArr.length - 1;

    const dayStopY = -dayStopIndex * dayItemHeight;
    const monthStopY = -monthStopIndex * monthItemHeight;

    const parentDay = slotDay.closest('.slot-day');
    const parentMonth = slotMonth.closest('.slot-month');

    slotDay.style.transition = 'none';
    slotMonth.style.transition = 'none';
    slotDay.style.transform = 'translateY(0)';
    slotMonth.style.transform = 'translateY(0)';

    void slotDay.offsetWidth;
    void slotMonth.offsetWidth;

    parentDay.classList.add('spinning');
    parentMonth.classList.add('spinning');

    const DURATION = 4000;

    slotDay.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    slotMonth.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    setTimeout(() => {
        slotDay.style.transform = `translateY(${dayStopY}px)`;
    }, 100);

    setTimeout(() => {
        slotMonth.style.transform = `translateY(${monthStopY}px)`;
    }, 300);

    setTimeout(() => {
        parentDay.classList.remove('spinning');
        parentMonth.classList.remove('spinning');
        parentDay.classList.add('stopped');
        parentMonth.classList.add('stopped');
        
        const arrow = document.getElementById('openingArrow');
        if (arrow) arrow.classList.add('show');
        
        createOpeningStars();
        
        const balloons = document.querySelector('.opening-balloons');
        if (balloons) balloons.classList.add('show');
        
        setTimeout(step3_intro, 5000);
    }, DURATION + 400);
}

/* ═══ STEP 3: INTRO ═══ */
function step3_intro() {
    showScreen('intro');
    initSparks();

    const candleZone = document.getElementById('candleZone');
    const flame = document.getElementById('flame');
    const hint = document.getElementById('introHint');
    const candleRing = document.getElementById('candleRing');
    const ringFill = document.getElementById('ringFill');
    const matchStick = document.getElementById('matchStick');
    const spotlightOverlay = document.getElementById('spotlightOverlay');

    let holding = false;
    let progress = 0;
    let holdStart = 0;
    let rafId = null;
    let extinguished = false;
    let isLit = false;
    const DURATION = 2600;
    const RING_CIRCUMFERENCE = 2 * Math.PI * 46;

    flame.classList.remove('lit', 'extinguished');
    candleRing.classList.remove('show');
    candleZone.classList.remove('holding', 'dying', 'extinguished');
    if (spotlightOverlay) spotlightOverlay.style.opacity = '0';
    ringFill.style.strokeDashoffset = RING_CIRCUMFERENCE;
    matchStick.classList.remove('lighting');
    hint.textContent = 'đang thắp nến cho em…';

    function updateSpotlight() {
        if (!spotlightOverlay || !candleZone) return;
        const rect = candleZone.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.3;
        spotlightOverlay.style.background = `
            radial-gradient(
                circle 110px at ${cx}px ${cy}px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.35) 25%,
                rgba(0, 0, 0, 0.75) 50%,
                rgba(0, 0, 0, 0.95) 75%,
                rgba(0, 0, 0, 1) 100%
            )
        `;
    }

    function lightCandle() {
        if (isLit) return;
        isLit = true;
        matchStick.classList.add('lighting');

        setTimeout(() => {
            matchStick.classList.remove('lighting');
            flame.classList.add('lit');
            hint.textContent = '👆 Nhấn & giữ ngọn nến cho đến khi tắt';
        }, 3400);
    }

    setTimeout(lightCandle, 1850);

    function startHold(e) {
        if (extinguished || !isLit) return;
        e.preventDefault();
        holding = true;
        holdStart = performance.now() - progress * DURATION;
        hint.textContent = '👆 Giữ tiếp...';
        candleRing.classList.add('show');
        candleZone.classList.add('holding');
        if (spotlightOverlay) spotlightOverlay.style.opacity = '0.15';
        updateSpotlight();
        loopHold();
    }

    function endHold() {
        if (extinguished) return;
        holding = false;
        hint.textContent = '👆 Nhấn & giữ ngọn nến cho đến khi tắt';
        if (rafId) cancelAnimationFrame(rafId);
        progress = 0;
        candleRing.classList.remove('show');
        candleZone.classList.remove('holding', 'dying');
        if (spotlightOverlay) spotlightOverlay.style.opacity = '0';
        ringFill.style.strokeDashoffset = RING_CIRCUMFERENCE;
    }

    function loopHold() {
        if (!holding) return;
        const now = performance.now();
        progress = Math.min(1, (now - holdStart) / DURATION);

        ringFill.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
        if (spotlightOverlay) spotlightOverlay.style.opacity = progress.toString();
        updateSpotlight();

        if (progress < 0.3) hint.textContent = '👆 Giữ tiếp...';
        else if (progress < 0.6) hint.textContent = 'giữ nữa… sắp tắt rồi…';
        else if (progress < 0.9) hint.textContent = 'gần tắt rồi…';

        if (progress > 0.3) {
            candleZone.classList.add('dying');
        }

        if (progress >= 1) {
            extinguished = true;
            flame.classList.add('extinguished');
            candleZone.classList.remove('holding', 'dying');
            candleZone.classList.add('extinguished');
            if (spotlightOverlay) spotlightOverlay.style.opacity = '0.85';
            hint.textContent = '✨ Ngọn nến đã tắt';

            // ✅ TẮT NHẠC 1 NGAY
            const music1 = document.getElementById('bgMusic');
            if (music1) {
                music1.pause();
                music1.currentTime = 0;
            }

            // ✅ CHỜ 2 GIÂY RỒI PHÁT NHẠC 2
            setTimeout(() => {
                playMusic2();
            }, 2000);

            setTimeout(() => {
                if (spotlightOverlay) spotlightOverlay.style.opacity = '0';
                candleRing.classList.remove('show');
                step4_beats();
            }, 3500);
            return;
        }
        rafId = requestAnimationFrame(loopHold);
    }

    candleZone.addEventListener('pointerdown', startHold);
    candleZone.addEventListener('pointerup', endHold);
    candleZone.addEventListener('pointerleave', endHold);
    candleZone.addEventListener('pointercancel', endHold);
}

/* ═══ STEP 4: BEATS ═══ */
function step4_beats() {
    showScreen('beats');
    const beatText = document.getElementById('beatText');
    let index = 0;

    function showNext() {
        if (index >= CONFIG.beats.length) {
            setTimeout(step5_blackout, 800);
            return;
        }
        beatText.style.opacity = '0';
        beatText.style.transform = 'translateY(8px)';

        setTimeout(() => {
            beatText.textContent = CONFIG.beats[index];
            beatText.style.opacity = '1';
            beatText.style.transform = 'translateY(0)';
            index++;
            setTimeout(showNext, 2800);
        }, 500);
    }
    showNext();
}

/* ═══ STEP 5: BLACKOUT ═══ */
function step5_blackout() {
    showScreen('blackout');
    setTimeout(step6_wish, 1800);
}

/* ═══ STEP 6: WISH ═══ */
function step6_wish() {
    showScreen('wish');
    const wishGrid = document.getElementById('wishGrid');
    const wishReply = document.getElementById('wishReply');

    wishGrid.querySelectorAll('.wish-card').forEach(card => {
        card.addEventListener('click', () => {
            if (selectedWish !== null) return;
            wishText = card.dataset.wish;
            selectedWish = wishText;

            wishGrid.querySelectorAll('.wish-card').forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0';
                    c.style.transform = 'scale(0.9)';
                } else {
                    c.classList.add('selected');
                }
            });

            setTimeout(() => wishReply.classList.add('show'), 1200);
            setTimeout(step7_heart, 3000);
        });
    });
}

/* ═══ STEP 7: HEART ═══ */
function step7_heart() {
    showScreen('heart');
    const heartGrid = document.getElementById('heartGrid');
    heartGrid.innerHTML = '';

    const heartMatrix = [
        [0,0,1,1,0,0,0,0,0,1,1,0,0],
        [0,1,1,1,1,0,0,0,1,1,1,1,0],
        [1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,1,1,1,1,0,0,0],
        [0,0,0,0,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,0],
    ];

    let tileIndex = 0;

    heartMatrix.forEach(row => {
        row.forEach(val => {
            const tile = document.createElement('div');
            tile.classList.add('heart-tile');
            if (val === 0) {
                tile.classList.add('empty');
            } else {
                const imgIndex = tileIndex % CONFIG.heartImages.length;
                tile.style.backgroundImage = `url(${CONFIG.heartImages[imgIndex]})`;
                tile.addEventListener('click', () => openLightbox(CONFIG.heartImages[imgIndex]));
                tileIndex++;
            }
            heartGrid.appendChild(tile);
        });
    });

    document.getElementById('toLetter').onclick = step8_letter;
}

function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
}
document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('active');
});

/* ═══ STEP 8: LETTER ═══ */
function step8_letter() {
    showScreen('letter');
    const letterBody = document.getElementById('letterBody');
    const letterSign = document.getElementById('letterSign');
    const toFinal = document.getElementById('toFinal');

    letterBody.textContent = '';
    letterSign.classList.remove('show');
    toFinal.classList.remove('show');

    const text = CONFIG.letterBody;
    let i = 0;
    const speed = 35;

    function type() {
        if (i < text.length) {
            letterBody.textContent += text.charAt(i);
            i++;
            const container = letterBody.parentElement;
            if (container.scrollHeight > container.clientHeight) {
                container.scrollTop = container.scrollHeight;
            }
            setTimeout(type, speed);
        } else {
            letterSign.classList.add('show');
            setTimeout(() => toFinal.classList.add('show'), 500);
        }
    }
    type();

    toFinal.onclick = step9_final;
}

/* ═══ STEP 9: FINAL ═══ */
function step9_final() {
    showScreen('final');
    document.getElementById('toStarlight').onclick = step10_starlight;
    document.getElementById('restart').onclick = restart;
}

/* ═══ STEP 10: STARLIGHT ═══ */
function step10_starlight() {
    showScreen('starlight');
    const starBtn = document.getElementById('starBtn');
    const sent = document.getElementById('starlightSent');
    let launched = false;

    starBtn.onclick = () => {
        if (launched) return;
        launched = true;
        starBtn.classList.add('launched');
        setTimeout(() => {
            sent.textContent = `✨ Điều ước "${wishText}" đã được gửi đi`;
            sent.classList.add('show');
        }, 1500);
    };
    
    // ✅ KHÔNG CẦN GÁN ONCLICK — nút <a> đã tự động mở link
}

/* ═══ RESTART ═══ */
function restart() {
    selectedWish = null;
    wishText = 'Điều ước của em';

    if (sparkInterval) {
        clearInterval(sparkInterval);
        sparkInterval = null;
    }

    const music1 = document.getElementById('bgMusic');
    const music2 = document.getElementById('bgMusic2');
    if (music1) { music1.pause(); music1.currentTime = 0; }
    if (music2) { music2.pause(); music2.currentTime = 0; }

    document.querySelectorAll('.wish-card').forEach(c => {
        c.classList.remove('selected');
        c.style.opacity = '';
        c.style.transform = '';
    });
    document.getElementById('wishReply').classList.remove('show');
    document.getElementById('starlightSent').classList.remove('show');
    document.getElementById('starBtn').classList.remove('launched');

    const spotlightOverlay = document.getElementById('spotlightOverlay');
    if (spotlightOverlay) spotlightOverlay.style.opacity = '0';

    const arrow = document.getElementById('openingArrow');
    if (arrow) arrow.classList.remove('show');

    const starsContainer = document.getElementById('openingStars');
    if (starsContainer) {
        starsContainer.classList.remove('show');
        starsContainer.innerHTML = '';
    }

    const balloons = document.querySelector('.opening-balloons');
    if (balloons) balloons.classList.remove('show');

    step1_loading();
}

/* ═══ INIT ═══ */
window.addEventListener('DOMContentLoaded', () => {
    initPetals();
    step1_loading();
});