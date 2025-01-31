// Hamburger menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          // Only handle internal links
          if (href.startsWith('#')) {
              e.preventDefault();
              const targetId = href.replace('#', '');
              const targetElement = document.getElementById(targetId);
              
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth'
                  });
                  
                  // Close hamburger menu if open
                  const menu = document.querySelector(".menu-links");
                  const icon = document.querySelector(".hamburger-icon");
                  if (menu.classList.contains("open")) {
                      menu.classList.remove("open");
                      icon.classList.remove("open");
                  }
              }
          }
      });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter skill items
      skillItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const projectItems = document.querySelectorAll('.project-item');

  projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.project-info').style.opacity = '1';
    });

    item.addEventListener('mouseleave', function() {
      this.querySelector('.project-info').style.opacity = '0';
    });
  });

  // Commented out filter functionality for future use
  /*
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter project items
      projectItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  */
});

document.addEventListener('DOMContentLoaded', function() {
  // Smart Scroll functionality
  const nav = document.querySelector('.smart-scroll');
  let lastScrollTop = 0;
  let scrollThreshold = 100; // Adjust this value to determine when the navbar should hide/show

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down and past the threshold
      nav.classList.remove('scrolled-up');
      nav.classList.add('scrolled-down');
    } else if (scrollTop < lastScrollTop || scrollTop < scrollThreshold) {
      // Scrolling up or above the threshold
      nav.classList.remove('scrolled-down');
      nav.classList.add('scrolled-up');
    }
    
    lastScrollTop = scrollTop;
  });

  // Scroll arrow functionality
  const scrollArrows = document.querySelectorAll('.scroll-arrow');

  scrollArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
      if (this.classList.contains('scroll-to-top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const currentSection = this.closest('section');
        const nextSection = currentSection.nextElementSibling;

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const text = "Ready to innovate together? Let's connect and bring your ideas to life!";
  const speed = 50; // Adjust for faster or slower typing
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typewriter-text").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  // Start the typewriter effect when the section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById('end-note'));
});

// document.querySelectorAll('.scroll-arrow').forEach(arrow => {
//   arrow.addEventListener('click', function() {
//       const nextSection = this.closest('section').nextElementSibling;
//       if (nextSection) {
//           nextSection.scrollIntoView({ behavior: 'smooth' });
//       }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.radius = Math.random() * 2 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('expertiseCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match the section
  function setCanvasSize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Create an array to store our particles
  const particles = [];

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    // Update particle position and opacity
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      this.opacity += Math.random() * 0.02 - 0.01;
      if (this.opacity < 0.1) this.opacity = 0.1;
      if (this.opacity > 0.5) this.opacity = 0.5;
    }

    // Draw the particle
    draw() {
      ctx.fillStyle = `rgba(186, 184, 108, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  function createParticles() {
    const particleCount = Math.floor(canvas.width * canvas.height / 10000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw lines between close particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.strokeStyle = `rgba(186, 184, 108, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  // Initialize and start animation
  createParticles();
  animate();
});


// Add active class to current section in navigation
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 60) {
          currentSection = section.getAttribute('id');
      }
  });
  
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
          link.classList.add('active');
      }
  });
});

class ParticleNetwork {
  constructor(canvasId, particleCount = 50) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;

    this.setCanvasSize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.setCanvasSize());
  }

  setCanvasSize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.updateAndDrawParticles();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(153, 142, 26, ${0.2 - distance/500})`;
          this.ctx.stroke();
        }
      });
    });
  }

  updateAndDrawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });
  }
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.radius = Math.random() * 2 + 1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(153, 142, 26, 0.3)';
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvas.height) this.vy = -this.vy;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.iteration-container');
  const cards = document.querySelectorAll('.iteration-card');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  let currentIndex = 0;

  function updateArrows() {
    // Show/hide arrows based on current position
    leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
    rightArrow.style.display = currentIndex < cards.length - 1 ? 'block' : 'none';
  }

  function showCard(index) {
    // Move the container to show the selected card
    container.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateArrows();
  }

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) showCard(currentIndex - 1);
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) showCard(currentIndex + 1);
  });

  // Initialize arrow visibility
  updateArrows();
});

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.test-cases-container');
  const cards = document.querySelectorAll('.test-case');
  const leftArrow = document.querySelector('.test-left-arrow');
  const rightArrow = document.querySelector('.test-right-arrow');
  let currentIndex = 0;

  function updateArrows() {
    // Show/hide arrows based on current position
    leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
    rightArrow.style.display = currentIndex < cards.length - 1 ? 'block' : 'none';
  }

  function showCard(index) {
    // Move the container to show the selected card
    container.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateArrows();
  }

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) showCard(currentIndex - 1);
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) showCard(currentIndex + 1);
  });

  // Initialize arrow visibility
  updateArrows();
});

document.addEventListener('DOMContentLoaded', function() {
  const skillsGrid = document.querySelector('.skills-grid');
  const viewMoreBtn = document.querySelector('.view-more-btn');
  
  if (viewMoreBtn && skillsGrid) {
      viewMoreBtn.addEventListener('click', function() {
          skillsGrid.classList.toggle('expanded');
          
          // Update button text
          if (skillsGrid.classList.contains('expanded')) {
              viewMoreBtn.textContent = 'Show Less';
          } else {
              viewMoreBtn.textContent = 'View All Skills';
              // Smooth scroll back to skills section
              skillsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Get all dropdown triggers
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
      // Handle click on dropdown trigger
      const trigger = dropdown.querySelector('.dropdown-trigger');
      
      trigger.addEventListener('click', function(e) {
          // Prevent navigating to #projects when clicking the dropdown trigger
          e.preventDefault();
          
          // Toggle active class on dropdown
          dropdown.classList.toggle('active');
          
          // Close other open dropdowns
          dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                  otherDropdown.classList.remove('active');
              }
          });
      });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
          dropdowns.forEach(dropdown => {
              dropdown.classList.remove('active');
          });
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particle-network-1');
  new ParticleNetwork('particle-network-2', 30); // You can customize the particle count
  new ParticleNetwork('particle-network-3', 30);
  new ParticleNetwork('particle-network-4', 30);
  new ParticleNetwork('particle-network-5', 30);
  new ParticleNetwork('particle-network-6', 30);
  new ParticleNetwork('particle-network-7', 30);
  new ParticleNetwork('projectsCanvas', 30);
});

