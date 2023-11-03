<template>
    <div class="container">
        <h1>главная страница</h1>
        <div class="row">
            <div v-for="(list, status) in resumes" :key="status" class="col-4 gap-1 drag-drop-col">
                <DragDropColumn :section="list" :groupName="status" />
            </div>
        </div>
    </div>
</template>

<script>
import DragDropColumn from '@/components/DragDropColumn.vue';
export default {
    name: "HomeView",
    components: {DragDropColumn},
    computed: {
        resumes: {
            get() {
                let resumes = this.$store.getters.RESUMES;
                let statuslist = {
                    new: {
                        name: 'Новое',
                        list: []
                    },
                    interview: {
                        name: 'Собеседование',
                        list: []
                    },
                    adopted: {
                        name: 'Отказ',
                        list: []
                    },
                    refused: {
                        name: 'Принят',
                        list: []
                    }
                }
                for(let key in resumes)
                {
                    let item = resumes[key];
                    statuslist[item.status].list.push(item);
                }
                console.log('sdfklj');

                return statuslist;
            },
            set(value) {
                console.log(value);
                this.$store.commit('UDDATE_STATUS_RESUME', {
                    id: value.id,
                    status: value.status
                })
            }
        },
    }
};
</script>

<style>
.row {
  display: flex;
}
.col-4 {
  width: 25%;
}
.gap-1{
    gap: .5em;
}
.gap-2{
    gap: 1em;
}
.drag-drop-col{
    border-left: 1px solid var(--blue-200);
    border-radius: 1em;
}

</style>
