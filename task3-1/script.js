const app = Vue.createApp({
	data() {
		return {
			sectionUnits: [
				{
					code: "size",
					value: "мера длины",
				},
				{
					code: "temp",
					value: "мера температуры",
				},
				{
					code: "angle",
					value: "мера геометрического угла",
				},
			],
			curUnit: "size",
			units: {
				size: ["km", "m", "cm", "ft", "ml"],
				temp: ["C", "F"],
				angle: ["rad", "deg", "grad"],
			},
			number: 0,
			unitFrom: null,
			unitTo: null,
			result: null,
		};
	},

	mounted() {
		this.setDefaultUnits()
	},

	methods: {
		getResult() {
			if (
				!this.unitFrom ||
				!this.unitTo ||
				this.unitFrom == this.unitTo
			) {
				this.result = null;
				return;
			}

			switch (this.curUnit) {
				case "size":
					this.result = this.getSizeResult();
					break;
				case "temp":
					this.result = this.getTempResult();
					break;
				case "angle":
					this.result = this.getAngleResult();
					break;
			}
		},
		setDefaultUnits() {
			this.unitFrom = this.units[this.curUnit][0]
			this.unitTo = this.units[this.curUnit][1]

			this.getResult()
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
			if (this.unitFrom === "C" && this.unitTo === "F") {
				return (this.number * 9) / 5 + 32;
			} else if (this.unitFrom === "F" && this.unitTo === "C") {
				return ((this.number - 32) * 5) / 9;
			}
		},
		getAngleResult() {
			const unitConversions = {
				rad: {
					deg: 57.3,
					grad: 63.66,
				},
				deg: {
					rad: 0.017,
					grad: 1.11,
				},
				grad: {
					deg: 0.9,
					rad: 0.016,
				},
			};
			return this.number * unitConversions[this.unitFrom][this.unitTo];
		},
	},
});

app.mount("#app");
