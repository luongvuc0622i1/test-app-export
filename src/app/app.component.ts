import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { ExportService } from './service/export.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private file:any;
  private fileName:string = '';
  private filePath:string = '';
  private reportName:string = '';

  constructor(private fireStorage: AngularFireStorage, private exportService: ExportService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name.substr(0, this.file.name.lastIndexOf('.'));
    }
  }

  async onExport() {
    const path = `yt/${this.file.name}`;
    const uploadTask = await this.fireStorage.upload(path, this.file);
    const url = await uploadTask.ref.getDownloadURL();
    console.log(url);
    this.filePath = url;
    this.exportService.generateReport({
      "fileName": this.fileName,
      "filePath": this.filePath,
      "reportId": 1
    }).subscribe(
      (response: any) => {
        this.reportName = response.msg;
      }, 
      (error: any) => {
          console.log(error)
      }
    );
  }
}
