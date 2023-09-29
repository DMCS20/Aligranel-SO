import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  cards: any[]=[]
  enableAdd=false;
  editingCardId: string | null = null;

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

  constructor(private cardsService:CardsService, private toastr:ToastrService) { }

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
          this.toastr.error('Error al cargar los métodos de pago', 'Error');
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
          this.toastr.success('Método de pago agregado con éxito', 'Éxito');
          this.getCardsList();
          this.clearAllAddFields();
        },
        error: (error:any)=>{
          this.toastr.error('Error al agregar el método de pago', 'Error');
        }
      }
    )
  }

  deleteCard(cardId:any){
    this.cardsService.deleteCard(cardId).subscribe(
      {
        next: (data:any)=>{
          this.toastr.success('Método de pago eliminado con éxito', 'Éxito');
          this.getCardsList();
        },
        error: (error:any)=>{
          this.toastr.error('Error al eliminar el método de pago', 'Error');
        }
      }
    )
  }
  

    editCard(card:any) {
      this.editingCardId = card.id;
      this.newCard.number=card.number;
      this.newCard.cvv=card.cvv;
      this.newCard.expirationDate=card.expirationDate;
      this.newCard.name=card.name;
    }

    cancelEdit() {
      this.editingCardId = null;
      this.clearAllAddFields();
    }

    saveCardChanges(cardId: string) {
      let expDate = new Date(this.newCard.expirationDate + '/01');
      this.newCard.expirationDate = expDate.toISOString();
        this.cardsService.updateCard(this.newCard, cardId).subscribe({
          next: (data:any)=>{
            this.toastr.success('Método de pago actualizado con éxito', 'Éxito');
            this.getCardsList();
          },
          error: (error:any)=>{
            this.toastr.error('Error al actualizar el método de pago', 'Error');
          }
        });
      
      this.editingCardId = null;
      this.clearAllAddFields();
    }

}
