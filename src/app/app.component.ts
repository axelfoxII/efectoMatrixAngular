import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'matrix';

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;

  public ctx!: CanvasRenderingContext2D;
  value: string | undefined;
  charArr: string[] = [];
  speed: number | undefined;
  fallingCharArr: any = [];

  ngOnInit() {

    this.main();

  }

  main() {

    const canvas = this.myCanvas.nativeElement;
    this.ctx = this.myCanvas.nativeElement.getContext("2d");

    let cw = window.innerWidth;
    let ch = window.innerHeight;

    canvas.width = cw;
    canvas.height = ch;

    let charArr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "А",
      "В",
      "Г",
      "Д",
      "Є",
      "Ѕ",
      "З",
      "И",
      "Ѳ",
      "І",
      "К",
      "Л",
      "М",
      "Н",
      "Ѯ",
      "Ѻ",
      "П",
      "Ч",
      "Р",
      "С",
      "Т",
      "Ѵ",
      "Ф",
      "Х",
      "Ѱ",
      "Ѿ",
      "Ц",
    ];


    let maxCharCount = 300;
    let fontSize = 13;
    let maxColumns = cw / fontSize;
    let frames = 0;

    class FallingChar {

      x: any;
      y: any;
      value?: string | undefined;
      charArr?: string[];
      speed?: number;

      constructor(x: any, y: any) {
        this.x = x;
        this.y = y;
        this.charArr = charArr;
      }

      draw(ctx: any) {

        this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();

        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = fontSize + 'px sans-serif';
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {

          this.y = (Math.random() * ch) / 2 - 50;
          this.x = Math.floor(Math.random() * maxColumns) * fontSize;
          this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        }

      }

    }

    let update = () =>{

      if (this.fallingCharArr.length < maxCharCount) {

        let fallingChar = new FallingChar(
          Math.floor(Math.random() * maxColumns) * fontSize,
          (Math.random() * ch) / 2 -50
        );
        this.fallingCharArr.push(fallingChar);        
      }

      this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
      this.ctx.fillRect(0,0, cw,ch);

      for(let i = 0; i < this.fallingCharArr.length && frames % 2 == 0; i++){

        this.fallingCharArr[i].draw(this.ctx);

      }

      requestAnimationFrame(update);
      frames++;

    };
   
    update();

  }

}
