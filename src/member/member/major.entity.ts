import { MajorInput } from './type/major-input.type';

export class Major {
  id!: number;
  name!: string;
  college!: string;

  constructor(data: MajorInput) {
    this.id = data.id;
    this.name = data.name;
    this.college = data.college;
  }
}
