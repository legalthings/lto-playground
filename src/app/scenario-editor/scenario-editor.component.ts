import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { IMonacoSchema } from './interfaces';
import { UpdateScenario, LoadSchemas, ShowFormData } from './actions';
import { UpdateEditorMarkers } from '@app/actions';
// import { DummyScenario } from './dummy-scenario';
import { Dummy2, Dummy1 } from './dummy-scenarios';
import { ScenarioEditorState } from './scenario-editor.state';

@Component({
  selector: 'lto-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnDestroy {
  @Select(ScenarioEditorState.schemas)
  schemas$!: Observable<IMonacoSchema[] | null>;
  @Select(ScenarioEditorState.scenario)
  scenario$!: Observable<any>;

  showTabContent = true;

  private _scenarioChanges$: Subject<any> = new Subject();
  private _editorSubscription?: Subscription;

  constructor(private _store: Store) {
    this._editorSubscription = this._scenarioChanges$
      .pipe(debounceTime(300))
      .subscribe(scenario => this.updateScenario(scenario));

    // Set dummy scenario
    _store.dispatch([new UpdateScenario({ scenario: Dummy1 }), new LoadSchemas()]);
  }

  ngOnDestroy() {
    if (this._editorSubscription) {
      this._editorSubscription.unsubscribe();
    }
  }

  scenarioChanged(scenario: any) {
    this._scenarioChanges$.next(scenario);
  }

  updateScenario(scenario: any) {
    this._store.dispatch(new UpdateScenario({ scenario }));
  }

  trackByFn(index: number, item: any) {
    return item.key;
  }

  showFormData(data: any) {
    this._store.dispatch(new ShowFormData({ data }));
  }

  updateEditrMarkers(markers: any[]) {
    this._store.dispatch(new UpdateEditorMarkers({ markers }));
  }

  reloadTabs() {
    this.showTabContent = false;
    setTimeout(() => (this.showTabContent = true), 100);
  }
}
