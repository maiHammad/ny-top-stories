import { Injectable } from "@angular/core";  
import { HttpClient } from '@angular/common/http';
import { Story } from "../models/story.model";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root',
})

export class StoriesService{
    constructor(private http:HttpClient){}
     apiKey='sMEp2i2TDQHZvSlQo4SFBwf6WZWDRTeW';
    getTopStories(category: string): Observable<Story[]> {
        return this.http
          .get<Story[]>(`https://api.nytimes.com/svc/topstories/v2/${category?category:'home'}.json?api-key=${this.apiKey}`)
          .pipe(
            map((data) => {
              let results:any =[];
              results= Object.values(data)[5];
              const stories: Story[] = [];
              stories.push(...results);
              results.forEach((element:any, index:any) => {
                element.id=index+element.byline.replace(/\s/g, "");
                if(element.multimedia!==undefined&&element.multimedia!==null&&element.multimedia.length>0){
                  element.firstImage=element.multimedia[0].url;
                }
              });
              return stories;
            })
          );
      }
      
    getTopStorieswithserch(serchVal: string): Observable<Story[]> {
      let articlesearch='articlesearch';
      let currentSerchVal=serchVal?serchVal:'all';
        return  this.http
        .get<Story[]>(`https://api.nytimes.com/svc/search/v2/${articlesearch}.json?q=${currentSerchVal}&api-key=${this.apiKey}`)
        .pipe(
          map((data) => {
            let results:any;
            results= Object.values(data)[2];
            results=Object.values(results)[0];
            const stories: Story[] = [];
            stories.push(...results);
            results.forEach((element:any, index:any) => {
              element.id=index+element.byline.original.replace(/\s/g, "");
              if(element.multimedia!==undefined&&element.multimedia!==null&&element.multimedia.length>0){
                element.firstImage=element.multimedia[0].url;
              }
            });
            return stories;
          })
        ); 
      

    }
      getStoryById(id: string,category: string): Observable<Story> {
        let currentId:string;
        if(id==undefined){
          currentId=window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        }else{
          currentId=id;
        }
        return this.http.get<Story>(
          `https://api.nytimes.com/svc/topstories/v2/${category}.json?`
        ).pipe(
          map((data) => {
            let results:any =[];
            results= Object.values(data)[5];
            let story:Story=results.filter((element:any,index:any)=>{
              if(currentId == index+element.item_type+element.section){return element};
            });
            return story;

          })
          );
      }
}