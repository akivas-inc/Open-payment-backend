import { Injectable } from '@nestjs/common';
import path from 'path';
const fs = require('fs')

@Injectable()
export class GeneralHelper {
    
    getSettingOf(key?: string): any {
        let data = fs.readFileSync('/src/settings.json', 'utf8')
        data = JSON.parse(data)
        return key ? data[key] : data
    }
    
}