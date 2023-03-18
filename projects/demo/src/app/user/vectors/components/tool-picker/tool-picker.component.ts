import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LogService } from 'log';
import { PaperEditDirective } from '../../../../vector/paper-edit.directive';
import { VectorTool } from '../../tools/paper-tool';

@Component({
  selector: 'app-tool-picker',
  templateUrl: './tool-picker.component.html',
  styleUrls: ['./tool-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ToolPickerComponent implements OnInit, AfterViewInit {
  constructor(
    private logger: LogService,
    private changes: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) {}
  @ViewChild('Tools')
  toolsTmplRef!: TemplateRef<any>;
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.changes.detectChanges();

    this.viewContainerRef.createEmbeddedView(this.toolsTmplRef);
    this.changes.detectChanges();
  }

  @Input()
  toolCategories: string[] = ['view', 'draw', 'select', 'edit'];
  categories = {
    view: [],
    draw: [],
    select: [],
    edit: [],
  } as Record<string, VectorTool[]>;
  sortedCategories = [] as { key: string; value: VectorTool[] }[];
  disabledCategories = {} as Record<string, string>;

  checkCategories() {
    Object.entries(this.categories).forEach(([name, tools]) => {
      if (!tools.some((t) => t.enabled)) {
        this.disabledCategories[name] = 'no tools enabled';
      } else {
        delete this.disabledCategories[name];
      }
    });
    this.changes.detectChanges();
  }

  private _tools: VectorTool[] = [];
  public get tools(): VectorTool[] {
    return this._tools;
  }
  @Input()
  public set tools(value: VectorTool[]) {
    this._tools = value;
    value
      ?.filter(
        (tool) =>
          tool.category &&
          this.categories &&
          !(this.categories[tool.category] || []).includes(tool)
      )
      .forEach((tool) => {
        if (!tool.category) {
          return;
        }

        (this.categories as any)[tool.category]?.push(tool);
        tool.enabled$.subscribe((enabled) => {
          // if(!enabled){
          if (!(this.categories[tool.category] || []).some((t) => t.enabled)) {
            this.disabledCategories[tool.category] = 'no tools are enabled!';
          } else {
            delete this.disabledCategories[tool.category];
          }
          // }
          this.changes.detectChanges();
        });
        this.sortedCategories = [
          {
            key: 'view',
            value: this.categories.view,
          },
          {
            key: 'select',
            value: this.categories.select,
          },
          {
            key: 'draw',
            value: this.categories.draw,
          },
          {
            key: 'edit',
            value: this.categories.edit,
          },
        ] as any;
      });

    this.checkCategories();
  }

  @Input()
  orient: 'vertical' | 'horizontal' = 'vertical';

  private _selectedItems: any[] = [];
  public get selectedItems(): any[] {
    return this._selectedItems;
  }
  @Input()
  public set selectedItems(value: any[]) {
    this._selectedItems = value;
    if (value.length > 0) {
      delete this.disabledCategories.edit;
    } else {
      this.disabledCategories.edit = 'no selection';
    }
    this.changes.detectChanges();
  }

  activeCategory?: string;
  private _activeTool?: VectorTool | undefined;
  public get activeTool(): VectorTool | undefined {
    return this._activeTool;
  }
  @Input()
  public set activeTool(value: VectorTool | undefined) {
    this._activeTool = value;
    if (value) {
      this.activeCategory = value?.category as any;
      if (this.activeCategory !== undefined) {
        const sortedCategory = this.sortedCategories.find(
          (c) => c.key === this.activeCategory
        );
        if (sortedCategory) {
          sortedCategory.value = [
            value,
            ...sortedCategory.value.filter((t) => t !== value),
          ];
        }
        // this.sortedCategories[this.activeCategory] = [
        //   value,
        //   ...this.sortedCategories[this.activeCategory].filter(
        //     (t) => t !== value
        //   ),
        // ];
      }
    }
    this.changes.detectChanges();
  }

  @Input()
  paper?: paper.PaperScope;

  private _paperDirective?: PaperEditDirective | undefined;
  public get paperDirective(): PaperEditDirective | undefined {
    return this._paperDirective;
  }
  @Input()
  public set paperDirective(value: PaperEditDirective | undefined) {
    this._paperDirective = value;
    value?.selectedItemsChange.subscribe((items) => {
      this.selectedItems = items;
      this.changes.detectChanges();
    });
    this.changes.markForCheck();
  }

  onCategoryClick(
    cat: any,
    catTrigger: CdkMenuTrigger,
    ref: TemplateRef<unknown>
  ) {
    if (cat.value[0] !== this.activeTool) {
      // catTrigger.closed.subscribe(() => {
      //   console.log('a menusl');
      // });
      cat.value[0].activate();
      // cat.value.find((t: VectorTool) => t.enabled).activate();
      // const menu = catTrigger.getMenu();
      // menu?.menuStack?.closeAll();
    }
  }

  @Output()
  toolDoubleClick = new EventEmitter();

  onToolClick(tool: VectorTool) {
    if (tool === this.activeTool) {
      this.toolDoubleClick.emit(tool);
      this.changes.detectChanges();
      return;
    }
    tool.activate();
    this.changes.markForCheck();
  }

  ngOnInit(): void {
    // if (this.paperDirective?.scope?.tools) {
    //   this.tools = this.paperDirective.scope.tools as any;
    //   this.activeTool = this.paperDirective.scope.tool as any;
    //   this.changes.markForCheck();
    //   this.paperDirective.tool$.subscribe((tool) => {
    //     this.activeTool = tool as any;
    //     this.changes.markForCheck();
    //   });
    // }
  }
}
