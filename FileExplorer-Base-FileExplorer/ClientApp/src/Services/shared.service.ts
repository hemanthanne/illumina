import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private httpClient: HttpClient) {}

  public GetFiles(rootPath: string) {
    if (rootPath === "") {
      return this.httpClient.get("https://localhost:5001/api/File/GetFiles");
    }

    return this.httpClient.get(
      "https://localhost:5001/api/File/GetFiles?root=" + rootPath
    );
  }

  public GetImageFileContent(rootPath: string) {

    return this.httpClient.get("https://localhost:5001/api/File/GetBinaryFile?filename=" + rootPath);
  }

  public GetFileContent(rootPath: string, isImage:boolean) {

    if(isImage){
      return this.httpClient.get("https://localhost:5001/api/File/GetImageBinaryFile?filename=" + rootPath);
    }else{
      return this.httpClient.get("https://localhost:5001/api/File/GetBinaryFile?filename=" + rootPath, {  responseType: 'blob' }).pipe(
        map((result: any) => {
            return result;
        })
    );
    }

    
  }
}
