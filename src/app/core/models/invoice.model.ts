export interface Invoice {
  ID: number;
  WEDDING_ID: number;
  VENDOR_ID: number;
  AMOUNT: number;
  VENDOR_AMOUNT: number;
  CREATED_AT: Date;
  ACCEPTED: boolean;
  VENDOR_CATEGORY: string;
}

