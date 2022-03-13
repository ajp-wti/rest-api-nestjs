import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {ApiServiceService} from "./services/api-service.service";
import {JwPaginationModule} from "jw-angular-pagination";
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    JwPaginationModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
