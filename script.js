// TERMINUS BNB 交互脚本

document.addEventListener('DOMContentLoaded', () => {
  // 复制合约地址
  window.copyCA = function() {
    const caEl = document.getElementById('caAddress');
    const hint = document.getElementById('caHint');
    if (!caEl) return;
    const ca = caEl.textContent.trim();
    navigator.clipboard.writeText(ca).then(() => {
      if (hint) {
        const original = hint.textContent;
        hint.textContent = '已复制 ✓';
        hint.style.color = '#f0b90b';
        setTimeout(() => {
          hint.textContent = original;
          hint.style.color = '';
        }, 2000);
      }
    }).catch(() => {
      if (hint) {
        hint.textContent = '复制失败，请手动复制';
        hint.style.color = '#e63946';
      }
    });
  };

  // 移动菜单
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
      });
    });
  }

  // 滚动显示动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.about-card, .token-card, .step, .vision-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 添加 visible 类样式
  const style = document.createElement('style');
  style.textContent = `
    .about-card.visible,
    .token-card.visible,
    .step.visible,
    .vision-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
