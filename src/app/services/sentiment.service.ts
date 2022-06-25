import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sentiment } from '../models/sentiment';
import {HttpClient, HttpParams} from '@angular/common/http'
import { InsiderSentiment } from '../models/insider-sentiment';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  private token = 'bu4f8kn48v6uehqi3cqg';
  private currentStockUrl = 'https://finnhub.io/api/v1/quote';
  private insiderSentimentUrl = 'https://finnhub.io/api/v1/stock/insider-sentiment';
  private companyNameUrl = 'https://finnhub.io/api/v1/search';

  sentiments !: Sentiment[];


  constructor(private httpClient: HttpClient) {
    this.sentiments = this.loadTheLocalStorage();
   }

  getCurrentStock(symbol: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('symbol', symbol).append('token', this.token);
    return this.httpClient.get<any>(this.currentStockUrl, {params: queryParams});
  }

  getInsiderSentiment(symbol: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('symbol', symbol)
                             .append('token', this.token)
                             .append('from', '2022-04-01')
                             .append('to', '2022-06-01');

    return this.httpClient.get<any>(this.insiderSentimentUrl, {params: queryParams});
  }

  getCompanyName(symbol: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', symbol)
                             .append('token', this.token);

    return this.httpClient.get<any>(this.companyNameUrl, {params: queryParams});
  }

  addCurrentStock(sentiment: Sentiment){
    if(sentiment != null){
      this.sentiments.push(sentiment);
      localStorage.setItem('sentiments', JSON.stringify(this.sentiments))
    }
  }

  removeASentiment(sentiment: Sentiment){
    const i = this.sentiments.indexOf(sentiment, 0);
    if(i > -1){
      this.sentiments.splice(i, 1);
    }
    localStorage.setItem('sentiments', JSON.stringify (this.sentiments))
  }

  loadTheLocalStorage(): Sentiment[] {
    let sentimentInLocalStorage = localStorage.getItem('sentiments');
    let sentiments : Sentiment[] = [];
    if(sentimentInLocalStorage!= null){
      sentiments = JSON.parse(sentimentInLocalStorage);
    }
    return sentiments;
  }

  getSentimentIdWithSymbol(symbol: string): number{

    for (let i = 0; i<this.sentiments.length; i++){
      if(this.sentiments[i].symbol==symbol){
        return i;
      }
    }
    return -1;
  }




}
