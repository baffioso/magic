import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@nx-train/data-access/store';
import { JsonPipe } from '@angular/common';
import { Post } from '@nx-train/data-access/api-service';
import { MagicCardListComponent } from '@nx-train/ui/magic-card-list';
import { MagicCardFilterComponent } from '@nx-train/ui/magic-card-filter';
import { Filter } from '@nx-train/shared/types';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, MagicCardListComponent, MagicCardFilterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [Store],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public store = inject(Store);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  onAddFriend(): void {
    this.store.addFriend({
      name: 'Lars Ulrich',
      age: 57,
    });
  }

  showDialog(): void {
    this.dialog().nativeElement.showModal();
  }

  onRemoveFriend(): void {
    this.store.removeFriend();
  }

  onSelectPost(post: Post): void {
    this.store.selectPostId(post.id);
  }

  onFilterChange(filter: Filter): void {
    console.log('filterChange', filter);
  }

  constructor() {
    effect(() => {
      if (this.store.selectedPost() !== null) {
        this.showDialog();
      }
    })

    this.store.fetchCards();
  }
}
