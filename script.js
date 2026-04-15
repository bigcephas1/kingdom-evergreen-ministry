// ========== Kingdom Ever Green Ministry - Main JavaScript ==========

(function () {
  // ========== 1. Intersection Observer for fade-up animations ==========
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeElements.forEach((el) => observer.observe(el));

  // ========== 2. Dynamic Events List Rendering ==========
  const eventsData = [
    { name: 'Global Peace Service', date: 'April 12, 2026', type: 'online' },
    {
      name: 'Second Quarter Prophetic Communion',
      date: 'April 26, 2026',
      type: 'in-person',
    },
    { name: 'Healing & Peace Summit', date: 'May 10, 2026', type: 'hybrid' },
    {
      name: 'Ever Green Night of Worship',
      date: 'June 5, 2026',
      type: 'all welcome',
    },
  ];

  const eventsContainer = document.getElementById('eventsList');
  if (eventsContainer) {
    eventsContainer.innerHTML = '';

    eventsData.forEach((ev) => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event-item';
      eventDiv.innerHTML = `
        <div class="event-info">
          <i class="fas fa-calendar-alt" style="color: #6f8f5a; font-size: 1.2rem;"></i>
          <strong>${escapeHtml(ev.name)}</strong>
          <span class="event-date">📅 ${escapeHtml(ev.date)} · ${escapeHtml(ev.type)}</span>
        </div>
        <button class="btn-outline small-btn" data-event="${escapeHtml(ev.name)}" data-date="${escapeHtml(ev.date)}">Remind me</button>
      `;
      eventsContainer.appendChild(eventDiv);
    });

    // Attach event listeners for reminder buttons
    document.querySelectorAll('.event-item .small-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eventName = btn.getAttribute('data-event') || 'this event';
        const eventDate = btn.getAttribute('data-date') || 'the scheduled date';
        alert(
          `📅 Reminder set: ${eventName} on ${eventDate}. We'll send updates via email!`,
        );
      });
    });
  }

  // Helper function to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // ========== 3. Contact Form Handling ==========
  const form = document.getElementById('prayerForm');
  const statusDiv = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields to send your prayer request.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.innerHTML = `✓ Shalom ${name}, your declaration request has been received. We stand with you in peace and prayer! 🌿`;
        statusDiv.style.background = '#e0f0dc';

        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 4500);
      }

      // Reset form
      document.getElementById('nameInput').value = '';
      document.getElementById('emailInput').value = '';
      document.getElementById('messageInput').value = '';

      console.log(`Prayer request from ${name} (${email}): ${message}`);
    });
  }

  // ========== 4. Button Interactions ==========
  const joinBtn = document.getElementById('joinBtn');
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const prayerBtn = document.getElementById('prayerBtn');
  if (prayerBtn) {
    prayerBtn.addEventListener('click', () => {
      alert(
        '🌿 "The Lord bless you with transcendent peace." — KG Ministry. Dial 08036241588 for prophetic prayer line.',
      );
    });
  }

  // ========== 5. Set current year in footer ==========
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ========== 6. Smooth scroll for navigation links ==========
  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Handle URL hash on page load
  if (window.location.hash) {
    const initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      setTimeout(() => {
        initialTarget.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // ========== 7. Dynamic Title Effect (subtle rotation) ==========
  let titles = ['🕊️ KG Ministry', 'Peace 2026', 'Kingdom Ever Green'];
  let idx = 0;
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      idx = (idx + 1) % titles.length;
      document.title = titles[idx];
    }
  }, 4500);

  // ========== 8. Time-based Greeting ==========
  const heroTitle = document.querySelector('.declaration-card h3');
  if (heroTitle && !document.querySelector('.time-greeting')) {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = '🌅 Good Morning';
    else if (hour < 18) greeting = '☀️ Good Afternoon';
    else greeting = '🌙 Good Evening';

    const span = document.createElement('div');
    span.className = 'time-greeting';
    span.style.fontSize = '0.8rem';
    span.style.marginBottom = '0.5rem';
    span.style.color = '#b87c4f';
    span.style.fontWeight = '500';
    span.innerText = `${greeting}, beloved.`;
    heroTitle.parentNode.insertBefore(span, heroTitle);
  }
})();
