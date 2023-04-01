import { Advice, Aspect, UseAspect } from 'ts-aspect';
import { PaperHaverCtx } from './paper-state-aspect';

export class CacheAspect implements Aspect {
  constructor(
    public searchIn: (target: any) => paper.Item | paper.Project | paper.Layer,
    public options: any,
    public create: Function
  ) {}

  execute(ctx: PaperHaverCtx) {
    const paper = ctx.target.paper;
    const project = ctx.target.project;
  }
}

export interface IHasCache {
  cache: paper.Item;
}

export class NameCacheAspect implements Aspect {
  constructor(private name: any, private create?: (...args: any[]) => any) {}
  addChildToCache(child: paper.Item, cache: paper.Item) {
    child.name = this.name;
    cache.addChild(child);
  }
  execute(ctx: PaperHaverCtx & { target: IHasCache }) {
    const cache = ctx.target.cache;
    if (ctx.returnValue) {
      ctx.returnValue.name = this.name;
      this.addChildToCache(ctx.returnValue, cache);
      return;
    }
    let cached =
      cache.children[this.name] || cache.getItem({ name: this.name });
    if (!cached) {
      if (this.create) {
        // console.log(`creating child with name ${this.name}`);

        const created = this.create(ctx.target, ...ctx.functionParams);
        created.name = this.name;
        created.data.ignore = true;
        cached = created;
        this.addChildToCache(created, cache);
      }
    }
    ctx.functionParams.push(cached);
    return cached;
  }
}

export function CachedName(name: string, create?: (...args: any[]) => any) {
  return UseAspect(Advice.Around, new NameCacheAspect(name, create));
}
