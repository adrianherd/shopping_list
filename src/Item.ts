/**
 * Item is the unit data form that will be used by most components
 */
export type Item = {
    id: string;
    text: string;
    quantity?: number;
    price?: number;
    category?: string;
};