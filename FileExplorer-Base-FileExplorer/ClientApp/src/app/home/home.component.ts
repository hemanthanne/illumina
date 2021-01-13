import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedService } from "../../Services/shared.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModalComponent } from '../Shared-Modal/SharedModal.Component';


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public isSystemClicked: boolean = false;
  public isFolderClicked: boolean = false;
  public isFileClicked: boolean = false;
  public rootFolders: any = [];
  public subFolders: any = [];
  public subsubFolders: any = [];
  public clickedFolders = [];
  public tempClickedFolders = [];
  public currentRoute = '';
  public tempSubFolders = [];
  public previousRouteData: any;

  constructor(private sharedService: SharedService, private modalService: NgbModal) {
  }


  ngOnInit() {
    this.sharedService.GetFiles("").subscribe(
      (res) => {
        this.rootFolders = [];
        let tempresult: any = [];
        tempresult = res;
        for (let index = 0; index < tempresult.length; index++) {
          const fileName = tempresult[index].split("\\")[
            tempresult[index].split("\\").length - 1
          ];
          const isFile = this.isFile(fileName);
          this.rootFolders.push({
            id: index,
            folderName: fileName,
            rootFilderPath: tempresult[index] + "\\",
            previousRoutePath: tempresult[index].split("\\").slice(0, tempresult[index].split("\\").length - 1).join("\\"),
            isOpened: false,
            isFile: isFile,
            isPreviewEnabled: false
          });
        }

        console.log("testttt", this.rootFolders);
      },
      (error) => {
        this.rootFolders = [];
      }
    );
  }

  onSystemClick(Id): void {
    this.isSystemClicked = true;
  }

  public LoadFileTypes(res, file: string) {
    if (file.toLowerCase().includes(".pdf")) {
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else if (file.toLowerCase().includes(".txt")) {
      let file = new Blob([res], { type: 'application/json' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else if (file.toLowerCase().includes(".doc")) {
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }
  }

  onFolderClick(params: any, level: string) {
    if (params.rootFilderPath.includes(".jpeg") || params.rootFilderPath.includes(".png") || params.rootFilderPath.includes(".jpg") || params.rootFilderPath.includes(".pdf") || params.rootFilderPath.includes(".doc") || params.rootFilderPath.includes(".txt")) {
      switch (level) {
        case 'root':
          this.rootFolders.map(data => {
            if (data.isFile && data.folderName === params.folderName) {
              data.isPreviewEnabled = !data.isPreviewEnabled;
            } else {
              data.isPreviewEnabled = false;
            }
          });
          break;
        case 'sub':
          this.subFolders.map(data => {
            if (data.isFile && data.folderName === params.folderName) {
              data.isPreviewEnabled = !data.isPreviewEnabled;
            } else {
              data.isPreviewEnabled = false;
            }
          });
          break;
        case 'subtosub':
          this.subsubFolders.map(data => {
            if (data.isFile && data.folderName === params.folderName) {
              data.isPreviewEnabled = !data.isPreviewEnabled;
            } else {
              data.isPreviewEnabled = false;
            }
          });
          break;
      }
    } else {
      this.GetSubFolders(params, level);
    }
  }


  GetSubFolders(params: any, level: string, isBack: boolean = false) {
    this.sharedService.GetFiles(params.rootFilderPath).subscribe(
      (res) => {
        let temp: any = [];
        temp = res;
        this.clickedFolders = params.rootFilderPath.split("\\").filter(x => x != "");
        this.clickedFolders[0] = this.clickedFolders[0] + "\\";
        this.currentRoute = params.rootFilderPath.split(":")[1];
        const tempResult = [];
        for (let index = 0; index < temp.length; index++) {
          const fileName = temp[index].split("\\")[
            temp[index].split("\\").length - 1
          ];

          const isFile = this.isFile(fileName);
          tempResult.push({
            id: index,
            folderName: fileName,
            rootFilderPath: temp[index] + "\\",
            previousRoutePath: temp[index].split("\\").slice(0, temp[index].split("\\").length - 1).join("\\"),
            isFile: isFile,
            isOpened: false,
            isPreviewEnabled: false
          });
        }

        if (level === 'root') {
          this.subFolders = [];
          this.subsubFolders = [];
          this.subFolders = temp.length > 0 ? tempResult : [];
        } else if (level === 'sub') {

          this.subsubFolders = [];
          this.subsubFolders = temp.length > 0 ? tempResult : [];
        } else if (level === 'subtosub') {

          if (this.subsubFolders.length > 0) {
            this.rootFolders = [];
            this.rootFolders = this.subFolders;
            this.subFolders = [];
            this.subFolders = this.subsubFolders;
            this.subsubFolders = [];
            this.subsubFolders = temp.length > 0 ? tempResult : [];
          }
        }

        this.OpenFolder(params, level);
        this.isFolderClicked = true;
      },
      (error) => {
        this.tempSubFolders = [];
      }
    );

  }


  private OpenFolder(params, level) {


    if (this.clickedFolders.length > 2) {
      this.rootFolders.map(value => {
        if (value.folderName == this.clickedFolders[this.clickedFolders.length - 1] || value.folderName == this.clickedFolders[this.clickedFolders.length - 2]) {
          value.isOpened = true;
        }else{
          value.isOpened = false;
        }
      });

      this.subFolders.map(value => {
        if (value.folderName == this.clickedFolders[this.clickedFolders.length - 1] || value.folderName == this.clickedFolders[this.clickedFolders.length - 2]) {
          value.isOpened = true;
        }else{
          value.isOpened = false;
        }
      });
    } else {

      this.rootFolders.map(data => {
        if (data.folderName == params.folderName) {
          data.isOpened = true;
        } else {
          data.isOpened = false;
        }
      });
    }
  }

  public async navigateToPrevious() {
    const temp = this.clickedFolders.length;
    this.clickedFolders.pop()
    const subtosubFolders = this.clickedFolders.join("\\");
    this.clickedFolders.pop()
    const subFolders = this.clickedFolders.join("\\");
    this.clickedFolders.pop()
    const rootFolders = this.clickedFolders.join("\\");
    if (temp > 3) {
      await this.loadRootFiles(rootFolders, 'root');
      await this.loadRootFiles(subFolders, 'sub');
      await this.loadRootFiles(subtosubFolders, 'subtosub');
    }
  }




  public loadRootFiles(params, level) {
    this.sharedService.GetFiles(params).subscribe(res => {
      let temp: any = [];
      let tempResult = [];
      temp = res;
      for (let index = 0; index < temp.length; index++) {
        const fileName = temp[index].split("\\")[
          temp[index].split("\\").length - 1
        ];
        const isFile = this.isFile(fileName);
        tempResult.push({
          id: index,
          folderName: fileName,
          rootFilderPath: temp[index] + "\\",
          previousRoutePath: temp[index].split("\\").slice(0, temp[index].split("\\").length - 1).join("\\"),
          isFile: isFile,
          isOpened: false,
          isPreviewEnabled: false
        });
      }


      switch (level) {
        case 'root': this.rootFolders = []; this.rootFolders = tempResult; break;
        case 'sub': this.subFolders = []; this.subFolders = tempResult; break;
        case 'subtosub':
          this.clickedFolders = params.split("\\").filter(x => x != "");
          this.clickedFolders[0] = this.clickedFolders[0] + "\\";
          this.currentRoute = this.clickedFolders.join("\\").split(":")[1];

          console.log(this.clickedFolders);
          this.rootFolders.map(value => {
            if (value.folderName == this.clickedFolders[this.clickedFolders.length - 1] || value.folderName == this.clickedFolders[this.clickedFolders.length - 2]) {
              value.isOpened = true;
            }
          });

          this.subFolders.map(value => {
            if (value.folderName == this.clickedFolders[this.clickedFolders.length - 1] || value.folderName == this.clickedFolders[this.clickedFolders.length - 2]) {
              value.isOpened = true;

            }
          });
          this.subsubFolders = []; this.subsubFolders = tempResult;
          break;
      }
    });

  }


  public openPreview(params) {
    if (params.rootFilderPath.toLowerCase().includes(".jpeg") || params.rootFilderPath.toLowerCase().includes(".png") || params.rootFilderPath.toLowerCase().includes(".jpg")) {
      this.sharedService.GetFileContent(params.rootFilderPath, true).subscribe(res => {
        let modalRef = this.modalService.open(SharedModalComponent);
        modalRef.componentInstance.isPDF = false;
        modalRef.componentInstance.isImage = true;
        modalRef.componentInstance.istextDoc = false;
        modalRef.componentInstance.src = 'data:image/jpeg;base64,' + res;
      });
    } else if (params.rootFilderPath.toLowerCase().includes(".pdf") || params.rootFilderPath.toLowerCase().includes(".doc") || params.rootFilderPath.toLowerCase().includes(".txt")) {
      this.sharedService.GetFileContent(params.rootFilderPath, false).subscribe(res => {
        this.LoadFileTypes(res, params.rootFilderPath);
      })
    }
  }

  private isFile(path: string) {
    return (path.toLowerCase().includes(".rar") || path.toLowerCase().includes(".doc") || path.toLowerCase().includes(".pdf") || path.toLowerCase().includes(".exe") || path.toLowerCase().includes(".txt") || path.toLowerCase().includes(".zip") || path.toLowerCase().includes(".rar") || path.toLowerCase().includes(".jpeg") || path.toLowerCase().includes(".jpg") || path.toLowerCase().includes(".png"))
  }
}
