const screens = document.querySelectorAll('.screen');
const sparks = document.getElementById('sparks');
let current = 0;

// Перехід на наступний екран
function goTo(index) {
  screens[current].classList.remove('active');
  current = index;
  screens[current].classList.add('active');
}

// Легка анімація: кілька теплих іскорок і сердечок підіймаються вгору
function sparkle(x, y) {
  const symbols = ['✦', '♥', '✦', '·', '♥'];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = symbols[i % symbols.length];
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.fontSize = (12 + Math.random() * 16) + 'px';
    s.style.setProperty('--dx', (Math.random() * 220 - 110) + 'px');
    s.style.setProperty('--dy', -(60 + Math.random() * 160) + 'px');
    s.style.animationDelay = (Math.random() * 0.25) + 's';
    sparks.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }
}

// Кнопки
document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.disabled = true;
    let delay = 0;

    if (btn.hasAttribute('data-spark')) {
      const r = btn.getBoundingClientRect();
      sparkle(r.left + r.width / 2, r.top + r.height / 2);
      delay = 1000; // даємо анімації зіграти
    }
    setTimeout(() => goTo(current + 1), delay);
  });
});

// Якщо family.jpg ще не додано — м'яка заглушка
const photo = document.querySelector('.photo');
photo.addEventListener('error', () => {
  photo.removeAttribute('src');
  photo.style.height = '280px';
  photo.style.background = 'rgba(58,44,34,.08)';
});