import { BenefitOptions } from "../enums/benefit-options.enum";

export type Benefit = {
  id: string;
  setter: string; // address
  data: {
    type: BenefitOptions;
    name: string;
    creationDate: string;
    initialDate: string;
    finishDate: string;
    content: string;
  };
};
