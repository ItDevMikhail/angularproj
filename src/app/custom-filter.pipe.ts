import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFavorite'
})
export class FilterPipe implements PipeTransform {
    transform(books: any, filter?: any): any {
        for (let i = 0; i < filter.length; i++) {
            const a = books.filter((book: any) => book.name = filter[i].name)
            if (a) {
                return filter
            } else {
                return false
            }
        }
        return false
    }
}