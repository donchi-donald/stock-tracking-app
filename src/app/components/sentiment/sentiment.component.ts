import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sentiment } from 'src/app/models/sentiment';
import { SentimentService } from 'src/app/services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  @Input() sentiment !: Sentiment;
  
  constructor(private sentimentService: SentimentService, private router: Router) { }

  ngOnInit(): void {
  }

  delete(sentiment: Sentiment){
    this.sentimentService.removeASentiment(sentiment);
  }

  goToSentimentDetails(sentiment: Sentiment){
    this.router.navigateByUrl(`sentiment/${sentiment.symbol}`);
  }

}
