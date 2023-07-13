export class Coke {
    public code: number;
    public name: string;
    public type: number;
    public image: string;
    public imageName: string;
  
    constructor(
      code: number,
      name: string,
      type: number,
      image: string,
      imageName: string
    ) {
      this.code = code;
      this.name = name;
      this.type = type;
      this.image = image;
      this.imageName = imageName;
    }
  }
  