
export class Beans {
  public origin: string;
  public shop: string;
  public roast: string;
  public grain: string;
}

export class Style {
  public beansAmount: string;
  public steamTime: string;
  public extractionTime: string;
  public productAmount: string;
}

export class Evaluation {
  public rating: string;
  public bitterness: number;
  public acidity: number;
  public dencity: number;
  public feature: string;
}

export class Recipe {
  public userId: string;
  public name: string;
  public beans: Beans;
  public style: Style;
  public evaluation: Evaluation;
  public memo: string;

  constructor() {
    this.beans = new Beans();
    this.style = new Style();
    this.evaluation = new Evaluation();
  }
}
