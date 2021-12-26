# Angular/Gun Demo Project

## Roadmap / Ideas

In no particular order, these are some ideas about improving this project:

### Routing Schema Update

To accommodate the game loop, we need public URLs to be loadable by unauthenticated visitors.

Currently, the routing structure of ouronote is as such:

```
/
  login/
  user/ <--- Authentication guarding starts here
    vectors/
      [id]/
        permissions
        edit
```

Question: Is the "user" level strictly necessary?
Problem: The code under the "user" level *assumes* the user is already logged in.

We may exclude the edit workspace from this auth guard, but permissions, settings, etc. should be under auth guard.

Solution 1: Keep the auth guard in place, on a per-page basis. Users who nagivate to `/user/vector/XXXX/edit` will be kicked to `/user/vector/XXXX/view`? **NO THAT'S DUMB**

Solution 2: 

```
  /login
  /user <--- All routes under "user" are still guarded
    /vectors
      /[id]
        /permissions
  /vector
    /[id] <--- This is the new hybrid view/edit page
```

Problem?:

Let's suppose we have a vector loaded in the workspace, and no user is logged in. We can't swap in a user() chain once the user logs in. **NOT A PROBLEM, JUST REFRESH THE PAGE ON LOGIN**

Solution 2: 

```
  /vector
    /[id] <--- This is the new hybrid view/edit page
      /permissions <--- Individually guarded
```
### Security

**Certificate Creation** - This should be standardized, instead of requiring users to define their own certificates.

**Certificate Revokation** - This needs to be implemented before release of any kind

**Forms UX** - Forms/Features should be selectively available based on certs

**Path Obfuscation** - The .certs and .owner both expose the public key of the user they are associated with. In addition, certificates themselves contain the public key of their certificants. Hash/encrypt the path and encrypt the cert. Content addressing may be appropriate for this.

**Auto-Encrypt/Sign** - Automatically encrypt/decrypt/sign/verify based on schema

### Graphification

**Paper Graph Hierarchy** - Switch to using set() instead of generating new random keys.

**Paper Graph Metadata**:

- Stop using `data.soul` to mean the key in this set, and use real soul (from `Gun.node.soul()`).
- Stop storing graph metadata in `data`, as that needs additional filtering on clone() and copy/paste type operations. Ideally, chain-related metadata may be stored on paper item prototype itself?

**Spatial Queries / Path Culling** - Allow filtering of paper item records by bounds. This may require changing the underlying data structure for Items to be something like a quad-tree. Keys should end up compatible with spatial hashing of some kind. Needs further research but the idea is that we need to be able to perform RAD queries against the bounding boxes of items, to fetch only the items that are visible. Is this possible?

**Rendering Pipeline** - Allow loading of read-only paper item records in background/WebWorker

**Circular Reference Handling** - How do we handle circular references, and/or can they be supported?

- Need reference detection (already present in GunChain)
- When ref is detected... limit load depth? follow until out of bounds or size threshold reached?

**Schema Metadata** - something to describe permissions, field names, descriptions, etc to allow for more generalized patterns for creating records, assuming ownership, generating certificates

**Merge** - Treat a user-partitioned set of records as a single record, where writes are directed at user record and reads are Last Write Wins OR Prefer User Value. Sort of a best of both worlds between the full/self certificates. Users may collaborate and not risk data loss.

### Vector Editing

- Generated Items
- Hierarchy Actions (cut/copy/clone/paste etc.)

#### Touch/Pen support

Canvas -> Hammer -> Paper Tool

Hammer doesn't 'recognize' a gesture until several events have passed, which paper has already had time to respond to.

Easiest (hackiest) way to fix this is, on systems with touch/pen support, the paper tool needs to make these decisions. Essentially, paper can ignore touch events entirely, responding only to pen. Touch events/gestures can be fed into the paper tool by hammer.
