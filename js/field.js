'use strict';
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
})

const ImgSize = Object.freeze({
  small: 'beSmall',
  medium: 'beMedium',
  large: 'beLarge',
})

export class Field {
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
      this.imgsArr.push(child);
      this.field.appendChild(child);
    }
  }
  
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.dataset.size = ImgSize.small;
      target.classList.add('hidden');
      this.onItemClick && this.onItemClick(ItemType.carrot);
    }
    else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
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
    this.imgsArr.forEach(img => {
      img.style.visibility = 'hidden';
      img.dataset.size = ImgSize.small;
    })

    setTimeout(() => {
      this.imgsArr.forEach(img => {
        img.style.visibility = 'visible';
        img.dataset.size = ImgSize.large;
      })
    }, 700);

    setTimeout(() => {
      this.field.classList.add('show');      
      this.imgsArr.forEach(img => {
        img.classList.remove('hidden');
        img.dataset.size = ImgSize.medium;
        })
    }, 1020);
    
  }

  removeImgs() {
    this.imgsArr.forEach(img => {
      img.remove();
    })
  }
}
