import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from './store';
import { JsonPipe } from '@angular/common';
import { Post } from './api.service';
import { MagicCardListComponent } from '@nx-train/ui/magic-card-list';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, MagicCardListComponent],
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

  constructor() {
    effect(() => {
      if (this.store.selectedPost() !== null) {
        this.showDialog();
      }
    })

    this.store.fetchCards();
  }
}
