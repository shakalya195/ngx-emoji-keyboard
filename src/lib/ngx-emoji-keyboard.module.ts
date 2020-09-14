import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmojiKeyboardComponent } from './emoji-keyboard/emoji-keyboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [EmojiKeyboardComponent],
  exports: [EmojiKeyboardComponent]
})
export class NgxEmojiModule { }
