<template>
    <h1>форма добавления
    </h1>
    <div class="cols">
        <draggable class="col" v-model="myArray" item-key="id" group="people">
        <template #item="{element}">
            <div>{{element.name}}</div>
        </template>
    </draggable>
    <draggable class="col" v-model="myArray1" item-key="id" group="people">
        <template #item="{element}">
            <div>{{element.name}}</div>
        </template>
    </draggable>
    </div>

  </template>
  
  <script>
import draggable from "vuedraggable";

  export default {
    data() {
        return {
            myArray: [{
                    name: 'skdj',
                    id: 1
                },{
                    name: 'qwwer',
                    id: 2
                },{
                    name: 'rtyu',
                    id: 3
                },
            ],
            myArray1: [{
                    name: 'iuyr',
                    id: 5
                },{
                    name: 'dfghj',
                    id: 6
                },{
                    name: 'kjgdf',
                    id: 7
                },
            ],
        }
    },
    
    components: {
        draggable,
    },
  }
  </script>
  
  <style>
  .cols {
  display: flex;
  gap: 100px;
}
  </style>