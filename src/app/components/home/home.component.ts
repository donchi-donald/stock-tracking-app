import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sentiment } from 'src/app/models/sentiment';
import { SentimentService } from 'src/app/services/sentiment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //for the formular
  trackStockFormGroup = new FormGroup({ symbolInput: new FormControl()});
  //list of sentiments
  sentiments : Sentiment[] = [];

  constructor(private sentimentService: SentimentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.sentiments = this.sentimentService.sentiments;
   this.trackStockForm();
  }

  get symbolInput() {return this.trackStockFormGroup.get('symbolInput')}
 

  getSentiment(symbol: string){
    let sentiment : Sentiment = {symbol:"TSLA", description:"Tesla Inc", changeToday:0, currentPrice:0, highPrice:0, openingPrice: 0};
    this.sentimentService.getCurrentStock(symbol).subscribe({
      next: (data) =>{
        sentiment.changeToday = data.d,
        sentiment.highPrice = data.h,
        sentiment.openingPrice = data.o,
        sentiment.currentPrice = data.c,
        this.getCompanyName(sentiment, symbol);
        this.sentimentService.addCurrentStock(sentiment);
      },
      error: (error)=>{
        console.log(error.message);
      }
    });
  }

  getCompanyName(sentiment: Sentiment, symbol: string){
    this.sentimentService.getCompanyName(symbol).subscribe({
      next: (data) =>{
        sentiment.description = data.result[0].description,
        sentiment.symbol = data.result[0].symbol
      },
      error: (error)=>{
        console.log(error.message);
      }
    });
  }

  trackStockForm(){
    this.trackStockFormGroup = this.formBuilder.group({
      symbolInput: new FormControl('', [Validators.required,  Validators.pattern('[a-zA-Z]{1,5}')])
    });
  }

  onSubmit(){
    if(this.trackStockFormGroup.invalid){
      this.trackStockFormGroup.markAllAsTouched();
      return;
    }
    let symbolInput = this.trackStockFormGroup.controls['symbolInput'].value;
    this.getSentiment(symbolInput);
    this.trackStockFormGroup.reset;
  }
  


}
