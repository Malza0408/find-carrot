'use strict';

const CARROT_SIZE = 80;

export default class Field {
  constructor() {
    this.field = document.querySelector('.field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.imgsArr = [];
    this.id = 0;

    this.field.addEventListener('click', this.onClick.bind(this));
  }

  makeRandomPisition() {
    let X = Math.floor(Math.random() * (this.fieldRect.right - CARROT_SIZE - this.fieldRect.x));
    let Y = Math.floor(Math.random() * (this.fieldRect.bottom - CARROT_SIZE - this.fieldRect.y));
    return  {
      X,
      Y
    }
  }

  makeElements(element, count) {
    for (let i = 0; i < count; i++) {
      const { X, Y } = this.makeRandomPisition();
      const child = document.createElement('img');
      child.src = `./img/${element}.png`;
      child.setAttribute('class', element);
      child.classList.add('hidden');
      child.style.left = `${X}px`;
      child.style.top = `${Y}px`;
      this.field.style.opacity = 0;
      this.imgsArr.push(child);
      this.field.appendChild(child);
    }
  }
  

  setOpacity(opacity) {
    this.field.style.opacity = opacity;
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.style.opacity = 0;
      target.classList.add('hidden');
      this.onItemClick && this.onItemClick('carrot');
    }
    else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }


  rePositionImgs() {
    const imgs = [].slice.call(this.field.children);
    imgs.forEach(img => {
      const { X, Y } = this.makeRandomPisition();
      img.style.left = `${X}px`;
      img.style.top = `${Y}px`;
    });
  }

  setFieldShow(isShow) {
    if (!isShow) {
      this.field.classList.remove('show');
      this.imgsArr.forEach(img => {
      img.classList.add('hidden');
      })
      return;
    }
    this.field.style.opacity = 0;
    setTimeout(() => {
      this.field.classList.add('show');
      this.field.style.opacity = 1;
      this.imgsArr.forEach(img => {
        img.style.opacity = 1;
        img.classList.remove('hidden');
        })
    }, 1000);
    
  }
}
