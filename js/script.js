document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const menuToggle = document.getElementById('mobileMenuBtn');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  if (menuToggle && mobileSidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      mobileSidebar.classList.add('active');
      sidebarOverlay.classList.add('active');
    });
  }

  // 代码高亮
  const codeBlocks = document.querySelectorAll('pre code');
  if (codeBlocks.length > 0) {
    codeBlocks.forEach(function(block) {
      block.classList.add('hljs');
      const language = block.className.split(' ')
        .find(cls => cls.startsWith('language-') || cls.startsWith('lang-'));
      if (language) {
        block.setAttribute('data-language', language.replace('language-', '').replace('lang-', ''));
      }
    });
  }

  // 回到顶部按钮
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 图片懒加载
  const lazyImages = document.querySelectorAll('img.lazy');
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          if (image.dataset.srcset) {
            image.srcset = image.dataset.srcset;
          }
          image.classList.remove('lazy');
          imageObserver.unobserve(image);
        }
      });
    });

    lazyImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  }

  // 搜索功能
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = '/search?q=' + encodeURIComponent(query);
      }
    });
  }
});