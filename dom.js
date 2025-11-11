

let booksSearched;


function clickMeReaction(){
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('click');
    button.addEventListener('click', () => {
      fetch('https://stephen-king-api.onrender.com/api/books')
      .then(response => {
    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response body as JSON
    return response.json();
  })
   .then(books => {
          const container = document.getElementById('book-container-section');
          container.innerHTML = ''; // Clear previous results

          books.data.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book-model';
            console.log('book: ', book);
            setBookCoverBackground(div, book.Title, book); // Apply background image
            // div.style.backgroundSize = 'cover'
            // div.style.backgroundPosition = 'center';
            // div.style.color = 'white'; 
            div.style.boxShadow = "-2px 5px 5px gray";
            div.innerHTML = `
            <div class="book-overlay">
              <h2>${book.Title}</h2>
              <h4>(${book.Year || 'Unknown Year'})</h4>
              <p><strong>Publisher:</strong> ${book.Publisher || 'Unknown'}</p>
              <p><strong>Pages:</strong> ${book.Pages || 'N/A'}</p>
              <button class="info-button">More Info</button>
              </div>
            `;


            // div.innerHTML = `
            //   <h2>${book.Title}</h2>
            //   <h4>(${book.Year || 'Unknown Year'})</h4>
            //   <p><strong>Publisher:</strong> ${book.Publisher || 'Unknown'}</p>
            //   <p><strong>Pages:</strong> ${book.Pages || 'N/A'}</p>
            // `;

            container.appendChild(div);
          });
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    });
  });
}

function setBookCoverBackground(div, title, data) {
  const coverUrl = `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`;
  const img = new Image();

  console.log( "data",data)

  img.onload = function () {
    // Open Library placeholder is usually 1x1 pixel
    if (img.width > 1 && img.height > 1) {
      div.style.backgroundImage = `url(${coverUrl})`;
      div.style.backgroundSize = 'cover';
      div.style.backgroundPosition = 'center';
    } else {
      div.style.backgroundImage = 'none';
      div.innerHTML = `
              <h2>${data.Title}</h2>
              <h4>(${data.Year || 'Unknown Year'})</h4>
              <p><strong>Publisher:</strong> ${data.Publisher || 'Unknown'}</p>
              <p><strong>Pages:</strong> ${data.Pages || 'N/A'}</p>
            `;
    }
  };

  img.onerror = function () {
    div.style.backgroundImage = 'none';
    div.innerHTML = `
              <h2>${data.Title}</h2>
              <h4>(${data.Year || 'Unknown Year'})</h4>
              <p><strong>Publisher:</strong> ${data.Publisher || 'Unknown'}</p>
              <p><strong>Pages:</strong> ${data.Pages || 'N/A'}</p>
            `;
  };

  img.src = coverUrl;
}


clickMeReaction();
