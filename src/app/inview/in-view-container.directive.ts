import { Directive, ContentChildren, QueryList, HostListener } from '@angular/core';
import { InViewDirective } from './in-view.directive';

@Directive({
  selector: '[inViewContainer]',
})
export class InViewContainerDirective {
  @ContentChildren(InViewDirective) inViewElements: QueryList<InViewDirective>;

  @HostListener('scroll')
  onScroll() {
    this.inViewElements.forEach(e => e.check())
  }
}