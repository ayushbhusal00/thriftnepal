declare module "rn-all-nepal-payment" {
  import { ComponentType } from "react";

  interface EsewaSdkProps {
    amt: number;
    taxAmt: number;
    totalAmt: number;
    env: string;
    testMode: boolean;
    isVisible: boolean;
    onPaymentComplete: (response: any) => void;
    pid: string;
    failureURL: string;
    successURL: string;
    psc: number;
    pdc: number;
  }

  export const EsewaSdk: ComponentType<EsewaSdkProps>;
}
