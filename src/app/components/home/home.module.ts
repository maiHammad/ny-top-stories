import { AppModule } from './../../app.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { storiesReducer } from './stories/state/stories.reducer';
import { STORIES_STATE_NAME } from './stories/state/stories.selector';
import { EffectsModule } from '@ngrx/effects';
import { StoriesEffects } from './stories/state//stories.effects';
import { StoryComponent } from './stories/story/story.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { SearchComponent } from '../search/search.component';

const routes:Routes=[{
    path:'',
    component:HomeComponent,
},{
path:'search',
component:SearchComponent,
},
{
    path:'details/:id',
    component:StoryDetailsComponent
}];
@NgModule({
    declarations: [HomeComponent,StoryComponent, StoryDetailsComponent,SearchComponent],
    imports:[CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(STORIES_STATE_NAME,storiesReducer),
        EffectsModule.forFeature([StoriesEffects]),
    ]
})
export class HomeModule{

}