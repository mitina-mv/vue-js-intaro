<template>
    <h3 class="col-header" :class="'col-header_' + groupName">{{ section.name }} ({{ section.list.length }})</h3>
    <draggable
        class="list-group gap-1"
        :list="section.list"
        :group="groupName"
        itemKey="id"
        @change="log"
    >
        <template #item="{ element }">
            <div class="list-group-item">
                <div class="photo" :style="'background-image: url(' + element.photo_path + ');'"></div>
                <div class="info">
                    <div class="name">{{ element.full_name }}</div>
                    <div class="profession">{{ element.profession }}</div>
                    <div class="skills">
                        <template v-for="(still, ind) in element.skills.slice(0, 3)" :key="ind">
                            <Chip :label="still" />
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Chip from 'primevue/chip';
export default {
    name: "DragDropColumn",
    components: {
        draggable,
        Chip,
    },
    props: {
        section: {
            type: Object,
        },
        groupName: {
            type: String
        }
    },
};
</script>

<style scoped>
.list-group {
    display: grid;
  min-height: 80vh;
  align-content: flex-start;
  padding: 1em 0.5em;
}
.list-group-item {
    display: grid;
  grid-template-columns: 80px auto;
  gap: 1em;
  width: 100%;
}
.photo {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.name {
  font-size: 1em;
  word-break: break-word;
  font-weight: bolder;
  color: var(--bluegray-800);
}
.info {
  display: grid;
  gap: .35em;
}
.profession {
  font-size: .8em;
  color: var(--bluegray-600);
}
.skills {
  display: flex;
  gap: 4px .25em;
  max-width: 100%;
  flex-wrap: wrap;
}
.p-chip.p-component {
  font-size: .75em;
}
.col-header {
  background: var(--blue-300);
  margin: 0;
  padding: 1em;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  color: var(--gray-800);
}
.col-header_new {
  background: var(--blue-400);
}
.col-header_interview {
  background: var(--yellow-400);
}
.col-header_adopted {
  background: var(--red-400);
}
.col-header_refused {
  background: var(--green-500);
}
</style>
