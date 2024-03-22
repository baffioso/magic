import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicCard } from '@nx-train/shared/types';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'lib-magic-card-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './magic-card-list.component.html',
  styleUrl: './magic-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicCardListComponent {
  cards = input.required<MagicCard[]>();
  searchTerm = signal<string>('');

  filteredCards = computed(() => {
    const searchTerm = this.searchTerm();
    const filtered = searchTerm
      ? this.cards().filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : this.cards();

      return filtered;
  })

  onSearchCange(searchTerm: KeyboardEvent) {
    this.searchTerm.set((searchTerm.target as any).value);
  }

  // filterdCards = computed
}
