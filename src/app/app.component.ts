import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './core/services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lejour-dashboard';

  constructor(private invoiceService: InvoiceService) {

  }

  ngOnInit() {
    this.invoiceService.getInvoices({}).subscribe((invoice) => {
      const cat = invoice.map((x) => x.VENDOR_CATEGORY);
      console.log(cat.filter((x, i) => cat.indexOf(x) === i));
    });
  }
}
