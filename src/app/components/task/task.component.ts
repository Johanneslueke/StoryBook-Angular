import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Task} from './../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask : EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask : EventEmitter<Event>= new EventEmitter<Event>();

  constructor() { }

  onPin(id: any) {
    this.onPinTask.emit(id);
  }

  onArchive(id: any){
    this.onArchiveTask.emit(id);
  }

  ngOnInit(): void {
  }

}
