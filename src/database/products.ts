import mongoose, { Document, Model } from 'mongoose';

export interface ProductInterface extends Document {
	name: string;
	slug: string;
	imgUrl: string;
	altText: string;
	hint: string;
	price: string;
	qty: number;
	outline: {
		specifications: {
			type: mongoose.Schema.Types.ObjectId[];
			ref: string;
		};
		features: {
			type: mongoose.Schema.Types.ObjectId[];
			ref: string;
		};
		title: string;
		heading: string;
		paragraph: string;
	};
}

const ProductSchema = new mongoose.Schema({
	name: String,
	slug: String,
	imgUrl: String,
	altText: String,
	hint: String,
	price: String,
	qty: Number,
	outline: {
		specifications: {
			type: [String]
		},
		features: {
			type: [String]
		},
		title: String,
		heading: String,
		paragraph: String
	}
});

let Products: Model<ProductInterface>;

const populateUserRefs = (doc: ProductInterface, next: () => void) => {
	// doc.populate();
	next();
};

ProductSchema.pre('find', function (this: any, next: () => void) {
	populateUserRefs(this, next);
});

ProductSchema.pre('findOne', function (this: any, next: () => void) {
	populateUserRefs(this, next);
});

if (mongoose.models.Products) {
	Products = mongoose.model<ProductInterface>('Products');
} else {
	Products = mongoose.model<ProductInterface>('Products', ProductSchema);
}

export default Products;
