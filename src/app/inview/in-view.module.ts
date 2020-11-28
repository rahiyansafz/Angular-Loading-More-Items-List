import {ModuleWithProviders, NgModule} from '@angular/core';
import {INV_CONFIG, InViewConfig} from './config/config';
import {IInViewConfig} from './config/config.interface';
import {InViewContainerDirective} from './in-view-container.directive';
import {InViewDirective} from './in-view.directive';
import {EnterDirective, EnterOnceDirective, ExitDirective, ExitOnceDirective} from './output.directive';

export {IInViewConfig} from './config/config.interface';
export {InViewConfig} from './config/config';

@NgModule({
    declarations: [InViewContainerDirective, InViewDirective, EnterDirective, ExitDirective, EnterOnceDirective, ExitOnceDirective],
    exports: [InViewContainerDirective, InViewDirective, EnterDirective, ExitDirective, EnterOnceDirective, ExitOnceDirective],
})
export class InViewModule {
    static forRoot(config: IInViewConfig = {}): ModuleWithProviders {
        return {
            ngModule: InViewModule,
            providers: [{provide: INV_CONFIG, useValue: config}, InViewConfig],
        };
    }
}
