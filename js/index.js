class CountdownTimer {
  constructor({selector, targetDate}) {
    this.timerId = selector;
    this.targetDate = targetDate.getTime();
  }

  template = (timerId) => `
     <div class="timer" id="${timerId}">
        <div class="field">
            <span class="value" data-value="days">0</span>
            <span class="label">Days</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="hours">0</span>
            <span class="label">Hours</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="mins">0</span>
            <span class="label">Minutes</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="secs">0</span>
            <span class="label">Seconds</span>
        </div>
    </div>`;

  insertHTML = (markUp) =>
    document.querySelector('body').insertAdjacentHTML('afterbegin', markUp);

  start = () => {
    const markUp = this.template(this.timerId);

    this.insertHTML(markUp);

    const secs = document.querySelector('[data-value="secs"]');
    const mins = document.querySelector('[data-value="mins"]');
    const hours = document.querySelector('[data-value="hours"]');
    const days = document.querySelector('[data-value="days"]');

    const valueUpdate = (secsV, minsV, hoursV, daysV) => {
      secs.textContent = secsV;
      mins.textContent = minsV;
      hours.textContent = hoursV;
      days.textContent = daysV;
    }

    setInterval(() => {
      const time = this.targetDate - Date.now();
      const daysV = Math.floor(time / (1000 * 60 * 60 * 24));
      const hoursV = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minsV = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secsV = Math.floor((time % (1000 * 60)) / 1000);

      valueUpdate(secsV, minsV, hoursV, daysV);
    }, 1000);
  };
};

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});

timer1.start();

// const timer2 = new CountdownTimer({
//   selector: '#timer-2',
//   targetDate: new Date('Jul 17, 2021'),
// });

// timer2.start();
