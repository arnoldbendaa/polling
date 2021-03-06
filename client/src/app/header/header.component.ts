import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    menuOpen:boolean;
    login = localStorage.getItem('is_login')=='1';
  protected userName;
    constructor(
      private translate: TranslateService,
      public router: Router,
      public authService:AuthService
    ) {
        this.menuOpen = false;
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
      if(localStorage.getItem("language")===null){

        }
        else {
          this.changeLang(localStorage.getItem("language"));
        }



    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
        localStorage.setItem("language",language);

    }
    toggle(){
        console.log("toggle");
        this.menuOpen = !this.menuOpen;
        let menu = document.getElementById("sidebar-right");
        let menuButton = document.getElementById("burger-buttonv2");
        if(this.menuOpen){
            menu.className +=" opened";
            menuButton.className +=" moved";
        }
        else {
            menu.className = menu.className.replace(" opened","");
            menuButton.className = menuButton.className.replace(" moved","");
        }


    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/dashboard']);
    }
  ngDoCheck(){
      // console.log("header");
    this.login = localStorage.getItem('is_login')=='1';
    // this.userName = localStorage.getItem("username");
    if(localStorage.user!=null&&localStorage.user!=undefined&&localStorage.user!="")
      this.userName = JSON.parse(localStorage.user).userName;
  }
}
