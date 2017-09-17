export class ComponentBase {
    onChange: (_: any) => void;
    onTouched: () => void;

    constructor() {
        this.onChange = (_) => {
        };

        this.onTouched = () => {

        };
    }
}
