
import { Injectable } from '@angular/core';
import { emojis } from './../model/emoji'
import * as i0 from "@angular/core";

const COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
const SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];
export const DEFAULT_BACKGROUNDFN = (set, sheetSize) => `https://unpkg.com/emoji-datasource-${set}@4.0.4/img/${set}/sheets-256/${sheetSize}.png`;

@Injectable({
    providedIn: 'root', 
}) 
export class EmojiService {
    uncompressed:any;
    names:any;
    emojis:any[];
    constructor() {
        this.uncompressed = false;
        this.names = {};
        this.emojis = [];
        if (!this.uncompressed) {
            this.uncompress(emojis);
            this.uncompressed = true;
        }
    }

    uncompress(list) {
        this.emojis = list.map(emoji => {
         
            const data = Object.assign({}, emoji);
            if (!data.shortNames) {
                data.shortNames = [];
            }
            data.shortNames.unshift(data.shortName);
            data.id = data.shortName;
            data.native = this.unifiedToNative(data.unified);
            if (!data.skinVariations) {
                data.skinVariations = [];
            }
            if (!data.keywords) {
                data.keywords = [];
            }
            if (!data.emoticons) {
                data.emoticons = [];
            }
            if (!data.hidden) {
                data.hidden = [];
            }
            if (!data.text) {
                data.text = '';
            }
            if (data.obsoletes) {
                // get keywords from emoji that it obsoletes since that is shared
                const f = list.find(x => x.unified === data.obsoletes);
                if (f) {
                    if (f.keywords) {
                        data.keywords = [...data.keywords, ...f.keywords, f.shortName];
                    }
                    else {
                        data.keywords = [...data.keywords, f.shortName];
                    }
                }
            }
            this.names[data.unified] = data;
            for (const n of data.shortNames) {
                this.names[n] = data;
            }
            return data;
        });
    }

    getData(emoji, skin, set) {

        let emojiData;
        if (typeof emoji === 'string') {
 
            const matches = emoji.match(COLONS_REGEX);
            if (matches) {
                emoji = matches[1];
                if (matches[2]) {
                    skin = ((parseInt(matches[2], 10)));
                }
            }
            if (this.names.hasOwnProperty(emoji)) {
                emojiData = this.names[emoji];
            }
            else {
                return null;
            }
        }
        else if (emoji.id) {
            emojiData = this.names[emoji.id];
        }
        else if (emoji.unified) {
            emojiData = this.names[emoji.unified.toUpperCase()];
        }
        if (!emojiData) {
            emojiData = emoji;
            emojiData.custom = true;
        }
        
        const hasSkinVariations = emojiData.skinVariations && emojiData.skinVariations.length;
        if (hasSkinVariations && skin && skin > 1 && set) {
            emojiData = Object.assign({}, emojiData);
            
            const skinKey = SKINS[skin - 1];
            
            const variationData = emojiData.skinVariations.find((n) => n.unified.includes(skinKey));
            if (!variationData.hidden || !variationData.hidden.includes(set)) {
                emojiData.skinTone = skin;
                emojiData = Object.assign({}, emojiData, variationData);
            }
            emojiData.native = this.unifiedToNative(emojiData.unified);
        }
        emojiData.set = set || '';
        return ( (emojiData));
    }

    unifiedToNative(unified) {
        
        const codePoints = unified.split('-').map(u => parseInt(`0x${u}`, 16));
        return String.fromCodePoint(...codePoints);
    }
    
    emojiSpriteStyles(sheet, set = 'apple', size = 24, sheetSize = 64, backgroundImageFn = DEFAULT_BACKGROUNDFN, sheetColumns = 52) {
        return {
            width: `${size}px`,
            height: `${size}px`,
            display: 'inline-block',
            'background-image': `url(${backgroundImageFn(set, sheetSize)})`,
            'background-size': `${100 * sheetColumns}%`,
            'background-position': this.getSpritePosition(sheet, sheetColumns),
        };
    }

    getSpritePosition(sheet, sheetColumns) {
        const [sheet_x, sheet_y] = sheet;
        
        const multiply = 100 / (sheetColumns - 1);
        return `${multiply * sheet_x}% ${multiply * sheet_y}%`;
    }

    sanitize(emoji) {
        if (emoji === null) {
            return null;
        }
        
        const id = emoji.id || emoji.shortNames[0];
        
        let colons = `:${id}:`;
        if (emoji.skinTone) {
            colons += `:skin-tone-${emoji.skinTone}:`;
        }
        emoji.colons = colons;
        return Object.assign({}, emoji);
    }

    getSanitizedData(emoji, skin, set) {
        return this.sanitize(this.getData(emoji, skin, set));
    }


    
}