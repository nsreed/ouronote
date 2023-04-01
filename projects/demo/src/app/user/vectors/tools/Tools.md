## `hitTest()` options

```
@option
[options.tolerance=PaperScope#settings .hitTolerance] {Number} the tolerance of the hit-test

@option
options.class {Function} only hit-test against a specific item class, or any of its sub-classes, by providing the constructor function against which an instanceof check is performed: {@values Group, Layer, Path, CompoundPath, Shape, Raster, SymbolItem, PointText, ...}

@option
options.match {Function} a match function to be called for each found hit result: Return true to return the result, false to keep searching

@option — [options.fill=true] {Boolean} hit-test the fill of items

@option
[options.stroke=true] {Boolean} hit-test the stroke of path items, taking into account the setting of stroke color and width

@option — [options.segments=true] {Boolean} hit-test for * Segment#point of Path items

@option
options.curves {Boolean} hit-test the curves of path items, without taking the stroke color or width into account

@option — options.handles {Boolean} hit-test for the handles (* Segment#handleIn / Segment#handleOut ) of path segments.

@option
options.ends {Boolean} only hit-test for the first or last segment points of open path items

@option
options.position {Boolean} hit-test the Item#position of of items, which depends on the setting of Item#pivot

@option
options.center {Boolean} hit-test the Rectangle#center of the bounding rectangle of items (Item#bounds )

@option
options.bounds {Boolean} hit-test the corners and side-centers of the bounding rectangle of items (Item#bounds )

@option — options.guides {Boolean} hit-test items that have * Item#guide set to true

@option — options.selected {Boolean} only hit selected items

@param point
the point where the hit-test should be performed (in global coordinates system).

@return
a hit result object describing what exactly was hit or null if nothing was hit
```
