# Angular/Gun Demo Project

## Roadmap

## TODO

### Security

**UX** - Forms/Features should be selectively available based on certs

**Path Obfuscation** - The .certs and .owner both expose the public key of the user they are associated with. In addition, certificates themselves contain the public key of their certificants. Hash/encrypt the path and encrypt the cert. Content addressing may be appropriate for this.

**Auto-Encrypt/Sign** - Automatically encrypt/decrypt/sign/verify based on schema

### Graphification

**Paper Metadata Storage** - Stop using "soul" and use real soul (global soul vs. key in parent). Stop storing it in data, as that needs additional filtering on clone() and copy/paste type operations. Ideally, chain-related metadata may be stored on paper item prototype itself?

**View** - Allow filtering of paper item records by bounds

**Rendering Pipeline** - Allow loading of read-only paper item records in background

**Circular Reference Handling** - How do we handle circular references?

- Need reference detection (already present in GunChain)
- When ref is detected... limit load depth? follow until out of bounds or size threshold reached?

**Schema Metadata** - something to describe permissions, field names, descriptions, etc to allow for more generalized patterns for creating records, assuming ownership, generating certificates

**Merge** - Treat a user-partitioned set of records as a single record, where writes are directed at user record and reads are Last Write Wins OR Prefer User Value. Sort of a best of both worlds between the full/self certificates. Users may collaborate and not risk data loss.

## Multi-User

### Write Permissions

Two options:

1. Full - collaborative key
2. Self - user partitioned key

### Invitation Process

1. Get public key of invitee
2. Generate certificate

- Needs key scope like
  - `^vector.[vector key].layers.*` would allow editing layers
  - `^vector.[vector key].*` would allow full control
  - scoped to keys containing invitee's public key?
  - blacklist key

3. Share certificate:

- `vector.get('invitees').get(invitee.pub).put(certificate)`
- `vector.get('invitees').get(encryptedInviteePub).put(encryptedCertificate)`

### Revoking an Invite

### Unanswered Questions

- How does this work with vector graphics? Can they insert items from their own graph?

## Vector Editing

- Generated Items
- Hierarchy Actions (cut/copy/clone/paste etc.)
