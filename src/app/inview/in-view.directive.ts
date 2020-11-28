import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, Optional, Output } from '@angular/core';

import * as inView from 'in-view';
import { InViewConfig, InViewConfigurable } from './config/config';
import { EnterDirective, EnterOnceDirective, ExitDirective, ExitOnceDirective } from './output.directive';
import { uniqueId } from './util';

/* tslint:disable:directive-selector */
@Directive({
  selector: '[inView]',
  exportAs: 'inView',
})
@InViewConfigurable()
export class InViewDirective implements AfterViewInit {
  @Output() enter = new EventEmitter<any>();
  @Output() exit = new EventEmitter<any>();
  @Output() enterOnce = new EventEmitter<any>();
  @Output() exitOnce = new EventEmitter<any>();

  @HostBinding('id')
  private uid = uniqueId();
  private hasEnterHandler;
  private hasExitHandler;
  private hasEnterOnceHandler;
  private hasExitOnceHandler;
  private elementsInitialized;
  private inv: any;

  constructor(
    private config: InViewConfig,
    private element: ElementRef,
    private cd: ChangeDetectorRef,
    @Optional() enterDirective: EnterDirective,
    @Optional() exitDirective: ExitDirective,
    @Optional() enterOnceDirective: EnterOnceDirective,
    @Optional() exitOnceDirective: ExitOnceDirective,
  ) {
    this.hasEnterHandler = !!enterDirective;
    this.hasExitHandler = !!exitDirective;
    this.hasEnterOnceHandler = !!enterOnceDirective;
    this.hasExitOnceHandler = !!exitOnceDirective;
    this.invOnConfigChanges();
  }

  ngAfterViewInit() {
    const inv = this.getInView();
    if (this.hasEnterHandler) {
      inv.on('enter', () => {
        this.enter.emit();
        this.cd.detectChanges();
      });
    }
    if (this.hasExitHandler) {
      inv.on('exit', () => {
        this.exit.emit();
        this.cd.detectChanges();
      });
    }
    if (this.hasEnterOnceHandler) {
      inv.once('enter', () => {
        this.enterOnce.emit();
        this.cd.detectChanges();
      });
    }
    if (this.hasExitOnceHandler) {
      inv.once('exit', () => {
        this.exitOnce.emit();
        this.cd.detectChanges();
      });
    }
  }

  is() {
    return inView.is(this.element.nativeElement);
  }

  check() {
    this.inv.check();
  } 

  private invOnConfigChanges() {
    inView.offset(this.config.get('offset'));
    inView.threshold(this.config.get('threshold'));
    inView.test(this.config.get('test'));
  }

  private getInView() {
    if (!this.elementsInitialized) {
      this.inv = inView.default(`#${this.uid}`);
      this.elementsInitialized = this.inv.elements.length;
    }
    return this.inv;
  }
}
