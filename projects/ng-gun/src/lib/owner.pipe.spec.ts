import { OwnerPipe } from './owner.pipe';

describe('OwnerPipe', () => {
  it('create an instance', () => {
    const pipe = new OwnerPipe();
    expect(pipe).toBeTruthy();
  });
});
