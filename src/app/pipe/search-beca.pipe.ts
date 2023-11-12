import { Pipe, PipeTransform } from '@angular/core';
import {Beca} from './../models/beca';

@Pipe({
  name: 'filterbeca'
})
export class SearchBecaPipe implements PipeTransform {
  transform(value : any[], filterString: string, title:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || title ===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[title].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }
}
