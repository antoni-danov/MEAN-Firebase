import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instantSearch'
})
export class InstantSearchPipe implements PipeTransform {

  transform(allProfessions: any, searchValue: string) {
    if (!allProfessions || !searchValue) {
      return allProfessions;
    }
    const searchValueToLower = searchValue.toLocaleLowerCase();
    return allProfessions.filter(
      (search: any) =>
        search.firstname.toLocaleLowerCase().includes(searchValueToLower) ||
        search.lastname.toLocaleLowerCase().includes(searchValueToLower) ||
        search.profession.toLocaleLowerCase().includes(searchValueToLower) ||
        search.address.city.toLocaleLowerCase().includes(searchValueToLower)
    );
  }
}
