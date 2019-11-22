import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentListArray:any[] = [{
      id:'123456',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fringilla ipsum vel tellus sollicitudin convallis. Vestibulum vitae justo sed arcu molestie tempor. Vestibulum sagittis non nunc eu volutpat. Vestibulum a velit non arcu luctus ultrices. Donec vitae semper risus. Sed scelerisque aliquam risus. Cras et mi vitae mi cursus molestie. In quis lacinia orci. Ut iaculis odio sit amet justo egestas rhoncus. Suspendisse lorem arcu, molestie ut rhoncus a, lobortis ut erat.',
      subComments:[{
        id:'223456',
        content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fringilla ipsum vel tellus sollicitudin convallis. Vestibulum vitae justo sed arcu molestie tempor. Vestibulum sagittis non nunc eu volutpat. Vestibulum a velit non arcu luctus ultrices. Donec vitae semper risus. Sed scelerisque aliquam risus. Cras et mi vitae mi cursus molestie. In quis lacinia orci. Ut iaculis odio sit amet justo egestas rhoncus. Suspendisse lorem arcu, molestie ut rhoncus a, lobortis ut erat.'
      }]
    }];
    constructor() { }
    
    ngOnInit() {}

  isStrValid(str){
    if(typeof(str)!=='string' || !str || str.trim().length === 0 ){
        return false;
    }
    return true;
  };

  addComment(element){
    const content = element.value;
    const type = element.getAttribute('data-type');
    const result = this.isStrValid(content);
    if(!result){
      console.error("Error : Input must contain something!");
      return;
    }
    const newComment = {
      id:Math.floor(Math.random() * 1000000).toString(),
      content
    }
    
    if(type==='mainComment'){
      newComment['subComments'] = [];
      this.commentListArray.push(newComment);
    }
    if(type==='subComment'){
      const id = element.getAttribute('data-id');
      this.commentListArray.forEach(element => {
        if(element.id===id){ 
          return element.subComments.push(newComment);
        }
      });
    }

    element.value = null;
  }

  deleteComment(element){
    const id = element.getAttribute('data-id');
    const type = element.getAttribute('data-type');

    if(type==='mainComment'){
      this.commentListArray.forEach( (item ,index) => {
        if(item.id===id){
          return this.commentListArray.splice(index,1);
        }
      });
    }
    if(type==='subComment'){
      this.commentListArray.forEach( (item) => {
        if(item.id === id){
          item.subComments.forEach((el,index,item) => {
            const subId = element.getAttribute('data-subId');
            if(el.id === subId){
              return item.splice(index,1);
            }
          });
        }
      });
    }
  }
}
