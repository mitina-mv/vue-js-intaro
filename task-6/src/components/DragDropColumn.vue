<template>
    <h3 class="col-header" :class="'col-header_' + status">{{ name }} ({{ section.length }})</h3>
    <draggable
        class="list-group gap-1"
        v-model="section"
        group="resume"
        itemKey="id"
        @change="log"
    >
        <template #item="{ element }">
            <div class="list-group-item">
                <div class="photo" :style="'background-image: url(' + element.photo_path + ');'"></div>
                <div class="info">
                    <router-link :to="'/' + element.id" class="name">{{ element.full_name }}</router-link>
                    <div class="profession">{{ element.profession }}</div>
                    <div class="age">{{ calculateAge(element.birthdate) }}</div>
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
        status: {
            type: String
        },
        name: {
            type: String
        }
    },
    methods: {
        calculateAge (age){
            let birthDate = new Date(age);
            let otherDate = new Date();
            let years = (otherDate.getFullYear() - birthDate.getFullYear());
            if (otherDate.getMonth() < birthDate.getMonth() ||
                otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
                years--;
            }

            const declension = ['год', 'года', 'лет'];
            const lastDigit = years % 10;
            const lastTwoDigits = years % 100;

            if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                return years + ' ' + declension[2];
            } else if (lastDigit === 1) {
                return years + ' ' + declension[0];
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return years + ' ' + declension[1];
            } else {
                return years + ' ' + declension[2];
            }
        },
    log: function(evt) {
        if(evt.added){
            this.$store.dispatch('UPDATE_STATUS_RESUME', {
                element: evt.added.element,
                status: this.status
            });
        }
        if(evt.removed) {

        }
    },
    },
    computed: {
        section() {
            let resumes = this.$store.getters.RESUMES;
            let result = [];
            
            for(let key in resumes)
            {
                let item = resumes[key];
                if(item.status == this.status)
                    result.push(item);
            }

            return result;
        }
    }
};
</script>

<style scoped>
.list-group {
    display: grid;
  min-height: 69vh;
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
  text-decoration: none;
}
.name:hover {
    color:var(--primary-color);
}
.info {
  display: grid;
  gap: .35em;
}
.profession, .age {
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
