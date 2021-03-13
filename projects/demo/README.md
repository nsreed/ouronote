# Angular/Gun Demo Project

## Multi-User

See [SEA.certify](https://gun.eco/docs/SEA.certify#rooms) for a "Rooms" example

This seems ideal, as it creates a key pair with its own certificates

Requires some modification to handle the concept of a "moderator" role.

- Generate "owner" certificate, granting access to `/ban` `/blacklist` and `/certs`
- Store this certificate on owner? Or on room???

- Prove on simple document (message?)

Does the document get its own public key? How does the owner get access to it?

from [SEA quickstart](https://gun.eco/docs/SEA#quickstart)

```typescript
var pair = await SEA.pair();
var enc = await SEA.encrypt("hello self", pair);
var data = await SEA.sign(enc, pair);
console.log(data);
var msg = await SEA.verify(data, pair.pub);
var dec = await SEA.decrypt(msg, pair);
var proof = await SEA.work(dec, pair);
var check = await SEA.work("hello self", pair);
console.log(dec);
console.log(proof === check);

// now let's share private data with someone:
var alice = await SEA.pair();
var bob = await SEA.pair();
// `.secret` is Elliptic-curve Diffie–Hellman

// Bob allows Alice to write to part of his graph, he creates a certificate for Bob
var certificate = await SEA.certify(alice.pub, ["^AliceOnly.*"], bob);

// Alice logged in, she has a certificate signed by Bob
// TODO WHY DOES ALICE HAVE THE CERTIFICATE???
var enc = await SEA.encrypt("shared data", await SEA.secret(bob.epub, alice));
await gun
  .get("~" + bob.pub)
  .get("AliceOnly")
  .get("do-not-tell-anyone")
  .put(enc, null, { opt: { cert: certificate } });
await gun
  .get("~" + bob.pub)
  .get("AliceOnly")
  .get("do-not-tell-anyone")
  .once(console.log); // return 'enc'

await SEA.decrypt(enc, await SEA.secret(alice.epub, bob));
```

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
