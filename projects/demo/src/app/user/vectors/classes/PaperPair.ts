import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';

export class PaperPair {
  protected importing = false;
  constructor(private scope: any) {
    if (scope.pair) {
      console.error('CREATING A DUPLICATE PAIR FOR SCOPE', scope);
    }
    scope.pair = this;
  }
}
