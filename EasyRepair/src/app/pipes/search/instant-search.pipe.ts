import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instantSearch'
})
export class InstantSearchPipe implements PipeTransform {

  transform(allProfessions: any, searchValue: string) {
    if (!allProfessions || !searchValue) {
      return allProfessions;
    }
    const searchValueToLOwer = searchValue.toLocaleLowerCase();
    return allProfessions.filter(
      (search: any) =>
        search.firstname.toLocaleLowerCase().includes(searchValueToLOwer) ||
        search.lastname.toLocaleLowerCase().includes(searchValueToLOwer) ||
        search.profession.toLocaleLowerCase().includes(searchValueToLOwer) ||
        search.address.city.toLocaleLowerCase().includes(searchValueToLOwer)
    );
  }
}
