import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProfessional } from 'src/app/models/Professional/GetProfessional';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfessionalService } from 'src/app/services/professionals/professional.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  crafstman: 'list' | 'profession' = 'list';
  allProfessions!: GetProfessional[];
  singleProfession: any;
  searchValue!: string;
  spiner: boolean = true;
  p: number = 1;

  constructor(private service: ProfessionalService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  get list() {
    return this.crafstman === 'list';
  }
  get profession() {
    return this.crafstman === 'profession';
  }
  getValue(event: any) {
    this.searchValue = event.value;
  }
  async getAll() {
    return await this.service.GetAllProfessionals().then(data => {
      this.allProfessions = data;
      this.spiner = false;
    });
  }
  openNav() {
    document.getElementById("myNav")!.style.width = "100%";
  }
  closeNav() {
    document.getElementById("myNav")!.style.width = "0%";
  }
  async professionsFilter(event: any) {

    const value = event.target.firstChild.data;

    if (value === 'All') {
      this.crafstman = 'list';
      this.ngOnInit();
    } else {
      const result = value.slice(0, -1).toLowerCase();

      await this.service.GetByProfession(result).then(data => {
        this.crafstman = 'profession';
        this.p = 1;
        this.singleProfession = data;
      })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
  canActivate(value: any) {

    if (this.authService.isAuthenticated()) {

      this.router.navigateByUrl(`/professionals/profile/${value}`);
      return true;
    }

    this.router.navigateByUrl('/register');

    return false;
  }
}