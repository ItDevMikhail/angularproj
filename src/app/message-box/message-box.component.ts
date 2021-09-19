import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  // @Input() message: string[] = [];
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }
  

}
