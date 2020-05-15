class ClockFace {
  /**
   *
   * @param {number} x The X coordinate of the origin
   * @param {number} y The y coordinate of the origin
   * @param {number} diameter The circle's diameter
   */
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.secondHandRadius = this.diameter / 2 - 50;
    this.minuteHandRadius = this.diameter / 2 - 60;
    this.hourHandRadius = this.diameter / 2 - 90;
  }

  /**
   * Draw the second hand of the clock
   *
   * @returns void
   */
  secondHand() {
    const secondHandAngle = map(second(), 0, 60, 0, 2 * PI) - PI / 2;
    strokeWeight(2);
    stroke('red');
    line(
      0,
      0,
      this.secondHandRadius * cos(secondHandAngle),
      this.secondHandRadius * sin(secondHandAngle)
    );
  }

  /**
   * Draw the minute hand of the clock
   *
   * @returns void
   */
  minuteHand() {
    const minuteHandAngle = map(minute(), 0, 60, 0, 2 * PI) - PI / 2;
    strokeWeight(4);
    stroke('white');
    line(
      0,
      0,
      this.minuteHandRadius * cos(minuteHandAngle),
      this.minuteHandRadius * sin(minuteHandAngle)
    );
  }

  /**
   * Draw the hour hand of the clock
   *
   * @returns void
   */
  hourHand() {
    const hourHandAngle =
      map((hour() % 12) + norm(minute(), 0, 60), 0, 12, 0, 2 * PI) - PI / 2;
    strokeWeight(6);
    stroke('white');
    line(
      0,
      0,
      this.hourHandRadius * cos(hourHandAngle),
      this.hourHandRadius * sin(hourHandAngle)
    );
  }

  /**
   * Draw a dot at the circle's origin
   *
   * @returns void
   */
  middleDot() {
    ellipse(0, 0, 8, 8);
  }

  /**
   * Draw the numbers 1-12 on the clock face
   *
   * @returns void
   */
  hourNumbers() {
    textSize(15);
    textAlign(CENTER);
    noStroke();
    fill('white');
    let faceNumber = 0;
    // Draw a number every 30 degrees
    for (let i = 0; i < 360; i += 30) {
      let numberAngle = radians(i) - PI / 2;
      let x = cos(numberAngle) * (this.secondHandRadius + 15);
      let y = sin(numberAngle) * (this.secondHandRadius + 15);
      text(faceNumber === 0 ? '12' : faceNumber, x, y);
      faceNumber++;
    }
  }

  /**
   * Draw a dot on the clock face for every second, except where the hour numbers are
   *
   * @returns void
   */
  secondDots() {
    strokeWeight(2);
    stroke('white');
    beginShape(POINTS);
    // Draw one dot every 6 degrees
    for (let i = 0; i < 360; i += 6) {
      let dotAngle = radians(i);
      let x = cos(dotAngle) * (this.secondHandRadius + 15);
      let y = sin(dotAngle) * (this.secondHandRadius + 15);
      // Only draw a dot where there isn't an hour number
      i % 30 !== 0 ? vertex(x, y) : null;
    }
    endShape();
  }
  /**
   * Drawing function for the clock face
   *
   * @returns void
   */
  show() {
    noStroke();
    fill(30);
    translate(this.x, this.y);
    ellipse(0, 0, this.diameter, this.diameter);
    this.minuteHand();
    this.hourHand();
    this.secondHand();
    this.hourNumbers();
    this.secondDots();
    this.middleDot();
  }
}
