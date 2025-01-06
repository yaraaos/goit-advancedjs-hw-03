const API_KEY = '48071665-33e10630f84311df29ef7637b';

function getImages(query) {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

  return fetch(`https://pixabay.com/api/?${searchParams.toString()}`).then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    }
  );
}

export { getImages };