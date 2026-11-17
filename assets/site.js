(() => {
  const button = document.querySelector('.erh-burger');
  const menu = document.querySelector('.erh-mob');
  const icon = document.querySelector('.erh-ico');

  if (button && menu && icon) {
    function setMenu(open) {
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      icon.setAttribute('d', open ? 'M5 5L19 19M19 5L5 19' : 'M4 7H20M4 12H20M4 17H20');
    }

    button.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) {
        setMenu(false);
        button.focus();
      }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', event => {
      if (event.matches) setMenu(false);
    });
    setMenu(false);
  }

  const chips = document.querySelectorAll('[data-filter]');
  if (!chips.length) return;

  const sections = {
    beauty: document.getElementById('beauty-section'),
    leather: document.getElementById('leather-section')
  };
  const status = document.getElementById('filter-status');

  function applyFilter() {
    const requested = window.location.hash.slice(1);
    const filter = ['beauty', 'leather'].includes(requested) ? requested : 'all';
    chips.forEach(chip => {
      const selected = chip.dataset.filter === filter;
      chip.setAttribute('aria-pressed', String(selected));
      chip.style.background = selected ? '#0F3B2E' : 'transparent';
      chip.style.color = selected ? '#FBF6EC' : '#0F3B2E';
    });
    sections.beauty.hidden = filter === 'leather';
    sections.leather.hidden = filter === 'beauty';
    if (status) {
      status.textContent = filter === 'all' ? 'Showing all 6 product previews' : `Showing 3 ${filter} product previews`;
    }
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    window.location.hash = chip.dataset.filter;
    applyFilter();
  }));
  window.addEventListener('hashchange', applyFilter);
  applyFilter();
})();
