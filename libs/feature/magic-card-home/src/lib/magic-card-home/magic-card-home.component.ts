import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicCardFilterComponent } from '@nx-train/ui/magic-card-filter';
import { MagicCardListComponent } from '@nx-train/ui/magic-card-list';
import { Filter } from '@nx-train/shared/types';
import { Store } from '@nx-train/data-access/store';
import { patchState } from '@ngrx/signals';
import { setFilter } from '@nx-train//data-access/magic-card-store-feature';
import { MagicCardService } from '@nx-train/data-access/magic-card-service';


@Component({
  selector: 'lib-magic-card-home',
  standalone: true,
  imports: [CommonModule, MagicCardFilterComponent, MagicCardListComponent],
  templateUrl: './magic-card-home.component.html',
  styleUrl: './magic-card-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicCardHomeComponent {
  public store = inject(Store);
  private ser = inject(MagicCardService)

  onFilterChange(filter: Filter): void {
    patchState(this.store, setFilter(filter));
  }

  // constructor() {
  //   this.ser.searchCards2('lotus').on('data', data => console.log(data));
  // }
}
