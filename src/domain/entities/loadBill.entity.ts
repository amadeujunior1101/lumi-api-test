export class LoadBillEntity {
  id: string;
  load: boolean;

  constructor(input: { id: string; load: boolean }) {
    this.id = input.id;
    this.load = input.load;
  }
}
