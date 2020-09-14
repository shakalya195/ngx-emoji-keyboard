import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmojiKeyboardComponent } from './emoji-keyboard/emoji-keyboard.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { EmojiViewPipe } from './pipes/emoji-view.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    EmojiKeyboardComponent,
    EmojiViewPipe
  ],
  exports: [
    EmojiKeyboardComponent
  ]
})
export class NgxEmojiModule { }
