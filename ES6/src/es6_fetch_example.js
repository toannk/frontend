// ES6 Fetch docs
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

/*
fetch('https://some.url.com')
  .then(response => {
    if (response.ok) {
      return Promise.resolve(response);
    }
    else {
      return Promise.reject(new Error('Failed to load')); 
    }
  })
  .then(response => response.json()) // parse response as JSON
  .then(data => {
    // success
  })
  .catch(function(error) {
    console.log(`Error: ${error.message}`);
  });
});
*/
