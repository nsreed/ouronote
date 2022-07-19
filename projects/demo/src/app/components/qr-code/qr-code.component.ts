import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import QRCode from 'qrcode';
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  private _text!: string;
  public get text(): string {
    return this._text;
  }
  @Input()
  public set text(value: string) {
    this._text = value;
    this.updateCode();
  }

  base64QR!: string;

  constructor() {}

  ngOnInit(): void {
    this.updateCode();
  }

  updateCode() {
    QRCode.toDataURL(
      this.text,
      {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark: '#000000FF',
          light: '#FFFFFFFF',
        },
        width: 500,
      } as any,
      (error: any, url: any) => {
        if (error) {
          throw error;
        }
        this.base64QR = url;
      }
    );
  }
}
