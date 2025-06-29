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
  // 打字機效果相關
  currentText = '';
  fullTexts = [
    '嗨！我是 Leo 👋',
    '金融科技愛好者 📈',
    '程式開發者 💻', 
    '投資策略研究員 📊',
    '歡迎來到我的世界！ 🌟'
  ];
  currentTextIndex = 0;
  currentCharIndex = 0;
  typewriterInterval: any;
  
  // 技能資料
  skills = [
    { name: 'Angular', level: 85, color: '#dd0031' },
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'Python', level: 80, color: '#3776ab' },
    { name: '金融分析', level: 88, color: '#28a745' },
    { name: 'TradingView', level: 92, color: '#131722' },
    { name: 'TypeScript', level: 85, color: '#3178c6' }
  ];
  
  // 互動狀態
  isSkillsVisible = false;
  clickCount = 0;
  lastClickTime = 0;
  
  // 個人資訊卡片
  personalCards = [
    {
      title: '🎯 專業領域',
      content: '金融科技開發、量化交易策略、數據分析',
      isFlipped: false
    },
    {
      title: '🚀 技術專長', 
      content: 'Angular、Python、JavaScript、Machine Learning',
      isFlipped: false
    },
    {
      title: '📈 投資經驗',
      content: '股票、外匯、加密貨幣策略開發與回測',
      isFlipped: false
    },
    {
      title: '🎓 學習理念',
      content: '持續學習新技術，將理論與實踐相結合',
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
        // 等待一段時間後清除文字
        setTimeout(() => {
          this.currentText = '';
          this.currentCharIndex = 0;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.fullTexts.length;
        }, 2000);
      }
    }, 100);
  }

  // 技能條動畫
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

  // 卡片翻轉
  flipCard(index: number) {
    this.personalCards[index].isFlipped = !this.personalCards[index].isFlipped;
  }

  // 互動點擊效果
  handleInteractiveClick(event: MouseEvent) {
    const now = Date.now();
    if (now - this.lastClickTime < 300) {
      this.clickCount++;
    } else {
      this.clickCount = 1;
    }
    this.lastClickTime = now;

    // 建立點擊波紋效果
    this.createRipple(event);

    // 多次點擊彩蛋
    if (this.clickCount >= 5) {
      this.triggerEasterEgg();
      this.clickCount = 0;
    }
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
    // 彩蛋效果：全螢幕彩色粒子
    const container = document.querySelector('.about-container');
    if (container) {
      container.classList.add('easter-egg-active');
      setTimeout(() => {
        container.classList.remove('easter-egg-active');
      }, 3000);
    }
  }

  // 滾動到技能區域
  scrollToSkills() {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
