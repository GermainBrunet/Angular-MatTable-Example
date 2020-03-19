import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceComponent } from './component/service.component';
import { SampleService } from './service/sample.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SampleDataSource } from './datasource/service.datasource';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    // SampleDataSource
  ],
  providers: [SampleService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
