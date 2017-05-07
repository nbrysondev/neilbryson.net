import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'encodetext'
})
export class EncodetextPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}