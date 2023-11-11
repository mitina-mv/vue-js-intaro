<template>
    <div class="container">
        <h1>главная страница</h1>
        <div class="row">
            <div v-for="(name, status) in statuses" :key="status" class="col-4 gap-1 drag-drop-col">
                <DragDropColumn :status="status" :name="name" />
            </div>
        </div>
    </div>
</template>

<script>
import DragDropColumn from '@/components/DragDropColumn.vue';
export default {
    name: "HomeView",
    data() {
        return {
            statuses: {
                new: 'Новое',
                interview: 'Собеседование',
                adopted: 'Отказ',
                refused: 'Принят'
            }
        }
    },
    components: {DragDropColumn},
    computed: {
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
