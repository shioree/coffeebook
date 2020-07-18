
const tastesExpressions: Array<string> = [
  '酸味が非常に強い',
  '酸味が強い',
  'バランスの取れた味わい',
  '苦味が強い',
  '苦味が非常に強い'
];

export class Beans {
  public origin: string;
  public shop: string;
  public roast: string;
  public grain: string;
}

export class Style {
  public beansAmount: string;
  public steamTime: string;
  public extractionTimeMinute: string;
  public extractionTimeSecond: string;
  public productAmount: string;
}

export class Evaluation {
  public rating: number;
  public taste: number;
  public density: number;
  public harshness: number;
  public comment: string;
}

export class Recipe {
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

export class SearchConditions {
  public rating = 0;
  public taste = 0;
  public shop = '';
}

export class FormModels {
  public readonly roasts: Array<string> = [
    'ライトロースト',
    'シナモンロースト',
    'ミディアムロースト',
    'ハイロースト',
    'シティロースト',
    'ハイシティロースト',
    'フレンチロースト',
    'イタリアンロースト'
  ];
  public readonly grains: Array<string> = [
    '極細挽き',
    '細挽き',
    '中細挽き',
    '中挽き',
    '粗挽き'
  ];
  public readonly ratings: Array<number> = [
    1,
    2,
    3,
    4,
    5
  ];
  public readonly tastes = tastesExpressions;
}

export class SearchModels {
  public readonly ratings: Array<string> = [
    '1より高い',
    '2より高い',
    '3より高い',
    '4より高い',
    '5より高い'
  ];
  public readonly tastes = tastesExpressions;
  public readonly shop: string = '';
}
