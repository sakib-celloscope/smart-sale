import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss']
})
export class PreviewInvoiceComponent {
  @Input() purchaseDetails: any;
}
