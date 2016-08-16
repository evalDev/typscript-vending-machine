class TwentyPence {
  private value: number = .20;
  get Value() {
    return this.value;
  }
  getImageUrl (): string {
    return "img/twenty_pence.jpg";
  }
}
