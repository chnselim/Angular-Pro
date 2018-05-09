import {CheckboxFilterModel} from '../models/checkbox-filter/checkbox-filter.model';

export abstract class StorageServiceBase {

    protected ram_storage: Map<string, any> = new Map<string, any>();
    protected get<T>(key: string, is_persistent: boolean = false): T {
        if (this.ram_storage.has(key)) {
            return this.ram_storage.get(key) as T;
        }

        if (is_persistent) {
            const item = localStorage.getItem(this.getLocalStoragePrefix() + key);
            let response: T;
            if (item !== null && item !== undefined) {
                response = JSON.parse(item) as T;
            } else {
                response = null;
            }
            this.ram_storage.set(key, response);
            return response;
        }
        return null;
    }

    protected set(key: string, value: any, is_persistent: boolean = false) {
        this.ram_storage.set(key, value);
        if (is_persistent) {
            localStorage.setItem(this.getLocalStoragePrefix() + key, JSON.stringify(value));
        }
    }

    protected remove(key: string, is_persistent: boolean = false) {
        this.ram_storage.delete(key);
        if (is_persistent) {
            localStorage.removeItem(this.getLocalStoragePrefix() + key);
        }
    }

    protected abstract getLocalStoragePrefix(): string;

    public setCheckboxFilter(checkbox_filter) {
        this.set('checkbox_filter', checkbox_filter, true);
    }

    public getCheckboxFilter(): CheckboxFilterModel[] {
        return this.get<CheckboxFilterModel[]>('checkbox_filter', true);
    }
}
