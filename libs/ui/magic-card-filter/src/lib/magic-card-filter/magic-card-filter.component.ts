import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { patchState, signalState } from '@ngrx/signals';
import { Filter } from '@nx-train/shared/types';

@Component({
  selector: 'lib-magic-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magic-card-filter.component.html',
  styleUrl: './magic-card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicCardFilterComponent {
  @Output() filterChange = new EventEmitter<Filter>();

  filterState = signalState<Filter>({
    searchTerm: '',
    colors: [],
    types: [],
    sort: {
      field: null,
      direction: null,
    },
  })

  onFilterChange(filter: Partial<Filter>): void {
    patchState(this.filterState, filter);
    this.filterChange.emit(this.filterState());
  }
}
