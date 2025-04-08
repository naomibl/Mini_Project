window.addEventListener('scroll', () => {
    const eggTop = document.querySelector('.egg-top img');
    const eggBottom = document.querySelector('.egg-bottom img');
  
    // Define the max scroll value where the images stop moving
    const maxScroll = 60;  // Example: stop moving after 500px of horizontal scroll
    const scrollY = window.scrollY;  // Get the vertical scroll position
  
    // Calculate the movement, but limit it to maxScroll for both images
    const movement = Math.min(scrollY, maxScroll); // Limit the movement for both images
  
    // Apply the movement in opposite directions
    eggTop.style.transform = `translateX(${movement * 0.4}px)`;  // Moves eggTop left
    eggBottom.style.transform = `translateX(${movement * -0.4}px)`; // Moves eggBottom right
    

    
  });


  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const body = document.body;
    const button = document.querySelector('.gobutton');
    
    // Normalize scroll position
    const scrollPercentage = Math.min(scrollY / 25, 1); // Adjust 100 for how fast you want the transition
    
    // Color change from white (255, 255, 255) to black (0, 0, 0)
    const value = Math.floor(255 - scrollPercentage * 255); // Decrease RGB values equally
  
    // Apply the background color
    body.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;

    if (scrollY > 25) { 
        // When scrolled down more than 50px
        button.style.backgroundColor = '#ffcc00'; // Golden yellow
        button.style.color = 'black';
        button.style.borderColor = '#ffcc00';
      } else {
        // When near the top
        button.style.backgroundColor = 'transparent';
        button.style.color = 'black';
        button.style.borderColor = 'black';
      }
  });
  


