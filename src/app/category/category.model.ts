export class Category{
    constructor(public categoryName : string,
        public level : number,
        public categoryId : number,
        public imageUrl : string,
        public selectionStatus : number,
        public subCategories : Category[] ){}
        public priority : number;
    // categoryName : string;
    // categoryId : string;
    // subCategories : Category [];
}