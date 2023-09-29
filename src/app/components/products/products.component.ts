import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { MatSort } from '@angular/material/sort';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'price','weight','image','modify'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild (MatPaginator, {static: true})
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  enableEdit = false;
  enableEditIndex = null;
  enableAdd = false;

  isLoading=false;

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    weight: 0,
    image: '',
    modify: ''
  };

  clearAllAddFields():void{
    this.product.id = 0;
    this.product.name = '';
    this.product.description = '';
    this.product.price = 0;
    this.product.weight = 0;
    this.product.image = '';
  }

  constructor(private productsService: ProductsService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getProductsList();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProductsList(){
    this.isLoading=true;
    this.productsService.getProductsList().subscribe(
      {
        next: (res: any) =>{
          this.dataSource.data = res.map((item: any) =>
          ({
            id: item.idProduct,
            name: item.name,
            description: item.description,
            price: item.price,
            weight: item.weight,
            image: item.imgUrl
          }) as Product);
        },

        error: (err: any) =>{
          this.toastr.error('Error al cargar los productos', 'Error');
        }
      }
    );
    this.isLoading=false;  
  }

  deleteProduct(id: number){
    this.productsService.deleteProduct(id).subscribe(
      {
        next: (res: any) =>{
          this.toastr.success('Producto eliminado con éxito', 'Éxito');
          this.getProductsList();
        },

        error: (err: any) =>{
          this.toastr.error('Error al eliminar el producto', 'Error');
        }
      }
    );
  }

  enableEditMethod(event:any, i:any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }

  updateProduct(i:any) {
    let productVM={
      idProduct: this.dataSource.data[i].id,
      name: this.dataSource.data[i].name,
      description: this.dataSource.data[i].description,
      price: this.dataSource.data[i].price,
      weight: this.dataSource.data[i].weight,
      imgUrl: this.dataSource.data[i].image
    };

    this.productsService.updateProduct(productVM).subscribe(
      {
        next: (res: any) => {
          this.toastr.success('Producto actualizado con éxito', 'Éxito');
  
          this.getProductsList();
        },
        error: (err: any) => {
          this.toastr.error('Error al actualizar el producto', 'Error');
        }
      }
    );

    this.enableEdit = false;
  }

  addProduct(){
    let productVM={
      idProduct: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      weight: this.product.weight,
      imgUrl: this.product.image
    };

    this.productsService.addProduct(productVM).subscribe(
      {
        next: (res: any) => {
          this.toastr.success('Producto agregado con éxito', 'Éxito');
  
          this.getProductsList();
        },
        error: (err: any) => {
          this.toastr.error('Error al agregar el producto', 'Error');
        }
      }
    );
  }

}
