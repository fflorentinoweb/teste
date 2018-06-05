import { Directive, HostListener, Component, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})

export class FullscreenComponent implements OnInit {
  isFullscreen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click') onClick() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }

    screenfull.isFullscreen ? this.isFullscreen = true : this.isFullscreen = false;
  }
}

