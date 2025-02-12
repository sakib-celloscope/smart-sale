import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateInvoiceComponent } from 'src/app/components/generate-invoice/generate-invoice.component';
import { PreviewInvoiceComponent } from 'src/app/components/preview-invoice/preview-invoice.component';

@Component({
  selector: 'app-new-sale-entry',
  standalone: true,
  imports: [CommonModule, GenerateInvoiceComponent, PreviewInvoiceComponent],
  templateUrl: './new-sale-entry.component.html',
  styleUrls: ['./new-sale-entry.component.scss'],
})
export class NewSaleEntryComponent {
  purchaseDetails: any;

  handlePurchaseFormAction(event: any): void {
    if (event.action === 'purchase') {
      this.purchaseDetails = event.value;

      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }
}
