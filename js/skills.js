document.addEventListener("DOMContentLoaded", function () {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  const adobeIcons = {
      'Adobe Photoshop': '<i class="fab fa-adobe" style="color: #31A8FF;"></i><i class="fas fa-camera" style="font-size: 0.8em; margin-left: -8px;"></i>',
      'Adobe Illustrator': '<i class="fab fa-adobe" style="color: #FF9A00;"></i><i class="fas fa-pen-nib" style="font-size: 0.8em; margin-left: -8px;"></i>',
      'Adobe InDesign': '<i class="fab fa-adobe" style="color: #FF3366;"></i><i class="fas fa-book" style="font-size: 0.8em; margin-left: -8px;"></i>'
  };

  document.querySelectorAll('.skill-card').forEach(card => {
      const skillName = card.querySelector('.skill-name').textContent;
      const iconWrapper = card.querySelector('.skill-icon');
      
      if (adobeIcons[skillName]) {
          iconWrapper.innerHTML = adobeIcons[skillName];
      }
  });

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkill(entry.target);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.2 });

  function animateSkill(skill) {
      const level = skill.getAttribute('data-level');
      const color = skill.getAttribute('data-color');
      const parentCard = skill.closest('.skill-card');
      
      let percentDisplay = parentCard.querySelector('.skill-percent');
      if (!percentDisplay) {
          percentDisplay = document.createElement('div');
          percentDisplay.className = 'skill-percent';
          percentDisplay.style.fontSize = '1.2em';
          percentDisplay.style.fontWeight = 'bold';
          percentDisplay.style.marginTop = '5px';
          parentCard.appendChild(percentDisplay);
      }

      skill.style.transition = 'none';
      skill.style.width = '0%';
      skill.style.backgroundColor = 'transparent';
      skill.innerHTML = `<div class="shiny-overlay"></div>`;
      
      skill.offsetWidth;
      
      let currentPercent = 0;
      const duration = 1200;
      let startTime;
      
      const animatePercent = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          currentPercent = Math.round(progress * level);
          percentDisplay.textContent = `${currentPercent}%`;
          
          if (progress < 1) {
              requestAnimationFrame(animatePercent);
          }
      };

      requestAnimationFrame(() => {
          skill.style.backgroundColor = color;
          skill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.6s ease';
          skill.style.width = `${level}%`;
          requestAnimationFrame(animatePercent);
      });
  }

  skillLevels.forEach(skill => {
      observer.observe(skill);
  });
});