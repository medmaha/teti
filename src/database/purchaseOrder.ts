import mongoose, { Document, Model } from 'mongoose';

interface OrderModel extends Document {
	userId: string;
	items: Array<{
		productId: string;
		name: string;
		qty: number;
		price: number;
	}>;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	items: {
		type: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product'
				},
				name: {
					type: String,
					required: true
				},
				qty: {
					type: Number,
					required: true
				},
				price: {
					type: Number,
					required: true
				}
			}
		],
		required: true
	},
	status: {
		type: String,
		enum: ['created', 'confirmed', 'delivered', 'cancelled'],
		default: 'created',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true
	},
	updatedAt: {
		type: Date,
		default: Date.now,
		required: true
	}
});

let Order: Model<OrderModel>;

if (mongoose.models.Order) {
	Order = mongoose.model<OrderModel>('Order');
} else {
	Order = mongoose.model<OrderModel>('Order', OrderSchema);
}
