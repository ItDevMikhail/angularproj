import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFavorite'
})
export class FilterPipe implements PipeTransform {
    transform(books: any, filter?: any): any {
        let newArray = [];
        for (let i = 0; i < books.length; i++) {
            for (let j = 0; j < filter.length; j++) {
                if (books[i].name == filter[j].name) {
                    newArray[j] = filter[j]
                }
            }
        }
        return newArray
    }
}