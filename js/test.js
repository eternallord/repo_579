const containers = document.querySelectorAll('.block')

const draggable = new Draggable.Droppable(containers, {
   draggable: '.draggable',
   dropzone: '.droppable'
});

function setForegroundColor(r, g, b) {
  let sum = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);
  return (sum > 128) ? 'black' : 'white';
}

function hextoint(str){
   if (str == 'a'){
      return 10;
   }
   else if(str =='b'){
      return 11;
   }
   else if (str == 'c'){
      return 12;
   }
   else if (str == 'd'){
      return 13;
   }
   else if (str == 'e'){
      return 14;
   }
   else if (str == 'f'){
      return 15;
   }
   return parseInt(str);
}

const inputbtn = document.querySelector('#add-event');
const calbtn = document.querySelector('#create-cal');
const delbtn = document.querySelector('#del-cal');

const createbin = function(){


   let li = document.createElement('li');
   li.innerText = 'bin';
   let div = document.createElement('div');
   div.classList.add('block');
   let div2 = document.createElement('div');
   div2.classList.add('droppable');
   div.appendChild(div2);
   li.appendChild(div);
   draggable.addContainer(div, {
      dropzone: '.droppable'
   });
   return li;

}

callist = ['8am - 10am', '10am - 12pm', '12pm - 2pm', '2pm - 4pm', '4pm - 6pm']

calbtn.addEventListener('click', ()=>{
   const days = document.querySelector('.days');
   for (const time of callist) {
      for (let i = 0; i < 7; i++) {
         
         let li = document.createElement('li');
         li.innerText = time;
         let div = document.createElement('div');
         div.classList.add('block');
         let div2 = document.createElement('div');
         div2.classList.add('droppable');
         div.appendChild(div2);
         li.appendChild(div);
         days.appendChild(li);
         draggable.addContainer(div, {
            dropzone: '.droppable'
         });

      }
   }
   let bin = createbin();
   days.appendChild(bin);
})

delbtn.addEventListener('click', ()=>{
   const days = document.querySelector('.days');
   days.innerHTML = ''
})

inputbtn.addEventListener('click',() => {
   console.log(document.querySelector('#pc').value)
   const drop = document.createElement('div');
   drop.classList.add('droppable');
   drop.classList.add('draggable-dropzone--occupied');
   const new_val = document.createElement('div');
   new_val.classList.add('draggable');
   new_val.innerHTML = document.querySelector('#input-event').value;
   new_val.style.backgroundColor  = document.querySelector('#pc').value;
   let r = hextoint(document.querySelector('#pc').value[1]) * 16 + hextoint(document.querySelector('#pc').value[2])
   let g = hextoint(document.querySelector('#pc').value[3]) * 16 + hextoint(document.querySelector('#pc').value[4])
   let b = hextoint(document.querySelector('#pc').value[5]) * 16 + hextoint(document.querySelector('#pc').value[6])

   new_val.style.color = setForegroundColor(r,g,b);
   const block = document.createElement('li');
   block.classList.add('block');
   drop.appendChild(new_val);
   block.appendChild(drop);
   const list = document.querySelector('.event-grid');
   list.appendChild(block);


   draggable.addContainer(block, {
      draggable: '.draggable',
      dropzone: '.droppable'
   });
})

draggable.on('droppable:dropped', (e) => {
   if (e.data.dragEvent.data.sourceContainer.nodeName == 'LI'){
      e.data.dragEvent.data.sourceContainer.remove();
   }

});

draggable.on('drag:over:container', (e) => {
   console.log(e.data.overContainer.parentNode.firstChild.textContent);
   if(e.data.overContainer.parentNode.firstChild.textContent == "bin"){
      e.data.source.remove();
   }
});

