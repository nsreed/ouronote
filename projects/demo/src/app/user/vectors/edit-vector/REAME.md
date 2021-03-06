# Design Choices

## Read-Only Generated Items

Grid

Guides

## Performance

### Input lag for large project (1000+ paths)

This may be due to the heft of ItemPair. Each paper.Item in memory has a unique instance of ItemPair, which has its own event listeners & state, which means that on a project of thousands of items, there are thousands upon thousands of active observer pipes.

May want to look at moving ItemPair's functionality into the underlying paper classes by way of prototype extension. This puts the gun chain closer to the properties it cares about.

Using `item.change$` as a example.

```typescript
Item.prototype.gun = {
  get() {},
  set(gun) {
    this._gun = gun;
    this.gun$.emit(gun);
  },
};

// later

this.change$.pipe(switchMap((change) => this.gun$));

this.gun$.pipe().subscribe((gun) => {});
```

## Graph Structure

Flat

```typescript
{
  Layer: {
    'kjiwfxx0291485': {...}
  }
}

```

Pros:

- Easier to import/export?

Cons:

- Orphan detection

> When an item is removed in paper, it can be by way of
> `remove()` (allows us to intercept it directly) or
> `parent.removeChild()` - the question is, does a `removeChild(...)` call `remove()` or something
> like it on the child

## Pair Bonding

A pair bond consists of a node in the graph, and a paper.Item

It may be created from either, or both

Needs caching maybe? Never want duplicates for a given pair. Pretty easy if extending from GunChain.

To create new children from a pair:

```typescript
// node.load() until useable graph is aquired (or load one level?? basically an on()???? children of that node will be handled by the process we're describing here)

// Create new child Item using project (will import the item to active layer)
const newChild = this.project.importJSON(importable sub-item JSON);
// will move newly created child to this pair's item
this.item.addChild(newChild);

this.cached[childNode.key] = new ItemChain(childNode.value, newChild);

// remember to restore item's index or use insertAt()
```

to create new child objects

It handles incoming graph changes, and sets up the local paper Item to update the graph (probably via intercepting calls to add/remove/other methods on the Item) (maybe piggybacking on Item's internal event propagation system)

## Factory

### Incoming Add

- via `chain.load()`

If no local copy is found, load this chain.

`node -> gunified JSON -> convert -> importable paper JSON -> project.importJSON`

### _what about incoming add for an existing pair's child?_

project.importJSON won't work... but the existing pair's local Item can importJSON.... maybe?

It may be able to

```typescript
item.importJSON({
  className: 'Layer',
  children: {
    'kb...': { // Uniquely creating/updating local items
      className: Item,
      ...
    },
    'kj...': null // but what happens if paper tries to import a null indexed child entry?
  }
})
```

which requires each child to have a unique index. _Plus, need to find out if exporting/importing indexed children is even supported_

### Incoming Change

- via `chain.on()`

### Incoming Delete

## Thoughts

Use the item's `set({...attrs})` on changes to the graph item (through `on()` most likely)

`map()` the graph item's `children`

What other attributes need to be `map()`ed? Depends on type? For example `CompoundPath` has `segments`

> Every item has exportJSON... but that seems expensive. It's like we need a shallow exportJSON

NOT SO: http://paperjs.org/reference/item/#importjson-json

As opposed to `project.importJSON(data)`, an `item`'s `importJSON(data)` will import data to the object itself if the className matches the item's own className, or one of its inherited classNames.

> Or reflect/introspect each item's properties...

- if it's an array containing another paper.Item, recurse
- if it's a primitive or array of primitives, JSONify

Need caching of bound nodes

## Indexing Beaks **EVERYTHING**

_... and the dangers of trying to store arrays in graphs_

_... and yes, it's more difficult than just storing the index on the element_

Approaches:

- Linked List
  - Each node has a next and previous (unless they are the last or first sibling)

How to deal with conflicts?

client A has no peers but makes changes to known graph

peer 1 now has stale data

client B (connected to peer 1) moves an item

peer 1 = client B

client A makes more changes

client A connects to peer 1

how does the linked list graph handle this?

dotted version vectors? oh not this again...

### "lazy" linked list - "relatives" in excess

- Each node has "constraint" properties
- a "constraint" is like "next" or "previous" except to be read as "as long as I appear before/after this node, we're good"
  - These could be **sets**, allowing the item to enumerate **all** items before it.
    - Not having an item locally just means you ignore it
    - This means, as new constraints are updated by a peer, your removals may still count
- if a constraint can't be met locally, it will still be inserted, but at _any_ index
- Circular references may still be possible in asynchronous use
  - if a local item "violates" the known constraint _after_ it has been satisfied... update the constraint?
    - This would break the circle... wouldn't it?

Alice
[
a,
c,
e
]

Bob
[
b,
c,
d
]

Server
[
a,
b,
c,
d,
e
]

Bob moves d behind b

Alice [a, c, e]
Bob [d, b, c]
