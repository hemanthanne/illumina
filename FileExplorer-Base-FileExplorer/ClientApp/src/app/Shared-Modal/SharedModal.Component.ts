import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { SharedService } from "../../Services/shared.service";
import {NgbModal,NgbModalOptions, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "SharedModal",
  templateUrl: "./SharedModal.Component.html",
  // styleUrls: ["./SharedModal.Component.css"],
})
export class SharedModalComponent implements OnInit {
    public image = '';
    closeResult: string;
    modalOptions:NgbModalOptions;

    @Input() src = '';
    @Input() pdf = '';
    @Input() textDoc = '';
    @Input() isPDF = false;
    @Input() isImage = false;
    @Input() istextDoc = false;
    constructor(public activeModal: NgbActiveModal) { }
  
    ngOnInit() {
    }   
}
