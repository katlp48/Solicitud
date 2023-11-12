import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User} from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  chartBar: any;
  chartdoughnut: any;

  public user!: User;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,

  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    this.getProfiles();
    this.getUsers();
  }

  getProfiles() {
    this.profileService.getCountGrade().subscribe({
      next: (data) => {
        this.processProfileResponse(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  processProfileResponse(resp: any) {

    const nameProfile: String[] = [];
    const account: number[] = [];

    let listCProfile = resp;
    console.log('listCProfile:', listCProfile);

    listCProfile.forEach((element: String[]) => { 
      nameProfile.push(element[0]);
    
      account.push(Number(element[element.length-1]));
    });

    //nuestro gráfico de barras
    this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels: nameProfile,
        datasets: [
          {
            label: 'Grade',
            data: account,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],

            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 0, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
          },
        ],
      },
    });
  }
  getUsers() {
  this.userService.getUsersRole().subscribe({
    next: (data) => {
      this.processUserResponse(data);
    },
    error: (error) => {
      console.log(error);
    },
  });}
  processUserResponse(resp: any){

  const nameUser: String[] = [];
  const account: number[] = [];

  let listCUser = resp;
  console.log('listCUser:', listCUser);

  listCUser.forEach((element: String[]) => { 
    nameUser.push(element[0]);
  
    account.push(Number(element[element.length-1]));
  });

  //nuestro gráfico de doughnut
  this.chartdoughnut = new Chart('canvas-doughnut', {
    type: 'doughnut',
    data: {
      labels: nameUser,
      datasets: [
        {
          label: 'Usuarios por Role',
          data: account,
          borderColor: '#3cba8f',

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 0, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
        },
      ],
    },
  });
  }
}

