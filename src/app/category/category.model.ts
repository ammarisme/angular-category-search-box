export class Category{
    constructor(public categoryName : string,
        public level : number,
        public categoryId : number,
        public imageUrl : string,
        public subCategories : Category[] ){}
    // categoryName : string;
    // categoryId : string;
    // subCategories : Category [];
}