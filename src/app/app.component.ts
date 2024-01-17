import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { Team } from './model/team'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'kedyF1';
  teams: Team[] = [
    { name: "williams", date: 5, img: 'assets/williams_logo.png', revealDate: new Date('2024-02-05T12:00:00'), colorRight: "#001A53", colorFont: "#00A0DE", confirmed: true, countdown: "", link: "" },
    { name: "mercedes", date: 14, img: 'assets/mercedes_logo.png', revealDate: new Date('2024-02-14T12:00:00'), colorRight: "#00A19B", colorFont: "#00A19B", confirmed: true, countdown: "", link: ""  },
    { name: "haas", date: 0, img: 'assets/haas_logo.png', revealDate: new Date('2024-02-05T12:00:00'), colorRight: "#295294", colorFont: "#295294", confirmed: false, countdown: "", link: ""  },
    { name: "ferrari", date: 13, img: 'assets/ferrari_logo.png', revealDate: new Date('2024-02-13T12:00:00'), colorRight: "#FF2800", colorFont: "#FF2800", confirmed: true, countdown: "", link: ""  },
    { name: "alpine", date: 7, img: 'assets/alpine_logo.png', revealDate: new Date('2024-02-07T12:00:00'), colorRight: "#FD4BC7", colorFont: "#FD4BC7", confirmed: true, countdown: "", link: ""  },
    { name: "redbull", date: 15, img: 'assets/redbull_logo.png', revealDate: new Date('2024-02-15T12:00:00'), colorRight: "#003773", colorFont: "#003773", confirmed: true, countdown: "", link: ""  },
    { name: "mclaren", date: 14, img: 'assets/mclaren_logo.png', revealDate: new Date('2024-02-14T12:00:00'), colorRight: "#FF8000", colorFont: "#FF8000", confirmed: true, countdown: "", link: "https://f1online.sk/clanky/140066/mclaren-sokoval-a-predstavil-lakovanie-noveho-monopostu"  },
    { name: "astone", date: 12, img: 'assets/astone_logo.png', revealDate: new Date('2024-02-12T12:00:00'), colorRight: "#00352F", colorFont: "#00352F", confirmed: true, countdown: "", link: ""  },
    { name: "alpha", date: 0, img: 'assets/alpha_logo.png', revealDate: new Date('2024-02-05T12:00:00'), colorRight: "#F1F3F4", colorFont: "#F1F3F4", confirmed: false, countdown: "", link: ""  },
    { name: "sauber", date: 5, img: 'assets/sauber_logo.png', revealDate: new Date('2024-02-05T12:00:00'), colorRight: "#FFFFFF", colorFont: "#DE3126", confirmed: true, countdown: "", link: ""  },
  ];


// endDate: Date = new Date('2024-02-05T12:00:00'); // Zmeniť na váš cieľový dátum
  countdown: string = '';

  private intervalId: any;

  ngOnInit() {
    // Sort the array by the "date" property
    this.teams.sort((a, b) => a.date - b.date);
    
    // Start countdown
    this.startCountdown(this.teams);
  }

  ngOnDestroy() {
    this.stopCountdown();
  }

  private startCountdown(teams: Team[]) {
    teams.forEach(team => {
      team.countdown = this.updateCountdown(team.revealDate); // Volanie ihneď na začiatku

    this.intervalId = setInterval(() => {
      team.countdown = this.updateCountdown(team.revealDate);
    }, 1000);
    });
  }

  private stopCountdown() {
    clearInterval(this.intervalId);
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  private updateCountdown(date: Date) {
    const currentDate = new Date();
    const difference = differenceInSeconds(date, currentDate);

    if (difference > 0) {
      const days = this.padNumber(differenceInDays(date, currentDate));
      const hours = this.padNumber(differenceInHours(date, currentDate) % 24);
      const minutes = this.padNumber(differenceInMinutes(date, currentDate) % 60);
      const seconds = this.padNumber(difference % 60);

      this.countdown = `${days}:${hours}:${minutes}:${seconds}`;
    } else {
      this.countdown = 'Oznámené!';
      this.stopCountdown();
    }
    return this.countdown
  }

  public openUrlInNewTab(link: string) {
    window.open(link, '_blank');
  }
}
