import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { emojis,categories, svgs, CompressedEmojiData } from '../model/emoji';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmojiService } from '../services/emoji.service';

@Component({
  selector: 'app-emoji-keyboard',
  templateUrl: './emoji-keyboard.component.html',
  styleUrls: ['./emoji-keyboard.component.css']
})
export class EmojiKeyboardComponent implements OnInit {

  @Input() tab:any='EMOJI';
  // @Output() selectEvent = new EventEmitter();
  @Output() selectEmojiEvent = new EventEmitter();
  @Output() selectGifEvent = new EventEmitter();
  @Output() selectStickerEvent = new EventEmitter();

  emojiCategories:any;
  emojiSvgs:any;
  selectedCategory:any;
  search:any="";
  imageList:any;
  constructor(
    private emojiService:EmojiService,
    private http:HttpClient,
    public element: ElementRef
  ) { }

  ngOnInit() {
    this.emojiCategories = categories;
    this.emojiSvgs = svgs;
    this.selectedCategory = this.emojiCategories[0];
  }

  selectCategory(item){
    this.search='';
    this.selectedCategory = item;
  }

  unifiedToNative(item){
    return this.emojiService.unifiedToNative(item);
  }


  getEmojiClicked(unified){
    // making recent emojis
    let recentIndex = this.emojiCategories[0].emojis.indexOf(unified);
    if(recentIndex >= 0){
      this.emojiCategories[0].emojis.splice(recentIndex,1);
    }
    this.emojiCategories[0].emojis.unshift(unified);

    // creating emojidata
    let data:any = this.findEmojiData(unified);
    let native = this.unifiedToNative(unified);
    data.native = native;
    this.selectEmojiEvent.emit(data);
  }

  findEmojiData(hexCode: string): any {
    for (const emojiData of emojis) {
        if (emojiData.unified === hexCode) {
            return emojiData;
        }

        if (emojiData.skinVariations) {
            for (const skinVariation of emojiData.skinVariations) {
                  if (skinVariation.unified === hexCode) {
                      const skinData = Object.assign({}, emojiData);
                      skinData.sheet = skinVariation.sheet;
                      return skinData;
                  }
              }
          }
      }

      return null;
  }


  searchEmoji(){
    if(this.search.length > 0){
      let searchCategory:any={};
      searchCategory.emojis = emojis.filter(item=>{
        if(item.keywords){
          let keywordString = item.keywords.join(" ");
          if(keywordString.indexOf(this.search) >= 0 || item.shortName.indexOf(this.search) >= 0){
            return item;
          }
        }
      }).map(item=>{
        return item.unified;
      });
      this.selectedCategory = searchCategory;
    }else{
      this.selectedCategory = this.emojiCategories[0];
    }
  }

  selectImageUrl(item){
    console.log(item.fixed_height.url)
    this.selectGifEvent.emit(item.fixed_height.url);
  }

}
