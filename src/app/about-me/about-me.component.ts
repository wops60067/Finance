import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit, OnDestroy {
  // Typewriter effect related
  currentText = '';
  fullTexts = [
    'Hi! I\'m Leo 👋',
    'FinTech Enthusiast 📈',
    'Software Developer 💻', 
    'Investment Strategy Researcher 📊',
    'Welcome to my world! 🌟'
  ];
  currentTextIndex = 0;
  currentCharIndex = 0;
  typewriterInterval: any;
  
  // Skills data
  skills = [
    { name: 'Angular', level: 85, color: '#dd0031' },
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'Python', level: 80, color: '#3776ab' },
    { name: 'Financial Analysis', level: 88, color: '#28a745' },
    { name: 'TradingView', level: 92, color: '#131722' },
    { name: 'TypeScript', level: 85, color: '#3178c6' }
  ];
  
  // Interactive states
  isSkillsVisible = false;
  clickCount = 0;
  lastClickTime = 0;
  
  // Performance tab state
  activeTab = 'overall';
  
  // Personal Information Cards
  personalCards = [
    {
      title: '🎯 Professional Field',
      content: 'FinTech Development, Quantitative Trading Strategies, Data Analysis',
      isFlipped: false
    },
    {
      title: '🚀 Technical Expertise', 
      content: 'Angular, Python, JavaScript, Machine Learning',
      isFlipped: false
    },
    {
      title: '📈 Investment Experience',
      content: 'Stock, Forex, Cryptocurrency Strategy Development & Backtesting',
      isFlipped: false
    },
    {
      title: '🎓 Learning Philosophy',
      content: 'Continuous learning of new technologies, combining theory with practice',
      isFlipped: false
    }
  ];

  ngOnInit() {
    this.startTypewriter();
    this.animateSkillsOnScroll();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  startTypewriter() {
    this.typewriterInterval = setInterval(() => {
      const currentFullText = this.fullTexts[this.currentTextIndex];
      
      if (this.currentCharIndex < currentFullText.length) {
        this.currentText += currentFullText[this.currentCharIndex];
        this.currentCharIndex++;
      } else {
        // Wait for a moment then clear text
        setTimeout(() => {
          this.currentText = '';
          this.currentCharIndex = 0;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.fullTexts.length;
        }, 2000);
      }
    }, 100);
  }

  // Skills bar animation
  animateSkillsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isSkillsVisible = true;
        }
      });
    });

    setTimeout(() => {
      const skillsSection = document.querySelector('.skills-section');
      if (skillsSection) {
        observer.observe(skillsSection);
      }
    }, 500);
  }

  // Card flip
  flipCard(index: number) {
    this.personalCards[index].isFlipped = !this.personalCards[index].isFlipped;
  }


  createRipple(event: MouseEvent) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    (event.target as HTMLElement).appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

  triggerEasterEgg() {
    // Easter egg effect: full-screen colorful particles
    const container = document.querySelector('.about-container');
    if (container) {
      container.classList.add('easter-egg-active');
      setTimeout(() => {
        container.classList.remove('easter-egg-active');
      }, 3000);
    }
  }

  // Scroll to skills section
  scrollToSkills() {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Switch performance tabs
  switchTab(tabName: string, event: Event) {
    event.preventDefault();
    this.activeTab = tabName;
    
    // Update button state
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    (event.target as HTMLElement).classList.add('active');
    
    // Update content display
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
      activeContent.classList.add('active');
    }
  }
}