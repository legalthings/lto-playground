import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { WaffleModule } from '@waffle/core';
import { LtoFormsModule } from '@lto/forms';
import {
  MatExpansionModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';

import { JsonEditorModule } from './components';

import { ScenarioEditorComponent } from './scenario-editor.component';
import { ScenarioEditorStore } from './scenario-editor.store';
import { LoadSchemaEffect } from './effects';

@NgModule({
  imports: [
    SharedModule,
    LtoFormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    JsonEditorModule,
    WaffleModule.forFeature('scenario-editor', [ScenarioEditorStore], [LoadSchemaEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: ScenarioEditorComponent
      }
    ])
  ],
  declarations: [ScenarioEditorComponent]
})
export class ScenarioEditorModule {}
