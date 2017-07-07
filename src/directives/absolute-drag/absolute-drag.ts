import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
import { Position } from '../../models/position';

@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDragDirective {

  // @Input('startLeft') startLeft: any;
  // @Input('startTop') startTop: any;
  @Input() position: any;
  startLeft: any;
  startTop: any;

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {

  }

  ngOnInit() {
    this.startTop = this.position.top;
    this.startLeft = this.position.left;
  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }



  handlePan(ev){
    let newLeft = ev.center.x;
    let newTop = ev.center.y;

    this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    });
  }

}