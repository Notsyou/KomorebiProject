import { toggleBookmark, authState } from './api.js';

// Renders location cards in the DOM
export const renderLocations = (locations, savedSet) => {
  const grid = document.getElementById('loc-grid');
  grid.innerHTML = '';

  locations.forEach(loc => {
    const isSaved = savedSet.has(loc.id);
    const card = document.createElement('article');
    card.className = 'card';
    
    card.innerHTML = `
      <div class="card__watermark" aria-hidden="true">${loc.icon}</div>
      <button class="card__bk-btn ${isSaved ? 'is-saved' : ''}" data-id="${loc.id}">
        <span class="bk-icon"></span>
      </button>
      <div class="card__body">
        <span class="card__icon">${loc.icon}</span>
        <p class="card__tag">${loc.prefecture} • ${loc.category}</p>
        <h2 class="card__title">${loc.title}</h2>
        <p class="card__desc">${loc.description}</p>
      </div>
    `;

    // Optimistic UI Update Logic
    const btn = card.querySelector('.card__bk-btn');
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      if (!authState.isAuthenticated()) {
        alert("Please login to save locations.");
        return;
      }

      // Optimistic toggle
      const currentlySaved = btn.classList.contains('is-saved');
      btn.classList.toggle('is-saved');
      
      try {
        await toggleBookmark(loc.id);
      } catch (err) {
        // Revert on failure
        btn.classList.toggle('is-saved');
        console.error("Failed to sync bookmark with server", err);
      }
    });

    grid.appendChild(card);
  });
};