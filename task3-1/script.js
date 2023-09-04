const app = Vue.createApp({
    data(){
        return {
            sectionUnits: [
                {
                    code: 'size',
                    value: 'мера длинны'
                },
                {
                    code: 'temp',
                    value: 'мера температуры'
                },
            ],
            curUnit: 'size',
            units: {
                size: ['km', 'm', 'cm', 'ft', 'ml'],
                temp: ['C', 'F'],
            },
            number: 0,
            unitFrom: null,
            unitTo: null,
            result: null
        }
    },

    methods: {
        getResult() {
            if(!this.unitFrom || !this.unitTo || (this.unitFrom == this.unitTo))
            {
                this.result = null;
                return;
            }

            switch(this.curUnit) {
                case 'size':
                    this.result = this.getSizeResult();
                    break;
                case 'temp':
                    this.result = this.getTempResult();
                    break;
            }
            
            console.log(this.result);
            
        },
        getSizeResult() {
            const unitConversions = {
                km: {
                  m: 1000,
                  cm: 100000,
                  ft: 3280.84,
                  ml: 0.621371,
                },
                m: {
                  km: 0.001,
                  cm: 100,
                  ft: 3.28084,
                  ml: 0.000621371,
                },
                cm: {
                  km: 0.00001,
                  m: 0.01,
                  ft: 0.0328084,
                  ml: 0.00000621371,
                },
                ft: {
                  km: 0.0003048,
                  m: 0.3048,
                  cm: 30.48,
                  ml: 0.000189394,
                },
                ml: {
                  km: 1.60934,
                  m: 1609.34,
                  cm: 160934,
                  ft: 5280.0,
                },
              };
        
            return this.number * unitConversions[this.unitFrom][this.unitTo];
        },
        getTempResult() {
            if (this.unitFrom === 'C' && this.unitTo === 'F') {
                return (this.number * 9) / 5 + 32;
            } else if (this.unitFrom === 'F' && this.unitTo === 'C') {
                return ((this.number - 32) * 5) / 9;
            }
          },
    }
})


app.mount("#app")