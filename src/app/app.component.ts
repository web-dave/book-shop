import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "./core/components/navigation/navigation.component";

@Component({
  selector: "ws-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, NavigationComponent],
})
export class AppComponent {
  title = "angular-ngxs-workshop";
}
