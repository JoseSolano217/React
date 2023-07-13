export class Camisa {
  public codCamisa: number;
  public marcaCamisa: string;
  public tallaCamisa: string;
  public colorCamisa: string;
  public nombreImagencamisa: string;
  public base64ImagenCamisa: string;

  constructor(
    cod: number,
    mar: string,
    tal: string,
    col: string,
    nomi: string,
    bas: string
  ) {
    this.codCamisa = cod;
    this.marcaCamisa = mar;
    this.tallaCamisa = tal;
    this.colorCamisa = col;
    this.nombreImagencamisa = nomi;
    this.base64ImagenCamisa = bas;
  }
}
