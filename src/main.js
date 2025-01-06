import { getImages } from './js/pixabay-api';
import createCardsMarkup from './js/render-function';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryLink = new SimpleLightbox('.gallery-link', {
  captionDelay: 250,
  captionsData: 'alt',
});

let gallery = document.querySelector('.gallery');
let loader = document.querySelector('.loader');

const searchForm = document.querySelector('.form');
searchForm.addEventListener('submit', handleSearch);
function handleSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const form = e.currentTarget;
  loader.style.display = 'block';

  const userQuery = form.elements.search.value.trim();
  getImages(userQuery)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      gallery.insertAdjacentHTML('beforeend', createCardsMarkup(data.hits));
      galleryLink.refresh();
    })
    .catch(console.error)
    .finally(() => {
      loader.style.display = 'none';
      form.reset();
    });
}