class Book {
  private id: string;
  private title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  getId(): string {
    return this.id;
  }

  describe(): string {
    return `${this.title} [${this.id}]`;
  }
}

class Member {
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}

interface HasId {
  getId(): string;
}

class Catalog<T extends HasId> {
  private items = new Map<string, T>();

  add(item: T): boolean {
    if (this.items.has(item.getId())) return false;
    this.items.set(item.getId(), item);
    return true;
  }

  find(id: string): T | undefined {
    return this.items.get(id);
  }

  count(): number {
    return this.items.size;
  }

  all(): T[] {
    return Array.from(this.items.values());
  }
}

class Ratings<T extends HasId> {
  private itemsMap = new Map<string, T>();
  private scoresMap = new Map<string, number[]>();

  rate(item: T, stars: number): boolean {
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) return false;
    const id = item.getId();
    this.itemsMap.set(id, item);
    if (!this.scoresMap.has(id)) {
      this.scoresMap.set(id, []);
    }
    this.scoresMap.get(id)!.push(stars);
    return true;
  }

  average(id: string): number | undefined {
    const scores = this.scoresMap.get(id);
    if (!scores || scores.length === 0) return undefined;
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }

  best(): T | undefined {
    let bestItem: T | undefined = undefined;
    let highestAvg = -1;

    for (const [id, item] of this.itemsMap.entries()) {
      const avg = this.average(id);
      if (avg !== undefined && avg > highestAvg) {
        highestAvg = avg;
        bestItem = item;
      }
    }
    return bestItem;
  }
}

// Tests
const books = new Catalog<Book>();
console.log(books.add(new Book("B-001", "Things Fall Apart")));
console.log(books.add(new Book("B-002", "So Long a Letter")));
console.log(books.add(new Book("B-001", "Another Copy")));

const members = new Catalog<Member>();
members.add(new Member("M-01", "Awa"));

console.log(books.count(), members.count());

const found = books.find("B-002");
if (found) console.log(found.describe());

const awa = members.find("M-01");
if (awa) console.log(awa.getName());

console.log(books.find("B-999"));

// Ratings Tests (Part 6)
const ratings = new Ratings<Book>();
const novel = new Book("B-001", "Things Fall Apart");
const letter = new Book("B-002", "So Long a Letter");

console.log(ratings.rate(novel, 5), ratings.rate(novel, 4), ratings.rate(letter, 4), ratings.rate(letter, 6), ratings.rate(letter, 4.5));
console.log(ratings.average("B-001"), ratings.average("B-002"), ratings.average("B-999"));

const top = ratings.best();
if (top) console.log(top.describe());

console.log(new Ratings<Member>().best());