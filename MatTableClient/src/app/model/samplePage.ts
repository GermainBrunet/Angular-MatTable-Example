import { Sample } from './sample';

export class SamplePage {
    content: Sample[];
    totalPages: number;
    last: boolean;
    totalElements: number;
    size: number;
    number: number;
    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    };
    numberOfElements: number;
    first: boolean;
    empty: false;
}
