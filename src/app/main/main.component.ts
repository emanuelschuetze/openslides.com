import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    public references = [
        { img: "assets/img/references/gruene-logo.png",  name: "Bündnis 90/Die Grünen" },
        { img: "assets/img/references/spd-logo.png",  name: "SPD" },
        { img: "assets/img/references/linke-logo.png",  name: "Die LINKE" },
        { img: "assets/img/references/piraten-logo.png",  name: "PiratenPartei" },
        { img: "assets/img/references/gruene-jugend-logo.png",  name: "Grüne Jugend" },
        { img: "assets/img/references/jusos-logo.png",  name: "JUSOS" },
        { img: "assets/img/references/linksjugend-logo.png",  name: "linksjugend" },
        { img: "assets/img/references/pog-logo.png",  name: "Piraten ohne Grenzen" }
    ];
}