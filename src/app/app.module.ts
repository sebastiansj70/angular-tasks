import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './components/task/task.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AppComponent,
        TaskComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule { }
