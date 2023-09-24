import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  cards: any[]=[]
  enableAdd=false;

  newCard={
    number:'',
    cvv:'',
    expirationDate:'',
    name:'',
    walletIdWallet:1  
  }

  clearAllAddFields():void{
    this.newCard.number='';
    this.newCard.cvv='';
    this.newCard.expirationDate='';
    this.newCard.name='';
  }

  constructor(private cardsService:CardsService) { }

  ngOnInit(): void {
    this.getCardsList();
  }

  getCardsList(){
    this.cardsService.getCardsList().subscribe(
      {
        next: (data:any)=>{
          this.cards=data;
        },
        error: (error:any)=>{
          console.error('Error fetching cards', error);
        }
      }
    )
  }

  postCard(){
    let expDate = new Date(this.newCard.expirationDate + '/01');
    this.newCard.expirationDate = expDate.toISOString();
    
    this.cardsService.addCard(this.newCard).subscribe(
      {
        next: (data:any)=>{
          this.getCardsList();
          this.clearAllAddFields();
        },
        error: (error:any)=>{
          console.error('Error posting card', error);
        }
      }
    )
  }

  deleteCard(cardId:any){
    this.cardsService.deleteCard(cardId).subscribe(
      {
        next: (data:any)=>{
          this.getCardsList();
        },
        error: (error:any)=>{
          console.error('Error deleting card', error);
        }
      }
    )
  }
}
