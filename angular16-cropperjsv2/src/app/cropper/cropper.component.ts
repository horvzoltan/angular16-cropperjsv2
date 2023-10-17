import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import CropperImage from '@cropper/element-image';
import { CropperSelection } from 'cropperjs';
import {
  Observable,
  Subject,
  Subscriber,
  from,
  mergeMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent implements OnInit, OnDestroy {
  @Input() public imageType!: string;
  @ViewChild('image', { static: true }) public imageElement!: ElementRef;
  @ViewChild('selection', { static: true })
  public selectionElement!: ElementRef;

  public cropperImage!: CropperImage;
  public cropperSelection!: CropperSelection;
  private _selectedImage!: Blob;
  private unsubscribe$: Subject<void> = new Subject();

  @Input() public get selectedImage(): Blob {
    return this._selectedImage;
  }
  public set selectedImage(value: Blob) {
    if (!value) {
      return;
    }
    const blobUrl: string = URL.createObjectURL(value);
    this.imageElement.nativeElement.src = blobUrl;
    this._selectedImage = value;
  }

  public ngOnInit(): void {
    this.cropperImage = this.imageElement.nativeElement as CropperImage;
    this.cropperSelection = this.selectionElement
      .nativeElement as CropperSelection;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
