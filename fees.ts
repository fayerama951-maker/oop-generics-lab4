interface Borrowable {
  lateFee(daysLate: number): number;
  describe(): string;
}

abstract class LibraryItem implements Borrowable {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  protected abstract feePerDay(): number;

  lateFee(daysLate: number): number {
    return daysLate * this.feePerDay();
  }

  describe(): string {
    return this.title;
  }
}

class Book extends LibraryItem {
  protected override feePerDay(): number {
    return 100;
  }
}

class Dvd extends LibraryItem {
  protected override feePerDay(): number {
    return 250;
  }
}

class Laptop implements Borrowable {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  lateFee(daysLate: number): number {
    return 5000 + daysLate * 1000;
  }

  describe(): string {
    return `Laptop ${this.tag}`;
  }
}

function totalFees(items: readonly Borrowable[], daysLate: number): number {
  let total = 0;
  for (const item of items) {
    total += item.lateFee(daysLate);
  }
  return total;
}

function mostCostly<T extends Borrowable>(items: readonly T[], daysLate: number): T | undefined {
  if (items.length === 0) return undefined;
  let maxItem = items[0];
  let maxFee = maxItem.lateFee(daysLate);
  for (let i = 1; i < items.length; i++) {
    const fee = items[i].lateFee(daysLate);
    if (fee > maxFee) {
      maxFee = fee;
      maxItem = items[i];
    }
  }
  return maxItem;
}

const novel = new Book("Things Fall Apart");
const film = new Dvd("Atlantics");
const laptop = new Laptop("LT-07");

console.log(totalFees([novel, film, laptop], 3));
console.log(totalFees([], 3));

const worst = mostCostly([novel, film], 3);
if (worst) console.log(worst.describe());

const worstOverall = mostCostly([novel, laptop], 3);
if (worstOverall) console.log(worstOverall.lateFee(3));