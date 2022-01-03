class Slider {
    constructor(min, max, value, name, parameter) {
        this.min = min;
        this.max = max;
        this.value = value;
        this.name = name;
        this.parameter = parameter;
    }

    create(parent) {
        this.slider = createSlider(this.min, this.max, this.value);
        this.slider.class("slider");
        this.slider.parent(parent);
        this.slider.changed(() => this.updateParameter());
        this.slider.touchMoved(() => this.updateParameter());
        this.label = createP(this.name);
        this.label.class("slider-label");
        this.label.parent(parent);
        // createText(this.name); TODO add labels for each slider 
    }

    updateParameter() {
        this.parameter(this.slider.value())
    }
}