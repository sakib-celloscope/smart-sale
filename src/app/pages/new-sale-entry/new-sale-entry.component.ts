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
      console.log(event.value, 'from parent');

      // Wait for the view to update before printing
      setTimeout(() => {
        this.printInvoice();
      }, 300);
    }
  }

  printInvoice(): void {
    const printContent = document.getElementById('invoice-print-section');
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  }
}
