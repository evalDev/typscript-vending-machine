/// <reference path="./coin.ts"/>
class VendingMachine {
  private paid = 0;
  acceptCoin = (coin: TwentyPence): void => {
    this.paid += coin.Value;
    const element = document.getElementById("total");
    element.innerHTML = this.paid.toFixed(2);
  }
}
