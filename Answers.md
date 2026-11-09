

**Prediction 1:** No red lines show up in VS Code. But when you run it, it prints "Awa" and then crashes because Member does not have a describe() action.
 **Question 1:** Using `any` turns off all safety checks. TypeScript stops protecting  from mistakes, so bad code crashes when running instead of showing an error in VS Code.`memberList.add(42)` would NOT be caught.


 **Question 2:** The error is "Property 'getId' does not exist on type 'T'". TypeScript doesn't know what T is yet, so it doesn't know if T has a getId() action.
**Question 3:** TypeScript only cares about shape (structural typing). Since both Book and Member have a getId() method, they automatically fit HasId without saying "implements HasId".
**Question 4:**
   a-Stopped us from putting a Member into a Book catalog.
   b- Stopped us from making a catalog of numbers, because numbers don't have a getId() method.
  c-Made us check if the item actually exists before calling describe(), preventing a crash.
**Question 5:** Encapsulation,just changed how the data is stored inside , but the outside methods stayed the exact same, so caller code didn't break.
 **Question 6:** If all() gave back the real internal array, outside code could push duplicate IDs into it directly. Returning a brand new array prevents outside code from tampering with the internal list.


 **Question 7:** Borrowable only promises a lateFee() action, not a describe() action. So TypeScript plays it safe and blocks describe().
 **Prediction 3:** `worstOverall` will have the type `Book | Laptop`. Calling describe() gives an error because Laptop doesn't have a describe() action.
 **Question 8:** A generic is worth using when a function needs to return the exact type of the input item instead of a general shared type. In Prediction 3, combining different types gave a union type of `Book | Laptop`.


 **Question 9:** T becomes `string` when we write `new Queue<string>()` inside Book. If Book extended Queue directly, anyone could use queue methods like enqueue() to bypass the book borrowing rules.
**Question 10:** Both times, Moussa was already in the queue so it returned false. A simple boolean cannot tell the caller *why* it failed (already holding the book vs already waiting in line).
**Mermaid Diagram:**
```mermaid
classDiagram
    class Book {
        -title: string
        -borrower: string
        +borrow(member: string): boogitgitilean
        +giveBack(): boolean
        +getBorrower(): string
        +waiting(): number
    }
    class Queue~T~ {
        -items: T[]
        +enqueue(item: T): void
        +dequeue(): T
        +size(): number
        +includes(item: T): boolean
    }
    Book *-- Queue~T~ : contains reservations