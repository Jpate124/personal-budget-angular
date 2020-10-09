import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

public dataSource = {
  datasets: [
      {
          data: [],
          backgroundColor: [
              '#8E44AD',
              '#2C3E50',
              '#DAF7A6',
              '##FFC300',
              '#FF5733',
              '#C70039',
              '#900C3F',
              '#581845'
          ],
      }
  ],
  labels: []
};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
    });
  }
  createChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}


}
