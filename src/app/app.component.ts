import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container" inViewContainer>
      <div *ngFor="let item of items" class="item">
        item {{item}}
      </div>
      <button *ngIf="!loading; else loadingMore" inView (enter)="loadMore()">Load more</button>
      <ng-template #loadingMore>Loading more...</ng-template>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading = false;

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  loadMore() {
    console.log('loading more')
    if (!this.loading) {
      setTimeout(() => {
        this.loading = true;

        debugger
        setTimeout(() => {
          const l = this.items.length;
          this.items = [
            ...this.items,
            l + 1, l + 2, l + 3, l + 4
          ];
          this.loading = false;
          debugger
        }, 2000);

      }, 250)
    }
  }

  onScroll() {
    console.log('scroll')
  }
}
