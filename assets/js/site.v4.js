'use strict';
/* Progressive enhancement only. All primary content and links exist in HTML. */
(() => {
  document.documentElement.classList.replace('no-js', 'js');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  const setMenu = (open, restoreFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    const text = toggle.querySelector('[data-menu-label]');
    if (text) text.textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
      if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
        const links = [...nav.querySelectorAll('a[href]')];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
      }
    });
    window.matchMedia('(min-width: 781px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
  }

  // The source report renders every panel without JS. Enhance it into keyboard-accessible tabs.
  document.querySelectorAll('[data-demo-tabs]').forEach((container) => {
    const buttons = [...container.querySelectorAll('[data-tab]')];
    const panels = buttons.map(button => document.getElementById(button.dataset.tab));
    container.hidden = false;
    container.setAttribute('role', 'tablist');
    const activate = (index, focus = false) => {
      buttons.forEach((button, i) => {
        button.setAttribute('role', 'tab'); button.setAttribute('aria-selected', String(i === index));
        button.tabIndex = i === index ? 0 : -1;
        if (panels[i]) {
          panels[i].hidden = i !== index; panels[i].setAttribute('role', 'tabpanel');
          panels[i].setAttribute('aria-labelledby', button.id); panels[i].tabIndex = 0;
        }
      });
      if (focus) buttons[index].focus();
    };
    buttons.forEach((button, i) => {
      button.addEventListener('click', () => activate(i));
      button.addEventListener('keydown', (event) => {
        let next = i;
        if (event.key === 'ArrowRight') next = (i + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (i + buttons.length - 1) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault(); activate(next, true);
      });
    });
    activate(0);
  });

  // Honest contact handling: prepare a draft, never pretend an email was sent.
  const form = document.querySelector('[data-inquiry-form]');
  if (form) {
    const sendButton = form.querySelector('[data-create-draft]');
    const copyButton = form.querySelector('[data-copy-brief]');
    const status = form.querySelector('[data-form-status]');
    const statusText = form.querySelector('[data-status-text]');
    const fallback = form.querySelector('[data-copy-fallback]');
    const openDraftLink = form.querySelector('[data-open-draft]');
    const select = form.querySelector('[name=service]');
    const selected = new URLSearchParams(window.location.search).get('service');
    if (selected && [...select.options].some(option => option.value === selected)) select.value = selected;
    sendButton.disabled = false; copyButton.disabled = false;
    const announce = (message) => { status.hidden = false; statusText.textContent = message; };
    const draft = () => {
      const data = new FormData(form);
      const get = key => String(data.get(key) || '').trim();
      const serviceName = select.options[select.selectedIndex].text;
      const subject = `Brical project inquiry: ${serviceName}`;
      const body = ['Hello Brical Group,', '', `Name: ${get('name')}`, `Reply email: ${get('email')}`,
        `Organization: ${get('organization') || 'Not provided'}`, `Website: ${get('website') || 'Not provided'}`,
        `Interested in: ${serviceName}`, '', 'What I would like to improve:', get('message')].join('\n');
      const address = form.dataset.recipient;
      return { body, address, href: `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
    };
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const item = draft();
      openDraftLink.href = item.href; openDraftLink.hidden = false;
      fallback.hidden = true;
      announce('Your draft is ready. Your email app will open; review and send it there. Nothing has been sent by this website. If no app opens, use Copy inquiry below.');
      window.location.href = item.href;
    });
    copyButton.addEventListener('click', async () => {
      if (!form.reportValidity()) return;
      const item = draft();
      const text = `To: ${item.address}\n\n${item.body}`;
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        fallback.hidden = true;
        announce('Inquiry copied. Paste it into your email and send it to ' + item.address + '. Nothing has been sent yet.');
      } catch (_) {
        fallback.hidden = false; fallback.value = text; fallback.focus(); fallback.select();
        announce('Automatic copying is unavailable. Select and copy the text below, then paste it into an email.');
      }
    });
  }
})();


// Homepage demo: human-controlled steps, no auto-rotating slides or scroll hijacking.
(() => {
  const root = document.querySelector('[data-signal-study]');
  if (!root) return;
  const tabs = root.querySelector('[data-signal-tabs]');
  const buttons = Array.from(root.querySelectorAll('[data-signal-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-signal-panel]'));
  if (!tabs || buttons.length !== panels.length) return;
  tabs.hidden = false;
  tabs.setAttribute('role', 'tablist');
  const activate = (index, moveFocus = false, animate = false) => {
    root.dataset.activeStep = String(index);
    root.classList.remove('step-changed');
    if (animate) { void root.offsetWidth; root.classList.add('step-changed'); }
    buttons.forEach((button, i) => {
      const active = i === index;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', button.id);
      panels[i].tabIndex = 0;
      panels[i].classList.toggle('is-switched', active && animate);
    });
    if (moveFocus) buttons[index].focus();
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(index, false, true));
    button.addEventListener('keydown', (event) => {
      let target = index;
      if (event.key === 'ArrowRight') target = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') target = (index + buttons.length - 1) % buttons.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = buttons.length - 1;
      else return;
      event.preventDefault();
      activate(target, true, true);
    });
  });
  activate(0);
})();
