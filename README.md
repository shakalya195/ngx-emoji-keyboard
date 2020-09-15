# ngx-emoji-keyboard

ngx-emoji-keyboard is an library for emoji keyboard like https://web.whatsapp.com

Component: app-emoji-keyboard

<app-emoji-keyboard (selectEmojiEvent)="selectEmojiFunction($event)"></app-emoji-keyboard>
Event:selectEmojiEvent


Pipe: emojiView
its also equipped with an angular pipe 'emojiView' to display emoji native (♥️) icons to html <img /> tag.

TS file: let emojiString="I ♥️ you";
HTML file: <span [innerHTML]="emojiString | emojiView"> </span>
