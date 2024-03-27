import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { patchState, signalState } from '@ngrx/signals';
import { Color, Filter, Subtype } from '@nx-train/shared/types';

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

  colorLogo = new Map<Color, string>([
    [Color.White, 'assets/white.svg'],
    [Color.Blue, 'assets/blue.svg'],
    [Color.Black, 'assets/black.svg'],
    [Color.Red, 'assets/red.svg'],
    [Color.Green, 'assets/green.svg'],
  ])

  colors = signal(Object.entries(Color).map(([key, value]) => ({
    key,
    value,
    image: this.colorLogo.get(value),
  })));

  subtypes = signal(Object.entries(Subtype).map(([key, value]) => ({key, value})));

  filterState = signalState<Filter>({
    searchTerm: '',
    colors: [],
    types: [],
    subtypes: [],
    sort: {
      field: null,
      direction: null,
    },
  })

  onSearchCange(searchTerm: Event) {
    console.log(searchTerm);
    patchState(this.filterState, { searchTerm: (searchTerm.target as any).value });
    this.filterChange.emit(this.filterState());
  }

  onColorChange(color: Color) {
    const colors = this.filterState().colors;
    const newColors = colors.includes(color)
      ? colors.filter((c) => c !== color)
      : [...colors, color];
    patchState(this.filterState, { colors: newColors });
    this.filterChange.emit(this.filterState());
    console.log(this.filterState());
  }

  onSubtypeChange(subtype: Subtype) {
    const subtypes = this.filterState().subtypes;
    const newSubtypes = subtypes.includes(subtype)
      ? subtypes.filter((s) => s !== subtype)
      : [...subtypes, subtype];
    patchState(this.filterState, { subtypes: newSubtypes });
    this.filterChange.emit(this.filterState());
  }

  highlightSubtype(subtype: Subtype): boolean {
    return this.filterState().subtypes.includes(subtype);
  }

  highlightColor(color: Color): boolean {
    return this.filterState().colors.includes(color);
  }

  onFilterChange(filter: Partial<Filter>): void {
    patchState(this.filterState, filter);
    this.filterChange.emit(this.filterState());
  }
}
