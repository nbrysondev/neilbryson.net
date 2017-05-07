import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'values'})
/**
* Pipe for iterating over object properties
*
* @class ValuesPipe
* @constructor
*/
export class ValuesPipe implements PipeTransform {
    /**
    * Transforms object into iterable array of objects
    *
    * @method transform
    * @protected
    * @param {any}  value
    * @param {any}  args
    * @return {Object[]}
    */
    public transform(value: any, args?: any[]): Object[] {

        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        keyArr.forEach( (key: any) => {
            dataArr.push(value[key]);
        });

        return dataArr;
    }
}