import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import { join } from 'path';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json'
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const assetsFolder = join(process.cwd(), 'src', 'assets', this.prefix);
    const filePath = join(assetsFolder, `${lang}${this.suffix}`);

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return of(JSON.parse(data));
    } catch (e) {
      console.warn(`Could not find translation file: ${filePath}`);
      return of({});
    }
  }
}
