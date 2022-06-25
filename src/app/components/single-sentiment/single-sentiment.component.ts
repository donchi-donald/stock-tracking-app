import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsiderSentiment } from 'src/app/models/insider-sentiment';
import { SentimentService } from 'src/app/services/sentiment.service';

@Component({
  selector: 'app-single-sentiment',
  templateUrl: './single-sentiment.component.html',
  styleUrls: ['./single-sentiment.component.css']
})
export class SingleSentimentComponent implements OnInit {

  insiderSentiments : InsiderSentiment[] = []; 
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  descriptionAndSymbol !: string;

 

  constructor(private router: Router, private route: ActivatedRoute, private sentimentService: SentimentService) { }

  ngOnInit(): void {
    const symbol = this.route.snapshot.params['id'];
    this.getInsideSentiment(symbol);
    const i = this.sentimentService.getSentimentIdWithSymbol(symbol);
    this.descriptionAndSymbol = this.sentimentService.sentiments[i]?.description + '(' + symbol + ')';
    
  }

  backToListOfStocks(){
    this.router.navigateByUrl('');
  }

  getInsideSentiment(symbol: string){
    this.sentimentService.getInsiderSentiment(symbol).subscribe({
     
      next: (el) =>{
        el.data.forEach((element: { month: string | number; change: number; mspr: number; }) => {
          let insiderSentiment : InsiderSentiment = new InsiderSentiment();
          insiderSentiment.month = this.months[+element.month];
          insiderSentiment.change = element.change;
          insiderSentiment.MSPR = element.mspr;
          this.insiderSentiments.push(insiderSentiment);
          
        });
      
      },
      error: (error)=>{
        console.log(error.message);
      }
    });
  }

}
