# ngx-emoji-keyboard

ngx-emoji-keyboard is an library for emoji keyboard like https://web.whatsapp.com

![alt text](https://github.com/shakalya195/ngx-emoji-keyboard/blob/master/assets/images/ngx-emoji-keyboard-1.png?raw=true)

search in emoji

![alt text](https://github.com/shakalya195/ngx-emoji-keyboard/blob/master/assets/images/ngx-emoji-keyboard-2.png?raw=true)


##Component: app-emoji-keyboard
```
<app-emoji-keyboard (selectEmojiEvent)="selectEmojiFunction($event)"></app-emoji-keyboard>
```
Event:selectEmojiEvent

this event will be fired onClick on any emoji. the object is given below.

```
{
    name: 'Beating Heart',
    unified: '1F493',
    keywords: [
        'love',
        'like',
        'affection',
        'valentines',
        'pink',
        'heart'
    ],
    sheet: [24, 45],
    shortName: 'heartbeat'
}
```

##Pipe: emojiView

its also equipped with an angular pipe 'emojiView' to display emoji native (♥️) icons to html <img /> tag.

TS file: let emojiString="I ♥️ you";

HTML file: 
```
<span [innerHTML]="emojiString | emojiView"> </span>
```


