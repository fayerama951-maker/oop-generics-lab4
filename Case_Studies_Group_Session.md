
# Object-Oriented Programming — DAUST Fall 2026

# Group Session — Case Studies in Object-Oriented Design

Until now, every example in this course was the university system: `Student`, `Course`, `GraduateStudent`. Today you show that the ideas **transfer**. In groups, you design a small object-oriented system for a **new domain**, then defend your design in front of the class.

How the session works:

1. Groups of **3 students**. Each group receives **one of four cases**; 
2. You work **in code** (TypeScript, `node file.ts`), then **present** your design to the class. The grade is on your **reasoning**, not only on whether the code runs.
3. Every case uses what Lectures 1–5 covered: **encapsulation and invariants**, **inheritance and overriding**, **is-a vs has-a**, **polymorphism**, **abstract classes and interfaces**.
4. Every case hides **one design trap**. Finding it, and explaining how your design avoids it, is part of assessment.
5. At **minute 65**, the instructor gives your group a **new requirement** (a "twist"). A good design absorbs it by *adding* code, not by editing `if` chains in many places — the Open/Closed principle (Lecture 5).

| Case | Domain | Main ideas exercised |
|---|---|---|
| **1** | Shapes in a drawing app | Abstract class vs interface, polymorphism, substitution |
| **2** | Mobile money wallet | Encapsulation, invariants, polymorphism |
| **3** | Dakar transport tickets | Polymorphism instead of type checks, immutability |
| **4** | Restaurant orders | Composition (has-a), states, polymorphism |

---

## Working Together

Groups of 3, one laptop, no fixed roles — but these three habits are required:

* **Rotate the keyboard** at every step (Step 2, 3, 4, 5): the person typing changes, the other two read and guide.
* **Everyone attacks.** Before saying "it works", each member tries one way to break a rule from **outside** the classes (`circle.radius = -1`, `wallet.balance = 999999`, …). A design is only as good as the attacks it survives.
* **Everyone presents.** In the demo, each member explains one part (see *Demos* below).

---

## The Five Deliverables

Every group produces the same five things, whatever the case.

| # | Deliverable | What it must show |
|---|---|---|
| **D1** | **Class diagram** | Every class and interface, with fields (`-` private, `+` public, `#` protected), methods, and arrows: `extends`, `implements`, has-a |
| **D2** | **One rule (invariant), enforced** | A rule of your case, the class that owns it, and the code that makes it impossible to break from outside |
| **D3** | **One polymorphic call** | A loop or function that works on a list of mixed objects with **no** `if` on the type and **no** `instanceof` |
| **D4** | **One justified decision** | "We chose *inheritance / composition / an interface / an abstract class* here because…" — using the three tests |
| **D5** | **The twist** | After the new requirement: which classes you **added**, which existing classes you had to **change**, and why |

**Code requirements:**

* The usage example of your case must **run** (`node file.ts`) and print the **expected output**.
* Show at least one **refused attack** during the demo.
* Write fields and constructors out in full — `node` refuses the `constructor(private x: number)` shortcut (Lecture 3, §44).
* The class diagram (D1) can be a quick sketch on a sheet or the board — you will show it during the demo.

**How to refuse something** — the two ways you have seen in the lectures:

| Where | How | Example |
|---|---|---|
| In a **constructor** (the object must not be created) | `throw new Error("…")` | `if (radius <= 0) throw new Error("Radius must be positive");` |
| In a **method** (the action is refused, the object stays as it was) | `return false` (and `true` on success) | `if (amount <= 0) return false;` |

> A `throw` stops the whole program. To test a refused constructor, write the line, run, check the error message, then **comment the line out** and test the next one.

---

## Step by Step — All Groups

Tick each box as you go. The times are the end of each step.

**Step 1 — Get organised**

- [ ] Write the three names on the deliverables sheet (last page); open a folder and a file for your case in VS Code
- [ ] Read your case card **twice**: once alone, once aloud in the group

**Step 2 — Analyse, on a sheet**

- [ ] Underline every **noun** in the requirements — each one is a candidate class or field
- [ ] Circle every **verb** — each one is a candidate method
- [ ] Write the list of **rules**, numbered `R1`, `R2`, … ("a radius is strictly positive", "the balance is never negative", …)
- [ ] Next to each rule, write the **class that owns it** (Lecture 2: *who should enforce this rule?*)

**Step 3 — Design, on a sheet**

- [ ] Draw the class diagram (D1)
- [ ] For each `extends` arrow, write the three tests next to it: **is-a?** **substitution?** **stability?** If one answer is *no*, change it to composition or an interface
- [ ] Answer the **questions** at the end of your case card — they lead to the trap
- [ ] List three attacks you will try ("set the balance directly", "create a circle of radius −1", …)

**Step 4 — Build**

- [ ] Start from the **starter code** of your case and replace every `TODO`
- [ ] Run the **usage example** of your case and compare with the **expected output**
- [ ] Try the three attacks; write down which ones are refused (D2)

**Step 5 — The twist**

- [ ] Read the twist card aloud in the group
- [ ] Before changing anything, **predict**: which classes will we add? Which will we change?
- [ ] Implement it, then compare with your prediction (D5)
- [ ] Fill in the deliverables sheet; decide who presents which part of the demo

---

## Case 1 — Shapes in a Drawing App

A secondary school wants a small geometry app. Pupils place shapes on a canvas; the app shows each shape's **area** and **perimeter**, and the **total area** of the drawing — to estimate the paint needed for a mural.

### Requirements

1. The app knows four shapes:

| Shape | Created with | Area | Perimeter |
|---|---|---|---|
| `Circle` | radius `r` | `π × r²` | `2 × π × r` |
| `Rectangle` | width `w`, height `h` | `w × h` | `2 × (w + h)` |
| `RightTriangle` (right-angled) | base `b`, height `h` | `½ × b × h` | `b + h + c`, where `c = √(b² + h²)` (Pythagoras) |
| `Square` | side `s` | `s × s` | `4 × s` |

   In TypeScript: `π` is `Math.PI`, `√x` is `Math.sqrt(x)`.

2. **Rule R1:** every dimension (radius, width, height, base, side) must be **strictly positive**. A shape with a zero or negative dimension must **never be created**.
3. Every shape can `describe()` itself as one line: its name, its area and its perimeter, with **2 decimals** (`value.toFixed(2)`):

   ```text
   Circle — area 12.57, perimeter 12.57
   ```

4. A rectangle can be resized with `setWidth(w)` and `setHeight(h)`; a square with `setSide(s)`. Rule R1 still applies: a resize to 0 or less is **refused** (`return false`) and the shape keeps its old size.
5. A function `totalArea(shapes)` returns the total area of **any** list of shapes.

### Starter code

Create `shapes.ts`. Replace every `TODO`; keep the usage example at the bottom.

```typescript
// TODO 1 — Declare Shape: an abstract class OR an interface (Question A decides).
//          It must say what EVERY shape can do: area(), perimeter(), describe().

class Circle /* TODO 2 — extends or implements Shape */ {
  // TODO 3 — a private field for the radius

  constructor(radius: number) {
    // TODO 4 — rule R1: throw new Error("...") when radius <= 0
  }

  area(): number {
    return 0; // TODO 5 — π × r²
  }

  perimeter(): number {
    return 0; // TODO 6 — 2 × π × r
  }

  // TODO 7 — describe(): must every shape write its own, or can it be written once? (Question B)
}

// TODO 8 — Rectangle (with setWidth / setHeight), RightTriangle, Square — same pattern

function totalArea(shapes: Shape[]): number {
  // TODO 9 — add up the areas: no if, no instanceof (D3)
  return 0;
}

// ---------- Usage: do not change ----------
const shapes: Shape[] = [
  new Circle(2),
  new Rectangle(3, 4),
  new RightTriangle(3, 4),
  new Square(2),
];

for (const shape of shapes) {
  console.log(shape.describe());
}
console.log("Total area:", totalArea(shapes).toFixed(2));

// Attacks — uncomment ONE line at a time; each must stop with your error message:
// new Circle(-1);
// new Rectangle(3, 0);
```

### Expected output

```text
Circle — area 12.57, perimeter 12.57
Rectangle — area 12.00, perimeter 14.00
RightTriangle — area 6.00, perimeter 12.00
Square — area 4.00, perimeter 8.00
Total area: 34.57
```

### Steps for this case

- [ ] **Circle first.** Finish `Circle` completely and run the program with only `new Circle(2)` in the list. Check its line against the expected output.
- [ ] **Then `Rectangle` and `RightTriangle`.** Check `RightTriangle(3, 4)`: `c = √(9 + 16) = 5`, so the perimeter is `3 + 4 + 5 = 12`.
- [ ] **Rule R1.** Uncomment each attack line, one at a time. Each must stop with **your** error message.
- [ ] **Resizing.** Add `setWidth` and `setHeight` to `Rectangle`. Check that `setWidth(0)` returns `false` and leaves the width unchanged.
- [ ] **Square — the trap.** First write `Square extends Rectangle`, where `setSide(s)` sets both width and height. Then do Question C below before deciding whether to keep it.
- [ ] **D3.** Show that `totalArea` contains no `if` and no `instanceof`, and still works for all four shapes.

### Questions your group must answer

* **A.** Should `Shape` be an **abstract class** or an **interface**? Lecture 5, §24: an abstract class shares code, an interface only describes a capability. Does your `Shape` share any code?
* **B.** `describe()` builds the same sentence for every shape — only the name and the numbers change. Where can it be written **only once**? What does that mean for Question A?
* **C.** In mathematics, a square *is* a rectangle. Test `Square extends Rectangle` with this function. **Predict** what it prints for `new Rectangle(1, 1)` and for `new Square(1)`, then run it:

  ```typescript
  function stretch(r: Rectangle): void {
    r.setWidth(10);
    r.setHeight(5);
    console.log(r.area());   // the caller expects 50
  }
  ```

  What does a `Square` do when `setWidth(10)` is called on it? Does `Square` pass the **substitution test** (Lecture 4, "a subclass must keep its parent's promises")? If not, what would you write instead?

---

## Case 2 — A Mobile Money Wallet

A start-up builds a mobile money service, similar to Wave or Orange Money. Each user has a **wallet** linked to a phone number. All amounts are in **FCFA**. *(The fees below are invented for this exercise.)*

### Requirements

1. A wallet has an owner, a phone number, and a balance that starts at 0.
2. Transaction types and their fees:

| Transaction | Created with | Effect | Fee |
|---|---|---|---|
| `Deposit` | amount | Adds the amount to the wallet | Free |
| `Transfer` | receiving wallet, amount | Takes amount + fee from the sender; adds the amount to the receiver | 1 % of the amount |
| `Withdrawal` | amount | Takes amount + fee (cash given at an agent) | 0.5 % of the amount, **minimum 50 FCFA** |
| `BillPayment` | company name, amount | Takes amount + fee | Flat 100 FCFA |

3. **Rule R1:** amounts are **positive whole numbers** (`Number.isInteger(amount) && amount > 0`).
4. **Rule R2:** the balance can **never** become negative — fee included. A refused transaction changes **nothing**, and `execute` returns `false`.
5. **Rule R3:** the balance cannot be changed from outside, except by executing a transaction.
6. Every successful transaction is kept in a **history**. `printStatement()` prints one line per transaction.
7. **Rule R4:** code outside the wallet may **read** the history, but must not be able to change it.

### Starter code

Create `wallet.ts`.

```typescript
// TODO 1 — Transaction: abstract class or interface? Each kind must be able to
//          compute its fee and describe itself in one line for the statement.

// TODO 2 — Deposit, Transfer, Withdrawal, BillPayment

class Wallet {
  // TODO 3 — private fields: owner, phone, balance, history

  constructor(owner: string, phone: string) {
    // TODO 4
  }

  execute(transaction: Transaction): boolean {
    // TODO 5 — rules R1 and R2; record the transaction in the history.
    //          No if / instanceof on the kind of transaction (D3).
    return false;
  }

  getBalance(): number {
    return 0; // TODO 6
  }

  printStatement(): void {
    // TODO 7 — one line per transaction in the history
  }
}

// ---------- Usage: do not change ----------
const awa    = new Wallet("Awa",    "77 123 45 67");
const moussa = new Wallet("Moussa", "78 987 65 43");

console.log(awa.execute(new Deposit(10000)));                 // true
console.log(awa.execute(new Transfer(moussa, 5000)));         // true  — fee 50
console.log(awa.execute(new Withdrawal(6000)));               // false — 6000 + 50 > 4950
console.log(awa.execute(new BillPayment("SENELEC", 1500)));   // true  — fee 100

console.log(awa.getBalance());      // 3350
console.log(moussa.getBalance());   // 5000
awa.printStatement();
```

### Expected output

```text
true
true
false
true
3350
5000
Deposit: +10000 FCFA
Transfer to Moussa: -5000 FCFA (fee 50)
Bill payment SENELEC: -1500 FCFA (fee 100)
```

### Steps for this case

- [ ] **Wallet with `Deposit` only.** Check the balance after `new Deposit(10000)`.
- [ ] **Rule R1.** Check that `new Deposit(-5)` and `new Deposit(2.5)` are refused.
- [ ] **`Withdrawal` and `BillPayment`.** Check rule R2: a withdrawal larger than the balance returns `false` and changes nothing — not even the history.
- [ ] **`Transfer`.** It must also credit the receiver. Decide which method of `Wallet` it uses for that, then answer Question B.
- [ ] **Rule R4.** Attack: call `getHistory()` (if you have one) and try `.push(...)` or `.pop()` on the result. Did the wallet's history change?
- [ ] **D3.** Show that `execute` contains no `if` and no `instanceof` on the kind of transaction.

### Questions your group must answer

* **A.** Who computes the fee — the wallet, or the transaction? What happens to your answer when a new kind of transaction is added?
* **B.** A `Transfer` takes money from one wallet and adds it to another. Which methods must `Wallet` make public for that — and does making them public let *anyone* add or take money? How can you limit the damage?
* **C.** What exactly does `getHistory()` return? If it returns the private array itself, what can a caller do with it (Lecture 3, "Why not expose `students`?")?

---

## Case 3 — Dakar Transport Tickets

A travel app plans journeys across Dakar that combine several means of transport, and shows the **total fare**. *(The fares below are invented for this exercise.)*

### Requirements

1. A journey belongs to a passenger and is made of one or more **legs**.
2. Means of transport and their fares, in FCFA:

| Leg | Created with | Fare |
|---|---|---|
| `TerTrip` | from, to, number of zones | 500 per zone |
| `BrtTrip` | — | 400 (flat) |
| `BusTrip` (Dakar Dem Dikk) | line number | 250 (flat) |
| `TaxiTrip` | distance in km | 500 + 300 per km, **rounded up** to the next 100: `Math.ceil(x / 100) * 100` |

3. **Rule R1:** the number of TER zones is 1, 2 or 3; a taxi distance is strictly positive. Otherwise the leg is **not created**.
4. **Rule R2:** once a leg is created, its fare and description can be **read**, but never **changed** (`readonly`, Lecture 3).
5. The journey computes its total fare and prints one ticket line per leg.

### Starter code

Create `transport.ts`.

```typescript
// TODO 1 — Leg: abstract class or interface? Every leg can give its fare()
//          and a describe() line for the ticket.

// TODO 2 — TerTrip, BrtTrip, BusTrip, TaxiTrip (rules R1 and R2)

class Journey {
  // TODO 3 — private fields: passenger, legs

  constructor(passenger: string) {
    // TODO 4
  }

  addLeg(leg: Leg): void {
    // TODO 5
  }

  totalFare(): number {
    return 0; // TODO 6 — no if, no instanceof, no type string (D3)
  }

  printTickets(): void {
    // TODO 7 — one line per leg
  }
}

// ---------- Usage: do not change ----------
const journey = new Journey("Fatou");
journey.addLeg(new TerTrip("Dakar", "Diamniadio", 2));
journey.addLeg(new BrtTrip());
journey.addLeg(new TaxiTrip(4.5));

journey.printTickets();
console.log("Total:", journey.totalFare(), "FCFA");

// Attacks — uncomment ONE line at a time; each must stop with your error message:
// new TerTrip("Dakar", "AIBD", 5);
// new TaxiTrip(0);
```

### Expected output

```text
Ticket for Fatou — TER Dakar → Diamniadio (2 zones): 1000 FCFA
Ticket for Fatou — BRT: 400 FCFA
Ticket for Fatou — Taxi 4.5 km: 1900 FCFA
Total: 3300 FCFA
```

*(Taxi: 500 + 300 × 4.5 = 1850, rounded up to 1900.)*

### Steps for this case

- [ ] **The beginner's version first, in a comment.** Write a single function `fare(leg)` that uses `if (leg.type === "TER") … else if …`. Keep it — you need it for Question A.
- [ ] **`BrtTrip` and `TerTrip`.** Run with only these two legs and check the fares.
- [ ] **`TaxiTrip`.** Check the rounding: 4.5 km → 1900, and 1 km → 800.
- [ ] **Rule R1.** Uncomment each attack line, one at a time.
- [ ] **Rule R2.** Attack: after creation, try to assign a new value to a leg's field (e.g. `leg.zones = 1`). The editor must underline it in red.
- [ ] **D3.** Show that `totalFare` contains no `if`, no `instanceof`, no type string.

### Questions your group must answer

* **A.** Compare your design with the beginner's `fare(leg)` function. When a fifth mode is added (e.g. a ferry to Gorée), what must change in each version?
* **B.** Do all legs share **code**, or only a **capability**? Abstract class or interface — justify with Lecture 5, §24.
* **C.** How does your design guarantee rule R2? What would go wrong for a passenger if a leg's fare could change after the ticket was printed?

---

## Case 4 — Restaurant Orders and Delivery

A restaurant in Dakar takes orders at the table and for delivery. All prices are in **FCFA**.

### Requirements

1. Menu items:

| Item | Created with | Price |
|---|---|---|
| `Dish` | name, price | The price |
| `Drink` | name, base price, size `"small"` or `"large"` | Small: base price — Large: **1.5 ×** base price |

2. An order has a table name, and a list of items with **quantities**.
3. **Rule R1:** a quantity is a whole number ≥ 1.
4. **Rule R2:** an order goes through the states `Open → Paid → Delivered`, in that order only. `pay()` on a paid order, or `deliver()` on an open order, returns `false`.
5. **Rule R3:** items can be added or removed **only while the order is open**; otherwise `add` and `remove` return `false`.
6. **Discounts** — at most one per order, applied to the subtotal:

| Discount | Rule |
|---|---|
| None | — |
| `PercentageDiscount` | A percentage of the subtotal, between 1 and 50 % |
| `FixedDiscount` | A fixed amount off; the total never goes below 0 |

### Starter code

Create `restaurant.ts`.

```typescript
// TODO 1 — MenuItem: abstract class or interface? Dish and Drink both have a name and a price().

// TODO 2 — Discount: abstract class or interface? Each discount computes the
//          amount to take off a subtotal.

class Order {
  // TODO 3 — private fields: table, lines (item + quantity), state, discount
  //          Question A: should Order EXTEND a list, or HAVE one?

  constructor(table: string) {
    // TODO 4
  }

  add(item: MenuItem, quantity: number): boolean {
    return false; // TODO 5 — rules R1 and R3
  }

  applyDiscount(discount: Discount): boolean {
    return false; // TODO 6 — only while open
  }

  total(): number {
    return 0; // TODO 7 — subtotal minus the discount; no if / instanceof on the kind of discount (D3)
  }

  pay(): boolean {
    return false; // TODO 8 — rule R2
  }

  deliver(): boolean {
    return false; // TODO 9 — rule R2
  }
}

// ---------- Usage: do not change ----------
const order = new Order("Table 4");
order.add(new Dish("Thieboudienne", 3500), 2);              // 7000
order.add(new Drink("Bissap", 500, "large"), 3);            // 3 × 750 = 2250
order.applyDiscount(new PercentageDiscount(10));            // −925

console.log(order.total());                                 // 8325
console.log(order.deliver());                               // false — not paid yet
console.log(order.pay());                                   // true
console.log(order.add(new Drink("Water", 300, "small"), 1)); // false — already paid
console.log(order.deliver());                               // true
```

### Expected output

```text
8325
false
true
false
true
```

### Steps for this case

- [ ] **`Dish` and `Drink`.** Check that a large bissap at 500 costs 750.
- [ ] **`Order` without discount.** Check the subtotal: `2 × 3500 + 3 × 750 = 9250`.
- [ ] **Rules R1 and R3.** Check that `add(item, 0)` returns `false`, and that adding after `pay()` returns `false`.
- [ ] **Rule R2.** Check every wrong order of calls: `deliver()` before `pay()`, `pay()` twice.
- [ ] **Discounts.** Add `PercentageDiscount` and `FixedDiscount`. Check that `new FixedDiscount(20000)` gives a total of 0, not a negative number.
- [ ] **The trap.** Attack: if `Order extends` a list (or `Array`), call the list's own methods (`push`, `pop`, `splice`) on a **paid** order. Does rule R3 survive?
- [ ] **D3.** Show that `total()` contains no `if` and no `instanceof` on the kind of discount.

### Questions your group must answer

* **A.** An order is basically a list of items. Should `Order extends` a list class (or `Array`)? Apply the three tests (Lecture 4, `Course extends StudentList`) — and check whether rule R3 survives.
* **B.** Who calculates the price of a large drink — the drink, or the order? Why?
* **C.** "No discount" is also a case. How do you represent it so that `total()` needs no `if (discount === null)`?

---

## Demos and Challenge Questions

* Each group has **3 minutes**, and **each member presents one part**:

| Member | Shows |
|---|---|
| 1 | The case in one sentence, and the class diagram (D1) |
| 2 | The code running: the usage example, one refused attack (D2), the polymorphic call (D3) |
| 3 | The trap you found and your decision (D4), and the twist (D5) |

* Then **another group with the same case** asks **one challenge question** — they know the problem well, so their questions are the sharpest. Good challenge questions attack the design:
  * "What stops me from doing ___ from outside your class?"
  * "Your twist forced you to edit ___ — how could you have avoided it?"
  * "Why `extends` there and not composition?"
* The challenged group has 1 minute to answer.

---

## Grading — 20 Points

| Criterion | 4 points | 2 points | 0 points |
|---|---|---|---|
| **D1 — Class diagram** | Complete; visibility marked; relationships correct and labelled | Classes present, relationships missing or unclear | Missing |
| **D2 — Rule enforced** | Rule enforced inside the owning class; the attacks shown in the demo fail | Rule checked, but can be bypassed (public field, exposed array, setter) | No rule enforced |
| **D3 — Polymorphism** | Mixed list handled with no type checks; adding a type changes no caller | Works, but uses `if` / `instanceof` / a type string somewhere | Missing |
| **D4 — Justified decision** | Trap identified; choice defended with the is-a, substitution and stability tests | Choice stated, weak justification | No justification |
| **D5 — Twist** | Absorbed by adding classes; changed classes listed honestly with reasons | Absorbed, but with edits in several existing classes | Not attempted |

---

## Group Deliverables Sheet

*Fill this in a `README.md` next to your code, or on a sheet handed in at the end.*

```text
Case number: ____        Group members:
  1. ______________________   2. ______________________   3. ______________________

D1  Class diagram                → sketch attached

D2  Rule:  "________________________________________________"
    Owned by class: ____________   Enforced in method(s): ____________
    Attack tried: ____________________   Result: refused / succeeded

D3  Polymorphic call (copy the line):  ______________________________

D4  Decision: we chose ____________ instead of ____________ because
    is-a: ____   substitution: ____   stability: ____

    The trap in our case was: ____________________________________

D5  Twist received: ______________________________________________
    Prediction — classes we will add: ___________  change: ___________
    Actually added:   ______________________________________________
    Actually changed: ______________________________________________   Why: ____________
```
